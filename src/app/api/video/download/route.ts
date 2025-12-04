import { getParsedXmlVodInfoUrl } from "@/app/libs/chzzk/getParsedXmlVodInfoUrl";
import getVideoInfo from "@/app/libs/chzzk/getVideoInfo";
import getAuthCookies from "@/app/libs/utils/getAuthCookies";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { NID_AUT, NID_SES } = getAuthCookies(req);
  const { timeRanges, quality, video_no } = await req.json();

  const { inKey, videoId } = await getVideoInfo({
    video_no,
    NID_AUT,
    NID_SES,
  });
  if (!inKey) {
    throw new Error("inKey is missing in video info");
  }
  const videoUrl = `${process.env.CHZZK_STREAM_URL}${videoId}?key=${inKey}`;
  const parsedXml = await getParsedXmlVodInfoUrl({
    videoUrl,
    NID_AUT,
    NID_SES,
  });
  const videoAdaptationSet = parsedXml.MPD.Period[0].AdaptationSet.find(
    (a: any) => a.$.mimeType === "video/mp2t"
  );

  const representation = videoAdaptationSet.Representation[0];
  const repId = representation.$.id; // "dcc78f60-b0f4-11f0-ae19-a0369ffabdf8"
  const baseUrl = representation.BaseURL[0];
  const segmentTemplate = representation.SegmentTemplate[0].$;
  const segmentTimeline =
    representation.SegmentTemplate[0].SegmentTimeline[0].S[0].$;
  const segmentScale = parseInt(segmentTimeline.d) / 1000;
  const segmentUrls: string[] = [];

  const parsedTimeRange = timeRanges.map(
    ({ start, end }: { start: number; end: number }) => ({
      start: Math.floor(start / segmentScale),
      end: Math.ceil(end / segmentScale) - 1,
    })
  );

  parsedTimeRange.forEach(({ start, end }: { start: number; end: number }) => {
    for (let i = start; i <= end; i++) {
      const segmentNumber = i.toString().padStart(6, "0");
      const segmentFile = segmentTemplate.media
        .replace("$RepresentationID$", repId)
        .replace("$Number%06d$", segmentNumber);

      segmentUrls.push(`${baseUrl}${segmentFile}`);
    }
  });

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
