"use client";

interface UserProfileProps {
  nickname: string;
  profileImageUrl: string;
  size?: number; // optional, 기본 크기 50px
}

export default function UserProfile({
  nickname,
  profileImageUrl,
  size = 50,
}: UserProfileProps) {
  return (
    <div className="flex items-center gap-4">
      <p className="mt-2 text-md font-extrabold text-white">{nickname}</p>
      <img
        src={profileImageUrl}
        alt={nickname}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
