"use client";

import { VideoInfoResponse } from "@/app/types/bff/response/video";
import { PropsWithChildren } from "react";

export interface VideoInfoProps
  extends PropsWithChildren,
    Pick<VideoInfoResponse, "publishDate" | "videoTitle"> {}

const VideoInfo = ({ publishDate, videoTitle, children }: VideoInfoProps) => {
  return (
    <div className="p-6 border border-[#75FBAA] rounded-xl bg-[#303234]">
      <div>
        <h2>제목 : {videoTitle}</h2>
        <p>날짜 : {publishDate}</p>
        {children}
      </div>
    </div>
  );
};

export default VideoInfo;

//
