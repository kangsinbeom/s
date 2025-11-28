import { create } from "domain";

export type TimeRange = {
  start: number;
  end: number;
};

interface TimeRangeState {
  timeRange: TimeRange[];
  currentTime: number;
  addTimeRange: () => void;
  deleteTimeRange: () => void;
  moveToCurrentTime: () => void;
}

export const useTimeRangeStore = create<TimeRangeState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
