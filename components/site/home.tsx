import Image from "next/image";
import Link from "next/link";
import { PAGE } from "@/components/site/container";
import { Rail, RAIL_ITEM } from "@/components/site/rail";
import { SectionHeader } from "@/components/site/section-header";
import { Plane, Star } from "lucide-react";
import { Avatar } from "@/components/dashboard/icons";
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
          <span className="text-h4 font-bold tracking-tight text-ink">LOS</span>
          <span aria-hidden="true" className="flex flex-1 items-center">
            <span className="flex-1 border-t border-dashed border-muted" />
            <Plane size={16} strokeWidth={2} className="mx-1 rotate-45 text-ink" />
            <span className="flex-1 border-t border-dashed border-muted" />
          </span>
          <span className="text-h4 font-bold tracking-tight text-ink">{CODES[deal.city] ?? deal.city.slice(0, 3).toUpperCase()}</span>
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
          from <span className="text-h4 font-bold text-ink">{deal.price}</span>
        </span>
      </div>
    </Link>
  );
}

const PARTNERS = [
  "/images/airlines/emirates.svg",
  "/images/providers/wego.svg",
  "/images/providers/mytrip.svg",
  "/images/providers/city-travel.svg",
  "/images/providers/lucky2go.svg",
];

/** Three ticket-style reasons to book, a swipeable row on phones. */
export function TrustCards() {
  const card = "flex w-[82%] shrink-0 snap-start flex-col rounded-[28px] bg-shell sm:w-auto";
  const top = "px-6 pb-4 pt-6 sm:px-7 sm:pt-7";
  const stub = "px-6 pb-6 pt-3 sm:px-7 sm:pb-7";
  return (
    <section className={`${PAGE} pt-8 sm:pt-12`}>
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0">
        <div className={card}>
          <div className={top}>
            <div className="flex -space-x-2">
              {PARTNERS.map((src) => (
                <span key={src} className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-shell bg-white">
                  <Image src={src} alt="" width={44} height={44} className="h-9 w-10 object-contain" />
                </span>
              ))}
            </div>
          </div>
          <TearLine />
          <div className={stub}>
            <p className="text-h4 font-bold text-ink">Every airline, one search</p>
            <p className="mt-1 text-small text-body">We check them all so you get the lowest fare.</p>
          </div>
        </div>

        <div className={card}>
          <div className={top}>
            <div className="flex -space-x-2">
              {["Ada Okafor", "Tunde Bello", "Mina Sato"].map((name) => (
                <Avatar key={name} name={name} size={56} className="ring-2 ring-shell" />
              ))}
            </div>
          </div>
          <TearLine />
          <div className={stub}>
            <p className="text-h4 font-bold text-ink">2 million journeys</p>
            <p className="mt-1 text-small text-body">Planned by travellers across Africa and beyond.</p>
          </div>
        </div>

        <div className={card}>
          <div className={top}>
            <div className="flex h-14 items-center gap-1" role="img" aria-label="Rated 4.8 out of 5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={26} strokeWidth={0} fill="var(--color-star)" aria-hidden="true" />
              ))}
            </div>
          </div>
          <TearLine />
          <div className={stub}>
            <p className="text-h4 font-bold text-ink">Rated 4.8 out of 5</p>
            <p className="mt-1 text-small text-body">Honest prices and help when plans change.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { title: "Flights", body: "Compare airlines in one search", href: "/flights", image: "/images/photos/hero-sky.webp", position: "70% center" },
  { title: "Hotels", body: "Top-rated stays, free cancellation", href: "/hotels", image: "/images/photos/stay-suite.webp", position: "center" },
  { title: "Apartments", body: "Space for families and long stays", href: "/hotels", image: "/images/photos/lisbon-tram.webp", position: "center" },
  { title: "Private jets", body: "Book a whole jet or share one", href: "/private-jets", image: "/images/photos/jet-hero.webp", position: "35% center" },
];

/** Every FLYGO service, one photo card each. */
export function Services() {
  return (
    <section className={`${PAGE} pt-16 lg:pt-24`}>
      <SectionHeader title="Everything for your trip" />
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <li key={service.title}>
            <Link href={service.href} className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-steel sm:aspect-[3/4]">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 46vw, 300px"
                  className="object-cover"
                  style={{ objectPosition: service.position }}
                />
              </div>
              <p className="mt-3 text-copy font-bold text-ink sm:text-h4">{service.title}</p>
              <p className="text-small text-body">{service.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
