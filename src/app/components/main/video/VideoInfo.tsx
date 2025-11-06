"use client";

import useVideoInfo from "@/app/hooks/main/useVideoInfo";
import { formatShortDate } from "@/app/libs/utils/date";
import VideoPreview from "./VideoPreview";
import VideoRange from "./VideoRange";

const VideoInfo = () => {
  const {
    videoInfo: { publishDate, src, tags, videoCategoryValue, videoTitle },
  } = useVideoInfo();
  const date = formatShortDate(publishDate);
  return (
    <div className="flex flex-col p-6 gap-2 ">
      <VideoPreview src={src} />
      <div className="flex pl-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold ">{videoTitle}</h2>
          <div className="flex gap-2 items-center">
            <p className="font-extrabold text-[#75FBAA]">
              {videoCategoryValue}
            </p>
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
            <p className="font-bold text-sm">{date}</p>
          </div>
        </div>
        <VideoRange />
      </div>
    </div>
  );
};

export default VideoInfo;

//
