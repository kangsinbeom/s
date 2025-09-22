// src/app/apis/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import getAuthCookies from "@/app/libs/utils/getAuthCookies";

export async function GET(req: NextRequest) {
  const hlsUrl = req.nextUrl.searchParams.get("url");
  if (!hlsUrl)
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  const { NID_AUT, NID_SES } = getAuthCookies(req);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vod-"));
  const outputFile = path.join(tmpDir, "video.mp4");

  try {
    // FFmpeg 명령어
    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-y",
        "-headers",
        `Cookie: NID_SES=${NID_AUT}; NID_AUT=${NID_SES}\r\n`,
        "-i",
        hlsUrl,
        "-c",
        "copy",
        "-bsf:a",
        "aac_adtstoasc", // HLS fMP4 변환 안정화 옵션
        outputFile,
      ]);

      ffmpeg.stderr.on("data", (data) => {
        console.log(data.toString());
      });

      ffmpeg.on("error", (err) => reject(err));
      ffmpeg.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`FFmpeg exited with code ${code}`));
      });
    });

    // MP4 반환
    const fileBuffer = fs.readFileSync(outputFile);

    // 임시 파일 제거
    fs.unlinkSync(outputFile);
    fs.rmdirSync(tmpDir);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": 'attachment; filename="video.mp4"',
      },
    });
  } catch (err) {
    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
    if (fs.existsSync(tmpDir)) fs.rmdirSync(tmpDir);
    console.error(err);
    return NextResponse.json(
      { error: "Failed to download video" },
      { status: 500 }
    );
  }
}
