import fs from "fs";
import { parseStringPromise } from "xml2js";

const CHZZK_NID_SES = process.env.CHZZK_NID_SES;
const CHZZK_NID_AUT = process.env.CHZZK_NID_AUT;

export async function getDashBaseUrl(videoUrl: string) {
  const cookieHeader = `NID_SES=${CHZZK_NID_SES}; NID_AUT=${CHZZK_NID_AUT}`;
  const res = await fetch(videoUrl, {
    headers: {
      Accept: "application/dash+xml",
      Cookie: cookieHeader,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    },
  });
  console.log("DASH manifest fetched successfully", res);

  if (!res.ok) throw new Error(`Failed to fetch DASH manifest: ${res.status}`);
  const xmlText = await res.text();

  const parsedXml = await parseStringPromise(xmlText);
  // DASH에서 BaseURL 추출
  const baseUrl =
    parsedXml?.MPD?.Period?.[0]?.AdaptationSet?.[0]?.Representation?.[0]
      ?.BaseURL?.[0];

  if (!baseUrl) throw new Error("BaseURL not found in DASH manifest");

  return baseUrl;
}
