"use client";

import type { ReactNode } from "react";
import { BedDouble, Building2, Plane, Users } from "lucide-react";
import { PAGE } from "@/components/site/container";
import { VantaDots } from "@/components/site/vanta-dots";
import { AiMark } from "@/components/site/ai-mark";
import { openAssistant } from "@/components/site/ai-assistant";
import { PrivateJet, SEARCH_TAB_EVENT, type SearchTab } from "@/components/site/search-bar";
import { showOffers } from "@/components/site/offers";
import type { OfferKind } from "@/lib/offers";

const ICON = { size: 22, strokeWidth: 1.9, "aria-hidden": true } as const;

type Tile = { label: string; icon: ReactNode } & ({ offers: OfferKind } | { action: () => void });

/** Each service opens its offers below; Ask AI opens the assistant. */
const TILES: Tile[] = [
  { label: "Flights", icon: <Plane {...ICON} />, offers: "flights" },
  { label: "Hotels", icon: <BedDouble {...ICON} />, offers: "hotels" },
  { label: "Apartments", icon: <Building2 {...ICON} />, offers: "apartments" },
  { label: "Private jets", icon: <PrivateJet {...ICON} />, offers: "jets" },
  { label: "Shared jets", icon: <Users {...ICON} />, offers: "shared" },
  { label: "Ask AI", icon: <AiMark size={22} />, action: () => openAssistant() },
];

function pickTab(tab: SearchTab) {
  window.dispatchEvent(new CustomEvent(SEARCH_TAB_EVENT, { detail: tab }));
  document.getElementById("search")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const tileClass =
  "flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-white px-1 py-3.5 text-center shadow-[0_1px_2px_rgba(16,24,40,0.05),0_8px_20px_-14px_rgba(16,24,40,0.3)] sm:gap-3 sm:py-5";

function TileBody({ tile }: { tile: Tile }) {
  return (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-soft text-blue sm:h-12 sm:w-12">
        {tile.icon}
      </span>
      <span className="text-tiny font-medium leading-tight text-ink sm:text-small">{tile.label}</span>
    </>
  );
}

/**
 * Home hero: the line and two actions on the left, every FLYGO service as a
 * tile grid on the right, over a slow three.js dot field.
 */
export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <VantaDots className="absolute inset-0 -z-20" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.75)_45%,rgba(255,255,255,0.2)_100%)] lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.85)_38%,rgba(255,255,255,0)_70%)]"
      />

      <div className={`${PAGE} grid items-center gap-10 pb-12 pt-8 sm:pb-16 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:pb-24 lg:pt-20`}>
        <div className="animate-rise">
          <h1 className="text-display font-bold leading-[1.05] tracking-tight text-ink">
            Go anywhere,
            <br />
            <span className="font-script text-[1.25em] font-bold leading-none tracking-normal text-blue">in style.</span>
          </h1>
          <p className="mt-4 max-w-[440px] text-lead text-body">Flights, stays and private jets. No hidden fees.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => pickTab("Flight")}
              className="h-12 rounded-full bg-brand px-7 text-copy font-semibold text-white shadow-[0_10px_22px_-10px_rgba(224,117,42,0.8)] active:translate-y-px"
            >
              Start searching
            </button>
          </div>
        </div>

        <div className="animate-rise rounded-[28px] bg-white/60 p-2.5 shadow-[0_20px_50px_-30px_rgba(16,24,40,0.35)] backdrop-blur-md sm:p-4">
          <ul className="grid grid-cols-3 gap-2 sm:gap-3">
            {TILES.map((tile) => (
              <li key={tile.label}>
                <button
                  type="button"
                  onClick={"offers" in tile ? () => showOffers(tile.offers) : tile.action}
                  className={`${tileClass} w-full`}
                >
                  <TileBody tile={tile} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
