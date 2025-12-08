"use client";

import getPathSegments from "@/app/libs/utils/getPathSegments";
import { VideoInfoResponse } from "@/app/types/bff/response/video";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { fetchVideoInfo } from "../fetch/video/fetchVideoInfo";

const useVideoInfo = () => {
  const pathname = usePathname();
  const video_no = getPathSegments(pathname)[0];
  const { data } = useQuery({
    queryKey: ["videoInfo", video_no],
    queryFn: () => fetchVideoInfo(video_no),
    enabled: !!video_no,
  });

  return data as VideoInfoResponse;
};

export default useVideoInfo;
