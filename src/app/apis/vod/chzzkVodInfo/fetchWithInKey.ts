import { getParsedXmlVodInfoUrl } from "@/app/libs/chzzk/getParsedXmlVodInfoUrl";
import getVodUrl from "@/app/libs/vod/getVodUrl";
import { parseStringPromise } from "xml2js";

interface fetchWithInKeyParams {
  videoId: string;
  inKey: string;
  NID_AUT: string;
  NID_SES: string;
}

export const fetchWithInKey = async ({
  videoId,
  inKey,
  NID_AUT,
  NID_SES,
}: fetchWithInKeyParams) => {
  const videoUrl = `${process.env.CHZZK_STREAM_URL}${videoId}?key=${inKey}`;

  try {
    const xmlText = await fetch(videoUrl, {
      headers: {
        Accept: "application/dash+xml",
        Cookie: `NID_SES=${NID_SES}; NID_AUT=${NID_AUT};`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
    }).then((res) => res.text());
    const parsedXml = await parseStringPromise(xmlText);
    return getVodUrl(parsedXml);
  } catch (error) {
    throw new Error("Network error while fetching DASH manifest");
  }
};
