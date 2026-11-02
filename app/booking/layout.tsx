import { Suspense, type ReactNode } from "react";
import { BookingProvider } from "@/components/booking/booking-context";

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <BookingProvider>{children}</BookingProvider>
    </Suspense>
  );
}
