import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { STAY_SEARCH, cheapest, currency, ratingWord, refundable, total, type Hotel } from "@/lib/liteapi";
import { money, nights } from "@/lib/format";

const NIGHTS = nights(STAY_SEARCH.checkin, STAY_SEARCH.checkout);

/** Review score as a small dark badge, the way travel sites show it. */
export function RatingBadge({ hotel }: { hotel: Hotel }) {
  return (
    <span className="flex items-center gap-2">
      <span className="rounded-lg bg-steel px-2 py-1 text-small font-bold text-white">{hotel.rating.toFixed(1)}</span>
      <span className="text-small">
        <span className="font-semibold text-ink">{ratingWord(hotel.rating)}</span>{" "}
        <span className="text-label">· {hotel.reviewCount.toLocaleString("en-US")} reviews</span>
      </span>
    </span>
  );
}

export function StarRow({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="flex gap-0.5 text-star" role="img" aria-label={`${count}-star`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={12} fill="currentColor" strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  );
}

/** Search result: photo, name, score, and the cheapest rate for the stay. */
export function StayCard({ hotel, eager = false }: { hotel: Hotel; eager?: boolean }) {
  const rate = cheapest(hotel);
  const anyRefundable = hotel.roomTypes.some((rt) => refundable(rt.rates[0]));
  const breakfast = hotel.roomTypes.some((rt) => rt.rates[0].boardType !== "RO");

  return (
    <Link
      href={`/hotels/${hotel.id}`}
      className="grid overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_10px_28px_-18px_rgba(16,24,40,0.3)] sm:grid-cols-[360px_minmax(0,1fr)]"
    >
      <div className="relative aspect-[16/10] bg-shell sm:aspect-auto sm:min-h-[220px]">
        <Image src={hotel.main_photo} alt={hotel.name} fill preload={eager} sizes="(max-width: 640px) 92vw, 360px" className="object-cover" />
      </div>

      <div className="flex min-w-0 flex-col gap-3 p-4 sm:p-5">
        <div>
          <StarRow count={hotel.starRating} />
          <h3 className="mt-1 text-h4 font-semibold leading-snug text-ink">{hotel.name}</h3>
          <p className="mt-0.5 truncate text-small text-label">{hotel.address}</p>
        </div>

        <RatingBadge hotel={hotel} />

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {anyRefundable ? (
              <span className="rounded-full bg-sky-soft px-2.5 py-1 text-tiny font-semibold text-blue">Free cancellation</span>
            ) : null}
            {breakfast ? (
              <span className="rounded-full bg-shell px-2.5 py-1 text-tiny font-medium text-body">Breakfast available</span>
            ) : null}
          </div>
          <div className="shrink-0 text-right">
            <p className="text-h3 font-bold leading-tight text-ink">{money(total(rate) / NIGHTS, currency(rate))}</p>
            <p className="text-tiny text-label">
              per night · {money(total(rate), currency(rate))} total
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Photo-first card for the rails on the stays landing page. */
export function StayTile({ hotel }: { hotel: Hotel }) {
  const rate = cheapest(hotel);
  return (
    <Link href={`/hotels/${hotel.id}`} className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_12px_28px_-18px_rgba(16,24,40,0.35)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-shell">
        <Image
          src={hotel.main_photo}
          alt={hotel.name}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-copy font-semibold text-ink">{hotel.name}</h3>
          <span className="shrink-0 rounded-md bg-steel px-1.5 py-0.5 text-tiny font-bold text-white">
            {hotel.rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-1 text-small text-body">
          <span className="text-copy font-semibold text-ink">{money(total(rate) / NIGHTS, currency(rate))}</span> / night
        </p>
      </div>
    </Link>
  );
}
