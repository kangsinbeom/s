"use client";

import { formatShortDate } from "@/app/libs/utils/date";
import { VideoInfoResponse } from "@/app/types/bff/response/video";
import { PropsWithChildren } from "react";

export interface VideoInfoProps
  extends PropsWithChildren,
    Omit<VideoInfoResponse, "src" | "type"> {}

const VideoInfo = ({
  publishDate,
  videoTitle,
  tags,
  videoCategoryValue,
  children,
}: VideoInfoProps) => {
  const date = formatShortDate(publishDate);
  return (
    <div className="flex flex-col p-6 gap-2 ">
      {children}
      <div className="pl-4">
        <h2 className="text-2xl font-bold ">{videoTitle}</h2>
        <div className="flex gap-2 items-center">
          <p className="font-extrabold text-[#75FBAA]">{videoCategoryValue}</p>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          <p className="font-bold text-sm">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;

//
