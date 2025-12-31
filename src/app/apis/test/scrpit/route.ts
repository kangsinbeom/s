import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const cookieStorage = await cookies();
  const access_token = cookieStorage.get("access_token")?.value;

  if (!access_token) {
    throw new Error("No access token");
    // 이거 재발급하는 로직으로 바꿔야 함
  }

  try {
    const res = await fetch("http://localhost:8000/stock/recommend", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    return NextResponse.json({ message: "test 실패!" });
  }
  return NextResponse.json({ message: "test 성공!" });
};
