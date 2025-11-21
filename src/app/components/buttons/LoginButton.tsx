"use client";

import { useModalStore } from "@/app/stores/modalStore";
import Button from "./Button";

const LoginButton = () => {
  const openModal = useModalStore((s) => s.openModal);
  return <Button text="로그인" onClick={openModal} />;
};

export default LoginButton;
