"use cleint";

import { VideoInfoResponse } from "@/app/types/bff/response/video";
import Button from "../../buttons/Button";
import useDownloadVod from "@/app/hooks/main/useDownloadVideo";
import { useState } from "react";

interface VideoRange {
  start: number;
  end: number;
}

const VideoRange = ({ src, type }: Pick<VideoInfoResponse, "type" | "src">) => {
  const [range, setRange] = useState<VideoRange>({ start: 0, end: 0 });
  const { handleDownloadVod } = useDownloadVod();
  const handleChange = (key: "start" | "end", value: string) => {
    const newRange = { ...range, [key]: Number(value) };
    setRange(newRange);
  };
  return (
    <div className="flex flex-col p-6 border border-[#75FBAA] rounded-xl bg-[#303234] gap-2 ">
      <div className="flex items-center gap-2">
        <label htmlFor="start" className="w-12 text-sm font-medium">
          Start
        </label>
        <input
          id="start"
          type="number"
          value={range.start}
          onChange={(e) => handleChange("start", e.target.value)}
          className="flex-1 px-3 py-2 rounded-md bg-[#1e1f21] border border-gray-600 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="end" className="w-12 text-sm font-medium">
          End
        </label>
        <input
          id="end"
          type="number"
          value={range.end}
          onChange={(e) => handleChange("end", e.target.value)}
          className="flex-1 px-3 py-2 rounded-md bg-[#1e1f21] border border-gray-600 focus:outline-none"
        />
      </div>

      <Button
        text="다운로드 버튼"
        onClick={() => handleDownloadVod({ src, type })}
      />
    </div>
  );
};

export default VideoRange;
