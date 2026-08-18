import { BookingShell } from "@/components/booking/booking-shell";
import { FareSummary } from "@/components/flights/fare-summary";
import { PaymentForm } from "@/components/booking/payment-form";

export default function BookingPaymentPage() {
  return (
    <BookingShell step={3} aside={<FareSummary />}>
      <PaymentForm />
    </BookingShell>
  );
}
