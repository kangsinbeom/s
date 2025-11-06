import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 🔥 Python 백엔드로 요청 보내기
    const res = await fetch("http://localhost:8000/api/vod/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json({ message: "success", data });
  } catch (err: any) {
    console.error("Error calling backend:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
