// src/app/apis/chzzkUserInfo/route.ts
import { ChzzkUserInfoResponse } from "@/app/types/external/response/user";
import { NextRequest, NextResponse } from "next/server";

// 🍪 쿠키 삭제 헬퍼
function clearAuthCookies(res: NextResponse) {
  res.cookies.set("NID_SES", "", { path: "/", maxAge: 0 });
  res.cookies.set("NID_AUT", "", { path: "/", maxAge: 0 });
  return res;
}

export async function GET(req: NextRequest) {
  const cookies = req.headers.get("cookie") ?? "";

  try {
    const res = await fetch(
      "https://comm-api.game.naver.com/nng_main/v1/user/getUserStatus",
      {
        method: "GET",
        headers: {
          Cookie: cookies,
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          Origin: "https://chzzk.naver.com",
          Referer: "https://chzzk.naver.com/",
        },
      }
    );
    const data: ChzzkUserInfoResponse = await res.json();
    return NextResponse.json({
      message: "유저정보 받아오기 성공",
      data: data.content,
    });
  } catch (err) {
    console.error("유저정보 받아오기 실패", err);
    return clearAuthCookies(
      NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    );
  }
}
