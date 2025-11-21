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

// hhmmss 형식의 문자열을 초 단위로 변환 (예: "013045" -> 1시간 30분 45초 -> 5445초)
export function hhmmssToSeconds(timeStr: string): number {
  if (timeStr.length !== 6)
    throw new Error("시간은 6자리 hhmmss 형식이어야 합니다.");
  const hours = parseInt(timeStr.slice(0, 2), 10);
  const minutes = parseInt(timeStr.slice(2, 4), 10);
  const seconds = parseInt(timeStr.slice(4, 6), 10);

  return hours * 3600 + minutes * 60 + seconds;
}

export function formatHHMMSS(time: string): string {
  if (time.length !== 6)
    throw new Error("시간은 6자리 hhmmss 형식이어야 합니다.");

  const hours = time.slice(0, 2);
  const minutes = time.slice(2, 4);
  const seconds = time.slice(4, 6);
  return `${hours}:${minutes}:${seconds}`;
}

export function secondsToHHMMSS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
