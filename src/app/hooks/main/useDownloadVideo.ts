import { VideoInfoResponse } from "@/app/types/bff/response/video";

const useDownloadVod = () => {
  const handleDownloadVod = ({
    type,
    src,
  }: Pick<VideoInfoResponse, "src" | "type">) => {
    if (type === "MP4") {
      const link = document.createElement("a");
      link.href = src;
      link.download = "video.mp4";
      link.click();
    } else {
      // HLS 다운로드는 백엔드 호출
      downloadHLS({ src });
    }
  };
  const downloadHLS = async ({ src }: Pick<VideoInfoResponse, "src">) => {
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
