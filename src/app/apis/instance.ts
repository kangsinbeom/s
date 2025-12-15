const STOCK_BASE_URL = process.env.NEXT_PUBLIC_KIS_URL;

export const stockInstance = async <T = unknown>(
  url: string,
  options?: RequestInit
) => {
  const res = await fetch(`${STOCK_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...options?.headers,
    },
  });

  return res.json() as Promise<T>;
};
