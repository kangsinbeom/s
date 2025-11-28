import { createStore } from "zustand";
import { TradeHistoryData } from "../types/stock/stock";

export interface TradeHistoryState {
  tradeHistories: TradeHistoryData[];
  setTradeHistories: (data: TradeHistoryData[]) => void;
  updateTradeHistories: (data: TradeHistoryData) => void;
}

export const createTradeHistoriesStore = (initState: TradeHistoryData[]) => {
  return createStore<TradeHistoryState>()((set) => ({
    tradeHistories: initState,
    setTradeHistories: (item) => set({ tradeHistories: item }),
    updateTradeHistories: (item) =>
      set((state) => {
        const updated = [item, ...state.tradeHistories];
        if (updated.length > 30) {
          updated.pop();
        }
        return { tradeHistories: updated };
      }),
  }));
};

/**
 * 일단 지금 실시간으로 받아오는 데이터들이 있는데 여기서 code가 같은 것만 뽑아서 추가를 해줘야함
 * 지금 현재 무슨 코드가 열려있는지를 식별을 해야한다는 얘기가 됨
 * 이거는 사실 item을 클릭했을 때 parmas?? 할튼 거기 추가해서 식별을 할 예정이였음
 * 이거 지금 해야할 듯
 * 그런 뒤 그게 바뀌면 가져와서 최신화하는 식으로 code를 식별하려 했음 실시간 잠깐 멈추고
 * 이거 먼저 처리를 해보자
 *
 *
 */
