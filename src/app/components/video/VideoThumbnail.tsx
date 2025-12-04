import { formatShortDate } from "@/app/libs/utils/date";
import Button from "../buttons/Button";
import VideoIcon from "../icons/Video";
import { VideoInfoResponse } from "@/app/types/bff/response/video";
import Image from "next/image";

type VideoThumbnailProps = Pick<
  VideoInfoResponse,
  | "channel"
  | "publishDate"
  | "tags"
  | "videoCategoryValue"
  | "videoTitle"
  | "thumbnailImageUrl"
>;

const VideoThumbnail = ({
  thumbnailImageUrl,
  channel: { channelImageUrl, channelName },
  publishDate,
  tags,
  videoCategoryValue,
  videoTitle,
}: VideoThumbnailProps) => {
  const date = formatShortDate(publishDate);
  return (
    <div>
      <img
        src={thumbnailImageUrl}
        alt="Thumbnail Image"
        style={{ width: "100%", maxWidth: 800 }}
      />
      <div className="relative">
        <div className="flex pl-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold ">{videoTitle}</h2>
            <div className="flex gap-2 items-center">
              <p className="font-extrabold text-[#75FBAA]">
                {videoCategoryValue}
              </p>
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
              <p className="font-bold text-sm">{date}</p>
            </div>
            {channelImageUrl && (
              <Image
                src={channelImageUrl}
                alt="channalImageUrl"
                width={60}
                height={60}
              />
            )}

            <span>{channelName}</span>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 translate-y-[-50%]">
          <Button text="구간설정" icons={<VideoIcon />} />
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
