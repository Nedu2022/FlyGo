"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TRIP } from "@/lib/flight-data";

/**
 * Floating white search card that sits under the header on the results and
 * booking screens. Each control is an outlined box with its label notched into
 * the top border.
 */
export function SearchSummaryBar() {
  const router = useRouter();
  const [from, setFrom] = useState(TRIP.from);
  const [to, setTo] = useState(TRIP.to);

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-4 pt-2 sm:px-8">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/flights");
          }}
          className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(16,24,40,0.1)] lg:flex-row lg:items-center lg:gap-4"
        >
          <NotchedField label="From - To" className="lg:flex-[1.5]">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 8h15l-3-3M20 16H5l3 3" />
                </svg>
              </button>
            </div>
          </NotchedField>

          <NotchedField label="Trip" className="lg:w-[168px]">
            <div className="relative flex items-center">
              <select
                aria-label="Trip type"
                defaultValue={TRIP.trip}
                className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-copy text-ink outline-none"
              >
                <option>Round-Trip</option>
                <option>One-way</option>
                <option>Multi-city</option>
              </select>
              <Chevron />
            </div>
          </NotchedField>

          <NotchedField label="Depart- Return" className="lg:flex-1">
            <input
              defaultValue={TRIP.dates}
              aria-label="Departure and return dates"
              className="w-full bg-transparent text-copy text-ink outline-none"
            />
          </NotchedField>

          <NotchedField label="Passenger - Class" className="lg:flex-1">
            <input
              defaultValue={TRIP.passengers}
              aria-label="Passengers and cabin class"
              className="w-full bg-transparent text-copy text-ink outline-none"
            />
          </NotchedField>

          <button
            type="submit"
            aria-label="Search flights"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center self-center rounded-full bg-sky text-white shadow-[0_4px_14px_rgba(86,172,233,0.45)] transition-all duration-200 hover:bg-sky-hover active:scale-95"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m16.5 16.5 4 4" />
            </svg>
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
    <div className={`relative rounded-lg border border-ink/70 px-4 pb-3 pt-3.5 ${className}`}>
      <span className="absolute -top-2 left-3 bg-white px-1.5 text-small text-body">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chevron() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute right-0 text-ink"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
