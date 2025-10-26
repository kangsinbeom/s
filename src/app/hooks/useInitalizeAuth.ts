"use client";
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export const useInitalizeAuth = () => {
  const setLogined = useAuthStore((s) => s.setLogined);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {}, [setLogined, clearAuth]);
};
// 지금 못 씀 잘못된 쿠키가 들어가도 res.status가 200으로 옴
// const fetchUserInfo = async () => {
//   const res = await fetch("/apis/chzzkUserInfo", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include", // 브라우저 쿠키 자동 포함
//   });
//   return res;
// };
