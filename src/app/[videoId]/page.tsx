import VideoInfo from "../components/video/VideoInfo";
import VideoPreview from "../components/video/VideoPreview";
import TimeRangeModal from "../components/modal/TimeRangeModal";

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
