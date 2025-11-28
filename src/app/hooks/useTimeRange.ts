import { usePathname } from "next/navigation";
import getPathSegments from "../libs/utils/getPathSegments";
import { FormEvent, useState } from "react";
import { hhmmssToSeconds } from "../libs/utils/date";
import { TimeRange } from "../stores/timeRange";

const useTimeRange = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [timeRanges, setTiemRanges] = useState<TimeRange[]>([]);
  const handleAddTimeRange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const start = formData.get("start") as string;
    const end = formData.get("end") as string;
    setTiemRanges([
      ...timeRanges,
      { start: hhmmssToSeconds(start), end: hhmmssToSeconds(end) },
    ]);
  };
  const handleDeleteTimeRange = (index: number) => {
    setTiemRanges(timeRanges.filter((_, i) => i !== index));
  };

  const onClickDownload = async () => {
    const video_no = getPathSegments(pathname)[0];
    const quality = "1080"; // 고정값으로 설정

    const res = await fetch("/apis/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timeRanges, quality, video_no }),
    });
    const message = await res.json();
  };

  return {
    isOpen,
    setIsOpen,
    timeRanges,
    handleAddTimeRange,
    handleDeleteTimeRange,
    onClickDownload,
  };
};

export default useTimeRange;
