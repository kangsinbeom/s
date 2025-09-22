"use client";

import Modal from "./components/modal/Modal";
import LoginModal from "./components/modal/LoginModal";
import VideoIcon from "./components/icons/Video";
import Button from "./components/buttons/Button";
import VodInput from "./components/inputs/VodInput";
import VideoInfo from "./components/main/video/VideoInfo";
import VideoPreview from "./components/main/video/VideoPreview";
import useVideoInfo from "./hooks/main/useVideoInfo";
import useDownloadVod from "./hooks/main/useDownloadVideo";
import getSearchParams from "./hooks/commons/getSearchParams";

export default function Home() {
  const previewUrl = getSearchParams("preview");
  const { handleSubmitVideoInfo, inputRef, videoInfo } = useVideoInfo();
  const { handleDownloadVod } = useDownloadVod();
  const handleTest = async () => {
    const res = await fetch("/apis/test", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 쿠키 포함
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-28">
      <h1 className="text-5xl font-bold">치지직 VOD 다운로더</h1>
      {previewUrl && videoInfo.src ? (
        <div className="flex flex-row gap-6 items-center">
          <VideoInfo {...videoInfo}>
            <VideoPreview {...videoInfo} />
          </VideoInfo>

          <div className="flex flex-col p-6 border border-[#75FBAA] rounded-xl bg-[#303234] gap-2 ">
            <Button
              text="다운로드 버튼"
              onClick={() =>
                handleDownloadVod({ src: videoInfo.src, type: videoInfo.type })
              }
            />
          </div>
        </div>
      ) : (
        <form
          className="flex flex-col justify-center gap-8 items-start"
          onSubmit={handleSubmitVideoInfo}
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
