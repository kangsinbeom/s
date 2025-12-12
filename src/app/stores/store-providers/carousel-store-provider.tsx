"use client";

import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { CarouselStore, createCarouselStore } from "../carousel";
import { useStore } from "zustand";

type CarouselStoreApi = ReturnType<typeof createCarouselStore>;

const CarouselStoreContext = createContext<CarouselStoreApi | undefined>(
  undefined
);

export const CarouselStoreProvider = ({ children }: PropsWithChildren) => {
  const carouselRef = useRef<CarouselStoreApi>(null);
  if (carouselRef.current === null) carouselRef.current = createCarouselStore();

  return (
    <CarouselStoreContext.Provider value={carouselRef.current}>
      {children}
    </CarouselStoreContext.Provider>
  );
};

export const useCarouselStore = <T,>(
  selector: (store: CarouselStore) => T
): T => {
  const carouselStoreContext = useContext(CarouselStoreContext);
  if (!carouselStoreContext)
    throw new Error(
      `useCounterStore must be used within CarouselStoreProvider`
    );
  return useStore(carouselStoreContext, selector);
};
