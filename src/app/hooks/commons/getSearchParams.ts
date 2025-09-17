"use client";

import { useSearchParams } from "next/navigation";

export default function getSearchParams(key?: string) {
  const searchParams = useSearchParams();
  if (!key) return Object.fromEntries(searchParams.entries());

  const params = searchParams.get(key); // ?preview=true

  if (params === "true" || params === "false") {
    return params === "true";
  }
  if (params !== null && parseInt(params, 10)) {
    return isNaN(parseInt(params, 10)) ? params : parseInt(params, 10);
  }
  return params;
}
