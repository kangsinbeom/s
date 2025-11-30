import LoginButton from "../buttons/LoginButton";
import { cookies } from "next/headers";
import { UserInfoContent } from "@/app/types/external/response/user";
import UserProfile from "./UserProfile";

const LoginStatus = async () => {
  const cookieStore = await cookies();
  const NID_AUT = cookieStore.get("NID_AUT")?.value;
  const NID_SES = cookieStore.get("NID_SES")?.value;

  const res = await fetch("http://localhost:3000/apis/vod/chzzkUserInfo", {
    headers: {
      Cookie: `NID_AUT=${NID_AUT}; NID_SES=${NID_SES}`,
    },
  });
  const { loggedIn, profileImageUrl, nickname }: UserInfoContent = await res
    .json()
    .then((res) => res.data);
  return (
    <div className="w-fit h-fit">
      {loggedIn ? (
        <UserProfile profileImageUrl={profileImageUrl} nickname={nickname} />
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default LoginStatus;
