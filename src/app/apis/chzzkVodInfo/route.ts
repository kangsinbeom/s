import { getDashBaseUrl } from "@/app/libs/chzzk/getDashBaseUrl";
import getVideoInfo from "@/app/libs/chzzk/getVideoInfo";
import getAuthCookies from "@/app/libs/utils/getAuthCookies";
import getReqSearchParams from "@/app/libs/utils/getReqSearchParams";
import liveRewindPlaybackJsonToPath from "@/app/libs/utils/liveRewindPlaybackJson";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { NID_AUT, NID_SES } = getAuthCookies(req);
  const video_no = getReqSearchParams(req, "videoNo");
  try {
    const {
      videoId,
      liveRewindPlaybackJson,
      inKey,
      publishDate,
      videoTitle,
      videoCategoryValue,
      duration,
      tags,
    } = await getVideoInfo({ video_no, NID_AUT, NID_SES });

    let src = liveRewindPlaybackJsonToPath(liveRewindPlaybackJson);
    let type = "HLS";

    if (inKey && !src) {
      const videoUrl = `${process.env.CHZZK_STREAM_URL}${videoId}?key=${inKey}`;
      src = await getDashBaseUrl({ videoUrl, NID_AUT, NID_SES });
      type = "MP4";
    }

    return NextResponse.json({
      src,
      type,
      publishDate,
      videoTitle,
      videoCategoryValue,
      duration,
      tags,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
