"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPreviewProps {
  src: string;
  type: "MP4" | "HLS";
}

const VideoPreview = ({ src, type }: VideoPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (type === "HLS") {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);

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
    <video ref={videoRef} controls style={{ width: "100%", maxWidth: 800 }} />
  );
};

export default VideoPreview;
