"use client";

import { useSearchParams } from "next/navigation";

/**
 * 쿼리 파라미터에서 특정 key의 값을 가져오는 커스텀 훅
 */
export const useGetSearchParams = (key: string): string | null => {
  const searchParams = useSearchParams();
  return searchParams.get(key);
};
