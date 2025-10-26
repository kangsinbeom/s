interface VideoPreviewProps {
  src: string;
}

export default function VideoPreview({ src }: VideoPreviewProps) {
  return (
    <>
      {src && (
        <video
          src={src}
          controls
          style={{ width: "100%", maxWidth: "800px" }}
        />
      )}
    </>
  );
}
