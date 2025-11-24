import { NextRequest, NextResponse } from "next/server";
import { instance } from "../instance";
import { TradeHistoryResponse } from "@/types/stock";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const access_token =
    searchParams.get("access_token") ?? req.cookies.get("access_token")?.value;
  const code = searchParams.get("code") as string;

  const queryString = new URLSearchParams({
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: code,
  }).toString();

  const res = await instance<TradeHistoryResponse>(
    `/uapi/domestic-stock/v1/quotations/inquire-ccnl?${queryString}`,
    {
      headers: {
        authorization: `Bearer ${access_token}`,
        appkey: process.env.NEXT_PUBLIC_KIS_APP_KEY as string,
        appsecret: process.env.NEXT_PUBLIC_KIS_APP_SECRET as string,
        tr_id: "FHKST01010300",
        custtype: "P", // 개인: 'P', 법인: 'B'
      },
    },
  ).then((res) =>
    res.output.map((data) => ({
      currentPrice: +data.stck_prpr,
      tradeTime: data.stck_cntg_hour,
      currnetTradeVolume: +data.cntg_vol,
    })),
  );
  return NextResponse.json(res);
};
