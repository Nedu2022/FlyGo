import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Hotel } from "@/lib/site-data";

export function ResortCountryCard({
  country,
}: {
  country: {
    region: string;
    name: string;
    budget: string;
    love: string;
    image: string;
  };
}) {
  return (
    <Link
      href="/hotels"
      className="group relative isolate block aspect-[4/5] overflow-hidden rounded-3xl bg-steel sm:aspect-[3/4]"
    >
      <Image
        src={country.image}
        alt={country.name}
        fill
        sizes="(max-width: 768px) 92vw, 400px"
        className="-z-20 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,22,36,0)_45%,rgba(6,22,36,0.85)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-small text-white/80">{country.region}</p>
        <h3 className="text-h1 font-bold leading-tight tracking-tight text-white">{country.name}</h3>
        <p className="mt-3 text-copy font-semibold text-white">from {country.budget}</p>
      </div>
    </Link>
  );
}

/** Photo-first stay card: the picture carries it, details sit quietly beneath. */
export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link href="/hotels" className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-shell">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 300px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-copy font-bold text-ink">{hotel.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-small font-semibold text-ink">
            <Star size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
            {hotel.score}
          </span>
        </div>
        <p className="mt-2 text-small text-body">
          <span className="text-copy font-bold text-ink">{hotel.price}</span> / night
        </p>
      </div>
    </Link>
  );
}

export function Stars({ count, className = "" }: { count: number; className?: string }) {
  return (
    <div
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--color-star)" aria-hidden="true">
          <path d="m12 2 3 6.6 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.3l1.4-7L2 9.5l7-.9L12 2Z" />
        </svg>
      ))}
    </div>
  );
}
