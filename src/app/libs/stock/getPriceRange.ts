import {
  PeriodStock,
  PeriodStockInfoResponse,
} from "@/app/types/bff/response/stock";

export const getPriceRange = (
  data: PeriodStock[]
): Omit<PeriodStockInfoResponse, "stocks"> => {
  return data.reduce(
    (acc, cur) => {
      const high = Number(cur.high);
      const low = Number(cur.low);

      return {
        min: Math.min(acc.min, low),
        max: Math.max(acc.max, high),
      };
    },
    {
      min: Infinity,
      max: -Infinity,
    }
  );
};
