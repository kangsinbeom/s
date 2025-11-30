"use client";

import useVideoInfo from "@/app/hooks/video/useVideoInfo";
import { formatShortDate } from "@/app/libs/utils/date";
import Image from "next/image";

const VideoInfo = () => {
  const {
    publishDate,
    videoCategoryValue,
    videoTitle,
    tags,
    channel: { channelImageUrl, channelName },
  } = useVideoInfo();
  const date = formatShortDate(publishDate);
  return (
    <div className="flex pl-4 gap-8">
      <div>
        <h2 className="text-2xl font-bold ">{videoTitle}</h2>
        <div className="flex gap-2 items-center">
          <p className="font-extrabold text-[#75FBAA]">{videoCategoryValue}</p>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          <p className="font-bold text-sm">{date}</p>
        </div>
        {channelImageUrl && (
          <Image
            src={channelImageUrl}
            alt="channalImageUrl"
            width={60}
            height={60}
            style={{ height: "auto", width: "auto" }}
            // 이거 왜 해야하지? 경고가 뜨긴 하는데 가로세로 둘 중 하나만 선언했다면서 경고가 뜨네
          />
        )}

        <span>{channelName}</span>
      </div>
    </div>
  );
};

export default VideoInfo;

//
