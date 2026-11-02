"use client";

import { BookingShell } from "@/components/booking/booking-shell";
import { useBooking } from "@/components/booking/booking-context";
import { FlightInfoCard } from "@/components/flights/flight-info-card";
import { FareSummary } from "@/components/flights/fare-summary";
import { TravelersForm } from "@/components/booking/travelers-form";

export default function BookingDetailsPage() {
  const { offer } = useBooking();
  return (
    <BookingShell step={1} aside={<FareSummary />}>
      <FlightInfoCard offer={offer} />
      <TravelersForm />
    </BookingShell>
  );
}
