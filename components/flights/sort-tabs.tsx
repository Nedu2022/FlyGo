"use client";

import type { SortMode } from "@/lib/flight-data";

export type SortSummary = { mode: SortMode; label: string; price: string; duration: string };

/** Best / Cheapest / Quickest, each showing what you'd get by picking it. */
export function SortTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: SortSummary[];
  active: SortMode;
  onChange: (mode: SortMode) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Sort results">
      {tabs.map((tab) => {
        const on = tab.mode === active;
        return (
          <button
            key={tab.mode}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(tab.mode)}
            className={`relative min-w-0 overflow-hidden rounded-xl px-3 py-3 text-left transition-colors duration-200 sm:px-5 sm:py-4 ${
              on ? "bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]" : "bg-white/60"
            }`}
          >
            <span className={`block text-small sm:text-copy ${on ? "font-bold text-ink" : "font-medium text-body"}`}>
              {tab.label}
            </span>
            <span className="mt-0.5 block truncate text-tiny text-label sm:text-small">
              <span className="font-semibold text-ink">{tab.price}</span> · {tab.duration}
            </span>
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-[3px] bg-brand transition-transform duration-300 ${
                on ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
