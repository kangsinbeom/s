import { NextRequest, NextResponse } from "next/server";
import { instance } from "../instance";
import {
  hasApprovalAndAccessToken,
  setAuthCookies,
} from "@/app/libs/stock/auth";
import { SocketResponse, TokenResponse } from "@/app/types/stock/auth";

export const POST = async (req: NextRequest) => {
  /**
   * 나중에 둘 중 하나가 없는 경우에 없는 요청을 새롭게 반복하는 구문이 필요함.
   */
  const hasAuth = hasApprovalAndAccessToken(req);

  if (hasAuth) {
    return NextResponse.json({ message: "토큰이랑 키 있음" });
  }

  const [access_token, approval_key] = await Promise.all([
    // 토큰 받아오기
    instance<TokenResponse>("/oauth2/tokenP", {
      method: "POST",
      body: JSON.stringify({
        grant_type: "client_credentials",
        appkey: process.env.NEXT_PUBLIC_KIS_APP_KEY,
        appsecret: process.env.NEXT_PUBLIC_KIS_APP_SECRET,
      }),
    }).then((res) => res.access_token),

    // 웹소켓 시 사용될 키 받아오기
    instance<SocketResponse>("/oauth2/Approval", {
      method: "POST",
      body: JSON.stringify({
        grant_type: "client_credentials",
        appkey: process.env.NEXT_PUBLIC_KIS_APP_KEY,
        secretkey: process.env.NEXT_PUBLIC_KIS_APP_SECRET,
      }),
    }).then((res) => res.approval_key),
  ]);

  //   set Token and socket key
  const response: NextResponse<{ message: string }> = NextResponse.json({
    message: "저장 완료",
  });
  /**
   * 이거 나중에 합쳐야하는데..
   */
  setAuthCookies(response, {
    name: "access_token",
    value: access_token,
  });
  setAuthCookies(response, {
    name: "approval_key",
    value: approval_key,
  });

  return response;
};
