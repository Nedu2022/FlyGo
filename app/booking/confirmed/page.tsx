import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { BOOKED_TRIP } from "@/lib/flight-data";

export const metadata = {
  title: "Booking confirmed — FLYGO Bookings",
};

export default function BookingConfirmedPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      <main className="bg-canvas">
        <div className="mx-auto w-full max-w-[1000px] px-5 py-16 text-center sm:px-8">
          <Image
            src="/images/auth/success-check.svg"
            alt=""
            width={180}
            height={180}
            priority
            className="animate-badge-in mx-auto h-[170px] w-[170px]"
          />

          <h1 className="mt-8 text-[30px] font-bold tracking-tight text-ink sm:text-[34px]">
            Your Flight is Booked!
          </h1>
          <p className="mt-4 text-[17px] text-label">
            Thank you for choosing Flygo! Your booking details have been sent to your email.
          </p>

          <BoardingPass />

          <Link
            href="#"
            className="animate-rise mt-10 flex h-[56px] w-full max-w-[460px] items-center justify-center rounded-lg bg-sky text-[16px] font-medium text-white transition-all duration-200 hover:bg-sky-hover active:translate-y-px sm:mx-auto"
          >
            Download E-Ticket &amp; Boarding Pass
          </Link>

          <Link
            href="/hotels"
            className="mt-5 inline-block text-[15px] text-brand transition-colors duration-200 hover:text-brand-hover"
          >
            Book a Hotel for Your Trip
          </Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function BoardingPass() {
  return (
    <div className="animate-rise mx-auto mt-10 max-w-[570px] overflow-hidden rounded-xl border-2 border-sky text-left">
      <div className="bg-sky px-5 py-3 text-white">
        <p className="text-[19px] font-bold">{BOOKED_TRIP.passenger}</p>
        <p className="mt-0.5 text-[13px] font-semibold">Seat No: {BOOKED_TRIP.seat}</p>
      </div>

      <div className="flex flex-col bg-white sm:flex-row">
        <div className="flex-1">
          {BOOKED_TRIP.legs.map((leg, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 px-4 py-4 ${
                index > 0 ? "border-t border-line" : ""
              }`}
            >
              <span className="flex w-[74px] shrink-0 items-center">
                {leg.logo ? (
                  <Image
                    src={leg.logo}
                    alt={leg.carrier}
                    width={100}
                    height={70}
                    className="h-[26px] w-auto object-contain"
                  />
                ) : (
                  <span className="text-[12px] leading-tight text-body">{leg.carrier}</span>
                )}
              </span>

              <div className="text-right">
                <p className="text-[15px] font-semibold text-ink">{leg.departTime}</p>
                <p className="text-[13px] text-body">{leg.departCode}</p>
              </div>

              <div className="min-w-0 flex-1 text-center">
                <p className="text-[11px] text-body">{leg.duration}</p>
                <Rail stops={leg.stops} />
                <p className="text-[11px]">
                  <span className="text-[#e0518a]">{leg.stops}</span>{" "}
                  <span className="text-body">{leg.via}</span>
                </p>
              </div>

              <div>
                <p className="text-[15px] font-semibold text-ink">
                  {leg.arriveTime}
                  {leg.nextDay ? <sup className="text-[10px] font-normal">+1</sup> : null}
                </p>
                <p className="text-[13px] text-body">{leg.arriveCode}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex shrink-0 flex-col items-center justify-center gap-3 border-line px-6 py-5 sm:border-l">
          <p className="text-[19px] font-semibold text-ink">{BOOKED_TRIP.price}</p>
          <Link
            href="#"
            className="flex h-[36px] items-center gap-2 rounded-md bg-brand px-4 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-brand-hover"
          >
            View
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h15M14 7l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Line with a stop dot per leg and a plane glyph at the arrival end. */
function Rail({ stops }: { stops: string }) {
  const count = Number.parseInt(stops, 10) || 0;
  return (
    <span className="my-1 flex items-center" aria-hidden="true">
      <span className="h-px flex-1 bg-ink" />
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="mx-[3px] h-[5px] w-[5px] rounded-full bg-[#e0518a]" />
      ))}
      <span className="h-px flex-1 bg-ink" />
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-ink">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-4.5L21 16Z" />
      </svg>
    </span>
  );
}
