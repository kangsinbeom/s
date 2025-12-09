"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { UserInfoContent } from "@/app/types/external/response/user";

const useUserInfo = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(),
  });
  return data;
};

export default useUserInfo;

const fetchUserInfo = async (): Promise<UserInfoContent> => {
  const res = await fetch("/apis/video/chzzkUserInfo");
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};
