"use client";

import { useModalStore } from "@/app/stores/modalStore";
import { useAuthStore } from "@/app/stores/useAuthStore";

const LoginModal = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const setLogined = useAuthStore((s) => s.setLogined);
  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveTheCookiesFromFormData(e);
    setLogined(true);
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

const saveTheCookiesFromFormData = (e: React.FormEvent<HTMLFormElement>) => {
  const formData = new FormData(e.currentTarget);
  const nidSes = formData.get("nidSes") as string;
  const nidAut = formData.get("nidAut") as string;

  if (!nidSes || !nidAut) {
    alert("둘 다 입력해주세요");
  }
  document.cookie = `NID_SES=${nidSes}; path=/`;
  document.cookie = `NID_AUT=${nidAut}; path=/`;
};
