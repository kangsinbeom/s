"use client";

import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createTradeHistoriesStore,
  TradeHistoryState,
} from "../stores/tradeHistory";
import { TradeHistoryData } from "../types/stock/stock";

type TradeHistoryStoreApi = ReturnType<typeof createTradeHistoriesStore>;

const TradeHistoryStoreContext = createContext<TradeHistoryStoreApi | null>(
  null
);

export const TradeHistoryStoreProvider = ({
  initalTradeHistories,
  children,
}: PropsWithChildren<{ initalTradeHistories: TradeHistoryData[] }>) => {
  const storeRef = useRef<TradeHistoryStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createTradeHistoriesStore(initalTradeHistories);
  }
  return (
    <TradeHistoryStoreContext.Provider value={storeRef.current}>
      {children}
    </TradeHistoryStoreContext.Provider>
  );
};

export const useTradeHistoryStore = <T,>(
  selector: (store: TradeHistoryState) => T
): T => {
  const tradeHistoryStoreContext = useContext(TradeHistoryStoreContext);
  if (!tradeHistoryStoreContext)
    throw new Error(
      `stockItemsStoreContext must be used within CounterStoreProvider`
    );
  return useStore(tradeHistoryStoreContext, selector);
};
