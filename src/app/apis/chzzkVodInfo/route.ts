import getVideoInfo from "@/app/libs/chzzk/getVideoInfo";
import getAuthCookies from "@/app/libs/utils/getAuthCookies";
import getReqSearchParams from "@/app/libs/utils/getReqSearchParams";
import liveRewindPlaybackJsonToPath from "@/app/libs/vod/liveRewindPlaybackJson";
import { NextRequest, NextResponse } from "next/server";
import { fetchWithInKey } from "./fetchWithInKey";
import { VideoApiResponse } from "@/app/types/bff/response/video";

export async function GET(req: NextRequest) {
  const { NID_AUT, NID_SES } = getAuthCookies(req);

  const video_no = getReqSearchParams(req, "videoNo");
  try {
    let src;
    let type: "MP4" | "HLS" = "MP4";
    const { inKey, videoId, liveRewindPlaybackJson, ...resposeInfo } =
      await getVideoInfo({
        video_no,
        NID_AUT,
        NID_SES,
      });
    if (!inKey) {
      src = liveRewindPlaybackJsonToPath(liveRewindPlaybackJson);
      type = "HLS";
    } else {
      src = await fetchWithInKey({ videoId, inKey, NID_AUT, NID_SES });
    }
    const response: VideoApiResponse = {
      src,
      type,
      liveRewindPlaybackJson,
      ...resposeInfo,
    };
    return NextResponse.json<VideoApiResponse>(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
