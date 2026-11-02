"use client";

import { Briefcase, Heart, Luggage, Plane } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { includedBags, layovers, rules, stops, type Carrier, type Offer, type Slice } from "@/lib/duffel";
import { clock, dayShift, duration, money } from "@/lib/format";

/**
 * One Duffel offer as a boarding pass: airline and both slices on the
 * ticket, a perforated tear line, and the fare on the stub. The tear runs
 * vertically on desktop and across the card on phones.
 */
export function FlightResultCard({ offer, badge }: { offer: Offer; badge?: string }) {
  const [saved, setSaved] = useState(false);
  const bags = includedBags(offer);

  return (
    <article className="relative grid rounded-3xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_10px_28px_-18px_rgba(16,24,40,0.3)] md:grid-cols-[minmax(0,1fr)_auto_220px]">
      {/* Ticket */}
      <div className="min-w-0 p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <AirlineMark carrier={offer.owner} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-copy font-medium text-ink">{offer.owner.name}</p>
            <p className="truncate text-tiny text-label">{offer.slices[0].fare_brand_name}</p>
          </div>
          <div className="hidden flex-wrap justify-end gap-1.5 sm:flex">
            <Tags offer={offer} badge={badge} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 sm:hidden">
          <Tags offer={offer} badge={badge} />
        </div>

        <div className="mt-5 space-y-5">
          {offer.slices.map((slice) => (
            <Leg key={slice.id} slice={slice} />
          ))}
        </div>
      </div>

      {/* Tear line */}
      <div aria-hidden="true" className="relative mx-4 h-px md:mx-0 md:my-5 md:h-auto md:w-px">
        <span className="absolute inset-0 border-t-2 border-dashed border-line md:border-l-2 md:border-t-0" />
        <span className="absolute -left-[26px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-shell md:-top-[30px] md:left-1/2 md:-translate-x-1/2 md:translate-y-0" />
        <span className="absolute -right-[26px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-shell md:-bottom-[30px] md:left-1/2 md:right-auto md:top-auto md:-translate-x-1/2 md:translate-y-0" />
      </div>

      {/* Stub */}
      <div className="flex items-center justify-between gap-4 p-4 sm:px-6 md:flex-col md:items-stretch md:justify-between md:py-6">
        <div className="md:text-right">
          <p className="text-h2 font-bold leading-tight tracking-tight text-ink">
            {money(offer.total_amount, offer.total_currency)}
          </p>
          <p className="text-tiny text-label">Round trip, taxes included</p>
          <p
            className="mt-1.5 flex items-center gap-3 text-tiny text-body md:justify-end"
            aria-label={`${bags.carryOn} cabin bag, ${bags.checked} checked bag${bags.checked === 1 ? "" : "s"} included`}
          >
            <span className="flex items-center gap-1">
              <Briefcase size={15} strokeWidth={1.8} aria-hidden="true" />
              {bags.carryOn}
            </span>
            <span className={`flex items-center gap-1 ${bags.checked ? "" : "text-muted"}`}>
              <Luggage size={16} strokeWidth={1.8} aria-hidden="true" />
              {bags.checked}
            </span>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved" : "Save this flight"}
            onClick={() => setSaved((v) => !v)}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-shell ${saved ? "text-brand" : "text-ink"}`}
          >
            <Heart size={18} strokeWidth={1.9} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
          </button>
          <Link
            href={`/booking/details?offer=${offer.id}`}
            className="flex h-11 flex-1 items-center justify-center rounded-xl bg-brand px-6 text-small font-semibold text-white active:translate-y-px"
          >
            Select
          </Link>
        </div>
      </div>
    </article>
  );
}

function Tags({ offer, badge }: { offer: Offer; badge?: string }) {
  const { refundable, freeChange } = rules(offer);
  return (
    <>
      {badge ? (
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-tiny font-semibold text-brand-hover">{badge}</span>
      ) : null}
      {refundable ? (
        <span className="rounded-full bg-sky-soft px-2.5 py-1 text-tiny font-semibold text-blue">Refundable</span>
      ) : null}
      {freeChange ? (
        <span className="rounded-full bg-shell px-2.5 py-1 text-tiny font-medium text-body">Free changes</span>
      ) : null}
    </>
  );
}

export function Leg({ slice }: { slice: Slice }) {
  const first = slice.segments[0];
  const last = slice.segments[slice.segments.length - 1];
  const shift = dayShift(first.departing_at, last.arriving_at);
  const via = layovers(slice);
  const count = via.length;

  return (
    <div className="flex min-w-0 items-center gap-3 sm:gap-5">
      <div className="shrink-0">
        <p className="text-h3 font-semibold leading-none tracking-tight text-ink">{clock(first.departing_at)}</p>
        <p className="mt-1 text-small font-medium text-body">{slice.origin.iata_code}</p>
      </div>

      <div className="min-w-0 flex-1 text-center">
        <p className="text-tiny text-label">{duration(slice.duration)}</p>
        <div className="relative my-1.5 flex items-center">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-muted" />
          <span className="h-px flex-1 border-t border-dashed border-muted" />
          {via.map((code, i) => (
            <span
              key={code}
              className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-2 ring-white"
              style={{ left: `${((i + 1) / (count + 1)) * 100}%` }}
            />
          ))}
          <Plane size={16} strokeWidth={2} aria-hidden="true" className="shrink-0 rotate-45 text-ink" />
        </div>
        <p className={`truncate text-tiny font-semibold ${count ? "text-brand-hover" : "text-sky"}`}>
          {stops(slice)}
          {count ? <span className="font-normal text-label"> · {via.join(", ")}</span> : null}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-h3 font-semibold leading-none tracking-tight text-ink">
          {clock(last.arriving_at)}
          {shift > 0 ? <sup className="ml-0.5 text-micro font-medium text-brand">+{shift}</sup> : null}
        </p>
        <p className="mt-1 text-small font-medium text-body">{slice.destination.iata_code}</p>
      </div>
    </div>
  );
}

/** Airline logo from Duffel's CDN (SVG, so no optimisation needed). */
export function AirlineMark({ carrier, size = 44 }: { carrier: Carrier; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-shell"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- remote SVG logo */}
      <img src={carrier.logo_symbol_url} alt={carrier.name} width={size * 0.7} height={size * 0.7} loading="lazy" />
    </span>
  );
}
