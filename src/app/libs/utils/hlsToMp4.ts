// pages/api/downloadHls.ts
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { pipeline } from "stream";
import fetch from "node-fetch";

const streamPipeline = promisify(pipeline);

type CookieObj = {
  NID_AUT?: string;
  NID_SES?: string;
};

export async function hlsToMp4(
  hlsUrl: string,
  outputFile: string,
  cookies: CookieObj,
  concurrency = 5
) {
  // 1. HLS 플레이리스트 다운로드
  const headers: Record<string, string> = {};
  if (cookies.NID_AUT || cookies.NID_SES) {
    headers["Cookie"] = `NID_AUT=${cookies.NID_AUT || ""}; NID_SES=${
      cookies.NID_SES || ""
    }`;
  }

  const res = await fetch(hlsUrl, { headers });
  if (!res.ok) throw new Error(`Failed to fetch HLS playlist: ${res.status}`);
  const playlistText = await res.text();

  // 2. 세그먼트 URL 추출
  const lines = playlistText
    .split("\n")
    .filter((line) => line && !line.startsWith("#"));
  if (lines.length === 0) throw new Error("No segments found in playlist");

  // 3. 임시 폴더 생성
  const tempDir = path.join(process.cwd(), "tmp_hls");
  if (fs.existsSync(tempDir))
    fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir);

  // 4. init segment 확인
  let initSegment: string | null = null;
  for (const line of playlistText.split("\n")) {
    if (line.startsWith("#EXT-X-MAP:")) {
      initSegment = line.match(/URI="(.+?)"/)?.[1] || null;
      break;
    }
  }
  if (initSegment) lines.unshift(initSegment); // init segment 먼저 다운로드

  // 5. 병렬 다운로드
  const downloadSegment = async (url: string, index: number) => {
    const segmentUrl = new URL(url, hlsUrl).toString();
    const segmentRes = await fetch(segmentUrl, { headers });
    if (!segmentRes.ok)
      throw new Error(
        `Failed to download segment ${index}: ${segmentRes.status}`
      );
    const segmentPath = path.join(
      tempDir,
      `${index.toString().padStart(5, "0")}.ts`
    );
    await streamPipeline(segmentRes.body, fs.createWriteStream(segmentPath));
    return segmentPath;
  };

  const results: string[] = [];
  let idx = 0;
  while (idx < lines.length) {
    const batch = lines.slice(idx, idx + concurrency);
    const batchResults = await Promise.all(
      batch.map((seg, i) => downloadSegment(seg, idx + i))
    );
    results.push(...batchResults);
    idx += concurrency;
  }

  // 6. 세그먼트 병합
  const finalStream = fs.createWriteStream(outputFile);
  for (const segmentPath of results) {
    await streamPipeline(fs.createReadStream(segmentPath), finalStream, {
      end: false,
    });
    fs.unlinkSync(segmentPath);
  }
  finalStream.end();

  // 7. 임시 폴더 제거
  fs.rmdirSync(tempDir, { recursive: true });

  return outputFile;
}
