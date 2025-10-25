import Image from "next/image";
import LoginStatus from "./LoginStatus";
import SearchIcon from "../icons/Search";
import SearchInput from "../inputs/SearchInput";

export default function Header() {
  return (
    <header className="flex items-center w-full h-[60px] justify-between px-6 text-white">
      <a href="/" className="flex h-full items-center">
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
      <LoginStatus />
    </header>
  );
}
