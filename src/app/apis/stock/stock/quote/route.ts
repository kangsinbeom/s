import { NextRequest, NextResponse } from "next/server";
import { getAuthCookies } from "@/app/libs/stock/auth";
import { StockQuoteResponse } from "@/app/types/stock/stock";
import { stockInstance } from "@/app/apis/instance";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const access_token = getAuthCookies("access_token", req);
  const code = searchParams.get("code") as string;

  const queryString = new URLSearchParams({
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: "005930",
  }).toString();

  const res = await stockInstance<StockQuoteResponse>(
    `/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn?${queryString}`,
    {
      headers: {
        authorization: `Bearer ${access_token}`,
        appkey: process.env.NEXT_PUBLIC_KIS_APP_KEY as string,
        appsecret: process.env.NEXT_PUBLIC_KIS_APP_SECRET as string,
        tr_id: "FHKST01010200",
        custtype: "P", // 개인: 'P', 법인: 'B'
      },
    }
  );

  return NextResponse.json(res);
};
