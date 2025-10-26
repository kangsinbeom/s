import { parseStringPromise } from "xml2js";

interface getParsedXmlVodInfoUrlParams {
  videoUrl: string;
  NID_AUT: string;
  NID_SES: string;
}

export async function getParsedXmlVodInfoUrl({
  NID_AUT,
  NID_SES,
  videoUrl,
}: getParsedXmlVodInfoUrlParams) {
  try {
    const xmlText = await fetch(videoUrl, {
      headers: {
        Accept: "application/dash+xml",
        Cookie: `NID_SES=${NID_SES}; NID_AUT=${NID_AUT}`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
    }).then((res) => res.text());

    return parseStringPromise(xmlText);
  } catch (error) {
    throw new Error("Network error while fetching DASH manifest");
  }
}
