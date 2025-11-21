import Image from "next/image";
import LoginStatus from "./LoginStatus";
import SearchInput from "../inputs/SearchInput";
import Modal from "../modal/Modal";
import LoginModal from "../modal/LoginModal";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Header() {
  const cookieStore = cookies();
  const NID_SES = (await cookieStore).get("NID_SES");
  const NID_AUT = (await cookieStore).get("NID_AUT");
  const initialIsLogined = NID_SES && NID_AUT ? true : false;
  return (
    <header className="flex items-center w-full h-[60px] justify-between px-6 text-white">
      <a href="/" className="flex h-full items-center flex-shrink-0">
        <Image
          src="/images/chzzkDownloaderLogo.png"
          alt="Logo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-[40%] w-auto object-contain"
          priority
        />
      </a>
      <SearchInput />
      <Suspense fallback={<span>로딩중...</span>}>
        <LoginStatus />
      </Suspense>
      <Modal>
        <LoginModal />
      </Modal>
    </header>
  );
}
