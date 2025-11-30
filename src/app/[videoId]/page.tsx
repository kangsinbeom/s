import VideoInfo from "../components/video/VideoInfo";
import VideoPreview from "../components/video/VideoPreview";
import TimeRangeModal from "../components/modal/TimeRangeModal";
import { Suspense } from "react";
import Loading from "./loading";

const VideoPage = () => {
  return (
    <div className="flex flex-col p-6 gap-2 w-fit">
      <VideoPreview />
      <div className="relative">
        <VideoInfo />
        <div className="absolute top-1/2 right-0 translate-y-[-50%]">
          <TimeRangeModal />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;

/**
 * 난 일단 suspense를 사용할 거야 그래서 하이드레이션을 어느정도 맞출거야 그럼 서버에서도 실행하는 걸로 되는거잖아
 * 그럼 일단 client에서 실행하는 게 아니니깐 base_url 붙여야 해
 * 그런다음에 cookies에 있는 것들을 사용해야하는데 이거 지금 사용하려면 어떻게 해야하는 지 모르겠음
 */
