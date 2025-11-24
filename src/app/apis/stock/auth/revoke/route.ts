import { deleteToken, getAuthCookies } from "@/app/libs/stock/auth";
import { instance } from "../../instance";
import { NextRequest, NextResponse } from "next/server";
import { TokenRevokeResponse } from "@/app/types/stock/auth";

export const POST = async (req: NextRequest) => {
  const access_token = getAuthCookies("access_token", req);
  const res = instance<TokenRevokeResponse>("/oauth2/revokeP", {
    method: "POST",
    body: JSON.stringify({
      appkey: process.env.NEXT_PUBLIC_KIS_APP_KEY,
      appsecret: process.env.NEXT_PUBLIC_KIS_APP_SECRET,
      token: access_token,
    }),
  });

  const response: NextResponse = NextResponse.json(res);
  deleteToken(response);

  return response;
};
