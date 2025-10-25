"use client";

import React, { useState } from "react";
import SearchIcon from "../icons/Search";
import getVideoId from "@/app/libs/utils/getVideoId";

const SearchInput = () => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoId = getVideoId(e.currentTarget.url.value);
    window.location.href = `/${videoId}`;
  };
  return (
    <form className="relative flex items-center" onSubmit={handleFormSubmit}>
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
