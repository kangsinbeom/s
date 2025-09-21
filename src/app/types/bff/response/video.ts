export interface VideoInfoResponse {
  src: string; // 스트림 URL
  type: "HLS" | "MP4"; // 스트림 타입
  publishDate: string;
  videoTitle: string;
  videoCategoryValue: string;
  tags: string[];
}
