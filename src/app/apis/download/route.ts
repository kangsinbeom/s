// app/api/download/route.ts (Next.js API Route 예시)
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  // Python 스크립트 호출 (CLI 방식)
  exec(`python3 download.py "${url}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(stdout); // Python 스크립트 출력 확인
  });

  return NextResponse.json({ message: "다운로드 시작됨" });
}
