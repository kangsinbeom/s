import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    //   const videoRes = await fetch(baseUrl, {
    //   headers: {
    //     Cookie: cookieHeader,
    //     "User-Agent":
    //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    //   },
    // });
    // if (!videoRes.ok)
    //   throw new Error(`Failed to download video: ${videoRes.status}`);
    // // 스트리밍으로 쓰기
    // const fileStream = fs.createWriteStream("test1.mp4");
    // return new Promise<void>((resolve, reject) => {
    //   if (!videoRes.body) {
    //     reject(new Error("No response body"));
    //     return;
    //   }
    //   // Convert web ReadableStream to Node.js Readable stream
    //   const nodeStream = require("stream").Readable.fromWeb(videoRes.body as any);
    //   nodeStream.pipe(fileStream);
    //   nodeStream.on("error", reject);
    //   fileStream.on("finish", resolve);
    // });
  } catch (error) {
    console.error("BFF Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
