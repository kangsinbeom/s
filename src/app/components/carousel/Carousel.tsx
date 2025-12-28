"use client";

import { useEffect, useRef, useState } from "react";
import StockIBannerItem from "./StockBannerItem";
import CarouselButton from "./CarouselButton";
import { useCarouselStore } from "@/app/stores/store-providers/carousel-store-provider";
import { getExtendedItems } from "@/app/libs/carousel/getExtendedItems";
import clsx from "clsx";

export interface CarouselItem {
  name: string;
  number: string;
  percent: number;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel = ({ items }: CarouselProps) => {
  const {
    moveToNextPage,
    moveToPrevPage,
    MoveToNextStep,
    setIsHoverd,
    index,
    autoPlay,
    slideInterval,
    viewCount,
    itemSize,
    isTransitionEnabled,
    visibleButtons,
  } = useCarouselStore((state) => state);
  const extendedItems = getExtendedItems({ items, viewCount });
  const transformStyles = isTransitionEnabled
    ? "transition-transform duration-500 ease-in-out"
    : "";
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      MoveToNextStep();
    }, slideInterval * 1000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <div
      className="relative flex items-center w-[999px] z-0"
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
    >
      <div className="overflow-hidden rounded-xl">
        <ul
          className={clsx("flex min-w-[600px]", transformStyles)}
          style={{
            transform: `translateX(-${index * itemSize}px)`,
          }}
        >
          {extendedItems.map((item, index) => (
            <StockIBannerItem key={index} {...item} />
          ))}
        </ul>
      </div>
      <CarouselButton
        visible={visibleButtons}
        direction="left"
        onClick={moveToPrevPage}
      />
      <CarouselButton visible={visibleButtons} onClick={moveToNextPage} />
    </div>
  );
};

export default Carousel;
