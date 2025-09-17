"use client";

import VideoIcon from "./components/icons/Video";
import Button from "./components/buttons/Button";
import VodInput from "./components/inputs/VodInput";
import VideoPreview from "./components/main/VideoPreview";
import getSearchParams from "./hooks/commons/getSearchParams";
import useDashUrl from "./hooks/main/useDashUrl";
import { useEffect } from "react";

export default function Home() {
  const hasBaseUrl = getSearchParams("preview");
  const { handleDashUrl, inputRef, dashUrl, setDashUrl } = useDashUrl();

  useEffect(() => {}, [setDashUrl]);

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-28">
      <h1 className="text-5xl font-bold">치지직 VOD 다운로더</h1>
      {hasBaseUrl && dashUrl ? (
        <VideoPreview dashUrl={dashUrl} />
      ) : (
        <form
          className="flex flex-col justify-center gap-8 items-start"
          onSubmit={handleDashUrl}
        >
          <VodInput label="VOD URL" ref={inputRef} />
          <Button icons={<VideoIcon />} text="VOD 가져오기" />
        </form>
      )}
    </div>
  );
}
