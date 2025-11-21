"use client";

import VideoInfo from "../components/main/video/VideoInfo";
import VideoPreview from "../components/main/video/VideoPreview";
import useVideoInfo from "../hooks/main/useVideoInfo";
import TimeRangeModal from "../components/modal/TimeRangeModal";

const VideoPage = () => {
  const {
    videoInfo: { src, ...videoInfo },
  } = useVideoInfo();

  return (
    <div className="flex flex-col p-6 gap-2 w-fit">
      <VideoPreview src={src} />
      <div className="relative">
        <VideoInfo {...videoInfo} />
        <div className="absolute top-1/2 right-0 translate-y-[-50%]">
          <TimeRangeModal />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
