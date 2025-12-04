const useDownloadVod = () => {
  // const handleDownloadVod = ({
  //   type,
  //   src,
  // }: Pick<VideoInfoResponse, "src" | "type">) => {
  //   if (type === "MP4") {
  //     const link = document.createElement("a");
  //     link.href = src;
  //     link.download = "video.mp4";
  //     link.click();
  //   } else {
  //     // HLS 다운로드는 백엔드 호출
  //     downloadHLS({ src });
  //   }
  // };

  const handleDownloadVod = async ({ src }: { src: string }) => {
    try {
      const res = await fetch(
        `/apis/vod/download?url=${encodeURIComponent(src)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("다운로드 요청 실패");
      }

      // blob으로 변환
      const blob = await res.blob();

      // 브라우저 다운로드 트리거
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "vod.mp4"; // 파일명
      document.body.appendChild(a);
      a.click();
      // 메모리 정리
      URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (err) {
      console.error("다운로드 에러:", err);
    }
  };

  const downloadHLS = async ({ src }: { src: string }) => {
    try {
      const res = await fetch(`/apis/download?url=${encodeURIComponent(src)}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 쿠키 포함
      });
      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "vod.mp4";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("다운로드 실패");
    }
  };

  return { handleDownloadVod };
};

export default useDownloadVod;
