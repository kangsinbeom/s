interface VideoPreviewProps {
  dashUrl: string;
}

export default function VideoPreview({ dashUrl }: VideoPreviewProps) {
  const handleDownload = () => {
    // 다운로드 API 호출
  };

  return (
    <div>
      <div>
        <video src={dashUrl} controls width="640" />
        <button onClick={handleDownload}>다운로드</button>
      </div>
    </div>
  );
}
