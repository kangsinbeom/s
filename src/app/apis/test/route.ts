import getVideoInfo from "@/app/libs/chzzk/getVideoInfo";
import getAuthCookies from "@/app/libs/utils/getAuthCookies";
import getReqSearchParams from "@/app/libs/utils/getReqSearchParams";
import { NextRequest, NextResponse } from "next/server";

interface TimeRange {
  start: number;
  end: number;
}

async function getSegmentUrlsFromHls(
  m3u8Url: string,
  timeRanges: TimeRange[]
): Promise<string[]> {
  const res = await fetch(m3u8Url);

  if (!res.ok) throw new Error(`Failed to fetch m3u8: ${res.status}`);

  const text = await res.text();
  const lines = text.split("\n");
  let relative1080Url: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("RESOLUTION=1920x1080")) {
      relative1080Url = lines[i + 1]?.trim();
      break;
    }
  }
  if (!relative1080Url) throw new Error("1080p stream not found");
  const url = new URL(relative1080Url, m3u8Url).toString();

  const res2 = await fetch(url);

  const text2 = await res2.text();
  const lines2 = text2.split("\n");
  const segmentUrls1 = filterSegmentsByTime(lines2, timeRanges);

  return segmentUrls1;
}

export async function POST(req: NextRequest) {
  const { timeRanges } = await req.json();
  const { NID_AUT, NID_SES } = getAuthCookies(req);
  const video_no = "10217901";
  const { liveRewindPlaybackJson } = await getVideoInfo({
    video_no,
    NID_AUT,
    NID_SES,
  });
  const mediaResponse = JSON.parse(liveRewindPlaybackJson);
  // mediaResponse는 서버에서 받은 JSON response
  const hlsMedia = mediaResponse.media.find((m: any) => m.protocol === "HLS");

  if (!hlsMedia) throw new Error("No HLS media found");
  const segmentUrls = await getSegmentUrlsFromHls(hlsMedia.path, timeRanges);
  console.log("segmentUrls:", segmentUrls);
  return;
  try {
    // 🔥 Python 백엔드로 요청 보내기
    const res = await fetch("http://localhost:8000/api/vod/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        segmentUrls,
        output_filename: "video_output.mp4",
      }),
    });

    const data = await res.json();

    return NextResponse.json({ message: "success", data });
  } catch (err: any) {
    console.error("Error calling backend:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function filterSegmentsByTime(
  lines: string[],
  timeRanges: TimeRange[]
): string[] {
  const segments: { url: string; duration: number }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("#EXTINF:")) {
      const duration = parseFloat(line.split(":")[1]);
      const url = lines[i + 1]?.trim();
      if (url && !url.startsWith("#")) {
        segments.push({ url, duration });
      }
    }
  }

  const result: string[] = [];
  timeRanges.forEach(({ start, end }) => {
    let accumulated = 0;
    for (const seg of segments) {
      const segStart = accumulated;
      const segEnd = accumulated + seg.duration;
      if (segEnd > start && segStart < end) {
        result.push(seg.url);
      }
      accumulated += seg.duration;
    }
  });

  return result;
}
