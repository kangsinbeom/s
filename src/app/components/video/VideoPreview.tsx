"use client";

import useSetVideo from "@/app/hooks/video/useSetVideo";
import useVideoInfo from "@/app/hooks/video/useVideoInfo";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

const VideoPreview = () => {
  const { src, thumbnailImageUrl } = useVideoInfo();
  const { currentTime, ref } = useSetVideo();

  return (
    <div className="w-[800px]">
      <MediaPlayer
        ref={ref}
        title="Sprite Fight"
        src={src}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 800,
          height: "100%",
        }}
        currentTime={currentTime}
      >
        <MediaProvider />
        <DefaultVideoLayout
          thumbnails={`/apis/proxyImage?url=${encodeURIComponent(
            thumbnailImageUrl
          )}`}
          icons={defaultLayoutIcons}
        />
      </MediaPlayer>
    </div>
  );
};

export default VideoPreview;
