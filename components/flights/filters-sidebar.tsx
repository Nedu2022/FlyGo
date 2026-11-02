"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

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
  /** Every airline in the results, for the airline filter. */
  airlines: string[];
  hiddenAirlines: string[];
  onToggleAirline: (airline: string) => void;
  bagsOnly: boolean;
  onBagsOnly: () => void;
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
        className="fixed bottom-[calc(72px+env(safe-area-inset-bottom))] left-1/2 z-30 flex h-12 -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-ink px-6 text-small font-semibold text-white shadow-[0_14px_30px_-10px_rgba(16,24,40,0.55)] lg:hidden"
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
              className="fixed inset-x-0 top-0 bottom-[calc(60px+env(safe-area-inset-bottom))] z-[45] lg:hidden"
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
                <div className="flex items-center justify-between px-5 pb-2 pt-5">
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
                <div className="p-4 shadow-[0_-8px_20px_-14px_rgba(16,24,40,0.25)]">
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

function FilterGroups({ stops, onStopsChange, stopPrices, airlines, hiddenAirlines, onToggleAirline, bagsOnly, onBagsOnly }: FiltersProps) {
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

      <FilterGroup heading="Bags">
        <CheckboxRow label="Checked bag included" checked={bagsOnly} onChange={onBagsOnly} />
      </FilterGroup>

      <FilterGroup heading="Airlines" last>
        <ul className="space-y-4">
          {airlines.map((airline) => (
            <li key={airline}>
              <CheckboxRow
                label={airline}
                checked={!hiddenAirlines.includes(airline)}
                onChange={() => onToggleAirline(airline)}
              />
            </li>
          ))}
        </ul>
      </FilterGroup>
    </>
  );
}

function FilterGroup({ heading, children, last = false }: { heading: string; children: ReactNode; last?: boolean }) {
  return (
    <section className={`py-6 ${last ? "" : "border-b border-line"}`}>
      <h3 className="text-lead font-medium text-ink">{heading}</h3>
      <div className="pt-4">{children}</div>
    </section>
  );
}

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-4 text-copy text-body">
      <span className="relative inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
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
