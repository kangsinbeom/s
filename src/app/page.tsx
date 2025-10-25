"use client";

import Modal from "./components/modal/Modal";
import LoginModal from "./components/modal/LoginModal";
import VideoIcon from "./components/icons/Video";
import Button from "./components/buttons/Button";
import VodInput from "./components/inputs/VodInput";
import VideoInfo from "./components/main/video/VideoInfo";
import VideoPreview from "./components/main/video/VideoPreview";
import useVideoInfo from "./hooks/main/useVideoInfo";
import getSearchParams from "./hooks/commons/getSearchParams";
import VideoRange from "./components/main/video/VideoRange";
import { TimeInput } from "./components/inputs/TimeInput";

export default function Home() {
  const previewUrl = getSearchParams("preview");
  const { handleSubmitVideoInfo, inputRef, videoInfo } = useVideoInfo();
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-28">
      {previewUrl && videoInfo.src ? (
        <div className="flex flex-row gap-6 items-center">
          <VideoInfo {...videoInfo}>
            <VideoPreview {...videoInfo} />
          </VideoInfo>
          <VideoRange {...videoInfo} />
          <TimeInput
            label="123"
            value={{ h: 0, m: 0, s: 0 }}
            onChange={() => {}}
          />
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
