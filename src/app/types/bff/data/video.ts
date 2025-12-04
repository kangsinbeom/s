import { VodContent } from "../../external/response/video";

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
