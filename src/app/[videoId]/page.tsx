"use client";

import VideoInfo from "../components/main/video/VideoInfo";
import VideoPreview from "../components/main/video/VideoPreview";
import useVideoInfo from "../hooks/main/useVideoInfo";
import TimeRangeModal from "../components/modal/TimeRangeModal";
import { Suspense } from "react";
import Loading from "./loading";

const VideoPage = () => {
  const {
    videoInfo: { src, type, ...videoInfo },
  } = useVideoInfo();

  return (
    <div className="flex flex-col p-6 gap-2 w-fit">
      <Suspense fallback={<Loading />}>
        <VideoPreview src={src} type={type} />
        <div className="relative">
          <VideoInfo {...videoInfo} />
          <div className="absolute top-1/2 right-0 translate-y-[-50%]">
            <TimeRangeModal />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default VideoPage;
