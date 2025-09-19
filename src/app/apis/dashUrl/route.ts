import { getDashBaseUrl } from "@/app/libs/chzzk/getDashBaseUrl";
import getVideoInfo from "@/app/libs/chzzk/getVideoInfo";
import { VideoInfoResponse } from "@/app/types/bff/response/video";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest
): Promise<NextResponse<VideoInfoResponse | { error: string }>> {
  try {
    // 1. body에서 video_no 추출
    const { video_no } = await req.json();

    if (!video_no || typeof video_no !== "string") {
      return NextResponse.json(
        { error: "video_no is required and must be a string" },
        { status: 400 }
      );
    }

    const { videoId, src, inKey, publishDate, videoTitle } = await getVideoInfo(
      video_no
    );

    if (inKey) {
      const streamUrl = `${process.env.CHZZK_STREAM_URL}${videoId}?key=${inKey}`;
      const dashBaseUrl = await getDashBaseUrl(streamUrl);
      return NextResponse.json({
        src: dashBaseUrl,
        type: "MP4",
        publishDate,
        videoTitle,
      });
    }

    if (!src) {
      return NextResponse.json({ error: "src is undefined" }, { status: 500 });
    }

    return NextResponse.json({ src, type: "HLS", publishDate, videoTitle });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
