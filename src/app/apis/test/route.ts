import getAuthCookies from "@/app/libs/utils/getAuthCookies";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = "https://comm-api.game.naver.com/nng_main/v1/user/getUserStatus";
  const { NID_AUT, NID_SES } = getAuthCookies(req);
  const cookies = req.headers.get("cookie") ?? "";

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      Cookie: cookies,
    },
  });

  const data = await res.json();
  console.log(data);

  return new Response(JSON.stringify({ message: "Test API is working!" }));
};
