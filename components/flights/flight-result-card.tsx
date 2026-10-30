"use client";

import { Briefcase, Heart, Luggage } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { stopLabel, type FlightLeg, type FlightResult } from "@/lib/flight-data";

/**
 * One itinerary: both legs stacked on the left, the fare and action on the
 * right. On phones the fare drops under the legs as a single action row.
 */
export function FlightResultCard({
  result,
  badge,
  onView,
}: {
  result: FlightResult;
  /** "Cheapest", "Quickest"… — set by the list, not the data. */
  badge?: string;
  onView: () => void;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_8px_24px_-16px_rgba(16,24,40,0.25)]">
      <div className="grid md:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0 p-4 sm:p-5">
          {badge || result.freeCancellation || result.seatsLeft ? (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {badge ? (
                <span className="rounded-md bg-brand-soft px-2 py-0.5 text-tiny font-semibold text-brand-hover">
                  {badge}
                </span>
              ) : null}
              {result.freeCancellation ? (
                <span className="rounded-md bg-sky-soft px-2 py-0.5 text-tiny font-semibold text-blue">
                  Free cancellation
                </span>
              ) : null}
              {result.seatsLeft ? (
                <span className="rounded-md bg-shell px-2 py-0.5 text-tiny font-semibold text-body">
                  {result.seatsLeft} seats left at this price
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-4">
            <Leg leg={result.outbound} airline={result.airline} code={result.code} logo={result.logo} />
            <Leg leg={result.inbound} airline={result.airline} code={result.code} logo={result.logo} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 bg-shell/70 px-4 py-4 sm:px-5 md:flex-col md:items-stretch md:justify-center ">
          <div className="md:text-right">
            <div className="flex items-center gap-2 md:justify-end">
              <Bags bags={result.bags} />
              <button
                type="button"
                aria-pressed={saved}
                aria-label={saved ? "Remove from saved" : "Save this flight"}
                onClick={() => setSaved((v) => !v)}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
                  saved ? "text-brand" : "text-label"
                }`}
              >
                <Heart size={18} strokeWidth={1.9} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-1 text-h3 font-bold leading-none text-ink">{result.price}</p>
            <p className="mt-1 text-tiny text-label">
              {result.cabin} · return · on {result.provider}
            </p>
          </div>

          <button
            type="button"
            onClick={onView}
            className="h-11 shrink-0 rounded-lg bg-brand px-6 text-small font-semibold text-white transition-colors duration-200 active:translate-y-px md:mt-4 md:w-full"
          >
            View deal
          </button>
        </div>
      </div>
    </article>
  );
}

function Leg({
  leg,
  airline,
  code,
  logo,
}: {
  leg: FlightLeg;
  airline: string;
  code: string;
  logo: string | null;
}) {
  return (
    <div className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[44px_minmax(0,1fr)_120px] sm:gap-4">
      <AirlineMark airline={airline} code={code} logo={logo} />

      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="shrink-0">
          <p className="text-h4 font-bold leading-tight text-ink">{leg.depart}</p>
          <p className="text-tiny font-medium text-label">{leg.from}</p>
        </div>

        <div className="min-w-0 flex-1 text-center">
          <p className="text-tiny text-label">{leg.duration}</p>
          <div className="relative my-1 h-px bg-muted/60">
            {Array.from({ length: leg.stops }, (_, i) => (
              <span
                key={i}
                className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-2 ring-white"
                style={{ left: `${((i + 1) / (leg.stops + 1)) * 100}%` }}
              />
            ))}
          </div>
          <p className={`truncate text-tiny font-semibold ${leg.stops ? "text-brand-hover" : "text-sky"}`}>
            {stopLabel(leg)}
            {leg.via ? <span className="font-normal text-label"> · {leg.via}</span> : null}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-h4 font-bold leading-tight text-ink">
            {leg.arrive}
            {leg.nextDay ? <sup className="ml-0.5 text-micro font-semibold text-brand">+1</sup> : null}
          </p>
          <p className="text-tiny font-medium text-label">{leg.to}</p>
        </div>
      </div>

      <p className="hidden truncate text-small text-body sm:block">{airline}</p>
    </div>
  );
}

/** The airline's logo when we have one, otherwise its IATA code on a badge. */
export function AirlineMark({
  airline,
  code,
  logo,
}: {
  airline: string;
  code: string;
  logo: string | null;
}) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-shell sm:h-11 sm:w-11">
      {logo ? (
        <Image src={logo} alt={airline} width={44} height={44} className="h-8 w-8 object-contain" />
      ) : (
        <span aria-label={airline} className="text-small font-bold tracking-tight text-steel">
          {code}
        </span>
      )}
    </span>
  );
}

function Bags({ bags }: { bags: FlightResult["bags"] }) {
  return (
    <span className="flex items-center gap-1.5 text-label" aria-label={`Cabin bag ${bags.cabin ? "included" : "not included"}, checked bag ${bags.checked ? "included" : "not included"}`}>
      <Briefcase size={16} strokeWidth={1.8} aria-hidden="true" className={bags.cabin ? "text-ink" : "opacity-40"} />
      <Luggage size={18} strokeWidth={1.8} aria-hidden="true" className={bags.checked ? "text-ink" : "opacity-40"} />
    </span>
  );
}
