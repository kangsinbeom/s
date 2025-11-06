"use client";

import { usePathname } from "next/navigation";
import Button from "../../buttons/Button";
import { FormEvent } from "react";
import getPathSegments from "@/app/libs/utils/getPathSegments";

const VideoRange = () => {
  const pathname = usePathname();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const video_no = getPathSegments(pathname)[0];
    const { start, end } = getTimeOptions(e);
    const quality = "1080"; // 고정값으로 설정
    const res = await fetch("/apis/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start, end, quality, video_no }),
    });
    const message = await res.json();
    console.log(message);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <input type="text" className="border" name="start" />
      <input type="text" className="border" name="end" />
      <Button text="다운로드" />
    </form>
  );
};

export default VideoRange;

const getTimeOptions = (e: FormEvent<HTMLFormElement>) => {
  const form = e.currentTarget;
  const formData = new FormData(form);
  const start = formData.get("start");
  const end = formData.get("end");
  return { start, end };
};
