export type PeriodStockInfoResponse = {
  min: number;
  max: number;
  stocks: PeriodStock[];
};

export interface PeriodStock {
  date: Date;
  close: number;
  open: number;
  high: number;
  low: number;
}
