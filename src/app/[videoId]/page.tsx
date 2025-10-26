"use client";

import VideoInfo from "../components/main/video/VideoInfo";
import VideoPreview from "../components/main/video/VideoPreview";
import VideoRange from "../components/main/video/VideoRange";
import { TimeInput } from "../components/inputs/TimeInput";
import useVideoInfo from "../hooks/main/useVideoInfo";

const VideoPage = () => {
  const { videoInfo } = useVideoInfo();

  return (
    <div className="flex flex-col gap-6 ">
      <VideoInfo {...videoInfo}>
        <VideoPreview src={videoInfo.src} />
      </VideoInfo>
      {/* <VideoRange {...videoInfo} />
      <TimeInput label="123" value={{ h: 0, m: 0, s: 0 }} onChange={() => {}} /> */}
    </div>
  );
};

export default VideoPage;
