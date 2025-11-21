import Image from "next/image";
import LoginButton from "../buttons/LoginButton";
import { cookies } from "next/headers";
import { UserInfoContent } from "@/app/types/external/response/user";

const LoginStatus = async () => {
  const cookieStore = await cookies();
  const NID_AUT = cookieStore.get("NID_AUT")?.value;
  const NID_SES = cookieStore.get("NID_SES")?.value;

  const res = await fetch("http://localhost:3000/apis/chzzkUserInfo", {
    headers: {
      Cookie: `NID_AUT=${NID_AUT}; NID_SES=${NID_SES}`,
    },
  });
  const data: UserInfoContent = await res.json().then((res) => res.data);
  return data.loggedIn ? (
    <button className="flex items-center justify-center w-[40px] h-[40px] border-2 rounded-full border-[#00ffa3] overflow-hidden">
      <Image
        src={data.profileImageUrl}
        alt="프로필 이미지"
        width={34}
        height={34}
      />
    </button>
  ) : (
    <LoginButton />
  );
};

export default LoginStatus;
