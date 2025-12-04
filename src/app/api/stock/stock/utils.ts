import { getFidInputHour } from "@/app/libs/stock/time";
import { instance } from "../instance";
import {
  StockData,
  TradeHistoryData,
  TradeHistoryResponse,
} from "@/app/types/stock/stock";
import { StockResponse } from "@/app/types/external/response/stock";

interface StockParams {
  FID_COND_MRKT_DIV_CODE: string;
  FID_INPUT_ISCD: string;
  FID_INPUT_HOUR_1?: string;
  FID_PW_DATA_INCU_YN?: string;
  FID_ETC_CLS_CODE?: string;
}

// tr_keys를 토대로 params를 retur하는 함수
export const getStockParams = (tr_keys: string[]): StockParams[] => {
  const FID_INPUT_HOUR_1 = getFidInputHour();

  return tr_keys.map((tr_key) => ({
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: tr_key,
    FID_INPUT_HOUR_1,
    FID_PW_DATA_INCU_YN: "N",
    FID_ETC_CLS_CODE: "",
  }));
};

export const getTradeHistoryParams = (code: string): StockParams => ({
  FID_COND_MRKT_DIV_CODE: "J",
  FID_INPUT_ISCD: code,
});

interface fetchStockDataParams {
  access_token: string;
  params: StockParams;
}

// 주식 데이터를 가져오는 함수
export const fetchStockData = async ({
  access_token,
  params,
}: fetchStockDataParams) => {
  const queryString = new URLSearchParams({
    ...params,
  }).toString();
  const res = await instance<StockResponse>(
    `/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice?${queryString}`,
    {
      headers: {
        authorization: `Bearer ${access_token}`,
        appkey: process.env.NEXT_PUBLIC_KIS_APP_KEY as string,
        appsecret: process.env.NEXT_PUBLIC_KIS_APP_SECRET as string,
        tr_id: "FHKST03010200",
        custtype: "P", // 개인: 'P', 법인: 'B'
      },
    }
  ).then(
    (res): StockData => ({
      code: params.FID_INPUT_ISCD,
      st_id: res.output1.hts_kor_isnm,
      currentPrice: +res.output1.stck_prpr,
      change: +res.output1.prdy_vrss,
      rate_of_change: +res.output1.prdy_ctrt,
      totalTradeVolume: +res.output1.acml_tr_pbmn,
    })
  );
  return res; // 주가 정보만 반환
};

// 체결 내역에 대한 데이터를 가져오는 함수
export const getTradeHistoryData = async (
  access_token: string,
  code: string
): Promise<TradeHistoryData[]> => {
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
    }
  ).then((res) =>
    res.output.map((data) => ({
      currentPrice: +data.stck_prpr,
      tradeTime: data.stck_cntg_hour,
      currnetTradeVolume: +data.cntg_vol,
    }))
  );
  return res;
};

/**
 * 
 * const queryString = new URLSearchParams({
    access_token,
    code: initalStockItems[0].code,
  }).toString();
  const res = await fetch(`${base_url}/api/tradehistory?${queryString}`);
  const initalTradeHistories = await res.json();

 */
