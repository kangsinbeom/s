// app/api/proxy/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get("url");
  if (!url) return NextResponse.json({ error: "No URL" }, { status: 400 });

  try {
    const res = await fetch(url);
    const blob = await res.arrayBuffer();
    return new Response(blob, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
