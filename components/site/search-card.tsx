"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { DateField } from "@/components/ui/calendar";

const TABS = [
  { label: "Flight", icon: TabFlightIcon },
  { label: "Hotel", icon: TabHotelIcon },
  { label: "Apartment", icon: TabApartmentIcon },
] as const;

const TRIP_KINDS = ["One-way", "Round trip", "Multi-city"] as const;

/**
 * Booking panel styled as a boarding pass: a route header carrying the airport
 * codes, a perforated tear line, then the ticket's detail cells. The metaphor
 * does real work on small screens — codes carry the route in a single row, so
 * the panel stays short instead of stacking six full-width fields.
 */
export function SearchCard({
  defaultTab = "Flight",
}: {
  defaultTab?: (typeof TABS)[number]["label"];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]["label"]>(defaultTab);
  const [kind, setKind] = useState<(typeof TRIP_KINDS)[number]>("One-way");
  const [returning, setReturning] = useState(false);
  const [departure, setDeparture] = useState(() => new Date(2024, 11, 15));
  const [returnDate, setReturnDate] = useState(() => new Date(2025, 0, 9));
  const [from, setFrom] = useState("New York (NY)");
  const [to, setTo] = useState("Heathrow London (HW)");
  const [where, setWhere] = useState(
    defaultTab === "Apartment" ? "Lisbon, Portugal" : "Heathrow London (HW)",
  );

  const tabIndex = TABS.findIndex((item) => item.label === tab);
  const flight = tab === "Flight";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/flights");
      }}
      className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 shadow-[0_24px_60px_-20px_rgba(3,20,33,0.65)] backdrop-blur-md sm:p-6"
    >
      {/* Faint top highlight, so the panel reads as a raised pane not a flat tint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"
      />

      <div className="relative grid grid-cols-3 rounded-full bg-white/10 p-1 ring-1 ring-inset ring-white/15">
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-white shadow-[0_2px_10px_rgba(3,20,33,0.25)] transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${tabIndex * 100}%)` }}
        />
        {TABS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => setTab(label)}
            aria-pressed={tab === label}
            className={`relative z-10 flex h-9 items-center justify-center gap-1.5 rounded-full text-small font-medium transition-colors duration-200 sm:h-10 sm:text-copy ${
              tab === label ? "text-ink" : "text-white/70 hover:text-white"
            }`}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>

      {/* One-way / round trip only means anything for flights. */}
      {/* Three columns so the chips always hold one row, even on a 360px phone. */}
      <div className={`mt-3 grid-cols-3 gap-2 sm:mt-4 ${flight ? "grid sm:flex sm:flex-wrap" : "hidden"}`}>
        {TRIP_KINDS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setKind(item)}
            aria-pressed={kind === item}
            className={`h-[30px] rounded-full px-2 text-tiny font-semibold uppercase tracking-[0.06em] transition-all duration-200 sm:h-[34px] sm:px-4 sm:tracking-[0.08em] ${
              kind === item
                ? "bg-white text-ink shadow-[0_2px_8px_rgba(3,20,33,0.2)]"
                : "bg-white/8 text-white/70 ring-1 ring-inset ring-white/15 hover:bg-white/15 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div key={tab} className="animate-fade">
        {/* Ticket header — the route, or the stay's destination. */}
        <div className="mt-3 rounded-xl bg-white/10 px-3 py-3 ring-1 ring-inset ring-white/10 sm:mt-4 sm:px-4">
          {flight ? (
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1">
              <Endpoint label="From" value={from} onChange={setFrom} />

              <div className="relative flex h-9 w-14 shrink-0 items-center justify-center sm:w-20">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/30"
                />
                <button
                  type="button"
                  aria-label="Swap origin and destination"
                  onClick={() => {
                    setFrom(to);
                    setTo(from);
                  }}
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] ring-2 ring-white/50 transition-all duration-200 hover:bg-brand-hover hover:ring-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <PlaneMark className="transition-transform duration-500 group-hover:rotate-180" />
                </button>
              </div>

              <Endpoint label="To" value={to} onChange={setTo} align="right" />
            </div>
          ) : (
            <Endpoint
              label={tab === "Hotel" ? "Destination" : "Where"}
              value={where}
              onChange={setWhere}
              /* A stay has no airport code — the place name is the headline. */
              code={false}
            />
          )}
        </div>

        {/* Tear line. The notches are punched by the card's own overflow clip. */}
        <div aria-hidden="true" className="relative -mx-4 my-3 sm:-mx-6 sm:my-4">
          <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-black/25" />
          <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-black/25" />
          <span className="mx-4 block border-t border-dashed border-white/25 sm:mx-6" />
        </div>

        {/* Ticket stub — the booking's details, in a boarding-pass grid. */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {flight ? (
            <>
              <DateField label="Depart" icon={<CalendarIcon />} value={departure} onChange={setDeparture} />
              <DateField
                label="Return"
                icon={<CalendarIcon />}
                value={returnDate}
                onChange={setReturnDate}
                disabled={!returning}
                toggle={<Toggle checked={returning} onChange={setReturning} label="Return" />}
              />
              <Cell label="Passengers" icon={<PersonIcon />} defaultValue="2 Adult, 0 Child" trailing />
              <Cell label="Cabin" icon={<SeatIcon />} defaultValue="Business" trailing />
            </>
          ) : tab === "Hotel" ? (
            <>
              <DateField label="Check in" icon={<CalendarIcon />} value={departure} onChange={setDeparture} />
              <DateField label="Check out" icon={<CalendarIcon />} value={returnDate} onChange={setReturnDate} />
              <Cell label="Guests" icon={<PersonIcon />} defaultValue="2 Adult, 0 Child" trailing />
              <Cell label="Rooms" icon={<SeatIcon />} defaultValue="1 Room" trailing />
            </>
          ) : (
            <>
              <DateField label="Check in" icon={<CalendarIcon />} value={departure} onChange={setDeparture} />
              <Cell label="Nights" icon={<CalendarIcon />} defaultValue="7 nights" trailing />
              <Cell label="Guests" icon={<PersonIcon />} defaultValue="4 Adult, 1 Child" trailing />
              <Cell label="Bedrooms" icon={<SeatIcon />} defaultValue="2 Bedrooms" trailing />
            </>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="relative mt-4 flex h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-brand to-brand-hover text-copy font-semibold text-white shadow-[0_8px_20px_-4px_rgba(245,134,52,0.55)] transition-all duration-200 hover:shadow-[0_10px_24px_-4px_rgba(245,134,52,0.65)] active:translate-y-px active:shadow-[0_4px_12px_-2px_rgba(245,134,52,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:mt-5 sm:h-[46px]"
      >
        <SearchIcon />
        {flight ? "Search Flights" : "Search Stays"}
      </button>
    </form>
  );
}

/**
 * One end of the route: the airport code as the headline, the editable place
 * name beneath it. The code is derived, so typing a new city updates both.
 */
function Endpoint({
  label,
  value,
  onChange,
  align = "left",
  code = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  align?: "left" | "right";
  /** Flights headline the airport code; stays headline the place name itself. */
  code?: boolean;
}) {
  const right = align === "right";
  return (
    <label className={`block min-w-0 ${right ? "text-right" : ""}`}>
      <span className="text-micro font-semibold uppercase tracking-[0.16em] text-white/55">
        {label}
      </span>

      {code ? (
        <>
          <span className="mt-0.5 block truncate text-h3 font-bold leading-tight text-white">
            {codeOf(value)}
          </span>
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label={label}
            className={`mt-0.5 w-full min-w-0 truncate bg-transparent text-tiny text-white/70 outline-none transition-colors duration-200 hover:text-white focus:text-white ${
              right ? "text-right" : ""
            }`}
          />
        </>
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          className={`mt-0.5 w-full min-w-0 truncate bg-transparent text-h4 font-bold leading-tight text-white outline-none ${
            right ? "text-right" : ""
          }`}
        />
      )}
    </label>
  );
}

/** "Heathrow London (HW)" -> "HW"; falls back to the first letters. */
function codeOf(place: string) {
  const inParens = place.match(/\(([^)]+)\)/);
  if (inParens) return inParens[1].toUpperCase();
  const word = place.trim().split(/[\s,]+/)[0] ?? "";
  return (word.slice(0, 3) || "—").toUpperCase();
}

/** One cell of the ticket stub: micro label above, icon + value below. */
function Cell({
  label,
  icon,
  defaultValue,
  trailing = false,
}: {
  label: string;
  icon: ReactNode;
  defaultValue: string;
  /** Shows a chevron, marking the field as a picker rather than free text. */
  trailing?: boolean;
}) {
  return (
    <label className="block min-w-0 rounded-lg bg-white/10 px-3 py-2 ring-1 ring-inset ring-white/10 transition-colors duration-200 hover:bg-white/15 hover:ring-white/20 focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-white/60">
      <span className="text-micro font-semibold uppercase tracking-[0.16em] text-white/55">
        {label}
      </span>
      <span className="mt-0.5 flex items-center gap-1.5">
        <span className="shrink-0 text-white/70">{icon}</span>
        <input
          defaultValue={defaultValue}
          className="w-full min-w-0 truncate bg-transparent text-small font-semibold text-white outline-none"
        />
        {trailing ? (
          <span className="shrink-0 text-white/50">
            <Chevron />
          </span>
        ) : null}
      </span>
    </label>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <span className="relative inline-flex h-[15px] w-[15px] items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        aria-label={`Add a ${label.toLowerCase()} date`}
        onChange={(event) => onChange(event.target.checked)}
        className="peer h-[15px] w-[15px] cursor-pointer appearance-none rounded-[3px] border border-white/60 transition-colors duration-200 checked:border-white checked:bg-white"
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-steel)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute h-2 w-2 scale-50 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

const glyph = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function PlaneMark({ className = "" }: { className?: string }) {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21 15.5 3 20v-3l11-3-11-3V8l18 4.5a1.6 1.6 0 0 1 0 3Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...glyph}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg {...glyph}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

function SeatIcon() {
  return (
    <svg {...glyph}>
      <path d="M6 4v9a2 2 0 0 0 2 2h6" />
      <path d="M18 20h-6a5 5 0 0 1-5-5" />
      <path d="M18 12v8" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.3} strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

const tabGlyph = {
  width: 15,
  height: 15,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function TabFlightIcon() {
  return (
    <svg {...tabGlyph}>
      <path d="M2.5 19h19" />
      <path d="M4 13.5 6.5 14l3-3.6-4.8-5.3 1.9-.5 6.4 4.4 3.9-1c1-.3 2 .1 2.3 1 .2.8-.3 1.6-1.2 1.9L6.6 15.6 4 13.5Z" />
    </svg>
  );
}

function TabHotelIcon() {
  return (
    <svg {...tabGlyph}>
      <path d="M3 20V6.5a1.5 1.5 0 0 1 1.5-1.5H10v15" />
      <path d="M10 10h9.5A1.5 1.5 0 0 1 21 11.5V20" />
      <path d="M3 20h18M6.5 9h.01M6.5 12.5h.01M6.5 16h.01" />
    </svg>
  );
}

function TabApartmentIcon() {
  return (
    <svg {...tabGlyph}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 21v-4h6v4M8 7h1M15 7h1M8 11h1M15 11h1" />
    </svg>
  );
}
