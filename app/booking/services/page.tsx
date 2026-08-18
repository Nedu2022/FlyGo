import { BookingShell } from "@/components/booking/booking-shell";
import { FareSummary } from "@/components/flights/fare-summary";
import { ServicePanels } from "@/components/booking/service-panels";

export default function BookingServicesPage() {
  return (
    <BookingShell step={2} aside={<FareSummary />}>
      <ServicePanels />
    </BookingShell>
  );
}
