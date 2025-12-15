"use client";

import { useEffect } from "react";

const TestArea = () => {
  useEffect(() => {
    (async () => {
      const res = await fetchData();
      console.log(res);
    })();
  }, []);

  return <div>TestArea</div>;
};

export default TestArea;

const fetchData = async () => {
  await fetch("/apis/test");
};
