"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "../buttons/Button";
import VideoIcon from "../icons/Video";
import UpIcon from "../icons/Up";
import Link from "next/link";

interface UserProfileProps {
  profileImageUrl: string;
  nickname: string;
}

export default function UserProfile({
  profileImageUrl,
  nickname,
}: UserProfileProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative z-[9999]">
      <button
        className="flex items-center justify-center w-[40px] h-[40px] border-[3px] rounded-full border-[#00ffa3] overflow-hidden cursor-pointer hover:border-4"
        onClick={() => setIsOpen((value) => !value)}
      >
        <Image
          src={profileImageUrl}
          alt="프로필 이미지"
          width={34}
          height={34}
        />
      </button>
      {isOpen && (
        <div className="absolute bg-[#1C1D1F] w-[216px] h-[200px] -translate-x-4/5 translate-y-2 rounded-xl p-3 text-[#9EA5B7]">
          <div className="flex px-2 py-1 gap-2">
            <div className="overflow-hidden rounded-full w-fit h-fit">
              <Image
                src={profileImageUrl}
                alt="프로필 이미지"
                width={42}
                height={42}
              />
            </div>
            <div className="flex flex-col flex-1 justify-center">
              <span className="text-sm ">네이버 게임 프로필</span>
              <span className="text-md font-bold ">{nickname}</span>
            </div>
          </div>
          <div className=" flex flex-col px-2 mt-3 border-t border-t-[#2F3033] pt-3">
            <Link href="/">
              <Button
                icons={<VideoIcon />}
                text="VOD 다운로더"
                styleType="noneRounded"
                size="full"
                textAlign="start"
              />
            </Link>
            <Link href="/stock">
              <Button
                icons={<UpIcon />}
                text="주식 차트"
                styleType="noneRounded"
                size="full"
                textAlign="start"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
