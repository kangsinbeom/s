// src/app/apis/chzzkUserInfo/route.ts

import getAuthCookies from "@/app/libs/utils/getAuthCookies";
import { ChzzkUserInfoResponse } from "@/app/types/external/response/user";
import { NextRequest, NextResponse } from "next/server";

// 🍪 쿠키 삭제 헬퍼
function clearAuthCookies(res: NextResponse) {
  res.cookies.set("NID_SES", "", { path: "/", maxAge: 0 });
  res.cookies.set("NID_AUT", "", { path: "/", maxAge: 0 });
  return res;
}

export async function GET(req: NextRequest) {
  try {
    const { NID_AUT, NID_SES } = getAuthCookies(req);

    const res = await fetch(
      "https://comm-api.game.naver.com/nng_main/v1/user/getUserStatus",
      {
        method: "GET",
        headers: {
          Cookie: `NID_AUT=${NID_AUT}; NID_SES=${NID_SES}`,
        },
      }
    );
    const data: ChzzkUserInfoResponse = await res.json();
    console.log(data);
    if (!data.content.loggedIn) throw new Error("유저 정보 받아오기 실패");

    return NextResponse.json({
      message: "유저정보 받아오기 성공",
      data: data.content,
    });
  } catch (err) {
    // return clearAuthCookies(
    //   // NextResponse.json({ error: "유저 정보 받아오기 실패" }, { status: 400 })
    //   NextResponse.json(
    //     {
    //       // message: "유저정보 받아오기 실패",
    //       error: "유저정보 받아오기 실패",
    //     },
    //     { status: 400 }
    //   )
    // );
    return NextResponse.json(
      {
        // message: "유저정보 받아오기 실패",
        message: "유저정보 받아오기 실패",
      },
      { status: 400 }
    );
  }
}
