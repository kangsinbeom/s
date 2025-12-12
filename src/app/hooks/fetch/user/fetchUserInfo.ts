import { UserInfoContent } from "@/app/types/external/response/user";

export const fetchUserInfo = async () => {
  const res = await fetch("/apis/vod/chzzkUserInfo", {
    credentials: "include",
  });
  try {
    const data: UserInfoContent = await res.json();

    if (!data.loggedIn) throw new Error("유저 정보 없음");
    return data;
  } catch (error) {
    throw new Error("Error fetching user info:" + error);
  }
};
