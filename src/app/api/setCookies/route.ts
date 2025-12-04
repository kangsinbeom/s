import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { NID_AUT, NID_SES } = await req.json();
  const cookiesHeader = await cookies();
  cookiesHeader.set("NID_SES", NID_SES, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  cookiesHeader.set("NID_AUT", NID_AUT, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  return new Response("Cookies set successfully", { status: 200 });
};
