import { PeriodStock } from "@/app/types/bff/response/stock";
import clsx from "clsx";

interface GarphBarProps extends PeriodStock {}
// 종가, 최고가, 최저가
export const GarphBar = ({ close, date, high, low, open }: GarphBarProps) => {
  const colorClass =
    open === close
      ? "bg-white-500"
      : close > open
      ? "bg-red-500"
      : "bg-blue-500";
  return (
    <div className={clsx("flex flex-col w-[20px] h-[100px]", colorClass)}>
      <span>{high}</span>
      <span>{open}</span>
      <span>{close}</span>
      <span>{low}</span>
    </div>
  );
};
