"use client";

import { FallbackProps } from "@/app/errorBoundary";

const TestFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.log(error);
  return <span>이게 맞나???</span>;
};
export default TestFallback;
