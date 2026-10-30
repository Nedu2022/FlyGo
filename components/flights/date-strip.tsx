"use client";

import { useState } from "react";
import { DATE_PRICES } from "@/lib/flight-data";

/** Flexible-dates strip: cheapest fare per departure day, cheapest one flagged. */
export function DateStrip() {
  const [active, setActive] = useState(DATE_PRICES[4].day);
  const lowest = Math.min(...DATE_PRICES.map((d) => d.price));

  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="listbox" aria-label="Departure date">
      {DATE_PRICES.map((date) => {
        const on = date.day === active;
        const cheapest = date.price === lowest;
        return (
          <button
            key={date.day}
            type="button"
            role="option"
            aria-selected={on}
            onClick={() => setActive(date.day)}
            className={`min-w-[104px] flex-1 shrink-0 rounded-xl px-3 py-2.5 text-center transition-colors duration-200 ${
              on ? "bg-ink text-white" : "bg-white text-ink"
            }`}
          >
            <span className={`block text-tiny ${on ? "text-white/70" : "text-label"}`}>{date.day}</span>
            <span className={`block text-copy font-bold ${cheapest && !on ? "text-sky" : ""}`}>${date.price}</span>
          </button>
        );
      })}
    </div>
  );
}
