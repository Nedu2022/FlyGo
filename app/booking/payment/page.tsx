"use client";

import { useRouter } from "next/navigation";
import { BookingShell } from "@/components/booking/booking-shell";
import { useBooking } from "@/components/booking/booking-context";
import { FareSummary } from "@/components/flights/fare-summary";
import { PaymentForm } from "@/components/booking/payment-form";
import { money } from "@/lib/format";

export default function BookingPaymentPage() {
  const router = useRouter();
  const { offer, total } = useBooking();
  return (
    <BookingShell step={3} aside={<FareSummary />}>
      <PaymentForm amount={money(total, offer.total_currency)} onPaid={() => router.push("/booking/confirmed")} />
    </BookingShell>
  );
}
