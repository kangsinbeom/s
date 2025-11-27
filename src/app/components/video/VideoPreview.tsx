"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import useVideoInfo from "@/app/hooks/main/useVideoInfo";

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
    <div style={{ position: "relative", width: "100%", maxWidth: 800 }}>
      {/* 썸네일 */}
      {!isVideoReady && (
        <img
          src={thumbnailImageUrl}
          alt="thumbnailImage"
          style={{ width: "100%", display: "block" }}
        />
      )}

      {/* video 태그 */}
      <video
        ref={videoRef}
        controls
        style={{
          width: "100%",
          display: isVideoReady ? "block" : "none", // 준비되면 보여줌
        }}
        onCanPlay={() => setIsVideoReady(true)}
      />
    </div>
  );
};

export default VideoPreview;
