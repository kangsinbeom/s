import { getParsedXmlVodInfoUrl } from "@/app/libs/chzzk/getParsedXmlVodInfoUrl";
import getVodUrl from "@/app/libs/vod/getVodUrl";

interface fetchWithInKeyParams {
  video_no: string;
  inKey: string;
  NID_AUT: string;
  NID_SES: string;
}

export const fetchWithInKey = async ({
  video_no,
  inKey,
  NID_AUT,
  NID_SES,
}: fetchWithInKeyParams) => {
  const videoUrl = `${process.env.CHZZK_STREAM_URL}${video_no}?key=${inKey}`;
  const parsedXml = await getParsedXmlVodInfoUrl({
    videoUrl,
    NID_AUT,
    NID_SES,
  });
  let src = getVodUrl(parsedXml);
  return src;
};
