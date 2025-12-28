import { NextRequest } from "next/server";
import getAuthCookies from "../utils/getAuthCookies";

interface ChzzkAuthRequestHeaders extends Record<string, string> {
  "User-Agent": string;
  Origin: string;
  Referer: string;
  Cookie: string;
}

export const getChzzkAuthHeaders = (
  req: NextRequest
): ChzzkAuthRequestHeaders => {
  const USER_AGENT =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36";
  const CHZZK_ORIGIN = "https://chzzk.naver.com";
  const CHZZK_REFERER = "https://chzzk.naver.com/";
  const { NID_AUT, NID_SES } = getAuthCookies(req);
  return {
    "User-Agent": USER_AGENT,
    Origin: CHZZK_ORIGIN,
    Referer: CHZZK_REFERER,
    Cookie: `NID_AUT=${NID_AUT}; NID_SES=${NID_SES};`,

    // API에 따라 필요할 수 있는 공통 헤더 이거 필요없으면 제거하자
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };
};
