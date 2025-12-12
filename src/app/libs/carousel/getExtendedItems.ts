import { CarouselItem } from "@/app/components/carousel/Carousel";

interface getExtendedItemsParams {
  items: CarouselItem[];
  viewCount: number;
}

export const getExtendedItems = ({
  items,
  viewCount,
}: getExtendedItemsParams) => {
  return [...items.slice(-viewCount), ...items, ...items.slice(0, viewCount)];
};
