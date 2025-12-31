import { NextRequest, NextResponse } from "next/server";

const getAuthCookies = (req: NextRequest) => {
  const NID_SES = req.cookies.get("NID_SES")?.value;
  const NID_AUT = req.cookies.get("NID_AUT")?.value;
  if (!NID_SES || !NID_AUT) {
    throw new Error("Missing authentication cookies");
  }
  return { NID_SES, NID_AUT };
};

export default getAuthCookies;
