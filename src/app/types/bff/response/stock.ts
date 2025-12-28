export interface PeriodStockInfoResponse {
  stockName: string;
  volume: number;
  changeRate: number;
  changePrice: number;
  currentPrice: number;
  min: number;
  max: number;
  stocks: PeriodStock[];
}

export interface PeriodStock {
  date: Date;
  close: number;
  open: number;
  high: number;
  low: number;
}
