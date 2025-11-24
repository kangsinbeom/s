import { redirect } from "next/navigation";
import SearchIcon from "../icons/Search";
import getVideoId from "@/app/libs/utils/getVideoId";
import { validationChzzkUrl } from "@/app/validation/schema";

const SearchInput = () => {
  return (
    <form
      className="relative flex items-center"
      action={async (formData) => {
        "use server";
        const url = formData.get("url")?.toString() || "";
        try {
          validationChzzkUrl(url);
          const videoId = getVideoId(url);
          return redirect(`/${videoId}`);
        } catch (error) {
          // 에러 처리를 어떻게 해야할까?!
          /**
           * 1. 에러 페이지로 리다이렉트?
           *-> 이거 나쁘지 않은 듯 error page 만들어서 거기로 redirect 시키는 거 좋은데?
           문구만 따로 넣도록 하는거임
           * 2. 이 input 자체를 클라이언트 컴포넌트로 바꾸고, 에러 상태를 로컬 상태로 관리?
           */
        }
      }}
    >
      <input
        className="border py-1.5 rounded-full border-[rgb(77,77,77)] focus:outline-none focus:border-[#009962] caret-[#009962] min-w-[400] px-6"
        placeholder="https://chzzk.naver.com/video/{number}"
        autoComplete="off"
        type="url"
        id="url"
        name="url"
      />
      <button className="absolute right-3 cursor-pointer" type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchInput;
