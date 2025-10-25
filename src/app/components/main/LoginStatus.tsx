"use client";

import { useState, useEffect, Suspense } from "react";
import OpenModalButton from "../modal/ModalOpenButton";
import UserProfile from "./UserProfile";
import { UserInfoContent } from "@/app/types/external/response/user";
import { useModalStore } from "@/app/stores/modalStore";

function LoginStatusContent() {
  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "success"; data: UserInfoContent }
    | { status: "error" }
  >({ status: "loading" });
  const { openModal } = useModalStore();
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/apis/chzzkUserInfo");
        if (!res.ok) throw new Error("API error");
        const data: UserInfoContent = await res.json().then((res) => res.data);
        setState({ status: "success", data });
      } catch (err) {
        // 요청 실패 → 로그인 안 된 상태로 처리
        setState({ status: "error" });
      }
    };

    fetchStatus();
  }, [state.status]);

  if (state.status === "loading") return <p>로딩 중...</p>;

  if (state.status === "error") {
    return <OpenModalButton text="로그인" onClick={openModal} />;
  }

  return state.data.loggedIn ? (
    <UserProfile
      nickname={state.data.nickname}
      profileImageUrl={state.data.profileImageUrl}
    />
  ) : (
    <OpenModalButton text="로그인" onClick={openModal} />
  );
}

export default function LoginStatus() {
  return (
    <div>
      <Suspense fallback={<p className="font-bold">로딩 중...</p>}>
        <LoginStatusContent />
      </Suspense>
    </div>
  );
}
