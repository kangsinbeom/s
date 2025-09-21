"use client";

import VideoIcon from "./components/icons/Video";
import Button from "./components/buttons/Button";
import VodInput from "./components/inputs/VodInput";
import VideoPreview from "./components/main/video/VideoPreview";
import getSearchParams from "./hooks/commons/getSearchParams";
import useVideoInfo from "./hooks/main/useVideoInfo";
import VideoInfo from "./components/main/video/VideoInfo";
import { VideoInfoResponse } from "./types/bff/response/video";
import Modal from "./components/modal/Modal";
import LoginModal from "./components/modal/LoginModal";

export default function Home() {
  const previewUrl = getSearchParams("preview");
  const {
    handleVideoInfo,
    inputRef,
    videoInfo: { src, type, publishDate, videoTitle, videoCategoryValue, tags },
  } = useVideoInfo();

  const handleDownloadVod = (type: "HLS" | "MP4") => {
    if (type === "MP4") {
      const link = document.createElement("a");
      link.href = src;
      link.download = "video.mp4";
      link.click();
    } else {
      // HLS 다운로드는 백엔드 호출
      downloadHLS(src);
    }
  };
  const downloadHLS = async (hlsUrl: string) => {
    const res = await fetch(
      `/api/download-hls?url=${encodeURIComponent(hlsUrl)}`
    );
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "video.mp4";
    link.click();
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-28">
      <h1 className="text-5xl font-bold">치지직 VOD 다운로더</h1>
      {previewUrl && src ? (
        <div className="flex flex-col gap-6 items-center">
          <VideoInfo
            publishDate={publishDate}
            videoTitle={videoTitle}
            videoCategoryValue={videoCategoryValue}
            tags={tags}
          >
            <VideoPreview src={src} type={type} />
          </VideoInfo>
          <Button
            text="다운로드 버튼"
            onClick={() => handleDownloadVod(type)}
          />
        </div>
      ) : (
        <form
          className="flex flex-col justify-center gap-8 items-start"
          onSubmit={handleVideoInfo}
        >
          <VodInput label="VOD URL" ref={inputRef} />
          <Button icons={<VideoIcon />} text="VOD 가져오기" />
        </form>
      )}
      <Modal>
        <LoginModal />
      </Modal>
    </div>
  );
}
