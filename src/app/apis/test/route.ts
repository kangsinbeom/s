import { getAuthCookies } from "@/app/libs/stock/auth";
import { getStockHeaders } from "@/app/libs/stock/getStockHeaders";
import { NextRequest, NextResponse } from "next/server";
import { stockInstance } from "../instance";
import { ExternalPeriodStockResponse } from "@/app/types/external/response/stock";
import { PeriodStockInfoResponse } from "@/app/types/bff/response/stock";
import { getPriceRange } from "@/app/libs/stock/getPriceRange";
import {
  formatDateToYYYYMMDD,
  formatYYYYMMDDToDate,
} from "@/app/libs/utils/date";

export const getInputDates = (today: Date) => {
  const date_2 = new Date(today);
  date_2.setDate(today.getDate() - 90);
  return {
    date_1: formatDateToYYYYMMDD(date_2),
    date_2: formatDateToYYYYMMDD(today),
  };
};

export const GET = async (req: NextRequest) => {
  const access_token = getAuthCookies("access_token", req) as string;
  const today = new Date();
  const { date_1, date_2 } = getInputDates(today);
  const headers = getStockHeaders({ access_token, tr_id: "FHKST03010100" });

  const queryString = new URLSearchParams({
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: "005930",
    FID_INPUT_DATE_1: date_1,
    FID_INPUT_DATE_2: date_2,
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
    const {
      output2,
      output1: { prdy_vrss, prdy_ctrt, hts_kor_isnm, stck_prpr, prdy_vol },
    } = res;

    const stocks = output2.map((stock) => ({
      date: formatYYYYMMDDToDate(stock.stck_bsop_date),
      close: Number(stock.stck_clpr),
      open: Number(stock.stck_oprc),
      high: Number(stock.stck_hgpr),
      low: Number(stock.stck_lwpr),
    }));
    const minAndMax = getPriceRange(stocks);
    const reversedStocks = stocks.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    const response: PeriodStockInfoResponse = {
      ...minAndMax,
      stocks: reversedStocks,
      stockName: hts_kor_isnm,
      volume: Number(prdy_vol),
      changeRate: Number(prdy_ctrt),
      changePrice: Number(prdy_vrss),
      currentPrice: Number(stck_prpr),
    };

    return NextResponse.json<PeriodStockInfoResponse>(response);
  } catch (error) {
    console.error("Error fetching test data:", error);
    return NextResponse.json(
      { error: "Failed to fetch test data" },
      { status: 500 }
    );
  }
};

// 주식 이름, 거래량, 전일 대비 가격 상승률, 상승 가격, 시가, 고가, 종가, 저가
