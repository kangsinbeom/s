export interface VideoInfoResponse {
  src: string; // 스트림 URL
  publishDate: string;
  videoTitle: string;
  videoCategoryValue: string;
  tags: string[];
  duration: number;
}
