import { getGraphColor } from "@/app/libs/stock/graph/getGraphColor";
import { PeriodStock } from "@/app/types/bff/response/stock";
import clsx from "clsx";

interface GarphBarProps extends PeriodStock {
  max: number;
  min: number;
  height?: number;
}
// 종가, 최고가, 최저가
export const GarphBar = ({
  close,
  date,
  high,
  low,
  open,
  max,
  min,
  height = 400,
}: GarphBarProps) => {
  const colorClass = getGraphColor(open, close);

  function priceToY(price: number) {
    return ((max - price) / (max - min)) * height;
  }
  const yOpen = priceToY(open);
  const yClose = priceToY(close);
  const yHigh = priceToY(high);
  const yLow = priceToY(low);
  const bodyTop = Math.min(yOpen, yClose);
  const bodyHeight = Math.abs(yOpen - yClose);
  const upperWickTop = yHigh;
  const upperWickHeight = bodyTop - yHigh;
  const lowerWickTop = bodyTop + bodyHeight;
  const lowerWickHeight = yLow - lowerWickTop;

  return (
    <div className="relative w-[20px]" style={{ height }}>
      {/* 위 꼬리 */}
      <div
        className={clsx("absolute left-1/2 w-0.5 -translate-x-1/2", colorClass)}
        style={{
          top: yHigh,
          height: bodyTop - yHigh,
        }}
      />

      {/* 몸통 */}
      <div
        className={clsx("absolute left-0 w-full", colorClass)}
        style={{
          top: bodyTop,
          height: Math.max(bodyHeight, 1),
        }}
      />

      {/* 아래 꼬리 */}
      <div
        className={clsx("absolute left-1/2 w-0.5 -translate-x-1/2", colorClass)}
        style={{
          top: bodyTop + bodyHeight,
          height: yLow - (bodyTop + bodyHeight),
        }}
      />
    </div>
  );
};
