import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import { getQueryClient } from "../libs/utils/queryClient";
import { fetchVodInfoWithCookies } from "../hooks/fetch/vod/fetchVodInfo";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { TimeRangeStoreProvider } from "../stores/provider/timeRange-store-provider";
interface VodLayoutProps extends PropsWithChildren {
  params: { videoId: string };
}

export default async function VodLayout({ children, params }: VodLayoutProps) {
  const cookieStore = await cookies();
  const { videoId } = await params;
  const cookieString = cookieStore.toString();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["videoInfo", videoId],
    queryFn: () => fetchVodInfoWithCookies(videoId, cookieString),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TimeRangeStoreProvider>{children}</TimeRangeStoreProvider>
      </HydrationBoundary>
    </div>
  );
}
