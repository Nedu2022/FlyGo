import Image from "next/image";
import Link from "next/link";
import { PAGE } from "@/components/site/container";
import { Rail, RAIL_ITEM } from "@/components/site/rail";
import { SectionHeader } from "@/components/site/section-header";
import { ArrowRight, BedDouble, Building2, Plane, Star } from "lucide-react";
import { Avatar } from "@/components/dashboard/icons";
import { PrivateJet } from "@/components/site/search-bar";
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
            <p className="text-h4 font-semibold text-ink">Every airline, one search</p>
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
            <p className="text-h4 font-semibold text-ink">2 million journeys</p>
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
            <p className="text-h4 font-semibold text-ink">Rated 4.8 out of 5</p>
            <p className="mt-1 text-small text-body">Honest prices and help when plans change.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { title: "Flights", body: "Compare airlines in one search", href: "/flights", icon: Plane },
  { title: "Hotels", body: "Top-rated stays, free cancellation", href: "/hotels", icon: BedDouble },
  { title: "Apartments", body: "Room for families and long stays", href: "/hotels", icon: Building2 },
  { title: "Private jets", body: "Book a whole jet or share one", href: "/private-jets", icon: PrivateJet },
];

/** Every FLYGO service as a short ticket strip, with an arrow on the stub. */
export function Services() {
  return (
    <section className={`${PAGE} pt-16 lg:pt-24`}>
      <SectionHeader title="Everything for your trip" />
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {SERVICES.map(({ title, body, href, icon: Icon }) => (
          <li key={title}>
            <Link href={href} className="flex items-stretch rounded-[24px] bg-shell">
              <span className="flex min-w-0 flex-1 items-center gap-4 p-4 sm:p-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
                  <Icon size={24} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-h4 font-semibold text-ink">{title}</span>
                  <span className="block text-small text-body">{body}</span>
                </span>
              </span>
              <span aria-hidden="true" className="relative w-px self-stretch">
                <span className="absolute inset-y-3 left-0 border-l-2 border-dashed border-line" />
                <span className="absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-white" />
                <span className="absolute -bottom-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-white" />
              </span>
              <span className="flex w-16 shrink-0 items-center justify-center text-ink sm:w-20">
                <ArrowRight size={22} strokeWidth={2} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
