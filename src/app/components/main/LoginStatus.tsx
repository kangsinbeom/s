"use client";

import React from "react";
import Button from "../buttons/Button";
import { useModalStore } from "@/app/stores/modalStore";
import { useInitalizeAuth } from "@/app/hooks/useInitalizeAuth";
import { useAuthStore } from "@/app/stores/useAuthStore";

interface LoginStatusProps {
  initialIsLogined: boolean;
}

const LoginStatus = ({ initialIsLogined }: LoginStatusProps) => {
  useInitalizeAuth(initialIsLogined);
  const isLogined = useAuthStore((s) => s.isLogined);
  const openModal = useModalStore((s) => s.openModal);
  return isLogined ? (
    <p>쿠키 등록 완료</p>
  ) : (
    <Button text="로그인" onClick={openModal} />
  );
};

export default LoginStatus;

/**
 * 쿠키 등록 완료라고 된 부분을 어떻게 바꿀건지 고쳐야 함 왜냐 이거 유저 정보를 받아오는 부분에서 잘 안되서
 * 쿠키 등록 완료랑 로그인 버튼 이거 바뀌면서 크기 달라지는데 그러면서 header의 비율이 달라짐
 * 이거 신경 쓰이니깐 고쳐야 함
 */
