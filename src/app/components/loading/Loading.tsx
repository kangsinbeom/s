"use client";

import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    // token 받아오기
    const getToken = async () => {
      await fetch("/api/token", {
        method: "POST",
      });
    };
    getToken();
  }, []);

  return <div>Loading</div>;
};

export default Loading;
