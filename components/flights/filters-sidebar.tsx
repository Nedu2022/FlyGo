"use client";

import { SlidersHorizontal, Star, X } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AIRLINE_FILTERS, PRICE_RANGE, TIME_RANGE } from "@/lib/flight-data";

/**
 * Desktop: a sticky column. Phones: a "Filters" button that opens the same
 * groups in a bottom sheet, so results are the first thing on screen.
 */
export type StopsFilter = "any" | "direct" | "one";

type FiltersProps = {
  stops: StopsFilter;
  onStopsChange: (value: StopsFilter) => void;
  /** Cheapest fare under each stops option, shown beside it. */
  stopPrices: Record<StopsFilter, string | null>;
  resultCount: number;
};

export function FiltersSidebar(props: FiltersProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] left-1/2 z-30 flex h-12 -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-ink px-6 text-small font-semibold text-white shadow-[0_14px_30px_-10px_rgba(16,24,40,0.55)] lg:hidden"
      >
        <SlidersHorizontal size={18} strokeWidth={2} aria-hidden="true" />
        Filters
      </button>

      <aside className="hidden lg:block lg:w-[260px] lg:shrink-0">
        <h2 className="text-h4 font-semibold text-ink">Filters</h2>
        <FilterGroups {...props} />
      </aside>

      {/* Portaled to <body>: a transformed ancestor would otherwise become the
          fixed containing block. Stops above the bottom tab bar, which stays visible. */}
      {open
        ? createPortal(
            <div
              className="fixed inset-x-0 top-0 bottom-[calc(68px+env(safe-area-inset-bottom))] z-[45] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
            >
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setOpen(false)}
                className="animate-fade absolute inset-0 bg-ink/40"
              />
              <div className="animate-rise absolute inset-x-0 bottom-0 flex max-h-[calc(100%-4rem)] flex-col rounded-t-3xl bg-white shadow-[0_-12px_32px_-16px_rgba(16,24,40,0.35)]">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <h2 className="text-h4 font-semibold text-ink">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close filters"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-ink"
                  >
                    <X size={18} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </div>
                <div className="overflow-y-auto px-5">
                  <FilterGroups {...props} />
                </div>
                <div className="border-t border-line p-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="h-12 w-full rounded-lg bg-sky text-copy font-semibold text-white transition-colors duration-200"
                  >
                    Show {props.resultCount} results
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

const STOP_OPTIONS: { value: StopsFilter; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "direct", label: "Direct" },
  { value: "one", label: "1 stop" },
];

function FilterGroups({ stops, onStopsChange, stopPrices }: FiltersProps) {
  return (
    <>
      <FilterGroup heading="Stops">
        <div className="space-y-1" role="radiogroup" aria-label="Stops">
          {STOP_OPTIONS.map((option) => {
            const on = stops === option.value;
            const price = stopPrices[option.value];
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={on}
                disabled={!price}
                onClick={() => onStopsChange(option.value)}
                className="flex w-full items-center gap-3 rounded-lg py-2 text-left text-copy text-ink disabled:opacity-40"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                    on ? "border-brand" : "border-muted"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full bg-brand transition-transform duration-200 ${on ? "scale-100" : "scale-0"}`}
                  />
                </span>
                <span className="flex-1">{option.label}</span>
                <span className="text-small text-label">{price ?? "—"}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

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
    </>
  );
}

function FilterGroup({ heading, children, last = false }: { heading: string; children: ReactNode; last?: boolean }) {
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
          <span className="text-lead font-medium text-ink">{heading}</span>
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
            className={`shrink-0 text-ink transition-transform duration-300 ${open ? "" : "rotate-180"}`}
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

/** Minimum-rating picker: tap a star to require at least that many. */
function RatingChips() {
  const [min, setMin] = useState(0);

  return (
    <div>
      <div className="flex items-center gap-1" role="radiogroup" aria-label="Minimum rating">
        {[1, 2, 3, 4, 5].map((n) => {
          const on = n <= min;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={min === n}
              aria-label={`${n} star${n > 1 ? "s" : ""} and up`}
              onClick={() => setMin(min === n ? 0 : n)}
              className="flex h-10 w-10 items-center justify-center rounded-xl"
            >
              <Star
                size={24}
                strokeWidth={1.6}
                aria-hidden="true"
                className={`transition-colors duration-200 ${on ? "fill-star text-star" : "fill-transparent text-muted"}`}
              />
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-small font-medium text-ink">
          {min ? `${min} star${min > 1 ? "s" : ""}${min < 5 ? " & up" : ""}` : "Any rating"}
        </p>
        {min ? (
          <button type="button" onClick={() => setMin(0)} className="text-small font-medium text-blue">
            Clear
          </button>
        ) : null}
      </div>
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
