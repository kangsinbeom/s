import { VodApiResponse, VodContent } from "@/app/types/external/response/vod";

const BASE_URL = process.env.CHZZK_VOD_INFO;

interface getVideoInfoParams {
  video_no: string;
  NID_AUT: string;
  NID_SES: string;
}

type VideoInfo = Pick<
  VodContent,
  | "videoId"
  | "inKey"
  | "publishDate"
  | "videoTitle"
  | "videoCategoryValue"
  | "duration"
  | "tags"
  | "channel"
  | "liveRewindPlaybackJson"
>;

// videoInfo 가져오기 API
export const getVideoInfo = async ({
  video_no,
  NID_AUT,
  NID_SES,
}: getVideoInfoParams): Promise<VideoInfo> => {
  try {
    const response = await fetch(`${BASE_URL}${video_no}`, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        Cookie: `NID_SES=${NID_SES}; NID_AUT=${NID_AUT}`,
      },
    });
    const {
      content: {
        videoId,
        inKey,
        publishDate,
        videoTitle,
        videoCategoryValue,
        duration,
        tags,
        channel,
        liveRewindPlaybackJson,
      },
    }: VodApiResponse = await response.json();

    return {
      videoId,
      inKey,
      publishDate,
      videoTitle,
      videoCategoryValue,
      duration,
      tags,
      channel,
      liveRewindPlaybackJson,
    };
  } catch (error) {
    throw new Error("Network error while fetching video info");
  }
};
export default getVideoInfo;
