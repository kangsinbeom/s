//📦 단일 주식 실시간 체결가
export interface ExternalRealTimeResponse {
  MKSC_SHRN_ISCD: string; // 유가증권 단축 종목코드 🔥
  STCK_CNTG_HOUR: string; // 주식 체결 시간 (HHMMSS) 🐦‍🔥
  STCK_PRPR: number; // 주식 현재가 (체결가격) 🔥 🐦‍🔥
  PRDY_VRSS_SIGN: string; // 전일 대비 부호 (1: 상한, 2: 상승, 3: 보합, 4: 하한, 5: 하락)
  PRDY_VRSS: number; // 전일 대비 🔥
  PRDY_CTRT: number; // 전일 대비율 🔥
  WGHN_AVRG_STCK_PRC: number; // 가중 평균 주식 가격
  STCK_OPRC: number; // 주식 시가
  STCK_HGPR: number; // 주식 최고가
  STCK_LWPR: number; // 주식 최저가
  ASKP1: number; // 매도호가1
  BIDP1: number; // 매수호가1
  CNTG_VOL: number; // 체결 거래량 🐦‍🔥
  ACML_VOL: number; // 누적 거래량
  ACML_TR_PBMN: number; // 누적 거래 대금 🔥
  SELN_CNTG_CSNU: number; // 매도 체결 건수
  SHNU_CNTG_CSNU: number; // 매수 체결 건수
  NTBY_CNTG_CSNU: number; // 순매수 체결 건수
  CTTR: number; // 체결강도
  SELN_CNTG_SMTN: number; // 총 매도 수량
  SHNU_CNTG_SMTN: number; // 총 매수 수량
  CCLD_DVSN: string; // 체결구분 (1: 매수, 3: 장전, 5: 매도)
  SHNU_RATE: number; // 매수비율
  PRDY_VOL_VRSS_ACML_VOL_RATE: number; // 전일 거래량 대비 등락율
  OPRC_HOUR: string; // 시가 시간
  OPRC_VRSS_PRPR_SIGN: string; // 시가대비구분 (1~5)
  OPRC_VRSS_PRPR: number; // 시가대비
  HGPR_HOUR: string; // 최고가 시간
  HGPR_VRSS_PRPR_SIGN: string; // 고가대비구분 (1~5)
  HGPR_VRSS_PRPR: number; // 고가대비
  LWPR_HOUR: string; // 최저가 시간
  LWPR_VRSS_PRPR_SIGN: string; // 저가대비구분 (1~5)
  LWPR_VRSS_PRPR: number; // 저가대비
  BSOP_DATE: string; // 영업 일자 (YYYYMMDD)
  NEW_MKOP_CLS_CODE: string; // 신 장운영 구분 코드 (2자리, 1~8 / 0~8)
  TRHT_YN: string; // 거래정지 여부 (Y/N)
  ASKP_RSQN1: number; // 매도호가 잔량1
  BIDP_RSQN1: number; // 매수호가 잔량1
  TOTAL_ASKP_RSQN: number; // 총 매도호가 잔량
  TOTAL_BIDP_RSQN: number; // 총 매수호가 잔량
  VOL_TNRT: number; // 거래량 회전율
  PRDY_SMNS_HOUR_ACML_VOL: number; // 전일 동시간 누적 거래량
  PRDY_SMNS_HOUR_ACML_VOL_RATE: number; // 전일 동시간 누적 거래량 비율
  HOUR_CLS_CODE: string; // 시간 구분 코드 (0, A, B, C, D 등)
  MRKT_TRTM_CLS_CODE: string; // 임의종료구분코드
  VI_STND_PRC: number; // 정적VI발동기준가
}

