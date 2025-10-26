import { getParsedXmlVodInfoUrl } from "@/app/libs/chzzk/getParsedXmlVodInfoUrl";
import getVideoInfo from "@/app/libs/chzzk/getVideoInfo";
import getAuthCookies from "@/app/libs/utils/getAuthCookies";
import getReqSearchParams from "@/app/libs/utils/getReqSearchParams";
import getVodUrl from "@/app/libs/vod/getVodUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { NID_AUT, NID_SES } = getAuthCookies(req);
  const video_no = getReqSearchParams(req, "videoNo");
  try {
    const { inKey, videoId, ...resposeInfo } = await getVideoInfo({
      video_no,
      NID_AUT,
      NID_SES,
    });

    // 이거는 hls일 때인데 일단 빼자
    // let src = liveRewindPlaybackJsonToPath(liveRewindPlaybackJson);
    // let type = "HLS";

    if (!inKey) {
      throw new Error("inKey is missing in video info");
    }
    const videoUrl = `${process.env.CHZZK_STREAM_URL}${videoId}?key=${inKey}`;
    const parsedXml = await getParsedXmlVodInfoUrl({
      videoUrl,
      NID_AUT,
      NID_SES,
    });
    const src = getVodUrl(parsedXml);
    if (!src) throw new Error("BaseURL not found in DASH manifest");

    return NextResponse.json({
      src,
      parsedXml,
      ...resposeInfo,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
