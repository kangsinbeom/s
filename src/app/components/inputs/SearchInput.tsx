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
        const isVideoId = validationChzzkUrl(url);
        if (isVideoId) {
          const videoId = getVideoId(url);
          return redirect(`/${videoId}`);
        } else {
          console.error("Invalid URL");
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
