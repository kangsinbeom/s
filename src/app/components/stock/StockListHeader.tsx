import useSortedStock from "@/app/hooks/useSortedStock";
import { listHeader } from "@/app/utils/list_header";
import React from "react";
import ArrowIcon from "../icons/ArrowIcon";

const StockListHeader = () => {
  const { isAscending, onClickIcon, category } = useSortedStock();
  return (
    <div className="flex flex-row justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 text-gray-500">
      {listHeader.map(({ id, label }) => (
        <div
          key={id}
          className="flex items-center gap-0.5 text-xs font-bold"
          id={id}
          onClick={(e) => onClickIcon(e)}
        >
          <p>{label}</p>
          <ArrowIcon isAscending={category === id ? isAscending : "none"} />
        </div>
      ))}
    </div>
  );
};

export default StockListHeader;
