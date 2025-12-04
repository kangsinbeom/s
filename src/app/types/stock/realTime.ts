import { StockData, TradeHistoryData } from "./stock";

export type RealTimeData = Omit<StockData, "st_id"> & TradeHistoryData;
