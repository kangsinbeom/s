"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

// main page에서 사용되는 dashUrl에 대한 대부분의 정보들이 모여있는 hook
const useDashUrl = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dashUrl, setDashUrl] = useState<string>("");
  const router = useRouter();
  // dashUrl 가져오는 핸들러
  const handleDashUrl = async (e: React.FormEvent) => {
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

    const dashUrl = await res.json().then((data) => data.dashUrl);

    if (dashUrl) {
      setDashUrl(dashUrl);

      // ✅ sessionStorage에 저장
      sessionStorage.setItem("dashUrl", dashUrl);

      // ✅ query parameter에 추가 (예: ?preview=true)
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("preview", "true"); // 필요하면 다른 값으로 변경 가능
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      router.replace(newUrl); // 페이지 이동 없이 URL 업데이트
    }
  };

  return { inputRef, handleDashUrl, dashUrl, setDashUrl };
};

export default useDashUrl;

// const handleDashUrl = async (e: React.FormEvent) => {
//     e.preventDefault(); // 페이지 리로드 방지
//     if (!inputRef.current) return;

//     const url = inputRef.current.value;
//     const video_no = url.split("/").pop(); // URL에서 video_no 추출

//     // 🔹 Node.js 서버가 아닌, Next.js API 호출
//     const res = await fetch("/apis/dashUrl", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ video_no }),
//       credentials: "include", // 쿠키 포함
//     });

//     await res.json().then((data) => {
//       setDashUrl(data.baseUrl);
//     });
//   };
