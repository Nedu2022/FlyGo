import Image from "next/image";
import Link from "next/link";
import { PAGE } from "@/components/site/container";
import { Rail, RAIL_ITEM } from "@/components/site/rail";
import { SectionHeader } from "@/components/site/section-header";
import { ArrowRight, Plane } from "lucide-react";
import { SearchBar } from "@/components/site/search-bar";
import { StayTile } from "@/components/stays/stay-card";
import { HostIllustration, ShareIllustration } from "@/components/ui/illustrations";
import { STAYS } from "@/lib/liteapi";
import { DEALS, type Deal } from "@/lib/site-data";

/** "$1,299" -> 1299, for ordering cheapest first. */
const price = (value: string) => Number(value.replace(/[^0-9.]/g, ""));

/** Flight deals: tall photo cards with the fare beneath. */
export function DealsRail() {
  return (
    <section className={`reveal ${PAGE} pt-16 lg:pt-24`}>
      <SectionHeader title="Cheapest flights" href="/flights" />
      <Rail label="flight deals" className="mt-6">
        {[...DEALS].sort((a, b) => price(a.price) - price(b.price)).map((deal) => (
          <li key={deal.city} className={RAIL_ITEM}>
            <DealCard deal={deal} />
          </li>
        ))}
      </Rail>
    </section>
  );
}

const CODES: Record<string, string> = {
  London: "LHR",
  Dubai: "DXB",
  Paris: "CDG",
  Santorini: "JTR",
  "New York": "JFK",
  "Cape Town": "CPT",
  Lisbon: "LIS",
};

/** A perforated tear line with punched notches, coloured to the page behind. */
export function TearLine({ notch = "bg-white" }: { notch?: string }) {
  return (
    <div aria-hidden="true" className="relative h-5">
      <span className="absolute inset-x-5 top-1/2 border-t-2 border-dashed border-line" />
      <span className={`absolute -left-2.5 top-0 h-5 w-5 rounded-full ${notch}`} />
      <span className={`absolute -right-2.5 top-0 h-5 w-5 rounded-full ${notch}`} />
    </div>
  );
}

/** A deal as a ticket: the photo above the tear, route and fare on the stub. */
export function DealCard({ deal }: { deal: Deal }) {
  return (
    <Link href="/flights" className="block rounded-[28px] bg-shell p-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-steel">
        <Image
          src={deal.image}
          alt={`${deal.city}, ${deal.country}`}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 300px"
          className="object-cover"
        />
      </div>
      <div className="px-3 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-h4 font-semibold tracking-tight text-ink">LOS</span>
          <span aria-hidden="true" className="flex flex-1 items-center">
            <span className="flex-1 border-t border-dashed border-muted" />
            <Plane size={16} strokeWidth={2} className="mx-1 rotate-45 text-ink" />
            <span className="flex-1 border-t border-dashed border-muted" />
          </span>
          <span className="text-h4 font-semibold tracking-tight text-ink">{CODES[deal.city] ?? deal.city.slice(0, 3).toUpperCase()}</span>
        </div>
        <p className="mt-1 text-small text-body">
          From Lagos · {deal.duration}
        </p>
      </div>
      <div className="-mx-2 mt-3">
        <TearLine />
      </div>
      <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1 px-3 pb-3 pt-2">
        <span className="text-tiny text-label">
          {deal.out} – {deal.back}
        </span>
        <span className="text-small text-body">
          from <span className="text-h4 font-semibold text-ink">{deal.price}</span>
        </span>
      </div>
    </Link>
  );
}

/** The search card, under the hero; the services grid scrolls here. */
export function SearchSection() {
  return (
    <section id="search" className={`${PAGE} scroll-mt-20`}>
      <div className="rounded-[28px] bg-shell p-4 sm:p-6 lg:p-8">
        <h2 className="mb-5 text-h3 font-semibold tracking-tight text-ink">Where to next?</h2>
        <SearchBar />
      </div>
    </section>
  );
}

/** Best-reviewed stays, hotels and apartments together. */
export function StaysRail() {
  return (
    <section className={`${PAGE} pt-16 lg:pt-24`}>
      <SectionHeader title="Loved by guests" href="/hotels/search" />
      <Rail label="top-rated stays" className="mt-6">
        {[...STAYS]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6)
          .map((hotel) => (
            <li key={hotel.id} className={RAIL_ITEM}>
              <StayTile hotel={hotel} />
            </li>
          ))}
      </Rail>
    </section>
  );
}

const FEATURES = [
  {
    title: "Share a private jet",
    body: "Join others on the same route and split the cost.",
    cta: "See shared flights",
    href: "/private-jets#share",
    art: <ShareIllustration className="h-28 w-auto sm:h-36" />,
    tone: "bg-brand-soft",
  },
  {
    title: "Earn from your place",
    body: "List your apartment and get booked by travellers.",
    cta: "List your place",
    href: "/host",
    art: <HostIllustration className="h-28 w-auto sm:h-36" />,
    tone: "bg-sky-soft",
  },
];

/** The two services that aren't a search: jet sharing and hosting. */
export function FeatureBanners() {
  return (
    <section className={`${PAGE} grid gap-4 pt-16 sm:grid-cols-2 lg:pt-24`}>
      {FEATURES.map((f) => (
        <Link key={f.title} href={f.href} className={`flex items-center gap-4 rounded-[28px] p-5 sm:p-7 ${f.tone}`}>
          <div className="min-w-0 flex-1">
            <h3 className="text-h3 font-semibold tracking-tight text-ink">{f.title}</h3>
            <p className="mt-1.5 text-small text-body">{f.body}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-ink">
              {f.cta}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </span>
          </div>
          <div className="shrink-0">{f.art}</div>
        </Link>
      ))}
    </section>
  );
}
