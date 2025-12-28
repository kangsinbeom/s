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
  // const list1 =  top과 bottom을 받아서 그 사이 값으로 8개를 뽑아내게 하려면 어떻게 해야하지?
  if (!stockInfo) return <div>Loading...</div>;

  const PriceRanges = splitRange(stockInfo.min, stockInfo.max, 8);

  return (
    // 왜 radius 설정해놓은 게 이상하게 되지???
    <div className="flex bg-[#292B2D] w-full min-w-[600px] h-[400px] rounded-2xl border-4 border-[#03FFA3] overflow-hidden">
      {/* hidden으로 막은 overflow는 처리해야지이이이!!! */}
      <div className="flex justify-end overflow-hidden">
        {stockInfo.stocks.map((stock, index) => (
          <GarphBar
            key={index}
            {...stock}
            max={stockInfo.max}
            min={stockInfo.min}
          />
        ))}
      </div>
      <ul className="bg-amber-600 h-full pr-5 justify-between flex flex-col">
        {PriceRanges.map((price) => (
          <li key={price} className="">
            <span>{price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Graph;

const fetchData = async () => {
  const res = await fetch(`/apis/test`);
  return res.json();
};

function splitRange(start: number, end: number, count = 8): number[] {
  const step = (end - start) / (count - 1);

  return Array.from({ length: count }, (_, i) =>
    Math.round(start + step * i)
  ).reverse();
}
