"use client";

import { useEffect, useRef } from "react";
import { useGetSearchParams } from "./useGetSearchParams";
import { useStockItemsStore } from "@/app/providers/stock-store-provider";
import { useTradeHistoryStore } from "@/app/providers/tradeHistory-store-provider";
import { RealTimeData } from "@/app/types/stock/realTime";
import { toStockData, toTradeHistoryData } from "@/app/libs/stock/getStockData";

const useWebsocket = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const { stockItems, updateStockItems } = useStockItemsStore((state) => state);
  const { updateTradeHistories } = useTradeHistoryStore((state) => state);
  const code = useGetSearchParams("code");

  // 최초 연결 및 실시간 데이터 수신 부분
  useEffect(() => {
    (async () => {
      await fetch("/apis/stock/ws");
      const ws = new WebSocket("ws://localhost:8080");
      wsRef.current = ws;
      ws.onmessage = (event) => {
        const parsedData: RealTimeData = JSON.parse(event.data);
        const stockItemData = toStockData(parsedData);
        const tradeHistoryData = toTradeHistoryData(parsedData);

        updateStockItems(stockItemData);
        updateTradeHistories(tradeHistoryData);
      };
    })();
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [updateStockItems, updateTradeHistories]);

  // searchParams가 바뀔 때마다 ws에 code 보내기
  useEffect(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      if (code) {
        wsRef.current.send(JSON.stringify({ code }));
        console.log("------", code);
      } else {
        wsRef.current.send(JSON.stringify({ code: stockItems[0].code }));
        console.log("------", stockItems[0].code);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
};

export default useWebsocket;
