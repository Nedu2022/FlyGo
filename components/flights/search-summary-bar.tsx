"use client";

import { ArrowLeftRight, CalendarDays, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DateField } from "@/components/ui/calendar";
import { TravellersField } from "@/components/site/travellers-field";
import { TRIP } from "@/lib/flight-data";

const SUMMARY = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

/**
 * Floating white search card that sits under the header on the results and
 * booking screens; `embedded` drops its own page band so it can sit on the
 * results hero. Each control is an outlined box with its label notched into
 * the top border.
 */
export function SearchSummaryBar({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const [from, setFrom] = useState(TRIP.from);
  const [to, setTo] = useState(TRIP.to);
  const [trip, setTrip] = useState(TRIP.trip);
  const [departure, setDeparture] = useState(() => new Date(2026, 11, 15));
  const [returnDate, setReturnDate] = useState(() => new Date(2026, 11, 22));
  const oneWay = trip !== "Round-Trip";
  // Phones open on a one-line summary; the full form unfolds on demand.
  const [editing, setEditing] = useState(false);

  return (
    <div className={embedded ? "" : "bg-white"}>
      <div className={embedded ? "" : "mx-auto w-full max-w-[1240px] px-5 pb-4 pt-2 sm:px-8"}>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          aria-expanded={editing}
          className="flex w-full items-center gap-3 rounded-xl bg-shell px-4 py-3 text-left ring-1 ring-line lg:hidden"
        >
          <Search size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-ink" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-copy font-medium text-ink">
              {from} → {to}
            </span>
            <span className="block truncate text-tiny text-label">
              {SUMMARY.format(departure)}
              {oneWay ? "" : ` – ${SUMMARY.format(returnDate)}`} · {TRIP.passengers}
            </span>
          </span>
          <span className="shrink-0 text-small font-medium text-sky">{editing ? "Close" : "Edit"}</span>
        </button>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/flights");
          }}
          className={`mt-3 flex-col gap-3 rounded-2xl bg-white p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] lg:mt-0 lg:flex lg:flex-row lg:items-center lg:gap-2 ${
            editing ? "animate-fade flex" : "hidden"
          }`}
        >
          <NotchedField label="From – To" className="lg:flex-1">
            <div className="flex items-center gap-2">
              <input
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                aria-label="From"
                className="min-w-0 flex-1 bg-transparent text-copy text-ink outline-none"
              />
              <span className="text-copy text-ink">–</span>
              <input
                value={to}
                onChange={(event) => setTo(event.target.value)}
                aria-label="To"
                className="min-w-0 flex-1 bg-transparent text-copy text-ink outline-none"
              />
              <button
                type="button"
                aria-label="Swap origin and destination"
                onClick={() => {
                  setFrom(to);
                  setTo(from);
                }}
                className="shrink-0 text-ink"
              >
                <ArrowLeftRight size={20} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </NotchedField>

          <NotchedField label="Trip" className="lg:w-[168px]">
            <div className="relative flex items-center">
              <select
                aria-label="Trip type"
                value={trip}
                onChange={(event) => setTrip(event.target.value)}
                className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-copy text-ink outline-none"
              >
                <option>Round-Trip</option>
                <option>One-way</option>
                <option>Multi-city</option>
              </select>
              <Chevron />
            </div>
          </NotchedField>

          <NotchedField label="Dates" className="lg:flex-[1.25]">
            <div className="flex items-center gap-2">
              <DateField
                tone="plain"
                label="Departure date"
                icon={<CalendarIcon />}
                value={departure}
                onChange={(date) => {
                  setDeparture(date);
                  // Keep the trip the right way round if the new departure passes the return.
                  if (date > returnDate) setReturnDate(date);
                }}
              />
              <span aria-hidden="true" className="text-copy text-ink">–</span>
              <DateField
                tone="plain"
                label="Return date"
                value={returnDate}
                onChange={(date) => setReturnDate(date < departure ? departure : date)}
                disabled={oneWay}
                placeholder="One-way"
              />
            </div>
          </NotchedField>

          <NotchedField label="Travellers" className="lg:flex-1">
            <TravellersField className="h-6" />
          </NotchedField>

          <button
            type="submit"
            aria-label="Search flights"
            className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-br from-brand to-brand-hover px-6 font-semibold text-white active:translate-y-px"
          >
            <Search size={20} strokeWidth={2.2} aria-hidden="true" />
            <span className="lg:sr-only xl:not-sr-only">Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}

/** Outlined box with the label sitting in a gap in the top border. */
function NotchedField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 rounded-xl bg-shell px-4 py-2.5 ${className}`}>
      <span className="block text-tiny font-medium text-label">{label}</span>
      <div className="mt-0.5 text-copy font-medium text-ink [&_input]:font-medium [&_select]:font-medium">{children}</div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <CalendarDays size={16} strokeWidth={1.8} aria-hidden="true" />
  );
}

function Chevron() {
  return (
    <ChevronDown size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute right-0 text-ink" />
  );
}
