import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import { getQueryClient } from "../libs/utils/queryClient";
import { fetchVideoInfoWithCookies } from "../hooks/fetch/video/fetchVideoInfo";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { TimeRangeStoreProvider } from "../stores/store-providers/timeRange-store-provider";
interface LayoutProps extends PropsWithChildren {
  params: { videoId: string };
}

export default async function Layout({ children, params }: LayoutProps) {
  const cookieStore = await cookies();
  const { videoId } = params;
  const cookieString = cookieStore.toString();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["videoInfo", videoId],
    queryFn: () => fetchVideoInfoWithCookies(videoId, cookieString),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TimeRangeStoreProvider>{children}</TimeRangeStoreProvider>
      </HydrationBoundary>
    </div>
  );
}
