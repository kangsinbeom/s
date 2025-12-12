import { PropsWithChildren } from "react";
import { CarouselStoreProvider } from "../stores/store-providers/carousel-store-provider";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen">
      <CarouselStoreProvider>{children}</CarouselStoreProvider>
    </div>
  );
}
