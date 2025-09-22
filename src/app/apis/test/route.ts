import { hlsToMp4 } from "@/app/libs/utils/hlsToMp4";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 1️⃣ 모든 쿠키 가져오기
    const cookies = req.cookies;

    // 2️⃣ 특정 쿠키 가져오기
    const nidSes = cookies.get("NID_SES")?.value;
    const nidAut = cookies.get("NID_AUT")?.value;

    if (!nidSes || !nidAut) {
      return NextResponse.json(
        {
          success: false,
          message: "Required cookies are missing.",
        },
        { status: 400 }
      );
    }
    const cookiesA = {
      NID_SES: nidSes,
      NID_AUT: nidAut,
    };
    const outputFile = "./vod.mp4";

    const filePath = await hlsToMp4(
      "https://ex-nlive-slitvod-streaming.navercdn.com/chzzk/kr/live_rewind/c/live_rewind_kr/brk47tgygq0i42rbijjpk6sfmjysrr/vod_playlist.m3u8?hdnts=st=1758509226~exp=1758570436~acl=*/kr/*~hmac=47ba687182f9b8f702219b675a7e9442f3934d85175cec2d7da694c2c7cea4d7",
      outputFile,
      cookiesA
    );
    return NextResponse.json({
      message: "Test API is working!",
      cookies: { NID_SES: nidSes, NID_AUT: nidAut },
      data: filePath,
    });
  } catch (e) {
    return NextResponse.error();
  }
}
