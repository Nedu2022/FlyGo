import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, MapPin, Users, Utensils } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RatingBadge, StarRow } from "@/components/stays/stay-card";
import { STAYS, STAY_SEARCH, cancelBy, currency, getStay, total, type Rate } from "@/lib/liteapi";
import { day, money, nights } from "@/lib/format";

export function generateStaticParams() {
  return STAYS.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const hotel = getStay((await params).id);
  return { title: `${hotel?.name ?? "Stay"} — FLYGO Bookings` };
}

const NIGHTS = nights(STAY_SEARCH.checkin, STAY_SEARCH.checkout);

export default async function StayPage({ params }: { params: Promise<{ id: string }> }) {
  const hotel = getStay((await params).id);
  if (!hotel) notFound();

  const [main, ...rest] = hotel.hotelImages;

  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-shell">
        <div className="mx-auto w-full max-w-[1040px] px-4 py-6 sm:px-8 sm:py-10">
          {/* Photos */}
          <div className="grid gap-2 overflow-hidden rounded-3xl sm:grid-cols-[2fr_1fr] sm:grid-rows-2 sm:h-[400px]">
            <div className="relative aspect-[16/10] bg-steel sm:row-span-2 sm:aspect-auto">
              <Image src={main.url} alt={hotel.name} fill priority sizes="(max-width: 640px) 92vw, 680px" className="object-cover" />
            </div>
            {rest.slice(0, 2).map((img) => (
              <div key={img.url} className="relative hidden bg-steel sm:block">
                <Image src={img.url} alt="" fill sizes="340px" className="object-cover" />
              </div>
            ))}
          </div>

          {/* Overview */}
          <div className="mt-6 rounded-3xl bg-white p-5 sm:p-7">
            <StarRow count={hotel.starRating} />
            <h1 className="mt-1 text-h1 font-bold tracking-tight text-ink">{hotel.name}</h1>
            <p className="mt-1 flex items-start gap-1.5 text-small text-body">
              <MapPin size={16} strokeWidth={1.9} aria-hidden="true" className="mt-0.5 shrink-0" />
              {hotel.address}
            </p>
            <div className="mt-4">
              <RatingBadge hotel={hotel} />
            </div>

            <p className="mt-5 text-copy leading-relaxed text-body">{hotel.hotelDescription}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {hotel.hotelFacilities.map((f) => (
                <li key={f} className="flex items-center gap-1.5 rounded-full bg-shell px-3 py-1.5 text-small text-ink">
                  <Check size={14} strokeWidth={2.4} aria-hidden="true" className="text-sky" />
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-5 flex items-center gap-2 text-small text-body">
              <Clock size={16} strokeWidth={1.9} aria-hidden="true" />
              Check-in from {hotel.checkinCheckoutTimes.checkin} · Check-out by {hotel.checkinCheckoutTimes.checkout}
            </p>
          </div>

          {/* Rooms */}
          <h2 className="mt-8 text-h3 font-semibold tracking-tight text-ink">Choose your room</h2>
          <p className="mt-1 text-small text-body">
            {day(STAY_SEARCH.checkin)} – {day(STAY_SEARCH.checkout)} · {NIGHTS} nights · {STAY_SEARCH.adults} adults
          </p>

          <ul className="mt-4 space-y-3">
            {hotel.roomTypes.map((rt) => (
              <li key={rt.offerId}>
                <RoomRate rate={rt.rates[0]} href={`/hotels/${hotel.id}/book?offer=${rt.offerId}`} />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter flush />
    </>
  );
}

function RoomRate({ rate, href }: { rate: Rate; href: string }) {
  const until = cancelBy(rate);
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="text-copy font-semibold text-ink">{rate.name}</p>
        <p className="flex items-center gap-1.5 text-small text-body">
          <Users size={15} strokeWidth={1.9} aria-hidden="true" /> Sleeps {rate.maxOccupancy}
        </p>
        <p className="flex items-center gap-1.5 text-small text-body">
          <Utensils size={15} strokeWidth={1.9} aria-hidden="true" /> {rate.boardName}
        </p>
        <p className={`text-small font-medium ${until ? "text-blue" : "text-label"}`}>
          {until ? `Free cancellation until ${until}` : "Non-refundable"}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="sm:text-right">
          <p className="text-h3 font-bold leading-tight text-ink">{money(total(rate), currency(rate))}</p>
          <p className="text-tiny text-label">
            {money(total(rate) / NIGHTS, currency(rate))} / night · taxes included
          </p>
        </div>
        <Link
          href={href}
          className="flex h-11 items-center justify-center rounded-xl bg-brand px-6 text-small font-semibold text-white active:translate-y-px"
        >
          Reserve
        </Link>
      </div>
    </div>
  );
}
