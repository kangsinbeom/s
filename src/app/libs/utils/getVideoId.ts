const getVideoId = (url: string) => {
  const trimedUrl = url.trim();
  const match = trimedUrl.match(/chzzk\.naver\.com\/video\/(\d+)/); // 2개의 요소를 가진 배열이 나온다~
  const videoId = match ? match[1] : null;
  return videoId;
};

export default getVideoId;
