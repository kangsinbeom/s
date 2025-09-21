// src/app/apis/chzzkUserInfo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ChzzkUserInfoResponse } from "@/app/types/external/chzzk/user";

// 🍪 쿠키 삭제 헬퍼
function clearAuthCookies(res: NextResponse) {
  res.cookies.set("NID_SES", "", { path: "/", maxAge: 0 });
  res.cookies.set("NID_AUT", "", { path: "/", maxAge: 0 });
  return res;
}

export async function GET(req: NextRequest) {
  const nidSes = req.cookies.get("NID_SES")?.value;
  const nidAut = req.cookies.get("NID_AUT")?.value;

  if (!nidSes || !nidAut) {
    // 쿠키 없을 때 바로 권한 해제
    return clearAuthCookies(
      NextResponse.json(
        { error: "Required cookies not found" },
        { status: 401 }
      )
    );
  }

  try {
    const res = await fetch(
      "https://comm-api.game.naver.com/nng_main/v1/user/getUserStatus",
      {
        method: "GET",
        headers: {
          Cookie: `NID_SES=${nidSes}; NID_AUT=${nidAut}`,
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          Origin: "https://chzzk.naver.com",
          Referer: "https://chzzk.naver.com/",
        },
      }
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return clearAuthCookies(
        NextResponse.json(
          {
            error: "External API request failed",
            status: res.status,
            body: text,
          },
          { status: 401 } // 권한 해제
        )
      );
    }

    const data: ChzzkUserInfoResponse = await res.json();
    console.log("Chzzk User Info API Response:", data);
    return NextResponse.json({
      message: "API 호출 성공",
      data: data.content,
    });
  } catch (err) {
    console.error("Internal Error:", err);
    return clearAuthCookies(
      NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    );
  }
}
