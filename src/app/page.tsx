"use client";

import VideoIcon from "./components/icons/Video";
import Button from "./components/buttons/Button";
import VodInput from "./components/inputs/VodInput";
import { useRef } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 리로드 방지
    if (inputRef.current) {
      const res = await fetch("http://127.0.0.1:8000/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: inputRef.current.value,
          output_name: "output.mp4",
        }),
      });
      const data = await res.json();
      console.log(data.message);
    }
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
