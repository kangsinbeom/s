import Image from "next/image";
import LoginStatus from "./LoginStatus";
import SearchInput from "../inputs/SearchInput";
import Modal from "../modal/Modal";
import LoginModal from "../modal/LoginModal";
import { Suspense } from "react";

export default async function Header() {
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
