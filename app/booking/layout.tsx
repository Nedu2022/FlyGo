import { Suspense, type ReactNode } from "react";
import type { Metadata } from "next";
import { BookingProvider } from "@/components/booking/booking-context";
import { NO_INDEX } from "@/lib/seo";

export const metadata: Metadata = { title: "Book your flight", ...NO_INDEX };

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <BookingProvider>{children}</BookingProvider>
    </Suspense>
  );
}
