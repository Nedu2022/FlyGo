"use client";

import { Bell } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SearchSummaryBar } from "@/components/flights/search-summary-bar";
import { CinematicHero } from "@/components/site/hero";
import { FiltersSidebar, type StopsFilter } from "@/components/flights/filters-sidebar";
import { SortTabs, type SortSummary } from "@/components/flights/sort-tabs";
import { DateStrip } from "@/components/flights/date-strip";
import { FlightResultCard } from "@/components/flights/flight-result-card";
import { ProviderModal } from "@/components/flights/provider-modal";
import { FLIGHT_RESULTS, TRIP, type FlightResult, type SortMode } from "@/lib/flight-data";

const totalMinutes = (r: FlightResult) => r.outbound.minutes + r.inbound.minutes;
const maxStops = (r: FlightResult) => Math.max(r.outbound.stops, r.inbound.stops);

/** "Best" weighs price against total journey time, the way metasearch sites rank. */
const score = (r: FlightResult) => r.amount + totalMinutes(r) * 0.5;

const SORTERS: Record<SortMode, (a: FlightResult, b: FlightResult) => number> = {
  best: (a, b) => score(a) - score(b),
  cheapest: (a, b) => a.amount - b.amount,
  quickest: (a, b) => totalMinutes(a) - totalMinutes(b),
};

const STOP_TESTS: Record<StopsFilter, (r: FlightResult) => boolean> = {
  any: () => true,
  direct: (r) => maxStops(r) === 0,
  one: (r) => maxStops(r) === 1,
};

function hours(minutes: number) {
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}m`;
}

export default function FlightSearchPage() {
  const [comparing, setComparing] = useState<string | null>(null);
  const [sort, setSort] = useState<SortMode>("best");
  const [stops, setStops] = useState<StopsFilter>("any");
  const [alerts, setAlerts] = useState(false);

  const filtered = useMemo(() => FLIGHT_RESULTS.filter(STOP_TESTS[stops]), [stops]);
  const sorted = useMemo(() => [...filtered].sort(SORTERS[sort]), [filtered, sort]);

  const tabs: SortSummary[] = (["best", "cheapest", "quickest"] as const).map((mode) => {
    const top = [...filtered].sort(SORTERS[mode])[0];
    return {
      mode,
      label: mode[0].toUpperCase() + mode.slice(1),
      price: top ? top.price : "—",
      duration: top ? hours(Math.round(totalMinutes(top) / 2)) : "",
    };
  });

  // Badges mark the winners of each sort, whichever order is showing.
  const cheapestId = [...filtered].sort(SORTERS.cheapest)[0]?.id;
  const quickestId = [...filtered].sort(SORTERS.quickest)[0]?.id;

  const stopPrices = Object.fromEntries(
    (Object.keys(STOP_TESTS) as StopsFilter[]).map((key) => {
      const options = FLIGHT_RESULTS.filter(STOP_TESTS[key]);
      return [key, options.length ? `$${Math.min(...options.map((r) => r.amount))}` : null];
    }),
  ) as Record<StopsFilter, string | null>;

  return (
    <>
      <SiteHeader variant="solid" />
      <CinematicHero
        slides={[{ src: "/images/photos/hero-sky.webp", position: "70% center" }]}
        title={
          <>
            {TRIP.from} <span className="text-brand">→</span> {TRIP.to}
          </>
        }
        subtitle={`${TRIP.trip} · ${TRIP.passengers} · from $${Math.min(...FLIGHT_RESULTS.map((r) => r.amount))}`}
      >
        <SearchSummaryBar embedded />
      </CinematicHero>

      <main className="mt-6 flex-1 bg-shell sm:mt-8">
        <div className="mx-auto w-full max-w-[1240px] space-y-4 px-4 py-5 sm:px-8 sm:py-10 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 lg:space-y-0">
          <FiltersSidebar
            stops={stops}
            onStopsChange={setStops}
            stopPrices={stopPrices}
            resultCount={filtered.length}
          />

          <div className="min-w-0 space-y-4">
            <div className="hidden items-center justify-between gap-3 rounded-2xl bg-white p-4 sm:flex sm:p-5">
              <div>
                <h2 className="text-copy font-semibold text-ink">
                  {filtered.length} of {FLIGHT_RESULTS.length} flights
                </h2>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={alerts}
                onClick={() => setAlerts((v) => !v)}
                className="flex shrink-0 items-center gap-2 rounded-full bg-shell py-1.5 pl-3 pr-1.5 text-small font-medium text-ink sm:gap-3 sm:pl-4"
              >
                <Bell size={16} strokeWidth={2} aria-hidden="true" />
                <span className="hidden min-[400px]:inline">{alerts ? "Tracking prices" : "Track prices"}</span>
                <span className="min-[400px]:hidden">Alerts</span>
                <span className={`flex h-6 w-10 items-center rounded-full p-0.5 transition-colors duration-200 ${alerts ? "bg-brand" : "bg-muted/60"}`}>
                  <span className={`h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${alerts ? "translate-x-4" : ""}`} />
                </span>
              </button>
            </div>

            <DateStrip />
            <SortTabs tabs={tabs} active={sort} onChange={setSort} />

            {sorted.length ? (
              <ul className="space-y-3">
                {sorted.map((result) => (
                  <li key={result.id}>
                    <FlightResultCard
                      result={result}
                      badge={result.id === cheapestId ? "Cheapest" : result.id === quickestId ? "Quickest" : undefined}
                      onView={() => setComparing(result.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-2xl bg-white p-8 text-center text-copy text-body">
                No flights match these filters.{" "}
                <button type="button" onClick={() => setStops("any")} className="font-semibold text-blue">
                  Clear filters
                </button>
              </p>
            )}
          </div>
        </div>
      </main>

      <ProviderModal open={comparing !== null} onClose={() => setComparing(null)} />

      <SiteFooter flush />
    </>
  );
}
