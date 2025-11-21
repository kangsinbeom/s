import Image from "next/image";
import LoginButton from "../buttons/LoginButton";
import { cookies } from "next/headers";

const LoginStatus = async () => {
  const cookieStore = await cookies();
  const NID_AUT = cookieStore.get("NID_AUT")?.value;
  const NID_SES = cookieStore.get("NID_SES")?.value;

  const res = await fetch("http://localhost:3000/apis/chzzkUserInfo", {
    headers: {
      Cookie: `NID_AUT=${NID_AUT}; NID_SES=${NID_SES}`,
    },
  });
  const data = await res.json();
  console.log(data);
  const isLogined = false;
  return isLogined ? (
    <button className="bg-amber-500 w-[40px] h-[40px]">
      <Image src={""} alt="프로필 이미지" width={34} height={34} />
    </button>
  ) : (
    <LoginButton />
  );
};

export default LoginStatus;

/**
 * 쿠키 등록 완료라고 된 부분을 어떻게 바꿀건지 고쳐야 함 왜냐 이거 유저 정보를 받아오는 부분에서 잘 안되서
 * 쿠키 등록 완료랑 로그인 버튼 이거 바뀌면서 크기 달라지는데 그러면서 header의 비율이 달라짐
 * 이거 신경 쓰이니깐 고쳐야 함
 */
