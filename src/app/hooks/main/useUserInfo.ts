"use client";

import { UserInfoContent } from "@/app/types/external/response/user";
import { useEffect, useState } from "react";

const initalUserInfoState: UserInfoContent = {
  hasProfile: false,
  loggedIn: false,
  nickname: "",
  userIdHash: "",
  profileImageUrl: "",
  penalties: [],
  officialNotiAgree: false,
  officialNotiAgreeUpdatedDate: null,
  verifiedMark: false,
};

const useUserInfo = () => {
  const [userInfo, setUserInfo] =
    useState<UserInfoContent>(initalUserInfoState);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.log("not a data");
      }
    })();
  }, []);

  // const { data } = useSuspenseQuery({
  //   queryKey: ["userInfo"],
  //   queryFn: () => fetchUserInfo(),
  //   retry: false,
  // });

  return userInfo;
};

export default useUserInfo;

const fetchUserInfo = async (): Promise<UserInfoContent> => {
  const res = await fetch("/apis/video/chzzkUserInfo", {
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};
