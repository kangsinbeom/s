"use client";

import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createStockItemsStore, StockItemsState } from "../stores/stock";
import { StockData } from "../types/stock/stock";

type StockItemsStoreApi = ReturnType<typeof createStockItemsStore>;

const StockItemsStoreContext = createContext<StockItemsStoreApi | null>(null);

export const StockItemsStoreProvider = ({
  children,
  initalStockItems,
}: PropsWithChildren<{ initalStockItems: StockData[] }>) => {
  const storeRef = useRef<StockItemsStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createStockItemsStore(initalStockItems);
  }

  return (
    <StockItemsStoreContext.Provider value={storeRef.current}>
      {children}
    </StockItemsStoreContext.Provider>
  );
};

export const useStockItemsStore = <T,>(
  selector: (store: StockItemsState) => T
): T => {
  const stockItemsStoreContext = useContext(StockItemsStoreContext);
  if (!stockItemsStoreContext)
    throw new Error(
      `stockItemsStoreContext must be used within CounterStoreProvider`
    );
  return useStore(stockItemsStoreContext, selector);
};
