"use client";

import type { ReactNode } from "react";
import { useBooking } from "@/components/booking/booking-context";
import { includedBags, rules } from "@/lib/duffel";
import { money } from "@/lib/format";

/** Price breakdown and fare rules from the Duffel offer, beside every step. */
export function FareSummary() {
  const { offer, bags, seat, total } = useBooking();
  const currency = offer.total_currency;
  const bag = offer.available_services[0];
  const included = includedBags(offer);
  const { refund_before_departure: refund, change_before_departure: change } = offer.conditions;
  const { refundable, changeable } = rules(offer);
  const held = new Date(offer.expires_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6">
      <h2 className="text-h4 font-semibold text-ink">Price</h2>

      <dl className="mt-4 space-y-2.5 text-small">
        <Row label="Fare, 1 adult" value={money(offer.base_amount, currency)} />
        <Row label="Taxes and fees" value={money(offer.tax_amount, currency)} />
        {bags ? <Row label={`Checked bag × ${bags}`} value={money(bags * Number(bag.total_amount), currency)} /> : null}
        {seat ? <Row label={`Seat ${seat.designator}`} value={seat.amount ? money(seat.amount, currency) : "Free"} /> : null}
      </dl>

      <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
        <span className="text-copy font-semibold text-ink">Total</span>
        <span className="text-h3 font-bold text-ink">{money(total, currency)}</span>
      </div>

      <dl className="mt-5 space-y-2.5 rounded-xl bg-shell p-4 text-small">
        <Row label="Bags" value={`${included.carryOn} cabin, ${included.checked} checked`} />
        <Row
          label="Refund"
          value={refundable ? `${money(refund?.penalty_amount ?? 0, currency)} fee` : "Not refundable"}
          tone={refundable ? undefined : "muted"}
        />
        <Row
          label="Changes"
          value={changeable ? (Number(change?.penalty_amount) ? `${money(change?.penalty_amount ?? 0, currency)} fee` : "Free") : "Not allowed"}
          tone={changeable ? undefined : "muted"}
        />
      </dl>

      <p className="mt-4 text-tiny text-label">Price held until {held}</p>
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: ReactNode; tone?: "muted" }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-body">{label}</dt>
      <dd className={`text-right font-medium ${tone ? "text-label" : "text-ink"}`}>{value}</dd>
    </div>
  );
}
