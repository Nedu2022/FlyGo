"use client";

import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SearchSummaryBar } from "@/components/flights/search-summary-bar";
import { CinematicHero } from "@/components/site/hero";
import { FiltersSidebar, type StopsFilter } from "@/components/flights/filters-sidebar";
import { SortTabs, type SortMode, type SortSummary } from "@/components/flights/sort-tabs";
import { FlightResultCard } from "@/components/flights/flight-result-card";
import { Pagination, scrollToList } from "@/components/ui/pagination";
import { OFFERS, SEARCH, includedBags, type Offer } from "@/lib/duffel";
import { duration, minutes, money } from "@/lib/format";

const price = (o: Offer) => Number(o.total_amount);
const travelMinutes = (o: Offer) => o.slices.reduce((sum, s) => sum + minutes(s.duration), 0);
const maxStops = (o: Offer) => Math.max(...o.slices.map((s) => s.segments.length - 1));

/** "Best" weighs price against total journey time, the way metasearch sites rank. */
const score = (o: Offer) => price(o) + travelMinutes(o) * 0.5;

const SORTERS: Record<SortMode, (a: Offer, b: Offer) => number> = {
  best: (a, b) => score(a) - score(b),
  cheapest: (a, b) => price(a) - price(b),
  quickest: (a, b) => travelMinutes(a) - travelMinutes(b),
};

const STOP_TESTS: Record<StopsFilter, (o: Offer) => boolean> = {
  any: () => true,
  direct: (o) => maxStops(o) === 0,
  one: (o) => maxStops(o) === 1,
};

const PAGE_SIZE = 5;

const AIRLINES = [...new Set(OFFERS.map((o) => o.owner.name))].sort();

export default function FlightSearchPage() {
  const [sort, setSort] = useState<SortMode>("best");
  const [stops, setStops] = useState<StopsFilter>("any");
  const [hiddenAirlines, setHiddenAirlines] = useState<string[]>([]);
  const [bagsOnly, setBagsOnly] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      OFFERS.filter(STOP_TESTS[stops])
        .filter((o) => !hiddenAirlines.includes(o.owner.name))
        .filter((o) => !bagsOnly || includedBags(o).checked > 0),
    [stops, hiddenAirlines, bagsOnly],
  );
  const sorted = useMemo(() => [...filtered].sort(SORTERS[sort]), [filtered, sort]);
  // A filter or sort change can leave the page past the end; clamp instead of resetting state.
  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const shown = sorted.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const tabs: SortSummary[] = (["best", "cheapest", "quickest"] as const).map((mode) => {
    const top = [...filtered].sort(SORTERS[mode])[0];
    return {
      mode,
      label: mode[0].toUpperCase() + mode.slice(1),
      price: top ? money(top.total_amount, top.total_currency) : "—",
      duration: top ? duration(top.slices[0].duration) : "",
    };
  });

  // Badges mark the winners of each sort, whichever order is showing.
  const cheapestId = [...filtered].sort(SORTERS.cheapest)[0]?.id;
  const quickestId = [...filtered].sort(SORTERS.quickest)[0]?.id;

  const stopPrices = Object.fromEntries(
    (Object.keys(STOP_TESTS) as StopsFilter[]).map((key) => {
      const options = OFFERS.filter(STOP_TESTS[key]);
      return [key, options.length ? money(Math.min(...options.map(price))) : null];
    }),
  ) as Record<StopsFilter, string | null>;

  const clear = () => {
    setStops("any");
    setHiddenAirlines([]);
    setBagsOnly(false);
  };

  return (
    <>
      <SiteHeader variant="solid" />
      <CinematicHero
        slides={[{ src: "/images/photos/hero-sky.webp", position: "70% center" }]}
        title={
          <>
            {SEARCH.from} <span className="text-brand">→</span> {SEARCH.to}
          </>
        }
        subtitle={`${SEARCH.dates} · ${SEARCH.passengers}`}
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
            airlines={AIRLINES}
            hiddenAirlines={hiddenAirlines}
            onToggleAirline={(name) =>
              setHiddenAirlines((list) => (list.includes(name) ? list.filter((n) => n !== name) : [...list, name]))
            }
            bagsOnly={bagsOnly}
            onBagsOnly={() => setBagsOnly((v) => !v)}
          />

          <div className="min-w-0 space-y-4">
            <SortTabs tabs={tabs} active={sort} onChange={setSort} />
            <p id="results" className="scroll-mt-24 px-1 text-small text-label">
              {filtered.length} flights
            </p>

            {sorted.length ? (
              <ul className="space-y-3">
                {shown.map((offer) => (
                  <li key={offer.id}>
                    <FlightResultCard
                      offer={offer}
                      badge={offer.id === cheapestId ? "Cheapest" : offer.id === quickestId ? "Quickest" : undefined}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
            <Pagination
              page={current}
              pageSize={PAGE_SIZE}
              total={sorted.length}
              onChange={(p) => {
                setPage(p);
                scrollToList("results");
              }}
            />
            {sorted.length ? null : (
              <p className="rounded-2xl bg-white p-8 text-center text-copy text-body">
                No flights match.{" "}
                <button type="button" onClick={clear} className="font-semibold text-blue">
                  Clear filters
                </button>
              </p>
            )}
          </div>
        </div>
      </main>

      <SiteFooter flush />
    </>
  );
}
