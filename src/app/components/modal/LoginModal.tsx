"use client";

import { useModalStore } from "@/app/stores/modalStore";

const LoginModal = () => {
  const { closeModal } = useModalStore();
  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nidSes = formData.get("nidSes") as string;
    const nidAut = formData.get("nidAut") as string;

    if (!nidSes || !nidAut) {
      alert("둘 다 입력해주세요");
      return;
    }

    // 세션 쿠키 저장
    document.cookie = `NID_SES=${nidSes}; path=/`;
    document.cookie = `NID_AUT=${nidAut}; path=/`;

    try {
      const res = await fetch("/apis/chzzkUserInfo", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 브라우저 쿠키 자동 포함
      });

      if (!res.ok) {
        console.error("BFF 요청 실패:", res.statusText);
        return;
      }

      const data = await res.json();
      console.log("BFF 응답:", data);
    } catch (err) {
      console.error("BFF 요청 중 에러:", err);
    }
    closeModal();
  };

  return (
    <form
      className="flex flex-col gap-4 border-[#f5f6f4] border w-[458px] rounded-xl bg-white p-6 text-[#767678]"
      onSubmit={handleSubmitLogin}
    >
      <div className="flex flex-col">
        <label>NID_SES</label>
        <input
          type="text"
          name="nidSes"
          className="border border-[#c5ccd2] pt-[27px] pb-[8px] px-[15px] rounded-tl-[8px] rounded-tr-[8px]"
        />
      </div>
      <div className="flex flex-col">
        <label>NID_AUT</label>
        <input
          type="text"
          name="nidAut"
          className="border border-[#c5ccd2] pt-[27px] pb-[8px] px-[15px] rounded-bl-[8px] rounded-br-[8px]"
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginModal;
