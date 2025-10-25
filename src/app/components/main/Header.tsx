import Image from "next/image";
import LoginStatus from "./LoginStatus";

export default function Header() {
  return (
    <header className="flex items-center w-full h-[60px] justify-between px-6">
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

      <h1 className="text-3xl font-bold">치지직 VOD 다운로더</h1>
      <LoginStatus />
    </header>
  );
}
