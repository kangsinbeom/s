import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface TimeRange {
  start: number;
  end: number;
}

interface State {
  timeRanges: TimeRange[];
  currentTimeRange?: number;
  currentTime: number;
}

interface Actions {
  addTimeRange: (newRange: TimeRange) => void;
  deleteTimeRange: (index: number) => void;
  moveToCurrentTime: (index: number) => void;
  setCurrentTime: (time: number) => void;
}

export type TimeRageStore = State & Actions;

const defaultInitState: State = {
  currentTime: 0,
  timeRanges: [],
};

export const createTimeRangeStore = (initalState: State = defaultInitState) => {
  return createStore<TimeRageStore>()(
    persist(
      (set, get) => ({
        ...initalState,
        addTimeRange: (newRange) =>
          set((state) => ({
            ...state,
            timeRanges: [...state.timeRanges, newRange],
          })),
        deleteTimeRange: (index) =>
          set((state) => ({
            ...state,
            timeRanges: state.timeRanges.filter((_, i) => i !== index),
          })),
        moveToCurrentTime: (index) =>
          set((state) => {
            const { start } = get().timeRanges[index];
            return {
              ...state,
              currentTime: start,
            };
          }),
        setCurrentTime: (time) =>
          set((state) => ({
            ...state,
            currentTime: time,
          })),
      }),
      {
        name: "time-range-storage",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          currentTime: state.currentTime,
          timeRanges: state.timeRanges,
        }),
      }
    )
  );
};
// 값이 1개만 있을 때 moveToCurrentTime을 누르면 아무 이동도 이루어지지 않음 이건 아쉬운데?
// 새로고침을 했을 때 값이 storage에 저장되었으면 좋겠다.

// 일단 기본적으로 함수를 인자로 넘기느 형태가 되는구나 그렇다면 함수의 return 값이 들어가는 구조구나
