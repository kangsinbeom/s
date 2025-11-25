"use client";

import { useGetSearchParams } from "@/app/hooks/stock/useGetSearchParams";
import useSelcetedItem from "@/app/hooks/stock/useSelcetedItem";
import useWebsocket from "@/app/hooks/stock/useWebsocket";
import { getSortedList } from "@/app/libs/stock/sorted";
import { useStockItemsStore } from "@/app/providers/stock-store-provider";
import { StockData } from "@/app/types/stock/stock";
import StockListHeader from "./StockListHeader";
import StockItem from "./StockItem";

const StockList = () => {
  const { stockItems } = useStockItemsStore((state) => state);
  const { selected, handleClickItem } = useSelcetedItem();
  const category = (useGetSearchParams("category") ??
    "rate_of_change") as keyof StockData;
  const sort = useGetSearchParams("sort") ?? "desc";
  const sortedList = getSortedList(stockItems, sort, category);

  useWebsocket();
  return (
    <div className="flex h-[400px] w-[400px] flex-col rounded-sm border border-gray-200">
      <StockListHeader />
      <ul className="scrollbar-custom flex flex-1 flex-col overflow-y-auto shadow-2xl">
        {sortedList.map((item) => {
          return (
            <StockItem
              key={item.code}
              selected={item.code === selected}
              onClick={handleClickItem}
              {...item}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default StockList;
