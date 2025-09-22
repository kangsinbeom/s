import { NextRequest } from "next/server";

const getReqSearchParams = (req: NextRequest, keyword: string) => {
  const url = new URL(req.url);
  const params = url.searchParams.get(keyword);
  if (!params) {
    throw new Error(`Missing required query parameter: ${keyword}`);
  }
  return params;
};

export default getReqSearchParams;
