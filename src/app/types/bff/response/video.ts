import { VideoInfo } from "../data/video";

export interface VideoInfoResponse
  extends Omit<VideoInfo, "inKey" | "videoId"> {
  src: string;
  liveRewindPlaybackJson: string;
}
