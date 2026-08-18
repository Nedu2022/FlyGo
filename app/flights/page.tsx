"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SearchSummaryBar } from "@/components/flights/search-summary-bar";
import { FiltersSidebar } from "@/components/flights/filters-sidebar";
import { SortTabs } from "@/components/flights/sort-tabs";
import { FlightResultCard } from "@/components/flights/flight-result-card";
import { ProviderModal } from "@/components/flights/provider-modal";
import { FLIGHT_RESULTS, RESULT_COUNT, SORT_MODES } from "@/lib/flight-data";

export default function FlightSearchPage() {
  const [comparing, setComparing] = useState<string | null>(null);

  return (
    <>
      <SiteHeader variant="solid" />
      <SearchSummaryBar />

      <main className="bg-canvas">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 px-5 py-8 sm:px-8 lg:flex-row-reverse lg:gap-12">
          <FiltersSidebar />

          <div className="min-w-0 flex-1">
            <SortTabs />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[16px] text-ink">
                Showing {RESULT_COUNT.showing} of{" "}
                <span className="text-brand">{RESULT_COUNT.total}</span>
              </p>

              <label className="relative flex items-center gap-2 text-[16px] text-ink">
                <span className="text-body">Sort by</span>
                <select className="cursor-pointer appearance-none bg-transparent pr-6 outline-none">
                  {SORT_MODES.map((mode) => (
                    <option key={mode}>{mode}</option>
                  ))}
                </select>
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
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-6">
              {FLIGHT_RESULTS.map((result) => (
                <FlightResultCard
                  key={result.id}
                  result={result}
                  onView={() => setComparing(result.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <ProviderModal open={comparing !== null} onClose={() => setComparing(null)} />

      <SiteFooter />
    </>
  );
}
