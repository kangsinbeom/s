import { getAuthCookies } from "@/app/libs/stock/auth";
import { getStockHeaders } from "@/app/libs/stock/getStockHeaders";
import { NextRequest, NextResponse } from "next/server";
import { stockInstance } from "../instance";
import { ExternalPeriodStockResponse } from "@/app/types/external/response/stock";
import { PeriodStockInfoResponse } from "@/app/types/bff/response/stock";
import { getPriceRange } from "@/app/libs/stock/getPriceRange";

export const GET = async (req: NextRequest) => {
  const access_token = getAuthCookies("access_token", req) as string;
  const headers = getStockHeaders({ access_token, tr_id: "FHKST03010100" });
  const queryString = new URLSearchParams({
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: "005930",
    FID_INPUT_DATE_1: "20251112",
    FID_INPUT_DATE_2: "20251215",
    FID_PERIOD_DIV_CODE: "D",
    FID_ORG_ADJ_PRC: "1",
  }).toString();
  try {
    const res = await stockInstance<ExternalPeriodStockResponse>(
      `/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice?${queryString}`,
      {
        headers,
      }
    );
    const { output2 } = res;
    const stocks = output2.map((stock) => ({
      date: new Date(stock.stck_bsop_date),
      close: Number(stock.stck_clpr),
      open: Number(stock.stck_oprc),
      high: Number(stock.stck_hgpr),
      low: Number(stock.stck_lwpr),
    }));
    const minAndMax = getPriceRange(stocks);
    console.log(minAndMax, "-------------------------");
    return NextResponse.json<PeriodStockInfoResponse>({ ...minAndMax, stocks });
  } catch (error) {
    console.error("Error fetching test data:", error);
    return NextResponse.json(
      { error: "Failed to fetch test data" },
      { status: 500 }
    );
  }
};
