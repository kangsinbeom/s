"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useGetSearchParams } from "./useGetSearchParams";
import { useStockItemsStore } from "@/app/providers/stock-store-provider";

const useSelcetedItem = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = useGetSearchParams("code");
  const { stockItems } = useStockItemsStore((state) => state);
  const [selected, setSelected] = useState<string>(code ?? stockItems[0].code);
  const handleClickItem = (code: string) => {
    setSelected(code);
    const params = new URLSearchParams(searchParams);
    params.set("code", code);
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return { selected, handleClickItem };
};

export default useSelcetedItem;
