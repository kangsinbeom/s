import { createStore } from "zustand";
import { StockData } from "../types/stock/stock";

export interface StockItemsState {
  stockItems: StockData[];
  updateStockItems: (data: Omit<StockData, "st_id">) => void;
}

export const createStockItemsStore = (initState: StockData[]) => {
  return createStore<StockItemsState>()((set) => ({
    stockItems: initState,
    updateStockItems: (item) =>
      set((state) => ({
        stockItems: state.stockItems.map((data) =>
          data.code === item.code ? { ...data, ...item } : data
        ),
      })),
  }));
};
