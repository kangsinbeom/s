import { VodApiResponse, VodContent } from "@/app/types/external/response/vod";

const BASE_URL = process.env.CHZZK_VOD_INFO;

interface getVideoInfoParams {
  video_no: string;
  NID_AUT: string;
  NID_SES: string;
}

// videoInfo 가져오기 API
export const getVideoInfo = async ({
  video_no,
  NID_AUT,
  NID_SES,
}: getVideoInfoParams): Promise<VodContent> => {
  try {
    const response = await fetch(`${BASE_URL}${video_no}`, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        Cookie: `NID_SES=${NID_SES}; NID_AUT=${NID_AUT}`,
      },
    });
    const { content }: VodApiResponse = await response.json();

    return content;
  } catch (error) {
    throw new Error("Network error while fetching video info");
  }
};
export default getVideoInfo;
