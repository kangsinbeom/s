// 내가 가공해서 사용하는 주식에 대한 정보
export interface StockData {
  code: string;
  st_id: string;
  currentPrice: number;
  change: number;
  rate_of_change: number;
  totalTradeVolume: number;
}

// 내가 가공해서 사용하는 체결량에 대한 정보
export interface TradeHistoryData {
  code?: string;
  currentPrice: number;
  tradeTime: string;
  currnetTradeVolume: number;
}

// 체결 관련 데이터 응답
export interface TradeHistoryResponse {
  /** 성공·실패 여부 코드 */
  rt_cd: string;
  /** 응답 코드 */
  msg_cd: string;
  /** 응답 메시지 */
  msg1: string;
  /** 상세 응답 목록 */
  output: {
    /** 주식 체결 시간 */
    stck_cntg_hour: string; // 🔥
    /** 주식 현재가 */
    stck_prpr: string; // 🔥
    /** 전일 대비 */
    prdy_vrss: string;
    /** 전일 대비 부호 */
    prdy_vrss_sign: string;
    /** 체결 거래량 */
    cntg_vol: string; // 🔥
    /** 당일 체결강도 */
    tday_rltv: string;
    /** 전일 대비율 */
    prdy_ctrt: string;
  }[];
}
export interface StockQuoteResponse {
  rt_cd: string; // 성공 실패 여부
  msg_cd: string; // 응답 코드
  msg1: string; // 응답 메시지
  output1: {
    aspr_acpt_hour: string; // 호가 접수 시간
    askp1: string; // 매도호가 1
    askp2: string;
    askp3: string;
    askp4: string;
    askp5: string;
    askp6: string;
    askp7: string;
    askp8: string;
    askp9: string;
    askp10: string;
    bidp1: string; // 매수호가 1
    bidp2: string;
    bidp3: string;
    bidp4: string;
    bidp5: string;
    bidp6: string;
    bidp7: string;
    bidp8: string;
    bidp9: string;
    bidp10: string;
    askp_rsqn1: string; // 매도호가 잔량 1
    askp_rsqn2: string;
    askp_rsqn3: string;
    askp_rsqn4: string;
    askp_rsqn5: string;
    askp_rsqn6: string;
    askp_rsqn7: string;
    askp_rsqn8: string;
    askp_rsqn9: string;
    askp_rsqn10: string;
    bidp_rsqn1: string; // 매수호가 잔량 1
    bidp_rsqn2: string;
    bidp_rsqn3: string;
    bidp_rsqn4: string;
    bidp_rsqn5: string;
    bidp_rsqn6: string;
    bidp_rsqn7: string;
    bidp_rsqn8: string;
    bidp_rsqn9: string;
    bidp_rsqn10: string;
    askp_rsqn_icdc1: string; // 매도호가 잔량 증감 1
    askp_rsqn_icdc2: string;
    askp_rsqn_icdc3: string;
    askp_rsqn_icdc4: string;
    askp_rsqn_icdc5: string;
    askp_rsqn_icdc6: string;
    askp_rsqn_icdc7: string;
    askp_rsqn_icdc8: string;
    askp_rsqn_icdc9: string;
    askp_rsqn_icdc10: string;
    bidp_rsqn_icdc1: string; // 매수호가 잔량 증감 1
    bidp_rsqn_icdc2: string;
    bidp_rsqn_icdc3: string;
    bidp_rsqn_icdc4: string;
    bidp_rsqn_icdc5: string;
    bidp_rsqn_icdc6: string;
    bidp_rsqn_icdc7: string;
    bidp_rsqn_icdc8: string;
    bidp_rsqn_icdc9: string;
    bidp_rsqn_icdc10: string;
    total_askp_rsqn: string; // 총 매도호가 잔량
    total_bidp_rsqn: string; // 총 매수호가 잔량
    total_askp_rsqn_icdc: string; // 총 매도호가 잔량 증감
    total_bidp_rsqn_icdc: string; // 총 매수호가 잔량 증감
    ovtm_total_askp_icdc: string; // 시간외 총 매도호가 증감
    ovtm_total_bidp_icdc: string; // 시간외 총 매수호가 증감
    ovtm_total_askp_rsqn: string; // 시간외 총 매도호가 잔량
    ovtm_total_bidp_rsqn: string; // 시간외 총 매수호가 잔량
    ntby_aspr_rsqn: string; // 순매수 호가 잔량
    new_mkop_cls_code: string; // 신 장운영 구분 코드
  }; // 응답 상세 1 (호가 정보)
  output2: {
    antc_mkop_cls_code: string; // 예상 장운영 구분 코드
    stck_prpr: string; // 주식 현재가
    stck_oprc: string; // 주식 시가
    stck_hgpr: string; // 주식 최고가
    stck_lwpr: string; // 주식 최저가
    stck_sdpr: string; // 주식 기준가
    antc_cnpr: string; // 예상 체결가
    antc_cntg_vrss_sign: string; // 예상 체결 대비 부호
    antc_cntg_vrss: string; // 예상 체결 대비
    antc_cntg_prdy_ctrt: string; // 예상 체결 전일 대비율
    antc_vol: string; // 예상 거래량
    stck_shrn_iscd: string; // 주식 단축 종목코드
    vi_cls_code: string; // VI 적용 구분 코드
  }; // 응답 상세 2 (예상 체결 정보)
}
