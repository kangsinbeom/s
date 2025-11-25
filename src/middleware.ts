import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasApprovalAndAccessToken } from "./app/libs/stock/auth";

// 이 함수는 내부에서 `await`를 사용하는 경우 `async`로 표시될 수 있습니다
export function middleware(request: NextRequest) {
  const hasAuth = hasApprovalAndAccessToken(request);
  if (!hasAuth) {
    return NextResponse.rewrite(new URL("stock/auth", request.url));
  }
  return NextResponse.next();
}

// 아래 "Matching Paths"를 참조하여 자세히 알아보세요
export const config = {
  matcher: ["/stock"],
};
