"use client";

import useGetTokenAndKey from "@/app/hooks/auth/useGetTokenAndKey";

const AuthPage = () => {
  useGetTokenAndKey();
  return <div>AuthPage</div>;
};

export default AuthPage;
