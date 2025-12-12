"use client";

import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { type TimeRageStore, createTimeRangeStore } from "../timeRange";
import { useStore } from "zustand";

type TimeRangeStoreApi = ReturnType<typeof createTimeRangeStore>;

const TimeRangeStoreContext = createContext<TimeRangeStoreApi | undefined>(
  undefined
);

export const TimeRangeStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<TimeRangeStoreApi | null>(null);
  if (storeRef.current === null) storeRef.current = createTimeRangeStore();

  return (
    <TimeRangeStoreContext.Provider value={storeRef.current}>
      {children}
    </TimeRangeStoreContext.Provider>
  );
};

export const useTimeRangeStore = <T,>(
  selector: (store: TimeRageStore) => T
): T => {
  const timeRangeStoreContext = useContext(TimeRangeStoreContext);
  if (!timeRangeStoreContext)
    throw new Error(
      `useCounterStore must be used within TimeRangeStoreProvider`
    );
  return useStore(timeRangeStoreContext, selector);
};
