import getVideoInfo from "@/app/libs/chzzk/getVideoInfo";
import getAuthCookies from "@/app/libs/utils/getAuthCookies";
import getReqSearchParams from "@/app/libs/utils/getReqSearchParams";
import liveRewindPlaybackJsonToPath from "@/app/libs/vod/liveRewindPlaybackJson";
import { NextRequest, NextResponse } from "next/server";
import { fetchWithInKey } from "./fetchWithInKey";

export async function GET(req: NextRequest) {
  const { NID_AUT, NID_SES } = getAuthCookies(req);
  const video_no = getReqSearchParams(req, "videoNo");
  try {
    let src;
    let type = "MP4";
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
      src = fetchWithInKey({ video_no, inKey, NID_AUT, NID_SES });
    }
    if (!src) throw new Error("BaseURL not found in DASH manifest");
    return NextResponse.json({
      src,
      type,
      liveRewindPlaybackJson,
      ...resposeInfo,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
