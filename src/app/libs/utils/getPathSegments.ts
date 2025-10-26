const getPathSegments = (pathname: string) => {
  if (!pathname) return [];
  const segments = pathname.split("/").filter((segment) => segment.length > 0);
  return segments;
};

export default getPathSegments;
