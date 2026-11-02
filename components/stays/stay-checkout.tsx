"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { BookingShell, Panel } from "@/components/booking/booking-shell";
import { PaymentForm } from "@/components/booking/payment-form";
import { Confirmation, DetailRow } from "@/components/booking/confirmation";
import { useAuth } from "@/components/auth/auth-context";
import { TextField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";
import { STAY_SEARCH, cancelBy, currency, findRate, getStay, total } from "@/lib/liteapi";
import { day, money, nights } from "@/lib/format";

const STEPS = ["Guest", "Payment"] as const;

/** LiteAPI's holder fields for POST /rates/book. */
type Holder = { firstName: string; lastName: string; email: string; phone: string; remarks: string };

/** Prebook → guest → pay → booked, for one LiteAPI rate. */
export function StayCheckout({ hotelId, offerId }: { hotelId: string; offerId?: string }) {
  const { user } = useAuth();
  const hotel = getStay(hotelId)!;
  const rate = findRate(hotel, offerId);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [holder, setHolder] = useState<Holder | null>(null);

  const price = money(total(rate), currency(rate));
  const until = cancelBy(rate);
  const stayNights = nights(STAY_SEARCH.checkin, STAY_SEARCH.checkout);

  if (step === 3 && holder) {
    return (
      <Confirmation
        title="Your stay is booked"
        referenceLabel="Confirmation code"
        reference={`${hotel.id.slice(2, 6).toUpperCase()}${rate.rateId.length}${hotel.reviewCount % 997}`}
        email={holder.email}
        next={{ label: "Find a flight", href: "/flights" }}
      >
        <p className="text-copy font-semibold text-ink">{hotel.name}</p>
        <p className="text-small text-label">{hotel.address}</p>
        <dl className="mt-5 space-y-2.5">
          <DetailRow label="Guest" value={`${holder.firstName} ${holder.lastName}`} />
          <DetailRow label="Check-in" value={`${day(STAY_SEARCH.checkin)}, from ${hotel.checkinCheckoutTimes.checkin}`} />
          <DetailRow label="Check-out" value={`${day(STAY_SEARCH.checkout)}, by ${hotel.checkinCheckoutTimes.checkout}`} />
          <DetailRow label="Room" value={`${rate.name} · ${rate.boardName}`} />
          <DetailRow label="Cancellation" value={until ? `Free until ${until}` : "Non-refundable"} />
          <DetailRow label="Paid" value={price} />
        </dl>
      </Confirmation>
    );
  }

  const summary = (
    <div className="rounded-2xl bg-white p-5 sm:p-6">
      <div className="flex gap-3">
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-shell">
          <Image src={hotel.main_photo} alt="" fill sizes="80px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 text-copy font-semibold leading-snug text-ink">{hotel.name}</p>
          <p className="mt-0.5 text-tiny text-label">{rate.name}</p>
        </div>
      </div>

      <dl className="mt-5 space-y-2.5">
        <DetailRow label="Dates" value={`${day(STAY_SEARCH.checkin)} – ${day(STAY_SEARCH.checkout)}`} />
        <DetailRow label="Guests" value={`${STAY_SEARCH.adults} adults · ${stayNights} nights`} />
        <DetailRow label="Meals" value={rate.boardName} />
        <DetailRow label="Cancellation" value={until ? `Free until ${until}` : "Non-refundable"} />
      </dl>

      <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
        <span className="text-copy font-semibold text-ink">Total</span>
        <span className="text-h3 font-bold text-ink">{price}</span>
      </div>
      <p className="mt-1 text-right text-tiny text-label">Taxes included</p>
    </div>
  );

  function saveGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    const get = (key: string) => String(f.get(key) ?? "").trim();
    setHolder({
      firstName: get("firstName"),
      lastName: get("lastName"),
      email: get("email"),
      phone: get("phone"),
      remarks: get("remarks"),
    });
    setStep(2);
    window.scrollTo(0, 0);
  }

  return (
    <BookingShell step={step} steps={STEPS} aside={summary}>
      {step === 1 ? (
        <form onSubmit={saveGuest} className="flex flex-col gap-6">
          <Panel title="Main guest">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="First name" name="firstName" required autoComplete="given-name" defaultValue={holder?.firstName} />
              <TextField label="Last name" name="lastName" required autoComplete="family-name" defaultValue={holder?.lastName} />
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                defaultValue={holder?.email ?? user?.email}
              />
              <TextField
                label="Phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+234 801 234 5678"
                defaultValue={holder?.phone ?? user?.phone}
              />
              <TextField
                label="Requests for the property (optional)"
                name="remarks"
                placeholder="e.g. late arrival"
                defaultValue={holder?.remarks}
                className="sm:col-span-2"
              />
            </div>
          </Panel>
          <PrimaryButton className="sm:max-w-[240px]">Continue</PrimaryButton>
        </form>
      ) : (
        <PaymentForm amount={price} onPaid={() => setStep(3)} />
      )}
    </BookingShell>
  );
}
