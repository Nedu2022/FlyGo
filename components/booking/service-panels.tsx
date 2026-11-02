"use client";

import { Luggage, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { Panel } from "@/components/booking/booking-shell";
import { useBooking } from "@/components/booking/booking-context";
import { includedBags } from "@/lib/duffel";
import { money } from "@/lib/format";

/* Sample cabin until Duffel's seat maps (GET /air/seat_maps) are wired. */
const ROWS = Array.from({ length: 10 }, (_, i) => 18 + i);
const LEFT = ["A", "B", "C"];
const RIGHT = ["D", "E", "F"];

function seatInfo(row: number, letter: string) {
  const col = "ABCDEF".indexOf(letter);
  const taken = (row * 7 + col * 3) % 5 === 0 || (row + col) % 7 === 0;
  // Exit rows carry extra legroom; window and aisle cost a little; middles are free.
  const amount = row <= 19 ? 35 : letter === "B" || letter === "E" ? 0 : 15;
  return { taken, amount };
}

/** Paid extras Duffel sells on the offer: checked bags and seats. */
export function ServicePanels() {
  const { offer, bags, setBags, seat, setSeat } = useBooking();
  const bag = offer.available_services[0];
  const included = includedBags(offer).checked;
  const currency = offer.total_currency;

  return (
    <div className="flex flex-col gap-6">
      <Panel title="Checked bags">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-shell text-ink">
            <Luggage size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-copy font-medium text-ink">Extra bag, up to {bag.metadata.maximum_weight_kg} kg</p>
            <p className="text-small text-label">
              {included} included · {money(bag.total_amount, currency)} each
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Remove a bag"
              disabled={bags === 0}
              onClick={() => setBags(bags - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-shell text-ink disabled:opacity-40"
            >
              <Minus size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <span className="w-4 text-center text-copy font-semibold text-ink" aria-live="polite">
              {bags}
            </span>
            <button
              type="button"
              aria-label="Add a bag"
              disabled={bags >= bag.maximum_quantity}
              onClick={() => setBags(bags + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-shell text-ink disabled:opacity-40"
            >
              <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Panel>

      <Panel title={`Seat · ${offer.slices[0].origin.iata_code} – ${offer.slices[0].destination.iata_code}`}>
        <div className="flex flex-wrap gap-4 text-tiny text-body">
          <Key className="bg-sky-soft" label="Free" />
          <Key className="bg-brand-soft" label="Paid" />
          <Key className="bg-line" label="Taken" />
          {seat ? (
            <button type="button" onClick={() => setSeat(null)} className="ml-auto font-semibold text-blue">
              Clear seat
            </button>
          ) : null}
        </div>

        <div className="mt-5 overflow-x-auto no-scrollbar">
          <div className="mx-auto w-max space-y-2">
            <div className="grid grid-cols-[repeat(3,36px)_28px_repeat(3,36px)] gap-1.5 text-center text-tiny text-label">
              {[...LEFT, "", ...RIGHT].map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </div>
            {ROWS.map((row) => (
              <div key={row} className="grid grid-cols-[repeat(3,36px)_28px_repeat(3,36px)] gap-1.5">
                {LEFT.map((l) => (
                  <Seat key={l} row={row} letter={l} />
                ))}
                <span className="flex items-center justify-center text-tiny text-label">{row}</span>
                {RIGHT.map((l) => (
                  <Seat key={l} row={row} letter={l} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-small text-body">
          {seat
            ? `Seat ${seat.designator} · ${seat.amount ? money(seat.amount, currency) : "Free"}`
            : "No seat picked. One will be assigned at check-in."}
        </p>
      </Panel>

      <div className="flex gap-3">
        <Link
          href="/booking/details"
          className="flex h-12 items-center justify-center rounded-xl bg-white px-6 text-copy font-semibold text-ink"
        >
          Back
        </Link>
        <Link
          href="/booking/payment"
          className="flex h-12 flex-1 items-center justify-center rounded-xl bg-brand text-copy font-semibold text-white active:translate-y-px sm:max-w-[240px]"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

function Seat({ row, letter }: { row: number; letter: string }) {
  const { seat, setSeat, offer } = useBooking();
  const { taken, amount } = seatInfo(row, letter);
  const designator = `${row}${letter}`;
  const on = seat?.designator === designator;

  return (
    <button
      type="button"
      disabled={taken}
      aria-pressed={on}
      aria-label={`Seat ${designator}, ${taken ? "taken" : amount ? money(amount, offer.total_currency) : "free"}`}
      onClick={() => setSeat(on ? null : { designator, amount })}
      className={`h-9 w-9 rounded-lg text-tiny font-semibold transition-colors duration-150 ${
        on
          ? "bg-brand text-white"
          : taken
            ? "cursor-not-allowed bg-line"
            : amount
              ? "bg-brand-soft text-brand-hover"
              : "bg-sky-soft text-blue"
      }`}
    >
      {on ? letter : ""}
    </button>
  );
}

function Key({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-3.5 w-3.5 rounded ${className}`} />
      {label}
    </span>
  );
}
