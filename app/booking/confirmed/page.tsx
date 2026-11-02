"use client";

import { useBooking } from "@/components/booking/booking-context";
import { Confirmation, DetailRow } from "@/components/booking/confirmation";
import { AirlineMark, Leg } from "@/components/flights/flight-result-card";
import { includedBags } from "@/lib/duffel";
import { day, money } from "@/lib/format";

/** Duffel returns a 6-character airline booking reference on the order. */
function reference(id: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let n = [...id].reduce((sum, c) => sum * 31 + c.charCodeAt(0), 7) >>> 0;
  return Array.from({ length: 6 }, () => {
    const c = chars[n % chars.length];
    n = Math.floor(n / chars.length) + 97;
    return c;
  }).join("");
}

export default function BookingConfirmedPage() {
  const { offer, passenger, seat, bags, total } = useBooking();
  const name = passenger ? `${passenger.given_name} ${passenger.family_name}` : "Traveller";

  return (
    <Confirmation
      title="Your flight is booked"
      referenceLabel="Booking reference"
      reference={reference(offer.id)}
      email={passenger?.email}
      next={{ label: "Find a hotel", href: "/hotels" }}
    >
      <div className="flex items-center gap-3">
        <AirlineMark carrier={offer.owner} size={36} />
        <p className="text-copy font-semibold text-ink">{offer.owner.name}</p>
      </div>

      <div className="mt-5 space-y-5">
        {offer.slices.map((slice) => (
          <div key={slice.id}>
            <p className="mb-2 text-tiny text-label">{day(slice.segments[0].departing_at)}</p>
            <Leg slice={slice} />
          </div>
        ))}
      </div>

      <dl className="mt-6 space-y-2.5 border-t border-line pt-5">
        <DetailRow label="Passenger" value={name} />
        <DetailRow label="Seat" value={seat ? seat.designator : "At check-in"} />
        <DetailRow label="Checked bags" value={includedBags(offer).checked + bags} />
        <DetailRow label="Paid" value={money(total, offer.total_currency)} />
      </dl>
    </Confirmation>
  );
}
