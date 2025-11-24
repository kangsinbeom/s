import { StockData } from "@/app/types/stock/stock";

export const sortByRateOfChangeAsc = (stocks: StockData[]) => {
  return stocks.sort((a, b) => b.rate_of_change - a.rate_of_change);
};

export const getSortedList = (
  list: StockData[],
  type: string,
  category: keyof StockData
): StockData[] => {
  return [...list].sort((a, b) => {
    const valA = a[category];
    const valB = b[category];

    // 문자열 정렬
    if (typeof valA === "string" && typeof valB === "string") {
      return type === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    // 숫자 정렬
    if (typeof valA === "number" && typeof valB === "number") {
      return type === "asc" ? valA - valB : valB - valA;
    }

    return 0; // 타입이 다르거나 정렬 불가한 경우
  });
};
