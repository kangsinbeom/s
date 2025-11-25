"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useGetTokenAndKey = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await fetch("/apis/stock/auth", { method: "POST" }).then(() =>
        router.refresh()
      );
    })();
  }, [router]);
};

export default useGetTokenAndKey;
