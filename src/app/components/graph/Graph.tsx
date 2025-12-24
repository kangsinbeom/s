"use client";

import { useEffect, useState } from "react";
import { GarphBar } from "./GarphBar";
import { PeriodStockInfoResponse } from "@/app/types/bff/response/stock";

const Graph = () => {
  const [stockInfo, setStockInfo] = useState<PeriodStockInfoResponse>();

  useEffect(() => {
    (async () => {
      const res = await fetchData();
      setStockInfo(res);
    })();
  }, []);
  const priceToY = createPriceScaler(3000, 15000, 300);
  // const list1 =  top과 bottom을 받아서 그 사이 값으로 8개를 뽑아내게 하려면 어떻게 해야하지?
  if (!stockInfo) return <div>Loading...</div>;

  const list1 = splitRange(stockInfo.min, stockInfo.max, 8);
  console.log(stockInfo.stocks[0]);
  return (
    <div className=" relative flex bg-amber-50 w-full min-w-[600px] h-[400px]">
      <ul className="bg-amber-300 absolute right-0 h-full pr-5 justify-between flex flex-col">
        {list1.map((price) => (
          <li key={price} className="">
            <span>{price}</span>
          </li>
        ))}
      </ul>

      <GarphBar {...stockInfo.stocks[0]} />
    </div>
  );
};

export default Graph;

const fetchData = async () => {
  const res = await fetch("/apis/test");
  return res.json();
};

const createPriceScaler = (min: number, max: number, chartHeight: number) => {
  return (price: number) => {
    if (max === min) return chartHeight / 2; // 안전장치
    return chartHeight * (1 - (price - min) / (max - min));
  };
};

function splitRange(start: number, end: number, count = 8): number[] {
  const step = (end - start) / (count - 1);

  return Array.from({ length: count }, (_, i) =>
    Math.round(start + step * i)
  ).reverse();
}
