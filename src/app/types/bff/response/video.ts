import { VodContent } from "../../external/response/vod";

export interface VideoInfoResponse {
  src: string; // 스트림 URL
  publishDate: string;
  videoTitle: string;
  videoCategoryValue: string;
  tags: string[];
  duration: number;
  channel: ChannelInfo;
}

export interface ChannelInfo {
  channelId: string;
  channelName: string;
  channelImageUrl: string;
  verifiedMark: boolean;
  activatedChannelBadgeIds: string[];
}

export type VideoInfo = Pick<
  VodContent,
  | "videoId"
  | "inKey"
  | "publishDate"
  | "videoTitle"
  | "videoCategoryValue"
  | "duration"
  | "tags"
  | "channel"
  | "liveRewindPlaybackJson"
  | "thumbnailImageUrl"
>;

export interface VideoApiResponse extends Omit<VideoInfo, "inKey" | "videoId"> {
  src: string;
  liveRewindPlaybackJson: string;
}
