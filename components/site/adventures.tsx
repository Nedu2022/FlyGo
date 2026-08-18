"use client";

import { useState } from "react";
import { DestinationRail } from "@/components/site/destination-rail";
import { ADVENTURE_CATEGORIES, TRENDING } from "@/lib/flight-data";
import { PAGE } from "@/components/site/container";

/** Category-filtered rail. Each pill rotates the deck so the row visibly changes. */
export function Adventures() {
  const [active, setActive] = useState(ADVENTURE_CATEGORIES[0]);

  const offset = ADVENTURE_CATEGORIES.indexOf(active);
  const items = [...TRENDING.slice(offset), ...TRENDING.slice(0, offset)];

  return (
    <section className={`reveal ${PAGE} py-16`}>
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
        Discover
      </p>
      <h2 className="mt-2 text-center text-[28px] font-bold tracking-tight text-ink sm:text-[34px]">
        Unforgettable Adventures for You and Your Loved Ones
      </h2>
      <p className="mx-auto mt-4 max-w-[1000px] text-center text-[15px] leading-relaxed text-body">
        Explore destinations designed for fun, relaxation, and quality time together. From
        theme parks to serene beaches, find the perfect spot for your next family trip.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {ADVENTURE_CATEGORIES.map((category) => {
          const on = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={on}
              className={`h-[42px] rounded-full px-6 text-[15px] transition-colors duration-200 ${
                on ? "bg-ink text-white" : "bg-shell text-body hover:bg-line"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-9">
        <DestinationRail key={active} items={items} />
      </div>
    </section>
  );
}
