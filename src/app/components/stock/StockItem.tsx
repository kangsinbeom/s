import { StockData } from "@/types/stock";
import clsx from "clsx";
import React from "react";

interface StockItemProps extends StockData {
  selected: boolean;
  onClick: (code: string) => void;
}

const StockItem = ({
  rate_of_change,
  st_id,
  currentPrice,
  code,
  change,
  totalTradeVolume,
  selected,
  onClick,
}: StockItemProps) => {
  const isGain = rate_of_change > 0;

  return (
    <li
      className={clsx(
        "flex min-h-[50px] max-w-full items-center justify-between border-b border-indigo-100 px-4 [&>*]:min-w-[40px]",
        selected ? "border-2 border-t-2 border-indigo-200" : "",
      )}
      onClick={() => onClick(code)}
    >
      <div className="flex w-[90px] flex-col">
        <p className="w-full truncate text-[12px] leading-3 font-bold">
          {st_id}
        </p>
        <p className="pl-0.5 text-[8px] leading-3 text-blue-300">{code}</p>
      </div>
      <p
        className={clsx(
          "flex w-[40px] text-[12px] font-bold",
          isGain ? "text-red-700" : "text-blue-700",
        )}
      >
        {currentPrice}
      </p>
      <div className="flex flex-col items-end">
        <p
          className={clsx(
            "text-[10px] font-bold",
            isGain ? "text-red-700" : "text-blue-700",
          )}
        >
          {isGain && "+"}
          {rate_of_change}%
        </p>
        <p
          className={clsx(
            "text-[10px] font-bold",
            isGain ? "text-red-700" : "text-blue-700",
          )}
        >
          {isGain && "+"}
          {change}
        </p>
      </div>
      <p className="text-[10px]">
        <strong>{Math.floor(totalTradeVolume / 1000000)}</strong> 백만
      </p>
    </li>
  );
};

export default StockItem;
