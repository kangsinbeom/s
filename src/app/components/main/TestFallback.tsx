"use client";

import { FallbackProps } from "@/app/errorBoundary";

const TestFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.log(
    'console.log("----------hi---------------");console.log("----------hi---------------");console.log("----------hi---------------");',
    error
  );
  console.log("----------hi---------------");
  return <span>이게 맞나???</span>;
};
export default TestFallback;
