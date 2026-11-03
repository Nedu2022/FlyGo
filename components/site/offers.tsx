import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PAGE } from "@/components/site/container";
import { Rail, RAIL_ITEM } from "@/components/site/rail";
import { OFFERS_BY_KIND, OFFER_TABS, discount, type HomeOffer, type OfferKind } from "@/lib/offers";

/** Hero service tiles scroll to their matching offers, which are all visible below. */
export function showOffers(kind: OfferKind) {
  document.getElementById(`offers-${kind}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Today's discounted offers, shown together in compact horizontal rails. */
export function OffersSection() {
  return (
    <section id="offers" className={`${PAGE} scroll-mt-20 pt-12 lg:pt-16`}>
      <div className="mb-6">
        <h2 className="text-h2 font-bold tracking-tight text-ink">Today&apos;s offers</h2>
        <p className="mt-1 text-small text-body">Browse offers across every FLYGO service.</p>
      </div>

      <div className="space-y-8 lg:space-y-10">
        {OFFER_TABS.map((tab) => (
          <section key={tab.kind} id={`offers-${tab.kind}`} className="scroll-mt-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-h3 font-bold tracking-tight text-ink">{tab.label}</h3>
                <p className="mt-1 text-small text-body">{tab.note}</p>
              </div>
              <Link href={tab.href} className="flex shrink-0 items-center gap-1 text-small font-semibold text-ink">
                See all <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>
            <Rail label={`${tab.label} offers`} className="mt-4">
              {OFFERS_BY_KIND[tab.kind].map((offer) => (
                <li key={offer.id} className={RAIL_ITEM}>
                  <OfferCard offer={offer} />
                </li>
              ))}
            </Rail>
          </section>
        ))}
      </div>
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
