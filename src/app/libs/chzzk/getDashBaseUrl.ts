import { parseStringPromise } from "xml2js";

interface getDashBaseUrlParams {
  videoUrl: string;
  NID_AUT: string;
  NID_SES: string;
}

export async function getDashBaseUrl({
  NID_AUT,
  NID_SES,
  videoUrl,
}: getDashBaseUrlParams) {
  const res = await fetch(videoUrl, {
    headers: {
      Accept: "application/dash+xml",
      Cookie: `NID_SES=${NID_SES}; NID_AUT=${NID_AUT}`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch DASH manifest: ${res.status}`);
  const xmlText = await res.text();
  const parsedXml = await parseStringPromise(xmlText);
  console.log(
    parsedXml?.MPD?.Period?.[0]?.AdaptationSet?.[0]?.Representation?.map(
      (r: any) => ({
        id: r.$.id,
        width: r.$.width,
        height: r.$.height,
        bandwidth: r.$.bandwidth,
        baseUrl: r.BaseURL?.[0],
      })
    )
  );

  // DASH에서 BaseURL 추출
  const baseUrl =
    parsedXml?.MPD?.Period?.[0]?.AdaptationSet?.[0]?.Representation?.[0]
      ?.BaseURL?.[0];

  if (!baseUrl) throw new Error("BaseURL not found in DASH manifest");

  return baseUrl;
}
