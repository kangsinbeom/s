import { TradeHistoryData } from "@/types/stock";

const TradeHistoryItem = ({
  currentPrice,
  tradeTime,
  currnetTradeVolume,
}: TradeHistoryData) => {
  return (
    <div className="flex flex-row justify-between flex-1">
      <p className="text-[12px]">{tradeTime}</p>
      <p className="text-[12px]">{currentPrice}</p>
      <p className="text-[12px]">{currnetTradeVolume}</p>
    </div>
  );
};

export default TradeHistoryItem;
