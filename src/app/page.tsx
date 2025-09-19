"use client";

import VideoIcon from "./components/icons/Video";
import Button from "./components/buttons/Button";
import VodInput from "./components/inputs/VodInput";
import VideoPreview from "./components/main/video/VideoPreview";
import getSearchParams from "./hooks/commons/getSearchParams";
import useVideoInfo from "./hooks/main/useVideoInfo";
import { useEffect } from "react";
import VideoInfo from "./components/main/video/VideoInfo";

export default function Home() {
  const previewUrl = getSearchParams("preview");
  const {
    handleVideoInfo,
    inputRef,
    videoInfo: { src, type, publishDate, videoTitle },
  } = useVideoInfo();
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-28">
      <h1 className="text-5xl font-bold">치지직 VOD 다운로더</h1>
      {previewUrl && src ? (
        <VideoInfo publishDate={publishDate} videoTitle={videoTitle}>
          <VideoPreview src={src} type={type} />
        </VideoInfo>
      ) : (
        <form
          className="flex flex-col justify-center gap-8 items-start"
          onSubmit={handleVideoInfo}
        >
          <VodInput label="VOD URL" ref={inputRef} />
          <Button icons={<VideoIcon />} text="VOD 가져오기" />
        </form>
      )}
    </div>
  );
}
