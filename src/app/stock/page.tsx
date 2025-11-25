import { cookies } from "next/headers";
import { StockItemsStoreProvider } from "../providers/stock-store-provider";
import { TradeHistoryStoreProvider } from "../providers/tradeHistory-store-provider";
import { getStockData } from "../libs/stock/getStockData";
import StockList from "../components/stock/StockList";
import TradeHistoryList from "../components/stock/TradeHistoryList";

const base_url = process.env.NEXT_PUBLIC_DEV_URL;

const StockPage = async () => {
  const access_token = (await cookies()).get("access_token")?.value as string;
  const initalStockItems = await getStockData(access_token);
  const queryString = new URLSearchParams({
    access_token,
    code: initalStockItems[0].code,
  }).toString();
  const res = await fetch(
    `${base_url}/apis/stock/tradehistory?${queryString}`,
    {
      // 캐시를 사용하지 않아서 항상 네트워크 요청이 발생 => 왜 해놓은 거지?
      next: { revalidate: false },
    }
  );
  const initalTradeHistories = await res.json();

  return (
    <div className="h-screen w-screen">
      <StockItemsStoreProvider initalStockItems={initalStockItems}>
        <TradeHistoryStoreProvider initalTradeHistories={initalTradeHistories}>
          <div className="flex flex-row justify-between p-20">
            <div className="h-fit w-[260px]">
              <StockList />
            </div>
            <TradeHistoryList />
          </div>
        </TradeHistoryStoreProvider>
      </StockItemsStoreProvider>
    </div>
  );
};

export default StockPage;
