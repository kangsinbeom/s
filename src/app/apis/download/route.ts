import { NextRequest, NextResponse } from "next/server";

const CHZZK_NID_SES = process.env.CHZZK_NID_SES;
const CHZZK_NID_AUT = process.env.CHZZK_NID_AUT;
const BASE_URL = process.env.CHZZK_VOD_INFO;

export async function POST(req: NextRequest) {
  try {
    // 1. body에서 video_no 추출
    const { video_no } = await req.json();

    if (!video_no || typeof video_no !== "string") {
      return NextResponse.json(
        { error: "video_no is required and must be a string" },
        { status: 400 }
      );
    }

    if (!CHZZK_NID_SES || !CHZZK_NID_AUT) {
      return NextResponse.json(
        { error: "Missing CHZZK_NID_* env variables" },
        { status: 500 }
      );
    }

    // 2. VOD INFO API 호출
    if (!CHZZK_NID_SES || !CHZZK_NID_AUT || !BASE_URL) {
      return NextResponse.json(
        { error: "Server misconfiguration: missing env variables" },
        { status: 500 }
      );
    }

    const url = `${BASE_URL.replace(/\/$/, "")}/${encodeURIComponent(
      video_no
    )}`;

    // 4️⃣ fetch 호출
    const cookieHeader = `NID_SES=${CHZZK_NID_SES}; NID_AUT=${CHZZK_NID_AUT}`;
    const response = await fetch(`${BASE_URL}${video_no}`, {
      method: "GET", // 외부 API 문서 확인
      headers: {
        Cookie: cookieHeader,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      const bodyText = await response.text().catch(() => "");
      console.error(
        "[BFF] upstream returned non-OK:",
        response.status,
        bodyText
      );
      return NextResponse.json(
        { error: "Upstream error", status: response.status, body: bodyText },
        { status: 502 }
      );
    }

    console.log("[BFF] VOD INFO:", data);

    return NextResponse.json({ message: "BFF is working!" });
  } catch (error) {
    console.error("BFF Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
