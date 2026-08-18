import Image from "next/image";
import Link from "next/link";
import { BookingShell, SectionHeading } from "@/components/booking/booking-shell";
import { FlightInfoCard } from "@/components/flights/flight-info-card";
import { FareSummary } from "@/components/flights/fare-summary";
import { TravelersForm } from "@/components/booking/travelers-form";

export default function BookingDetailsPage() {
  return (
    <BookingShell
      step={1}
      aside={
        <>
          <FareSummary />

          {/* Nudge to add a second passenger, under the fare panel. */}
          <div className="mt-12 text-center">
            <Image
              src="/images/deco/traveller.svg"
              alt=""
              width={249}
              height={249}
              className="mx-auto h-[180px] w-auto"
            />
            <p className="mt-5 text-copy text-ink">
              Booking for more than one passenger?
            </p>
            <Link
              href="/booking/details"
              className="mt-2 inline-block text-copy text-brand transition-colors duration-200 hover:text-brand-hover"
            >
              Add another passenger
            </Link>
          </div>
        </>
      }
    >
      <FlightInfoCard />

      <div className="mt-4">
        <SectionHeading
          icon={<Image src="/images/deco/traveller.svg" alt="" width={30} height={30} className="h-[26px] w-auto" />}
          title="Travelers details"
        />
        <div className="mt-6">
          <TravelersForm />
        </div>
      </div>
    </BookingShell>
  );
}
