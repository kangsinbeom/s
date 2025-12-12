import { createStore } from "zustand";

interface State {
  index: number;
  itemSize: number;
  totalCount: number;
  viewCount: number;
  slideInterval: number;
  autoPlay?: boolean;
  isTransitionEnabled?: boolean;
  visibleButtons?: boolean;
}

interface Actions {
  moveToNextPage: () => void;
  moveToPrevPage: () => void;
  MoveToNextStep: () => void;
  setIsHoverd: (isHoverd: boolean) => void;
}

const defaultInitState: State = {
  index: 5,
  itemSize: 200,
  slideInterval: 10,
  viewCount: 5,
  autoPlay: true,
  totalCount: 10,
  isTransitionEnabled: true,
};

export type CarouselStore = State & Actions;

export const createCarouselStore = (initailState: State = defaultInitState) => {
  return createStore<CarouselStore>()((set, get) => ({
    ...initailState,
    moveToNextPage: () => {
      const { index, totalCount, viewCount } = get();
      /**
       * 현재 index에서 viewCount를 더했을 때 totalCount + viewCount를 넘기는 경우에는 transtion을 끄고 현재 index에서 totalCount를 뺀 값으로 세팅한다
       * 빼는 구조로 되는 건 어떻게 해야하나? 일단 index가 viewCount보다 작을 때 문제가 생김
       * viewCount보다 작다면 index에다가 totalCount를 더해서 그 위치로 바꿔야 할 듯?
       */
      if (index + viewCount >= totalCount + viewCount) {
        set({ index: index - totalCount, isTransitionEnabled: false });
        requestAnimationFrame(() => {
          set({ isTransitionEnabled: true });

          requestAnimationFrame(() => {
            set((state) => ({ index: state.index + viewCount }));
          });
        });

        return;
      }
      set((state) => ({
        ...state,
        index: state.index + viewCount,
      }));
    },

    moveToPrevPage: () => {
      const { index, totalCount, viewCount } = get();

      /**
       * index - viewCount가 0 이하(혹은 viewCount 이하)로 넘어가면,
       * 맨 뒤의 확장된 영역으로 점프해야 함.
       *
       * extended 리스트 길이 = totalCount + viewCount * 2
       * 실제 뒤쪽 블럭의 시작 index = totalCount
       */
      if (index - viewCount < 0) {
        // 1) transition 끄고 뒤쪽으로 점프
        set({ index: index + totalCount, isTransitionEnabled: false });

        // 2) 다음 프레임에서 transition 다시 켬
        requestAnimationFrame(() => {
          set({ isTransitionEnabled: true });

          // 3) 다시 다음 프레임에서 viewCount만큼 뒤로 이동 (prev 방향)
          requestAnimationFrame(() => {
            set((state) => ({ index: state.index - viewCount }));
          });
        });

        return;
      }

      // 정상적으로 prev 이동
      set((state) => ({
        ...state,
        index: state.index - viewCount,
      }));
    },

    MoveToNextStep: () => {
      const { index, totalCount, viewCount } = get();
      const lastIndex = totalCount + viewCount;

      if (index >= lastIndex) {
        set({ isTransitionEnabled: false, index: viewCount });

        requestAnimationFrame(() => {
          set({ isTransitionEnabled: true });

          requestAnimationFrame(() => {
            set((state) => ({ index: state.index + 1 }));
          });
        });

        return;
      }

      // 일반적인 다음 이동
      set((state) => ({
        ...state,
        index: state.index + 1,
      }));
    },
    setIsHoverd: (isHoverd: boolean) =>
      set((state) => ({
        ...state,
        autoPlay: !isHoverd,
        visibleButtons: isHoverd,
      })),
  }));
};

/**
 * view 4 total 10
 * extended 18
 * index 4
 * index가 10 + 4 total + view에 왔을 때 다시 index를 view로 초기화하면 된다
 * if (index === (index + total)) index = viewCount
 */
