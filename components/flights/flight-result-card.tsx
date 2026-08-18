"use client";

import Image from "next/image";
import type { FlightResult } from "@/lib/flight-data";

/** One result row: airline, times, price, then the full-width action. */
export function FlightResultCard({
  result,
  onView,
}: {
  result: FlightResult;
  onView: () => void;
}) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.08),0_10px_28px_-18px_rgba(16,24,40,0.25)] transition-shadow duration-300 hover:shadow-[0_8px_30px_-12px_rgba(16,24,40,0.22)] sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <Image
          src={result.logo}
          alt={result.airline}
          width={100}
          height={70}
          className="h-[54px] w-auto shrink-0 object-contain"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <div>
              <p className="text-[19px] text-ink">
                {result.depart} <span className="px-1 text-label">-</span> {result.arrive}
              </p>
              <p className="mt-1 text-[15px] text-label">{result.airline}</p>
            </div>

            <p className="text-[15px] text-body">{result.stops}</p>

            <div>
              <p className="text-[17px] text-ink">{result.duration}</p>
              <p className="mt-1 text-[15px] text-label">{result.route}</p>
            </div>

            <div className="text-right">
              <p className="text-[14px] text-label">starting from</p>
              <p className="mt-0.5 text-[26px] font-bold text-brand">{result.price}</p>
            </div>
          </div>

          <hr className="mt-4 border-line" />

          <button
            type="button"
            onClick={onView}
            className="mt-4 h-[52px] w-full rounded-lg bg-sky text-[16px] font-medium text-white transition-all duration-200 hover:bg-sky-hover active:translate-y-px"
          >
            View Flight
          </button>
        </div>
      </div>
    </article>
  );
}
