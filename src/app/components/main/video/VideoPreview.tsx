"use client";

import { VideoInfoResponse } from "@/app/types/bff/response/video";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPreviewProps extends Pick<VideoInfoResponse, "src" | "type"> {}

export default function VideoPreview({ src, type }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (type === "HLS") {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        // Safari fallback
        videoRef.current.src = src;
      }
    } else if (type === "MP4") {
      // 그냥 video 태그에 src 넣으면 됨
      videoRef.current.src = src;
    }
  }, [src, type]);

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: "100%", maxWidth: "640px" }}
    />
  );
}
