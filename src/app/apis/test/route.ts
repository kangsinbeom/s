import getVideoInfo from "@/app/libs/chzzk/getVideoInfo";
import getAuthCookies from "@/app/libs/utils/getAuthCookies";
import getReqSearchParams from "@/app/libs/utils/getReqSearchParams";
import { NextRequest, NextResponse } from "next/server";

interface TimeRange {
  start: number;
  end: number;
}

export async function POST(req: NextRequest) {
  const { timeRanges, video_no } = await req.json();
  const { NID_AUT, NID_SES } = getAuthCookies(req);
  const { liveRewindPlaybackJson } = await getVideoInfo({
    video_no,
    NID_AUT,
    NID_SES,
  });
  // const mediaResponse = JSON.parse(liveRewindPlaybackJson);
  // // mediaResponse는 서버에서 받은 JSON response
  // const hlsMedia = mediaResponse.media.find((m: any) => m.protocol === "HLS");
  const mediaResponse = JSON.parse(liveRewindPlaybackJson);

  // media 배열에서 protocol === "HLS"인 항목 찾기
  const hlsMedia = mediaResponse.media.find((m: any) => m.protocol === "HLS");

  // HLS m3u8 URL
  const hlsUrl = hlsMedia?.path;
  if (!hlsUrl) throw new Error("No HLS media found");
  // const segmentUrls = await getSegmentUrlsFromHls(hlsMedia.path, timeRanges);
  try {
    // 🔥 Python 백엔드로 요청 보내기
    const res = await fetch("http://localhost:8000/api/vod/ts-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        m3u8_url: hlsMedia.path, // HLS m3u8 URL
      }),
    });

    const data = await res.json();

    return NextResponse.json({ message: "success", data });
  } catch (err: any) {
    console.error("Error calling backend:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function getSegmentUrlsFromHls(
  m3u8Url: string,
  timeRanges: TimeRange[]
): Promise<string[]> {
  const res = await fetch(m3u8Url);
  if (!res.ok) throw new Error(`Failed to fetch m3u8: ${res.status}`);

  const text = await res.text();
  const lines = text.split("\n");

  // 1080p 스트림 찾기
  let relative1080Url: string | null = null;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("RESOLUTION=1920x1080")) {
      relative1080Url = lines[i + 1]?.trim();
      break;
    }
  }
  if (!relative1080Url) throw new Error("1080p stream not found");

  // 절대 URL로 변환
  const absolute1080Url = new URL(relative1080Url, m3u8Url).toString();
  const res2 = await fetch(absolute1080Url);
  if (!res2.ok) throw new Error(`Failed to fetch 1080p m3u8: ${res2.status}`);

  const lines2 = (await res2.text()).split("\n");
  return filterSegmentsByTime(lines2, timeRanges, absolute1080Url);
}
function filterSegmentsByTime(
  lines: string[],
  timeRanges: TimeRange[],
  m3u8Url: string
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
        // 절대 URL로 변환
        const absUrl = new URL(seg.url, m3u8Url).toString();
        result.push(absUrl);
      }
      accumulated += seg.duration;
    }
  });

  return result;
}
