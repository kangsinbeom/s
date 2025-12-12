import { fetchStockData, getStockParams } from "@/app/apis/stock/stock/utils";
import { RealTimeData } from "@/app/types/stock/realTime";
import { StockData, TradeHistoryData } from "@/app/types/stock/stock";
import { tr_keys } from "@/app/utils/tr_keys";

export const getStockData = async (
  access_token: string
): Promise<StockData[]> => {
  const stockParamsList = getStockParams(tr_keys);

  const Promises = stockParamsList.map((params) =>
    fetchStockData({ access_token, params })
  );

  try {
    return Promise.all(Promises);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return [];
  }
};

export const toStockData = (data: RealTimeData): Omit<StockData, "st_id"> => {
  const { code, change, currentPrice, rate_of_change, totalTradeVolume } = data;
  return { code, change, currentPrice, rate_of_change, totalTradeVolume };
};

export const toTradeHistoryData = (data: RealTimeData): TradeHistoryData => {
  const { currentPrice, currnetTradeVolume, tradeTime } = data;
  return { currentPrice, currnetTradeVolume, tradeTime };
};
