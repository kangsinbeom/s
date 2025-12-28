export const getGraphColor = (open: number, close: number) => {
  if (open === close) return "bg-black-500";
  if (close > open) return "bg-red-500";
  if (close < open) return "bg-blue-500";
  return;
};
