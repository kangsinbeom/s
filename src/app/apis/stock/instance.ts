const BASE_URL = process.env.NEXT_PUBLIC_KIS_URL;

export const instance = async <T = unknown>(
  url: string,
  options?: RequestInit,
) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...options?.headers,
    },
  });

  return res.json() as Promise<T>;
};
