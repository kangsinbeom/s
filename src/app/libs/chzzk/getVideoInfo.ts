import { VodApiResponse } from "@/app/types/external/response/chzzk";

const CHZZK_NID_SES = process.env.CHZZK_NID_SES;
const CHZZK_NID_AUT = process.env.CHZZK_NID_AUT;
const BASE_URL = process.env.CHZZK_VOD_INFO;

interface getVideoInfoResponse {
  videoId: string;
  videoTitle: string;
  publishDate: string;
  inKey: string | null;
  src?: string;
}

// videoInfo 가져오기 API
export const getVideoInfo = async (
  video_no: string
): Promise<getVideoInfoResponse> => {
  if (!CHZZK_NID_SES || !CHZZK_NID_AUT || !BASE_URL) {
    throw new Error("Missing required environment variables");
  }

  const response = await fetch(`${BASE_URL}${video_no}`, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      Cookie: `NID_SES=${CHZZK_NID_SES}; NID_AUT=${CHZZK_NID_AUT}`,
    },
  });

  if (!response.ok) {
    const bodyText = await response.text().catch(() => "");
    throw new Error(
      `Failed to fetch video info: ${response.status} ${bodyText}`
    );
  }

  const data: VodApiResponse = await response.json();
  const { content } = data;
  const { videoId, inKey, liveRewindPlaybackJson, videoTitle, publishDate } =
    content;

  if (!videoId) {
    throw new Error("videoId not found in response");
  }

  // inKey가 없는 경우 liveRewindPlaybackJson 확인
  if (liveRewindPlaybackJson) {
    try {
      const playback =
        typeof liveRewindPlaybackJson === "string"
          ? JSON.parse(liveRewindPlaybackJson)
          : liveRewindPlaybackJson;

      const src = playback.media?.[0]?.path;
      if (!src) {
        throw new Error("No HLS path found in liveRewindPlaybackJson");
      }

      return {
        videoId,
        videoTitle,
        publishDate,
        inKey,
        src,
      };
    } catch (err) {
      throw new Error("Failed to parse liveRewindPlaybackJson");
    }
  }
  return { videoId, inKey, videoTitle, publishDate };
};

export default getVideoInfo;
