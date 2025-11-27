import { VideoApiResponse } from "@/app/types/bff/response/video";

const base_url = process.env.NEXT_PUBLIC_DEV_URL;

export const fetchVodInfo = async (video_no: string) => {
  try {
    const res = await fetch(`/apis/chzzkVodInfo?videoNo=${video_no}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data: VideoApiResponse = await res.json();

    if (typeof window !== "undefined") {
      sessionStorage.setItem("storedSrc", JSON.stringify(data.src));
      sessionStorage.setItem("storedType", JSON.stringify(data.type));
    }

    return data;
  } catch (error) {
    throw new Error("Error fetching video info:" + error);
  }
};

// 서버에서 다루는 prefetch func
export const fetchVodInfoWithCookies = async (
  video_no: string,
  cookies: string
) => {
  try {
    const res = await fetch(
      `${base_url}/apis/chzzkVodInfo?videoNo=${video_no}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", Cookie: cookies },
        credentials: "include", // 쿠키 포함
      }
    );
    const data: VideoApiResponse = await res.json();

    return data;
  } catch (error) {
    throw new Error("Error fetching video info:" + error);
  }
};
