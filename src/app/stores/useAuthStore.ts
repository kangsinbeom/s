import { create } from "zustand";
import { UserInfoContent } from "../types/external/response/user";

interface UserState {
  isLogined: boolean;
  setLogined: (isLogined: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<UserState>((set) => ({
  isLogined: false,
  userInfo: null,
  setLogined: (isLogined: boolean) => set({ isLogined }),
  clearAuth: () => set({ isLogined: false }),
}));
