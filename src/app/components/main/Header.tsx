import Image from "next/image";
import LoginStatus from "./LoginStatus";

export default function Header() {
  return (
    <header className="flex items-center py-6 px-12">
      <div className="flex items-center gap-2">
        <Image
          src="/images/chzzklogo_kor(White).png"
          alt="Logo"
          width={75}
          height={20}
          style={{ width: 75, height: 20 }}
          priority
        />
        <p className="text-[22px] font-extralight">Downloader</p>
      </div>

      <LoginStatus />
    </header>
  );
}
