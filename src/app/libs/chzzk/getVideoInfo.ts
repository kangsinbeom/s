import { VodApiResponse } from "@/app/types/response/chzzk";

const CHZZK_NID_SES = process.env.CHZZK_NID_SES;
const CHZZK_NID_AUT = process.env.CHZZK_NID_AUT;
const BASE_URL = process.env.CHZZK_VOD_INFO;

// videoInfo 가져오기 API
const getVideoInfo = async (video_no: string): Promise<string> => {
  if (!CHZZK_NID_SES || !CHZZK_NID_AUT || !BASE_URL) {
    throw new Error("Missing required environment variables");
  }

  const cookieHeader = `NID_SES=${CHZZK_NID_SES}; NID_AUT=${CHZZK_NID_AUT}`;

  const response = await fetch(`${BASE_URL}${video_no}`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    const bodyText = await response.text().catch(() => "");
    throw new Error(
      `Failed to fetch video info: ${response.status} ${bodyText}`
    );
  }

  const { content }: VodApiResponse = await response.json();

  const videoId = content?.videoId;

  if (!videoId) {
    throw new Error("videoId not found in response");
  }

  return videoId;
};

export default getVideoInfo;
