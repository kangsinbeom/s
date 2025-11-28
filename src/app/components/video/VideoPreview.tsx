"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import useVideoInfo from "@/app/hooks/main/useVideoInfo";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

const VideoPreview = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const { src, type, thumbnailImageUrl } = useVideoInfo();
  useEffect(() => {
    if (!videoRef.current) return;

    if (type === "HLS") {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsVideoReady(true);
        });

        return () => hls.destroy();
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        // Safari fallback
        videoRef.current.src = src;
      }
    } else if (type === "MP4") {
      videoRef.current.src = src;
    }
  }, [src, type]);

  return (
    <div className="w-[800px]">
      <MediaPlayer
        title="Sprite Fight"
        src={src}
        style={{ position: "relative", width: "100%", maxWidth: 800 }}
        currentTime={100}
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
