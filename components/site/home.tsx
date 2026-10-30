import Image from "next/image";
import Link from "next/link";
import { PAGE } from "@/components/site/container";
import { Rail, RAIL_ITEM } from "@/components/site/rail";
import { SectionHeader } from "@/components/site/section-header";
import { ArrowRight, BedDouble, Building2, Plane } from "lucide-react";
import { PrivateJet } from "@/components/site/search-bar";
import { DEALS, type Deal } from "@/lib/site-data";

/** "$1,299" -> 1299, for ordering cheapest first. */
const price = (value: string) => Number(value.replace(/[^0-9.]/g, ""));

/** Flight deals: tall photo cards with the fare beneath. */
export function DealsRail() {
  return (
    <section className={`reveal ${PAGE} pt-16 lg:pt-24`}>
      <SectionHeader title="Postcards from Lagos" href="/flights" />
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

/** Perforated stamp edge: a grid of punched holes masked out of the paper. */
const STAMP_EDGE = {
  WebkitMask: "radial-gradient(circle at 4px 4px, transparent 2.4px, #000 2.6px) -4px -4px / 8px 8px",
  mask: "radial-gradient(circle at 4px 4px, transparent 2.4px, #000 2.6px) -4px -4px / 8px 8px",
} as const;

/** A deal as a postcard: photo, a stamp with the fare, and a Lagos postmark. */
export function DealCard({ deal }: { deal: Deal }) {
  const code = CODES[deal.city] ?? deal.city.slice(0, 3).toUpperCase();
  return (
    <Link href="/flights" className="block rounded-[22px] bg-white p-2.5 shadow-[0_1px_2px_rgba(16,24,40,0.06),0_14px_32px_-20px_rgba(16,24,40,0.4)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-steel">
        <Image
          src={deal.image}
          alt={`${deal.city}, ${deal.country}`}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 300px"
          className="object-cover"
        />
        {/* Stamp: perforated paper behind, the printed face on top. */}
        <span className="absolute right-3 top-3 p-[6px] drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]">
          <span aria-hidden="true" className="absolute inset-0 bg-white" style={STAMP_EDGE} />
          <span className="relative flex flex-col items-center border border-brand/40 bg-brand-soft px-3 py-1.5">
            <span className="text-micro font-medium uppercase tracking-[0.14em] text-brand-hover">from</span>
            <span className="text-h4 font-semibold leading-none text-ink">{deal.price}</span>
          </span>
        </span>
        <span className="absolute bottom-3 left-3 flex h-[72px] w-[72px] rotate-[-12deg] flex-col items-center justify-center rounded-full border-2 border-dashed border-white/85 text-white">
          <span className="text-micro font-semibold uppercase tracking-[0.12em]">Lagos</span>
          <span className="text-tiny font-semibold">{deal.out.split(" ")[1]}</span>
        </span>
      </div>
      <div className="px-2 pb-2 pt-4">
        <p className="font-serif text-[1.9rem] italic leading-none text-ink">{deal.city}</p>
        <p className="mt-2 text-small text-body">
          LOS → {code} · {deal.duration}
        </p>
      </div>
    </Link>
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
