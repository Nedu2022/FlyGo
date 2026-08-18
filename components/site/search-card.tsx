"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { DateField } from "@/components/ui/calendar";

const TABS = ["Flight", "Hotel", "Apartment"] as const;
const TRIP_KINDS = ["One-way", "Round trip", "Multi-city"] as const;

/**
 * Translucent booking panel that sits inside the hero card. It floats on the
 * steel background, so every control is a lightened pane rather than a border.
 */
export function SearchCard({
  defaultTab = "Flight",
}: {
  defaultTab?: (typeof TABS)[number];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]>(defaultTab);
  const [kind, setKind] = useState<(typeof TRIP_KINDS)[number]>("One-way");
  const [returning, setReturning] = useState(false);
  const [departure, setDeparture] = useState(() => new Date(2024, 11, 15));
  const [returnDate, setReturnDate] = useState(() => new Date(2025, 0, 9));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/flights");
      }}
      className="rounded-xl bg-white/12 p-5 backdrop-blur-[2px] sm:p-6"
    >
      <div className="flex gap-2">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            aria-pressed={tab === item}
            className={`relative flex-1 pb-3 text-copy transition-colors duration-200 ${ tab === item ? "text-white" : "text-white/75 hover:text-white" }`}
          >
            {item}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-[2px] origin-center rounded-full bg-white transition-transform duration-300 ${
                tab === item ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>

      {/* One-way / round trip only means anything for flights. */}
      <div className={`mt-5 flex-wrap gap-2.5 ${tab === "Flight" ? "flex" : "hidden"}`}>
        {TRIP_KINDS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setKind(item)}
            aria-pressed={kind === item}
            className={`h-[38px] rounded-full px-5 text-small transition-colors duration-200 ${ kind === item ? "bg-white font-medium text-ink" : "bg-white/15 text-white hover:bg-white/25" }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div key={tab} className="animate-fade mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2">
        {tab === "Flight" ? (
          <>
            <Pane label="From" icon={<TakeOff />} defaultValue="New York (NY)" />
            <Pane label="To" icon={<Landing />} defaultValue="Heathrow London (HW)" />

            <DateField
              label="Departure Date"
              icon={<CalendarIcon />}
              value={departure}
              onChange={setDeparture}
            />
            <DateField
              label="Return Date"
              icon={<CalendarIcon />}
              value={returnDate}
              onChange={setReturnDate}
              disabled={!returning}
              toggle={
                <Toggle checked={returning} onChange={setReturning} label="Return Date" />
              }
            />

            <Pane label="Passanger" icon={<PersonIcon />} defaultValue="2 Adult, 0 Child" />
            <Pane label="Seat Class" icon={<SeatIcon />} defaultValue="Business" />
          </>
        ) : tab === "Hotel" ? (
          <>
            <Pane label="Destination" icon={<Landing />} defaultValue="Heathrow London (HW)" />
            <Pane label="Guests" icon={<PersonIcon />} defaultValue="2 Adult, 0 Child" />
            <DateField label="Check in" icon={<CalendarIcon />} value={departure} onChange={setDeparture} />
            <DateField label="Check out" icon={<CalendarIcon />} value={returnDate} onChange={setReturnDate} />
          </>
        ) : (
          <>
            <Pane label="Where" icon={<Landing />} defaultValue="Lisbon, Portugal" />
            <Pane label="Guests" icon={<PersonIcon />} defaultValue="4 Adult, 1 Child" />
            <DateField label="Check in" icon={<CalendarIcon />} value={departure} onChange={setDeparture} />
            <Pane label="Nights" icon={<CalendarIcon />} defaultValue="7 nights" />
          </>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 h-[44px] w-full rounded-md bg-brand text-copy text-white shadow-[0_2px_10px_rgba(245,134,52,0.4)] transition-colors duration-200 hover:bg-brand-hover active:translate-y-px"
      >
        Search
      </button>
    </form>
  );
}

function Pane({
  label,
  icon,
  defaultValue,
  disabled = false,
  toggle,
}: {
  label: string;
  icon: ReactNode;
  defaultValue: string;
  disabled?: boolean;
  toggle?: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-small text-white">
        {toggle}
        {label}
      </span>
      <span
        className={`flex h-[46px] items-center gap-2.5 rounded-lg px-4 transition-colors duration-200 ${
          disabled ? "bg-white/8" : "bg-white/15 hover:bg-white/22"
        }`}
      >
        <span className={disabled ? "text-white/35" : "text-white/80"}>{icon}</span>
        <input
          defaultValue={defaultValue}
          disabled={disabled}
          className={`w-full min-w-0 truncate bg-transparent text-copy outline-none ${ disabled ? "text-white/35" : "text-white" }`}
        />
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
    <span className="relative inline-flex h-[17px] w-[17px] items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        aria-label={`Add a ${label.toLowerCase()}`}
        onChange={(event) => onChange(event.target.checked)}
        className="peer h-[17px] w-[17px] cursor-pointer appearance-none rounded-[3px] border border-white/70 transition-colors duration-200 checked:border-white checked:bg-white"
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-steel)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute h-2.5 w-2.5 scale-50 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

const glyph = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function TakeOff() {
  return (
    <svg {...glyph}>
      <path d="M2.5 19h19" />
      <path d="M4 13.5 6.5 14l3-3.6-4.8-5.3 1.9-.5 6.4 4.4 3.9-1c1-.3 2 .1 2.3 1 .2.8-.3 1.6-1.2 1.9L6.6 15.6 4 13.5Z" />
    </svg>
  );
}

function Landing() {
  return (
    <svg {...glyph}>
      <path d="M2.5 19h19" />
      <path d="M3.5 12.4 6 13l1.8-4.4-6.1-3.4 1.7-1 7.4 2.6 3.6-1.9c.9-.5 2-.3 2.5.5.4.8.1 1.7-.8 2.2L5.9 14.7l-2.4-2.3Z" />
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
