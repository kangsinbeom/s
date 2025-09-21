import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 1️⃣ 모든 쿠키 가져오기
  const cookies = req.cookies;

  // 2️⃣ 특정 쿠키 가져오기
  const nidSes = cookies.get("NID_SES")?.value;
  const nidAut = cookies.get("NID_AUT")?.value;

  console.log("NID_SES:", nidSes);
  console.log("NID_AUT:", nidAut);

  return NextResponse.json({
    message: "Test API is working!",
    cookies: { NID_SES: nidSes, NID_AUT: nidAut },
  });
}
