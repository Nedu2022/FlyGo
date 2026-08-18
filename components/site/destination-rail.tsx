"use client";

import Image from "next/image";
import Link from "next/link";
import { TRENDING, type Destination } from "@/lib/flight-data";
import { Rail } from "@/components/site/rail";

export function DestinationRail({ items = TRENDING }: { items?: Destination[] }) {
  return (
    <Rail label="destinations">
      {items.map((item, index) => (
        <li
          key={`${item.name}-${index}`}
          // Exactly four per viewport on desktop, so a page scroll lands on a
          // card edge instead of slicing one in half.
          className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
        >
          <DestinationCard destination={item} />
        </li>
      ))}
    </Rail>
  );
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href="/flights"
      className="group block rounded-lg bg-white p-3 shadow-[0_1px_3px_rgba(16,24,40,0.08),0_10px_28px_-18px_rgba(16,24,40,0.3)]"
    >
      <div className="relative h-[150px] w-full overflow-hidden rounded-md">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 90vw, 300px"
          className="object-cover"
        />
      </div>

      <div className="flex items-end justify-between gap-3 px-1 pb-1 pt-4">
        <div className="min-w-0">
          <h3 className="text-copy font-bold text-ink">{destination.name}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-small text-body">
            <Star />
            {destination.rating} ({destination.reviews})
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-small text-body">
            <Pin />
            {destination.country}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-tiny text-label">Start from</p>
          <p className="text-h4 font-bold text-sky">{destination.price}</p>
        </div>
      </div>
    </Link>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-brand)" aria-hidden="true" className="shrink-0">
      <path d="m12 2 3 6.6 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.3l1.4-7L2 9.5l7-.9L12 2Z" />
    </svg>
  );
}

function Pin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className="shrink-0">
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
