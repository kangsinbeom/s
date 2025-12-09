"use client";

import LoginButton from "../buttons/LoginButton";
import UserProfile from "./UserProfile";
import useUserInfo from "@/app/hooks/main/useUserInfo";

const LoginStatus = () => {
  const { loggedIn, profileImageUrl, nickname } = useUserInfo();

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
