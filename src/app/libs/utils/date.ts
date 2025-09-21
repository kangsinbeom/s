import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일 import

dayjs.locale("ko");

/**
 * 날짜 문자열을 "2025년 9월 18일" 형태로 변환
 * @param dateString API에서 내려온 날짜 (예: "2025-09-18 14:27:09")
 */
export function formatShortDate(dateString: string): string {
  return dayjs(dateString).format("M.D");
}

export function formatKoreanDate(dateString: string): string {
  return dayjs(dateString).format("YYYY년 M월 D일");
}

/**
 * 날짜와 시간을 함께 변환 (예: "2025년 9월 18일 14시 27분")
 */
export function formatKoreanDateTime(dateString: string): string {
  return dayjs(dateString).format("YYYY년 M월 D일 HH시 mm분");
}
