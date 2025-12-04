import { useTimeRangeStore } from "@/app/stores/store-providers/timeRange-store-provider";
import { MediaPlayerInstance } from "@vidstack/react";
import { useEffect, useRef } from "react";

const useSetVideo = () => {
  const { currentTime, setCurrentTime } = useTimeRangeStore((state) => state);
  const ref = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (ref.current) {
        setCurrentTime(Math.floor(ref.current.currentTime));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return { ref, currentTime };
};

export default useSetVideo;
