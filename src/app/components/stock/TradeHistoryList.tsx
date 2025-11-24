"use client";

import { useEffect } from "react";
import TradeHistoryItem from "./TradeHistoryItem";
import { useSearchParams } from "next/navigation";
import { useTradeHistoryStore } from "@/app/providers/tradeHistory-store-provider";

const TradeHistoryList = () => {
  const { tradeHistories, setTradeHistories } = useTradeHistoryStore(
    (state) => state
  );
  const searchParams = useSearchParams();
  useEffect(() => {
    const code = searchParams.get("code") as string;
    const queryString = new URLSearchParams({
      code,
    }).toString();

    if (code) {
      (async () => {
        await fetch(`/api/tradehistory?${queryString}`)
          .then((res) => res.json())
          .then((data) => setTradeHistories(data));
      })();
    }
  }, [searchParams, setTradeHistories]);
  return (
    <div className="h-[220px] w-[260px] overflow-scroll overflow-x-hidden">
      {tradeHistories.map((data, index) => (
        <TradeHistoryItem key={index} {...data} />
      ))}
    </div>
  );
};

export default TradeHistoryList;
