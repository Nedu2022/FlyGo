"use client";

import { ArrowLeftRight, CalendarDays, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DateField } from "@/components/ui/calendar";
import { TravellersField } from "@/components/site/travellers-field";
import { PlaceInput } from "@/components/site/place-input";
import { SEARCH as TRIP } from "@/lib/duffel";
import { findCity } from "@/lib/jet-data";

const SUMMARY = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });
export type CompactSearchMode = "flight" | "stay" | "jet";

/**
 * Floating white search card that sits under the header on the results and
 * booking screens; `embedded` drops its own page band so it can sit on the
 * results hero. Each control is an outlined box with its label notched into
 * the top border.
 */
export function SearchSummaryBar({
  embedded = false,
  compact = false,
  mode = "flight",
  initialStayType = "hotel",
  initialJetType = "private",
}: {
  embedded?: boolean;
  compact?: boolean;
  mode?: CompactSearchMode;
  initialStayType?: "hotel" | "apartment";
  initialJetType?: "private" | "shared";
}) {
  const router = useRouter();
  const [from, setFrom] = useState(TRIP.from);
  const [to, setTo] = useState(TRIP.to);
  const [trip, setTrip] = useState(TRIP.trip);
  const [departure, setDeparture] = useState(() => new Date(2026, 11, 15));
  const [returnDate, setReturnDate] = useState(() => new Date(2027, 0, 9));
  const [where, setWhere] = useState("London");
  const [stayType, setStayType] = useState<"hotel" | "apartment">(initialStayType);
  const [jetType, setJetType] = useState<"private" | "shared">(initialJetType);
  const oneWay = trip !== "Round-Trip";
  // Phones open on a one-line summary; the full form unfolds on demand.
  const [editing, setEditing] = useState(false);

  if (compact) {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (mode === "stay") {
            router.push(`/hotels/search?type=${stayType === "apartment" ? "apartments" : "hotels"}`);
          } else if (mode === "jet") {
            const code = (value: string) => value.match(/\(([A-Z]{3})\)/i)?.[1] ?? findCity(value)?.code ?? value;
            router.push(`/private-jets?from=${encodeURIComponent(code(from))}&to=${encodeURIComponent(code(to))}${jetType === "shared" ? "#share" : ""}`);
          } else {
            router.push("/flights");
          }
        }}
        className="flex min-w-0 items-center gap-1.5"
      >
        <label className={`flex h-10 shrink-0 items-center rounded-lg border border-line bg-shell px-2.5 ${mode === "flight" ? "w-[84px]" : "w-[116px]"}`}>
          <span className="sr-only">{mode === "stay" ? "Stay type" : mode === "jet" ? "Jet type" : "Trip type"}</span>
          <select
            aria-label={mode === "stay" ? "Stay type" : mode === "jet" ? "Jet type" : "Trip type"}
            value={mode === "stay" ? stayType : mode === "jet" ? jetType : trip}
            onChange={(event) => {
              if (mode === "stay") setStayType(event.target.value as "hotel" | "apartment");
              else if (mode === "jet") setJetType(event.target.value as "private" | "shared");
              else setTrip(event.target.value);
            }}
            className="w-full appearance-none bg-transparent text-tiny font-semibold text-ink outline-none"
          >
            {mode === "stay" ? (
              <>
                <option value="hotel">Hotels</option>
                <option value="apartment">Apartments</option>
              </>
            ) : mode === "jet" ? (
              <>
                <option value="private">Private jet</option>
                <option value="shared">Shared jet</option>
              </>
            ) : (
              <>
                <option value="Round-Trip">Return</option>
                <option value="One-way">One-way</option>
                <option value="Multi-city">Multi-city</option>
              </>
            )}
          </select>
          <ChevronDown size={16} className="shrink-0 text-label" aria-hidden="true" />
        </label>

        {mode === "stay" ? (
          <div className="flex h-10 min-w-[190px] flex-1 items-center rounded-lg border border-line bg-shell px-2.5">
            <PlaceInput value={where} onChange={setWhere} label="Destination" kind="stay" placeholderPrefix="Where?" className="h-8 min-w-0 text-tiny font-medium" />
          </div>
        ) : (
          <div className="flex h-10 min-w-[190px] flex-1 items-center rounded-lg border border-line bg-shell px-2.5">
            <PlaceInput value={from} onChange={setFrom} label="From" placeholderPrefix="From?" className="h-8 min-w-0 text-tiny font-medium" />
            <button
              type="button"
              aria-label="Swap origin and destination"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
              className="mx-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink hover:bg-white"
            >
              <ArrowLeftRight size={16} aria-hidden="true" />
            </button>
            <PlaceInput value={to} onChange={setTo} label="To" placeholderPrefix="To?" className="h-8 min-w-0 text-tiny font-medium" />
          </div>
        )}

        <div className="flex h-10 min-w-[155px] flex-1 items-center gap-1.5 rounded-lg border border-line bg-shell px-2 [&_button]:text-tiny">
          <DateField tone="plain" label={mode === "stay" ? "Check-in" : "Departure"} value={departure} onChange={(date) => {
            setDeparture(date);
            if (date > returnDate) setReturnDate(date);
          }} />
          {mode !== "jet" ? (
            <>
              <span aria-hidden="true" className="h-6 w-px shrink-0 bg-line" />
              <DateField tone="plain" label={mode === "stay" ? "Check-out" : "Return"} value={returnDate} onChange={(date) => setReturnDate(date < departure ? departure : date)} disabled={mode === "flight" && oneWay} placeholder={mode === "flight" && oneWay ? "One-way" : undefined} />
            </>
          ) : null}
        </div>

        <div className="flex h-10 min-w-[120px] flex-[0.75] items-center rounded-lg border border-line bg-shell px-2">
          <TravellersField key={mode} kind={mode === "stay" ? "stay" : mode === "jet" ? "jet" : "flight"} initial={mode === "stay" ? { adults: 2 } : undefined} className="text-tiny" compact />
        </div>

        <button
          type="submit"
          aria-label={mode === "stay" ? "Search stays" : mode === "jet" ? "Search jets" : "Search flights"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-white active:translate-y-px"
        >
          <Search size={17} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </form>
    );
  }

  return (
    <div className={embedded ? "" : "bg-white"}>
      <div className={embedded ? "" : "mx-auto w-full max-w-[1440px] px-5 pb-4 pt-2 sm:px-8"}>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          aria-expanded={editing}
          className="flex w-full items-center gap-3 rounded-xl bg-shell px-4 py-3 text-left lg:hidden"
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
