import Image from "next/image";
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
  "group overflow-hidden rounded-xl bg-white shadow-[0_2px_14px_rgba(16,24,40,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(16,24,40,0.14)]";

export function FlightCard({ deal }: { deal: FlightDeal }) {
  return (
    <article className={cardBase}>
      <div className="overflow-hidden p-2 pb-0">
        <CardImage
          src={deal.image}
          className="h-[130px] w-full rounded-lg transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="px-3 pb-3 pt-3">
        <h3 className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
          {deal.from}
          <RouteIcon />
          {deal.to}
        </h3>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-[12px] text-body">
            From <span className="text-[15px] font-bold text-brand">{deal.price}</span>
          </p>
          <p className="text-[11px] text-muted">{deal.trip}</p>
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
          className="h-[112px] w-full rounded-lg transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="px-4 pb-4 pt-3 text-center">
        <p className="text-[11px] text-muted">{destination.region}</p>
        <h3 className="text-[15px] font-semibold text-ink">{destination.name}</h3>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-[12px] text-body">
            From{" "}
            <span className="text-[15px] font-bold text-brand">{destination.price}</span>
          </p>
          <p className="text-[11px] text-muted">{destination.trip}</p>
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
    <article className={cardBase}>
      <div className="overflow-hidden p-2 pb-0">
        <CardImage
          src={country.image}
          className="h-[112px] w-full rounded-lg transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="px-4 pb-4 pt-3 text-center">
        <p className="text-[11px] text-muted">{country.region}</p>
        <h3 className="text-[15px] font-semibold text-ink">{country.name}</h3>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-[12px] text-body">
            Budget{" "}
            <span className="text-[15px] font-bold text-brand">{country.budget}</span>
          </p>
          <div className="text-right">
            <Stars count={5} />
            <p className="text-[10px] text-muted">{country.love}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className={`${cardBase} flex flex-col`}>
      <div className="overflow-hidden p-2 pb-0">
        <CardImage
          src={hotel.image}
          className="h-[112px] w-full rounded-lg transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-3">
        <h3 className="text-[14px] font-semibold leading-snug text-ink">{hotel.name}</h3>
        <Stars count={hotel.stars} className="mt-1" />
        <p className="mt-2 text-[11px] leading-relaxed text-body">{hotel.address}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded bg-blue px-1.5 py-0.5 text-[11px] font-semibold text-white">
            {hotel.score}
          </span>
          <span className="text-[11px] text-body">{hotel.reviews}</span>
        </div>
        <p className="mt-auto pt-3 text-right text-[12px] text-body">
          From <span className="text-[15px] font-bold text-brand">{hotel.price}</span>
        </p>
      </div>
    </article>
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
