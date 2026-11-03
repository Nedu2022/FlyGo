"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PAGE } from "@/components/site/container";
import { Rail, RAIL_ITEM } from "@/components/site/rail";
import { OFFERS_BY_KIND, OFFER_TABS, discount, type HomeOffer, type OfferKind } from "@/lib/offers";

/** Fired by the hero's service tiles to open a category here. */
export const OFFERS_EVENT = "flygo:offers";

export function showOffers(kind: OfferKind) {
  window.dispatchEvent(new CustomEvent(OFFERS_EVENT, { detail: kind }));
  document.getElementById("offers")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Today's discounted offers, one tab per service. */
export function OffersSection() {
  const [kind, setKind] = useState<OfferKind>("flights");

  useEffect(() => {
    const pick = (event: Event) => setKind((event as CustomEvent<OfferKind>).detail);
    window.addEventListener(OFFERS_EVENT, pick);
    return () => window.removeEventListener(OFFERS_EVENT, pick);
  }, []);

  // On phones the tabs scroll sideways; keep the chosen one in view.
  const tabs = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = tabs.current;
    const on = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (list && on) list.scrollTo({ left: on.offsetLeft - list.clientWidth / 2 + on.clientWidth / 2, behavior: "smooth" });
  }, [kind]);

  const tab = OFFER_TABS.find((t) => t.kind === kind)!;

  return (
    <section id="offers" className={`${PAGE} scroll-mt-20 pt-12 lg:pt-16`}>
      <h2 className="text-h2 font-bold tracking-tight text-ink">Today&apos;s offers</h2>
      <p className="mt-1 text-small text-body">{tab.note}</p>

      <div ref={tabs} role="tablist" aria-label="Offer type" className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        {OFFER_TABS.map((t) => {
          const on = t.kind === kind;
          return (
            <button
              key={t.kind}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="offers-panel"
              onClick={() => setKind(t.kind)}
              className={`h-10 shrink-0 rounded-full px-4 text-small font-medium transition-colors duration-200 ${
                on ? "bg-ink text-white" : "bg-shell text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div id="offers-panel" role="tabpanel" aria-label={tab.label} key={kind} className="animate-rise">
        <Rail label={`${tab.label} offers`} className="mt-5">
          {OFFERS_BY_KIND[kind].map((offer) => (
            <li key={offer.id} className={RAIL_ITEM}>
              <OfferCard offer={offer} />
            </li>
          ))}
        </Rail>
      </div>

      <Link href={tab.href} className="mt-4 inline-flex items-center gap-1 text-small font-semibold text-ink">
        See all {tab.label.toLowerCase()} <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
      </Link>
    </section>
  );
}

function OfferCard({ offer }: { offer: HomeOffer }) {
  return (
    <Link href={offer.href} className="block h-full rounded-[24px] bg-shell p-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-steel">
        <Image src={offer.image} alt="" fill sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 300px" className="object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-tiny font-bold text-ink">
          {offer.tag ?? `-${discount(offer)}%`}
        </span>
        {offer.logo ? (
          <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote SVG logo */}
            <img src={offer.logo} alt="" width={24} height={24} loading="lazy" />
          </span>
        ) : null}
      </div>
      <div className="px-2.5 pb-2.5 pt-3">
        <h3 className="line-clamp-1 text-copy font-semibold text-ink">{offer.title}</h3>
        <p className="line-clamp-1 text-small text-body">{offer.subtitle}</p>
        <p className="line-clamp-1 text-tiny text-label">{offer.meta}</p>
        <p className="mt-2.5 flex items-baseline gap-2">
          <span className="text-h4 font-bold text-ink">${offer.price.toLocaleString("en-US")}</span>
          <span className="text-small text-label line-through">${offer.was.toLocaleString("en-US")}</span>
          <span className="text-tiny text-label">/ {offer.unit}</span>
        </p>
      </div>
    </Link>
  );
}
