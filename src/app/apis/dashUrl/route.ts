import { getDashBaseUrl } from "@/app/libs/chzzk/getDashBaseUrl";
import getVideoInfo from "@/app/libs/chzzk/getVideoInfo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. body에서 video_no 추출
    const { video_no } = await req.json();

    if (!video_no || typeof video_no !== "string") {
      return NextResponse.json(
        { error: "video_no is required and must be a string" },
        { status: 400 }
      );
    }

    const videoId = await getVideoInfo(video_no);
    const inKey = process.env.CHZZK_INKEY;
    const streamUrl = `${process.env.CHZZK_STREAM_URL}${videoId}?key=${inKey}`;

    const dashBaseUrl = await getDashBaseUrl(streamUrl);
    return NextResponse.json({ dashUrl: dashBaseUrl });
  } catch (error) {
    console.error("BFF Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
