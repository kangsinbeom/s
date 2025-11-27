"use client";

import getPathSegments from "@/app/libs/utils/getPathSegments";
import { VideoApiResponse } from "@/app/types/bff/response/video";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { fetchVodInfo } from "../fetch/vod/fetchVodInfo";

const useVideoInfo = () => {
  const pathname = usePathname();
  const video_no = getPathSegments(pathname)[0];
  const { data } = useSuspenseQuery({
    queryKey: ["videoInfo", video_no],
    queryFn: () => fetchVodInfo(video_no),
    staleTime: Infinity,
  });

  return data as VideoApiResponse;
};

export default useVideoInfo;
