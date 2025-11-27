import z from "zod";

// URL
export const validationChzzkUrl = (url: string) => {
  const chzzkUrlSchema = z.url({
    protocol: /^https?$/,
    hostname: /^chzzk\.naver\.com$/,
  });
  return chzzkUrlSchema.safeParse(url);
};
