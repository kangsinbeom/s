"use client";

import PlusIcons from "../icons/Plus";
import Button from "../buttons/Button";
import DownloadIcon from "../icons/Download";
import { useTimeRangeModalStore } from "@/app/stores/timeRangeModalStore";
import VideoIcon from "../icons/Video";
import { hhmmssToSeconds, secondsToHHMMSS } from "@/app/libs/utils/date";
import { FormEvent } from "react";
import getPathSegments from "@/app/libs/utils/getPathSegments";
import { usePathname } from "next/navigation";
import { useTimeRangeStore } from "@/app/stores/store-providers/timeRange-store-provider";

const TimeRangeModal = () => {
  const pathname = usePathname();
  // const onClickDownload = async () => {
  //   const video_no = getPathSegments(pathname)[0];
  //   const quality = "1080"; // 고정값으로 설정
  //   const res = await fetch("/apis/test", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ timeRange, quality, video_no }),
  //   });
  //   const message = await res.json();
  // };

  const onClickDownload = async () => {
    const video_no = getPathSegments(pathname)[0];
    const timeRanges = [{ start: 0, end: 120 }]; // 예시: 0~120초

    try {
      const res = await fetch("/apis/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_no, timeRanges }),
      });
      const data = await res.json();
      console.log(data.data);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const { timeRanges, addTimeRange, deleteTimeRange, moveToCurrentTime } =
    useTimeRangeStore((state) => state);

  const toggleModal = useTimeRangeModalStore((state) => state.toggleModal);

  const isOpen = useTimeRangeModalStore((state) => state.isOpen);

  const handleAddTimeRange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const start = formData.get("start") as string;
    const end = formData.get("end") as string;
    addTimeRange({ start: hhmmssToSeconds(start), end: hhmmssToSeconds(end) });
  };
  return (
    <div className="relative">
      <Button text="구간설정" icons={<VideoIcon />} onClick={toggleModal} />
      {isOpen && (
        <div className="absolute bottom-0 left-0 translate-x-[50%] w-[300px] h-[350px] bg-[#2a2c2f] rounded-2xl border-2 border-[#00ffa3] flex flex-col px-4 pt-8 pb-4 gap-4 items-center">
          <form className="flex gap-2 w-full" onSubmit={handleAddTimeRange}>
            <input type="text" className="border w-[80px]" name="start" />
            <input type="text" className="border w-[80px]" name="end" />
            <button className="ml-auto hover:cursor-pointer" type="submit">
              <PlusIcons />
            </button>
          </form>
          <ul className="bg-[#4d4d4d] w-full h-full rounded-2xl p-4 gap-2">
            {timeRanges.map((range, index) => (
              <li
                key={index}
                className="flex justify-evenly"
                value={index}
                onClick={() => moveToCurrentTime(index)}
              >
                <span>{secondsToHHMMSS(range.start)}</span>
                <span> ~ </span>
                <span>{secondsToHHMMSS(range.end)}</span>
                <button onClick={() => deleteTimeRange(index)}>제거</button>
              </li>
            ))}
          </ul>
          <Button
            text="다운로드"
            icons={<DownloadIcon />}
            onClick={onClickDownload}
          />
        </div>
      )}
    </div>
  );
};

export default TimeRangeModal;
