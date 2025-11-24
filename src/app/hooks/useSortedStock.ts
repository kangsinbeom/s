"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const useSortedStock = () => {
  const [isAscending, setIsAscending] = useState<"asc" | "desc" | "none">(
    "none",
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort === "asc" || sort === "desc") setIsAscending(sort);
    else setIsAscending("none");
  }, [searchParams]);

  const onClickIcon = (e: MouseEvent<HTMLDivElement>) => {
    const category = e.currentTarget.id;
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    const sort =
      isAscending === "none" ? "asc" : isAscending === "asc" ? "desc" : "asc";
    params.set("sort", sort);
    router.push(`?${params.toString()}`);
  };
  const category = searchParams.get("category") || "st_id";
  return { isAscending, onClickIcon, category };
};

export default useSortedStock;

// st_id, currentPrice, rate_of_change, totalTradeVolume
