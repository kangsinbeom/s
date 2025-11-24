import { getAuthCookies } from "@/app/libs/stock/auth";
import { RealTimeData } from "@/app/types/stock/realTime";
import { NextRequest } from "next/server";

export const isJsonString = (data: string) => {
  try {
    const parsedDate = JSON.parse(data);
    return parsedDate && typeof parsedDate === "object";
  } catch {
    return false;
  }
};

export const getWsData = (string: string): RealTimeData => {
  const parsedData = string.split("^").slice(0, 46);
  const code = parsedData[0].split("|")[3];
  const realTimeData: RealTimeData = {
    code,
    tradeTime: parsedData[1], // STCK_CNTG_HOUR
    currentPrice: +parsedData[2], // STCK_PRPR
    change: +parsedData[4], // PRDY_VRSS
    rate_of_change: +parsedData[5],
    currnetTradeVolume: +parsedData[12], //CNTG_VOL
    totalTradeVolume: +parsedData[14], // ACML_TR_PBMN
  };

  return realTimeData;
};

export const getDvWsData = (string: string) => {
  const parsedData = string.split("^").slice(0, 46);
  const [, category, , code] = parsedData[0].split("|");
  switch (category) {
    case "H0STCNT0": // 실시간 체결가
      return {
        code,
        tradeTime: parsedData[1], // STCK_CNTG_HOUR
        currentPrice: +parsedData[2], // STCK_PRPR
        change: +parsedData[4], // PRDY_VRSS
        rate_of_change: +parsedData[5],
        currnetTradeVolume: +parsedData[12], //CNTG_VOL
        totalTradeVolume: +parsedData[14], // ACML_TR_PBMN
      };
    case "H0STASP0": // 실시간 호가
      return;
  }
  const realTimeData: RealTimeData = {
    code,
    tradeTime: parsedData[1], // STCK_CNTG_HOUR
    currentPrice: +parsedData[2], // STCK_PRPR
    change: +parsedData[4], // PRDY_VRSS
    rate_of_change: +parsedData[5],
    currnetTradeVolume: +parsedData[12], //CNTG_VOL
    totalTradeVolume: +parsedData[14], // ACML_TR_PBMN
  };

  return realTimeData;
};

interface GetReqInfoParams {
  req: NextRequest;
  tr_id: "H0STCNT0" | "H0STASP0";
  keys: string[] | string;
  tr_type?: "1" | "2";
}

export const getReqInfo = ({
  req,
  tr_id,
  keys,
  tr_type = "1",
}: GetReqInfoParams) => {
  const approval_key = getAuthCookies("approval_key", req);
  if (Array.isArray(keys)) {
    return keys.map((tr_key) =>
      JSON.stringify({
        header: {
          approval_key,
          custtype: "P", // 개인 고객
          tr_type: "1", // 등록 타입 (예: 1)
          "content-type": "utf-8", // 콘텐츠 타입
        },
        body: {
          input: {
            tr_id, // 실제 트랜잭션 ID 값
            tr_key, // 실제 구분값 (예: 종목 코드)
          },
        },
      })
    );
  } else {
    return JSON.stringify({
      header: {
        approval_key,
        custtype: "P", // 개인 고객
        tr_type, // 등록 타입 (예: 1)
        "content-type": "utf-8", // 콘텐츠 타입
      },
      body: {
        input: {
          tr_id, // 실제 트랜잭션 ID 값
          tr_key: keys, // 실제 구분값 (예: 종목 코드)
        },
      },
    });
  }
};
