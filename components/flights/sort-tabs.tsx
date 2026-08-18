"use client";

import { useState } from "react";
import { SORT_TABS } from "@/lib/flight-data";

export function SortTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex overflow-x-auto rounded-xl bg-white shadow-[0_1px_3px_rgba(16,24,40,0.08)] no-scrollbar">
      {SORT_TABS.map((tab, index) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => setActive(index)}
          aria-pressed={index === active}
          className={`relative min-w-[150px] flex-1 border-r border-line px-5 py-4 text-left transition-colors duration-200 last:border-r-0 hover:bg-sky-tint`}
        >
          <span
            className={`block text-lead ${ index === active ? "font-semibold text-ink" : "text-ink" }`}
          >
            {tab.label}
          </span>
          <span className="mt-1 block text-small text-label">
            {tab.price} . {tab.duration}
          </span>
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-0 h-[3px] origin-left rounded-full bg-sky transition-transform duration-300 ${
              index === active ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </button>
      ))}

      <button
        type="button"
        className="flex min-w-[150px] flex-1 items-center justify-center gap-3 px-5 py-4 text-copy text-ink transition-colors duration-200 hover:bg-sky-tint"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h11M4 17h7" />
        </svg>
        Other sort
      </button>
    </div>
  );
}
