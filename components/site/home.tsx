import Image from "next/image";
import Link from "next/link";
import { PAGE } from "@/components/site/container";
import { Rail, RAIL_ITEM } from "@/components/site/rail";
import { SectionHeader } from "@/components/site/section-header";
import { HotelCard } from "@/components/site/cards";
import { DEALS, HOTELS, type Deal } from "@/lib/site-data";

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

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <Link href="/flights" className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-steel">
        <Image
          src={deal.image}
          alt={`${deal.city}, ${deal.country}`}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 300px"
          className="object-cover"
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 px-1 pt-4">
        <h3 className="text-h4 font-bold tracking-tight text-ink">{deal.city}</h3>
        <p className="shrink-0 text-small text-body">
          from <span className="text-h4 font-bold text-ink">{deal.price}</span>
        </p>
      </div>
      <p className="px-1 text-small text-body">{deal.duration}</p>
    </Link>
  );
}

/** Hotel rail for the home page. */
export function StaysRail() {
  return (
    <section className={`reveal ${PAGE} pt-16 lg:pt-24`}>
      <SectionHeader title="Stays you'll love" href="/hotels" />
      <Rail label="stays" className="mt-6">
        {[...HOTELS].sort((a, b) => Number(b.score) - Number(a.score)).map((hotel) => (
          <li key={hotel.name} className={RAIL_ITEM}>
            <HotelCard hotel={hotel} />
          </li>
        ))}
      </Rail>
    </section>
  );
}
