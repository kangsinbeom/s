"use client";

import VideoIcon from "./components/icons/Video";
import Button from "./components/buttons/Button";
import VodInput from "./components/inputs/VodInput";
import { useRef } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 리로드 방지
    if (!inputRef.current) return;

    const url = inputRef.current.value;
    const video_no = url.split("/").pop(); // URL에서 video_no 추출

    // 🔹 Node.js 서버가 아닌, Next.js API 호출
    const res = await fetch("/apis/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video_no }),
      credentials: "include", // 쿠키 포함
    });

    const data = await res.json();
    console.log(data); // Node.js 서버에서 가져온 결과
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-28">
      <h1 className="text-5xl font-bold">치지직 VOD 다운로더</h1>
      <form
        className="flex flex-col justify-center gap-8 items-start"
        onSubmit={handleDownload}
      >
        <VodInput label="VOD URL" ref={inputRef} />
        <Button icons={<VideoIcon />} text="VOD 가져오기" />
      </form>
    </div>
  );
}
