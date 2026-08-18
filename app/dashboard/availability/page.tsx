"use client";

import { useState } from "react";
import { BarAction, DashPage, FilterButton } from "@/components/dashboard/shell";
import { AVAILABILITY, PROPERTY_NAMES } from "@/lib/dashboard-data";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const TONES = {
  open: "bg-[#22c55e]",
  busy: "bg-sky",
  blocked: "bg-[#ef4444]",
} as const;

/** Sunday-start grid padded to whole weeks. */
function buildGrid(year: number, month: number) {
  const lead = new Date(year, month, 1).getDay();
  const start = new Date(year, month, 1 - lead);
  return Array.from({ length: 35 }, (_, i) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    return { date, outside: date.getMonth() !== month };
  });
}

export default function AvailabilityPage() {
  const [property, setProperty] = useState(PROPERTY_NAMES[0]);
  const [view, setView] = useState({ year: 2023, month: 6 });

  const shift = (by: number) => {
    const next = new Date(view.year, view.month + by, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };

  return (
    <DashPage
      title="Manage Availability"
      subtitle="Set your availability and keep your booking calendar up-to-date."
      actions={
        <>
          <BarAction label="Add Notes" />
          <BarAction label="Block Dates" tone="brand" icon={false} />
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-[16px] text-ink">
          Property name:
          <span className="relative inline-flex items-center gap-1.5 font-medium text-sky">
            {property}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="m6 9 6 7 6-7Z" />
            </svg>
            <select
              aria-label="Property"
              value={property}
              onChange={(event) => setProperty(event.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0"
            >
              {PROPERTY_NAMES.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </span>
        </label>
        <FilterButton />
      </div>

      <section className="mt-5 overflow-hidden rounded-xl border border-line bg-white">
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <Stepper label="Previous month" onClick={() => shift(-1)} direction="prev" />

          <div className="flex items-center gap-8">
            <Spinner
              value={MONTHS[view.month]}
              onUp={() => shift(1)}
              onDown={() => shift(-1)}
              label="Month"
            />
            <Spinner
              value={String(view.year)}
              onUp={() => setView((v) => ({ ...v, year: v.year + 1 }))}
              onDown={() => setView((v) => ({ ...v, year: v.year - 1 }))}
              label="Year"
            />
          </div>

          <Stepper label="Next month" onClick={() => shift(1)} direction="next" />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-7 border-y border-line">
              {WEEKDAYS.map((day) => (
                <span
                  key={day}
                  className="border-r border-line px-4 py-3 text-[14px] text-body last:border-r-0"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {buildGrid(view.year, view.month).map(({ date, outside }, i) => {
                const day = date.getDate();
                const entry = outside ? undefined : AVAILABILITY[day];
                return (
                  <div
                    key={i}
                    className={`relative flex h-[80px] items-start justify-between border-b border-r border-line px-4 py-3 transition-colors duration-150 last:border-r-0 hover:bg-sky-tint ${
                      outside ? "bg-shell/60" : "bg-white"
                    }`}
                  >
                    <span className={`text-[17px] ${outside ? "text-muted" : "text-ink"}`}>
                      {day}
                    </span>
                    {entry ? (
                      <span
                        className={`mt-auto flex h-6 min-w-[24px] items-center justify-center rounded-full px-1.5 text-[12px] font-medium text-white ${TONES[entry.tone]}`}
                        title={`${entry.count} bookings`}
                      >
                        {entry.count}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap items-center gap-5 text-[13px] text-body">
          <Key tone="open" label="Available" />
          <Key tone="busy" label="Booked" />
          <Key tone="blocked" label="Blocked" />
        </ul>
        <button
          type="button"
          className="h-[44px] rounded-lg bg-sky px-6 text-[15px] font-medium text-white transition-all duration-200 hover:bg-sky-hover active:translate-y-px"
        >
          Link Calendar
        </button>
      </div>
    </DashPage>
  );
}

function Key({ tone, label }: { tone: keyof typeof TONES; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${TONES[tone]}`} aria-hidden="true" />
      {label}
    </li>
  );
}

function Stepper({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-body transition-colors duration-200 hover:bg-shell hover:text-sky"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === "prev" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}

/** Value with tiny up/down chevrons, as in the design's month and year controls. */
function Spinner({
  value,
  onUp,
  onDown,
  label,
}: {
  value: string;
  onUp: () => void;
  onDown: () => void;
  label: string;
}) {
  return (
    <span className="flex items-center gap-2">
      <span className="text-[20px] text-ink">{value}</span>
      <span className="flex flex-col gap-1">
        <button type="button" onClick={onUp} aria-label={`Next ${label}`} className="text-muted transition-colors hover:text-sky">
          <svg width="11" height="7" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 6.5 6 1.5l5 5" />
          </svg>
        </button>
        <button type="button" onClick={onDown} aria-label={`Previous ${label}`} className="text-muted transition-colors hover:text-sky">
          <svg width="11" height="7" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 1.5 6 6.5l5-5" />
          </svg>
        </button>
      </span>
    </span>
  );
}
