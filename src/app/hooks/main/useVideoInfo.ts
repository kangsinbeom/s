"use client";

import getPathSegments from "@/app/libs/utils/getPathSegments";
import { VideoInfoResponse } from "@/app/types/bff/response/video";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// main page에서 사용되는 dashUrl에 대한 대부분의 정보들이 모여있는 hook
const useVideoInfo = () => {
  const pathname = usePathname();
  const video_no = getPathSegments(pathname)[0];

  const [videoInfo, setVideoInfo] = useState<VideoInfoResponse>({
    src: "",
    type: "HLS",
    publishDate: "",
    videoTitle: "",
    videoCategoryValue: "",
    tags: [],
    duration: 0,
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/apis/chzzkVodInfo?videoNo=${video_no}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 쿠키 포함
        });

        const data: VideoInfoResponse = await res.json();
        setVideoInfo(data);
        // ✅ sessionStorage에 저장
        sessionStorage.setItem("storedSrc", JSON.stringify(data));
        // ✅ query parameter에 추가 (예: ?preview=true)
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("preview", "true"); // 필요하면 다른 값으로 변경 가능
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      } catch (error) {
        console.error("Error fetching video info:", error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   const storedSrc = sessionStorage.getItem("storedSrc");
  //   if (storedSrc) {
  //     setVideoInfo(JSON.parse(storedSrc));
  //   }
  // }, []);

  return { videoInfo, setVideoInfo };
};

export default useVideoInfo;
