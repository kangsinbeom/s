import { NextRequest, NextResponse } from "next/server";

// token과 socket key의 유무를 확인하는 함수
export const hasApprovalAndAccessToken = (req: NextRequest) => {
  const access_token = req.cookies.get("access_token")?.value;
  const approval_key = req.cookies.get("approval_key")?.value;
  return !!(access_token && approval_key);
};

// token과 key를 가져오는 함수
export const getAuthCookies = (name: string, req: NextRequest) => {
  const value = req.cookies.get(name)?.value;
  const { searchParams } = new URL(req.url);
  if (value) return value;
  else return searchParams.get(name);
};

// token과 socket key의 cookie에 넣는 함수
export const setAuthCookies = (
  response: NextResponse<{ message: string }>,
  { name, value }: { name: string; value: string },
) =>
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1일 유효
  });

export const deleteToken = (response: NextResponse) =>
  response.cookies.delete("access_token");
