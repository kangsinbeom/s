"use client";

import PlusIcons from "../icons/Plus";
import Button from "../buttons/Button";
import DownloadIcon from "../icons/Download";
import useTimeRange from "@/app/hooks/useTimeRange";
import { useTimeRangeModalStore } from "@/app/stores/timeRangeModalStore";
import VideoIcon from "../icons/Video";
import { secondsToHHMMSS } from "@/app/libs/utils/date";

const TimeRangeModal = () => {
  const {
    handleAddTimeRange,
    handleDeleteTimeRange,
    onClickDownload,
    timeRanges,
  } = useTimeRange();
  const toggleModal = useTimeRangeModalStore((state) => state.toggleModal);
  const isOpen = useTimeRangeModalStore((state) => state.isOpen);

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
              <li key={index} className="flex justify-evenly" value={index}>
                <span>{secondsToHHMMSS(range.start)}</span>
                <span> ~ </span>
                <span>{secondsToHHMMSS(range.end)}</span>
                <button onClick={() => handleDeleteTimeRange(index)}>
                  제거
                </button>
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
