"use client";

import VideoIcon from "./components/icons/Video";
import Button from "./components/buttons/Button";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h1 className="text-5xl font-bold">치지직 VOD 다운로더</h1>
      <input
        className="border px-4 py-2 rounded-full border-[#4d4d4d]"
        type="text"
      />
      <Button icons={<VideoIcon />} text="VOD 가져오기" onClick={() => {}} />
    </div>
  );
}
