"use client";

import { Briefcase, Heart, Luggage, Plane } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { stopLabel, type FlightLeg, type FlightResult } from "@/lib/flight-data";

/**
 * One itinerary as a boarding pass: airline and both legs on the ticket, a
 * perforated tear line with punched notches, and the fare on the stub. The
 * tear runs vertically on desktop and across the card on phones. Notches are
 * filled with the results page's background so they read as cut-outs.
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
    <article className="relative grid rounded-3xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_10px_28px_-18px_rgba(16,24,40,0.3)] md:grid-cols-[minmax(0,1fr)_auto_230px]">
      {/* Ticket */}
      <div className="min-w-0 p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <AirlineMark airline={result.airline} code={result.code} logo={result.logo} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-copy font-semibold text-ink">{result.airline}</p>
            <p className="text-tiny text-label">
              {result.cabin} · {result.outbound.from} ⇄ {result.outbound.to}
            </p>
          </div>
          <div className="hidden flex-wrap justify-end gap-1.5 sm:flex">
            <Tags result={result} badge={badge} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 sm:hidden">
          <Tags result={result} badge={badge} />
        </div>

        <div className="mt-5 space-y-5">
          <Leg leg={result.outbound} label="Outbound" />
          <Leg leg={result.inbound} label="Return" />
        </div>
      </div>

      {/* Tear line */}
      <div aria-hidden="true" className="relative mx-4 h-px md:mx-0 md:my-5 md:h-auto md:w-px">
        <span className="absolute inset-0 border-t-2 border-dashed border-line md:border-l-2 md:border-t-0" />
        <span className="absolute -left-[26px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-shell md:-top-[30px] md:left-1/2 md:h-5 md:w-5 md:-translate-x-1/2 md:translate-y-0" />
        <span className="absolute -right-[26px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-shell md:-bottom-[30px] md:left-1/2 md:right-auto md:top-auto md:h-5 md:w-5 md:-translate-x-1/2 md:translate-y-0" />
      </div>

      {/* Stub */}
      <div className="flex items-center justify-between gap-4 p-4 sm:px-6 md:flex-col md:items-stretch md:justify-between md:py-6">
        <div className="md:text-right">
          <p className="text-tiny font-medium text-label">Return per person</p>
          <p className="text-h2 font-bold leading-tight tracking-tight text-ink">{result.price}</p>
          <div className="mt-1 flex items-center gap-2 md:justify-end">
            <Bags bags={result.bags} />
            <span className="text-tiny text-label">on {result.provider}</span>
          </div>
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
          <button
            type="button"
            onClick={onView}
            className="h-11 flex-1 rounded-xl bg-brand px-5 text-small font-semibold text-white active:translate-y-px"
          >
            View deal
          </button>
        </div>
      </div>
    </article>
  );
}

function Tags({ result, badge }: { result: FlightResult; badge?: string }) {
  return (
    <>
      {badge ? (
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-tiny font-semibold text-brand-hover">{badge}</span>
      ) : null}
      {result.freeCancellation ? (
        <span className="rounded-full bg-sky-soft px-2.5 py-1 text-tiny font-semibold text-blue">
          Free cancellation
        </span>
      ) : null}
      {result.seatsLeft ? (
        <span className="rounded-full bg-shell px-2.5 py-1 text-tiny font-semibold text-body">
          {result.seatsLeft} seats left
        </span>
      ) : null}
    </>
  );
}

function Leg({ leg, label }: { leg: FlightLeg; label: string }) {
  return (
    <div>
      <p className="text-micro font-semibold uppercase tracking-[0.14em] text-label">{label}</p>
      <div className="mt-1.5 flex min-w-0 items-center gap-3 sm:gap-5">
        <div className="shrink-0">
          <p className="text-h3 font-bold leading-none tracking-tight text-ink">{leg.depart}</p>
          <p className="mt-1 text-small font-semibold text-body">{leg.from}</p>
        </div>

        <div className="min-w-0 flex-1 text-center">
          <p className="text-tiny text-label">{leg.duration}</p>
          <div className="relative my-1.5 flex items-center">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-muted" />
            <span className="h-px flex-1 border-t border-dashed border-muted" />
            {Array.from({ length: leg.stops }, (_, i) => (
              <span
                key={i}
                className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-2 ring-white"
                style={{ left: `${((i + 1) / (leg.stops + 1)) * 100}%` }}
              />
            ))}
            <Plane size={16} strokeWidth={2} aria-hidden="true" className="shrink-0 rotate-45 text-ink" />
          </div>
          <p className={`truncate text-tiny font-semibold ${leg.stops ? "text-brand-hover" : "text-sky"}`}>
            {stopLabel(leg)}
            {leg.via ? <span className="font-normal text-label"> · {leg.via}</span> : null}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-h3 font-bold leading-none tracking-tight text-ink">
            {leg.arrive}
            {leg.nextDay ? <sup className="ml-0.5 text-micro font-semibold text-brand">+1</sup> : null}
          </p>
          <p className="mt-1 text-small font-semibold text-body">{leg.to}</p>
        </div>
      </div>
    </div>
  );
}

/** The airline's logo when we have one, otherwise its IATA code on a badge. */
export function AirlineMark({ airline, code, logo }: { airline: string; code: string; logo: string | null }) {
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
    <span
      className="flex items-center gap-1.5 text-label"
      aria-label={`Cabin bag ${bags.cabin ? "included" : "not included"}, checked bag ${bags.checked ? "included" : "not included"}`}
    >
      <Briefcase size={16} strokeWidth={1.8} aria-hidden="true" className={bags.cabin ? "text-ink" : "opacity-40"} />
      <Luggage size={18} strokeWidth={1.8} aria-hidden="true" className={bags.checked ? "text-ink" : "opacity-40"} />
    </span>
  );
}
