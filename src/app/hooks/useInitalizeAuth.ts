"use client";
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export const useInitalizeAuth = (initialIsLogined: boolean) => {
  const setLogined = useAuthStore((s) => s.setLogined);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    if (initialIsLogined) setLogined(true);
  }, [setLogined, clearAuth]);
};

// const fetchUserInfo = async () => {
//   const res = await fetch("/apis/chzzkUserInfo", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include", // 브라우저 쿠키 자동 포함
//   });
//   return res;
// };