//📦 단일 주식 데이터
export interface StockResponse {
  rt_cd: string; // 성공 실패 여부
  msg_cd: string; // 응답코드
  msg1: string; // 응답메세지
  output1: {
    prdy_vrss: string; // 전일 대비 🔥
    prdy_vrss_sign: string; // 전일 대비 부호
    prdy_ctrt: string; // 전일 대비율 🔥
    stck_prdy_clpr: string; // 전일대비 종가
    acml_vol: string; // 누적 거래량
    acml_tr_pbmn: string; // 누적 거래대금 🔥
    hts_kor_isnm: string; // 한글 종목명 🔥
    stck_prpr: string; // 주식 현재가 🔥
  }; // 단일 응답 상세
  output2: {
    stck_bsop_date: string; // 주식 영업일자
    stck_cntg_hour: string; // 주식 체결시간
    stck_prpr: string; // 주식 현재가
    stck_oprc: string; // 주식 시가
    stck_hgpr: string; // 주식 최고가
    stck_lwpr: string; // 주식 최저가
    cntg_vol: string; // 체결 거래량
    acml_tr_pbmn: string; // 누적 거래대금
  }[]; // 배열 형태의 응답 상세
}

//📦 기간별 국내 주식 시세
export interface ExternalPeriodStockResponse {
  /** 성공/실패 여부 */
  rt_cd: string;
  /** 응답 코드 */
  msg_cd: string;
  /** 응답 메시지 */
  msg1: string;
  /** 응답 상세 (현재가/종목 정보) */
  output1: PeriodStockOutput1;
  /** 응답 상세 (일봉 데이터) */
  output2: PeriodStockOutput2[];
}

//📦 기간별 국내 주식 시세 Output1
interface PeriodStockOutput1 {
  /** 전일 대비 */
  prdy_vrss: string;
  /** 전일 대비 부호 */
  prdy_vrss_sign: string;
  /** 전일 대비율 */
  prdy_ctrt: string;
  /** 주식 전일 종가 */
  stck_prdy_clpr: string;
  /** 누적 거래량 */
  acml_vol: string;
  /** 누적 거래 대금 */
  acml_tr_pbmn: string;
  /** HTS 한글 종목명 */
  hts_kor_isnm: string;
  /** 주식 현재가 */
  stck_prpr: string;
  /** 주식 단축 종목코드 */
  stck_shrn_iscd: string;
  /** 전일 거래량 */
  prdy_vol: string;
  /** 주식 상한가 */
  stck_mxpr: string;
  /** 주식 하한가 */
  stck_llam: string;
  /** 주식 시가 */
  stck_oprc: string;
  /** 주식 최고가 */
  stck_hgpr: string;
  /** 주식 최저가 */
  stck_lwpr: string;
  /** 주식 전일 시가 */
  stck_prdy_oprc: string;
  /** 주식 전일 최고가 */
  stck_prdy_hgpr: string;
  /** 주식 전일 최저가 */
  stck_prdy_lwpr: string;
  /** 매도호가 */
  askp: string;
  /** 매수호가 */
  bidp: string;
  /** 전일 대비 거래량 */
  prdy_vrss_vol: string;
  /** 거래량 회전율 */
  vol_tnrt: string;
  /** 주식 액면가 */
  stck_fcam: string;
  /** 상장 주수 */
  lstn_stcn: string;
  /** 자본금 */
  cpfn: string;
  /** HTS 시가총액 */
  hts_avls: string;
  /** PER */
  per: string;
  /** EPS */
  eps: string;
  /** PBR */
  pbr: string;
  /** 전체 융자 잔고 비율 */
  itewhol_loan_rmnd_ratem: string;
}

//📦 기간별 국내 주식 시세 Output2
export interface PeriodStockOutput2 {
  /** 주식 영업 일자 (YYYYMMDD) */
  stck_bsop_date: string;
  /** 주식 종가 */
  stck_clpr: string;
  /** 주식 시가 */
  stck_oprc: string;
  /** 주식 최고가 */
  stck_hgpr: string;
  /** 주식 최저가 */
  stck_lwpr: string;
  /** 누적 거래량 */
  acml_vol: string;
  /** 누적 거래 대금 */
  acml_tr_pbmn: string;
  /** 락 구분 코드 */
  flng_cls_code: string;
  /** 분할 비율 */
  prtt_rate: string;
  /** 변경 여부 */
  mod_yn: string;
  /** 전일 대비 부호 */
  prdy_vrss_sign: string;
  /** 전일 대비 */
  prdy_vrss: string;
  /** 재평가 사유 코드 */
  revl_issu_reas: string;
}
