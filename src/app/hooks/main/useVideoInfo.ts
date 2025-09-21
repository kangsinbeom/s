"use client";

import { VideoInfoResponse } from "@/app/types/bff/response/video";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// main page에서 사용되는 dashUrl에 대한 대부분의 정보들이 모여있는 hook
const useVideoInfo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfoResponse>({
    src: "",
    type: "HLS",
    publishDate: "",
    videoTitle: "",
    videoCategoryValue: "",
    tags: [],
  });

  const router = useRouter();
  // dashUrl 가져오는 핸들러
  const handleVideoInfo = async (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 리로드 방지
    if (!inputRef.current) return;

    const url = inputRef.current.value;
    const video_no = url.split("/").pop(); // URL에서 video_no 추출

    // 🔹 Next.js API 호출
    const res = await fetch("/apis/dashUrl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video_no }),
      credentials: "include", // 쿠키 포함
    });

    const data: VideoInfoResponse = await res.json();

    if (data.src) {
      setVideoInfo(data);

      // ✅ sessionStorage에 저장
      sessionStorage.setItem("storedSrc", JSON.stringify(data));

      // ✅ query parameter에 추가 (예: ?preview=true)
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("preview", "true"); // 필요하면 다른 값으로 변경 가능
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      router.replace(newUrl); // 페이지 이동 없이 URL 업데이트
    }
  };
  useEffect(() => {
    const storedSrc = sessionStorage.getItem("storedSrc");
    if (storedSrc) {
      setVideoInfo(JSON.parse(storedSrc));
    }
  }, []);

  return { inputRef, handleVideoInfo, videoInfo, setVideoInfo };
};

export default useVideoInfo;
