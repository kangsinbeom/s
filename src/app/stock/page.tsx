import { cookies } from "next/headers";
import Carousel, { CarouselItem } from "../components/carousel/Carousel";
import StockList from "../components/stock/StockList";
import TradeHistoryList from "../components/stock/TradeHistoryList";
import { getStockData } from "../libs/stock/getStockData";
import { StockItemsStoreProvider } from "../providers/stock-store-provider";
import { TradeHistoryStoreProvider } from "../providers/tradeHistory-store-provider";
import Graph from "../components/graph/Graph";

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
    <StockItemsStoreProvider initalStockItems={initalStockItems}>
      <TradeHistoryStoreProvider initalTradeHistories={initalTradeHistories}>
        <div className="h-screen w-screen">
          <div className="flex flex-col p-20 items-center">
            <Carousel items={demoData} />
            <Graph />
            {/* <div className="flex flex-row justify-between p-20 w-full">
              <div className="h-fit w-[260px]">
                <StockList />
              </div>
              <TradeHistoryList />
            </div> */}
            {/* <TestArea /> */}
          </div>
        </div>
      </TradeHistoryStoreProvider>
    </StockItemsStoreProvider>
  );
};

export default StockPage;

const demoData: CarouselItem[] = [
  { name: "제일약품1", number: "005420", percent: 5.5 },
  { name: "제일약품2", number: "006650", percent: 5.5 },
  { name: "제일약품3", number: "014820", percent: 5.5 },
  { name: "제일약품4", number: "020150", percent: 5.5 },
  { name: "제일약품5", number: "023590", percent: 5.5 },
  { name: "제일약품6", number: "051915", percent: 5.5 },
  { name: "제일약품7", number: "066970", percent: 5.5 },
  { name: "제일약품8", number: "271980", percent: 5.5 },
  { name: "제일약품9", number: "323410", percent: 5.5 },
  { name: "제일약품10", number: "329180", percent: 5.5 },
];
