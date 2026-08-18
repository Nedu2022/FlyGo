import Image from "next/image";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import type { FlightDeal, Hotel, PopularDestination } from "@/lib/site-data";

/**
 * Card artwork. Entries already pointing at a file render as a real image;
 * anything still holding a descriptive label falls back to the grey slot.
 */
function CardImage({ src, className }: { src: string; className: string }) {
  if (!src.startsWith("/")) {
    return <PlaceholderImage label={src} className={className} />;
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
        className="object-cover"
      />
    </div>
  );
}

const cardBase =
  "group overflow-hidden rounded-xl bg-white shadow-[0_2px_14px_rgba(16,24,40,0.09)]";

export function FlightCard({ deal }: { deal: FlightDeal }) {
  return (
    <article className={cardBase}>
      <div className="overflow-hidden p-2 pb-0">
        <CardImage
          src={deal.image}
          className="h-[130px] w-full rounded-lg transition-colors duration-500"
        />
      </div>
      <div className="px-3 pb-3 pt-3">
        <h3 className="flex items-center gap-1.5 text-small font-semibold text-ink">
          {deal.from}
          <RouteIcon />
          {deal.to}
        </h3>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-tiny text-body">
            From <span className="text-copy font-bold text-brand">{deal.price}</span>
          </p>
          <p className="text-tiny text-muted">{deal.trip}</p>
        </div>
      </div>
    </article>
  );
}

export function DestinationCard({
  destination,
}: {
  destination: PopularDestination;
}) {
  return (
    <article className={cardBase}>
      <div className="overflow-hidden p-2 pb-0">
        <CardImage
          src={destination.image}
          className="h-[112px] w-full rounded-lg transition-colors duration-500"
        />
      </div>
      <div className="px-4 pb-4 pt-3 text-center">
        <p className="text-tiny text-muted">{destination.region}</p>
        <h3 className="text-copy font-semibold text-ink">{destination.name}</h3>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-tiny text-body">
            From{" "}
            <span className="text-copy font-bold text-brand">{destination.price}</span>
          </p>
          <p className="text-tiny text-muted">{destination.trip}</p>
        </div>
      </div>
    </article>
  );
}

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
      className="group block rounded-lg bg-white p-3 shadow-[0_1px_3px_rgba(16,24,40,0.08),0_10px_28px_-18px_rgba(16,24,40,0.3)]"
    >
      <div className="relative h-[170px] w-full overflow-hidden rounded-md">
        <Image
          src={country.image}
          alt={country.name}
          fill
          sizes="(max-width: 768px) 90vw, 380px"
          className="object-cover"
        />
      </div>

      <div className="flex items-end justify-between gap-3 px-1 pb-1 pt-4">
        <div className="min-w-0">
          <p className="text-small text-label">{country.region}</p>
          <h3 className="mt-0.5 text-lead font-bold text-ink">{country.name}</h3>
          <p className="mt-1.5 text-small text-body">{country.love}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-tiny text-label">Budget</p>
          <p className="text-h4 font-bold text-sky">{country.budget}</p>
        </div>
      </div>
    </Link>
  );
}

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link
      href="/hotels"
      className="group flex h-full flex-col rounded-lg bg-white p-3 shadow-[0_1px_3px_rgba(16,24,40,0.08),0_10px_28px_-18px_rgba(16,24,40,0.3)]"
    >
      <div className="relative h-[150px] w-full overflow-hidden rounded-md">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 90vw, 300px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <h3 className="text-copy font-bold leading-snug text-ink">{hotel.name}</h3>
        <Stars count={hotel.stars} className="mt-1.5" />
        <p className="mt-2 line-clamp-2 text-small leading-relaxed text-body">
          {hotel.address}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <span className="flex items-center gap-2">
            <span className="rounded bg-sky px-2 py-0.5 text-tiny font-semibold text-white">
              {hotel.score}
            </span>
            <span className="text-tiny text-label">{hotel.reviews}</span>
          </span>
          <span className="shrink-0 text-right">
            <span className="block text-tiny text-label">Start from</span>
            <span className="block text-h4 font-bold text-sky">{hotel.price}</span>
          </span>
        </div>
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

function RouteIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </svg>
  );
}
