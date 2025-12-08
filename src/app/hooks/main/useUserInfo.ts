"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../fetch/user/fetchUserInfo";

const useUserInfo = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(),
  });
  return data;
};

export default useUserInfo;
//
