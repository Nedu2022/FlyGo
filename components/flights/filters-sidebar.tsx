"use client";

import { useId, useState, type ReactNode } from "react";
import {
  AIRLINE_FILTERS,
  PRICE_RANGE,
  RATING_FILTERS,
  TIME_RANGE,
} from "@/lib/flight-data";

export function FiltersSidebar() {
  return (
    <aside className="w-full lg:w-[260px] lg:shrink-0">
      <h2 className="text-h4 font-bold text-ink">Filters</h2>

      <FilterGroup heading="Price">
        <DualRange minLabel={PRICE_RANGE.min} maxLabel={PRICE_RANGE.max} />
      </FilterGroup>

      <FilterGroup heading="Departure Time">
        <DualRange minLabel={TIME_RANGE.min} maxLabel={TIME_RANGE.max} />
      </FilterGroup>

      <FilterGroup heading="Rating">
        <RatingChips />
      </FilterGroup>

      <FilterGroup heading="Airlines" last>
        <ul className="space-y-4">
          {AIRLINE_FILTERS.map((airline) => (
            <li key={airline}>
              <CheckboxRow label={airline} />
            </li>
          ))}
        </ul>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({
  heading,
  children,
  last = false,
}: {
  heading: string;
  children: ReactNode;
  last?: boolean;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section className={`py-6 ${last ? "" : "border-b border-line"}`}>
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <span className="text-lead font-semibold text-ink">{heading}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`shrink-0 text-ink transition-transform duration-300 ${
              open ? "" : "rotate-180"
            }`}
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      </h3>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Two thumbs sharing one painted track; only the thumbs take pointer events. */
function DualRange({ minLabel, maxLabel }: { minLabel: string; maxLabel: string }) {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);

  return (
    <div>
      <div className="relative h-5">
        <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#6b5f5a]/50" />
        <span
          className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#6b5f5a]"
          style={{ left: `${Math.min(low, high)}%`, right: `${100 - Math.max(low, high)}%` }}
        />
        <input
          type="range"
          aria-label={`Minimum (${minLabel})`}
          value={low}
          onChange={(event) => setLow(Math.min(Number(event.target.value), high))}
          className="range-thumb absolute inset-0 w-full"
        />
        <input
          type="range"
          aria-label={`Maximum (${maxLabel})`}
          value={high}
          onChange={(event) => setHigh(Math.max(Number(event.target.value), low))}
          className="range-thumb absolute inset-0 w-full"
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-copy text-body">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function RatingChips() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-3">
      {RATING_FILTERS.map((rating) => {
        const selected = active === rating;
        return (
          <button
            key={rating}
            type="button"
            onClick={() => setActive(selected ? null : rating)}
            aria-pressed={selected}
            className={`flex h-[42px] w-[42px] items-center justify-center rounded-full border text-small transition-colors duration-200 ${ selected ? "border-brand bg-brand text-white" : "border-brand text-body hover:bg-brand-soft" }`}
          >
            {rating}
          </button>
        );
      })}
    </div>
  );
}

function CheckboxRow({ label }: { label: string }) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-4 text-copy text-body">
      <span className="relative inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          className="peer h-[22px] w-[22px] cursor-pointer appearance-none rounded-[4px] border-2 border-ink transition-colors duration-200 checked:border-sky checked:bg-sky"
        />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute h-3.5 w-3.5 scale-50 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      {label}
    </label>
  );
}
