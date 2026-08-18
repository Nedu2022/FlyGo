"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TRENDING, type Destination } from "@/lib/flight-data";

const PER_PAGE = 4;

/**
 * Card rail that pages four at a time. The track is nudged left by half a card
 * on wide screens so the next card peeks in, as the design shows.
 */
export function DestinationRail({
  items = TRENDING,
  perPage = PER_PAGE,
}: {
  items?: Destination[];
  perPage?: number;
}) {
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const [page, setPage] = useState(0);

  return (
    <div>
      <div className="overflow-hidden">
        <ul
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {items.map((item) => (
            <li
              key={`${item.name}-${item.reviews}`}
              className="w-[calc(100%-1.5rem)] shrink-0 sm:w-[calc(50%-0.75rem)] lg:w-[calc(28%-0.75rem)]"
            >
              <DestinationCard destination={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show page ${i + 1}`}
            aria-current={i === page}
            onClick={() => setPage(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === page ? "w-5 bg-brand" : "w-2 bg-line hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href="/flights"
      className="group block rounded-lg bg-white p-3 shadow-[0_1px_3px_rgba(16,24,40,0.08),0_10px_28px_-18px_rgba(16,24,40,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-16px_rgba(16,24,40,0.35)]"
    >
      <div className="relative h-[150px] w-full overflow-hidden rounded-md">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 90vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex items-end justify-between gap-3 px-1 pb-1 pt-4">
        <div className="min-w-0">
          <h3 className="text-[16px] font-bold text-ink">{destination.name}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-body">
            <Star />
            {destination.rating} ({destination.reviews})
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-body">
            <Pin />
            {destination.country}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[12px] text-label">Start from</p>
          <p className="text-[22px] font-bold text-sky">{destination.price}</p>
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
