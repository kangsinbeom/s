import { NextRequest, NextResponse } from "next/server";
import { fetchStockData, getStockParams } from "./utils";
import { tr_keys } from "@/app/utils/tr_keys";
import { getAuthCookies } from "@/app/libs/stock/auth";

export const GET = async (req: NextRequest) => {
  const access_token = getAuthCookies("access_token", req) as string;
  const params = getStockParams(tr_keys);
  const stockPromises = params.map((params) =>
    fetchStockData({ access_token, params })
  );
  try {
    const data = await Promise.all(stockPromises);
    return NextResponse.json(data); // 파싱된 JSON만 반환
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
};
