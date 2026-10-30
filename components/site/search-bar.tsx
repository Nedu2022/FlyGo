"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  ArrowUpDown,
  BedDouble,
  Building2,
  CalendarDays,
  MapPin,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Search,
  Users,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import { DateField } from "@/components/ui/calendar";
import { PlaceInput } from "@/components/site/place-input";
import { TravellersField } from "@/components/site/travellers-field";

/** Business jet in Lucide's line style; Lucide only ships airliners. */
function PrivateJet({ size = 24, strokeWidth = 1.9, ...props }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1.5 3 21 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.5 13.2c0-1.3 1.5-2.2 3.6-2.2h10.1l2.9-4h1.6l-1 4.3c1.7.4 1.8 2.6.1 2.9L6.4 15.6c-2.2.3-3.9-.8-3.9-2.4Z" />
      <path d="M9.5 14.6 12.4 19h2.1l-1-4.4" />
      <path d="M14.6 10.8 15.2 8.6h3" />
      <path d="M5.5 12.6h.01M7.8 12.6h.01M10.1 12.6h.01" />
    </svg>
  );
}

const TABS = [
  { label: "Flights", value: "Flight", icon: Plane },
  { label: "Hotels", value: "Hotel", icon: BedDouble },
  { label: "Apartments", value: "Apartment", icon: Building2 },
  { label: "Private jet", value: "Jet", icon: PrivateJet },
] as const;

export type SearchTab = (typeof TABS)[number]["value"];

const TRIP_KINDS = ["Return", "One-way", "Multi-city"] as const;
/** Charters are quoted point to point, so no multi-city. */
const JET_TRIP_KINDS = ["One-way", "Return"] as const;

const SEARCH_BUTTON =
  "bg-linear-to-br from-brand to-brand-hover font-semibold text-white active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2";

/**
 * FLYGO's search: Kayak-style product tiles over a search card cut like a
 * boarding pass. On phones the fields are simple list rows with a perforated
 * tear line between the route and the trip details; on desktop they sit in
 * one row with the Search button on a perforated stub.
 */
export function SearchBar({ defaultTab = "Flight" }: { defaultTab?: SearchTab }) {
  const router = useRouter();
  const [tab, setTab] = useState<SearchTab>(defaultTab);
  const [kind, setKind] = useState<(typeof TRIP_KINDS)[number]>("Return");
  const [departure, setDeparture] = useState(() => new Date(2026, 11, 15));
  const [returnDate, setReturnDate] = useState(() => new Date(2027, 0, 9));
  const [from, setFrom] = useState("Lagos (LOS)");
  const [to, setTo] = useState("");
  const [where, setWhere] = useState("");

  const jet = tab === "Jet";
  /** Flights and jets share the route fields; stays have a destination. */
  const flight = tab === "Flight" || jet;
  const kinds = jet ? JET_TRIP_KINDS : TRIP_KINDS;
  const people = jet ? "jet" : flight ? "flight" : "stay";
  const oneWay = kind !== "Return";
  const swap = () => {
    setFrom(to);
    setTo(from);
  };
  const stayInitial = tab === "Hotel" ? { adults: 2 } : { adults: 4, rooms: 2 };

  const departField = (
    <DateField tone="inline" label={flight ? "Departure" : "Check in"} value={departure} onChange={setDeparture} />
  );
  const returnField = (
    <DateField
      tone="inline"
      label={flight ? "Return" : "Check out"}
      value={returnDate}
      onChange={setReturnDate}
      disabled={flight && oneWay}
      placeholder="One-way"
    />
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push(
          jet
            ? `/private-jets?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
            : flight
              ? "/flights"
              : "/hotels",
        );
      }}
    >
      {/* Product tiles */}
      <div role="tablist" aria-label="What are you booking?" className="flex gap-3 sm:gap-5">
        {TABS.map(({ label, value, icon: Icon }) => {
          const on = tab === value;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setTab(value);
                if (value === "Jet" && kind === "Multi-city") setKind("Return");
              }}
              className="flex w-[72px] flex-col items-center gap-2 sm:w-[88px]"
            >
              <span
                className={`flex h-[60px] w-[60px] items-center justify-center rounded-2xl transition-colors duration-200 sm:h-16 sm:w-16 ${
                  on
                    ? "bg-linear-to-br from-brand to-brand-hover text-white shadow-[0_8px_18px_-8px_rgba(224,117,42,0.75)]"
                    : "bg-white text-ink shadow-[0_1px_2px_rgba(16,24,40,0.06),0_4px_12px_-6px_rgba(16,24,40,0.2)]"
                }`}
              >
                <Icon size={24} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span
                className={`whitespace-nowrap text-small sm:text-copy ${on ? "font-semibold text-ink" : "text-body"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* The boarding pass */}
      <div
        key={tab}
        className="animate-fade relative mt-6 rounded-3xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_18px_40px_-24px_rgba(16,24,40,0.35)] sm:mt-8"
      >
        {flight ? (
          <div className="flex gap-6 px-4 pt-1 sm:px-6" role="radiogroup" aria-label="Trip type">
            {kinds.map((item) => (
              <button
                key={item}
                type="button"
                role="radio"
                aria-checked={kind === item}
                onClick={() => setKind(item)}
                className={`border-b-[3px] py-3.5 text-small font-semibold transition-colors duration-200 sm:text-copy ${
                  kind === item ? "border-ink text-ink" : "border-transparent text-label"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}

        {/* Phones, tablets and small laptops: list rows, torn in two. The one-row
            layout needs xl width to fit every field without truncating. */}
        <div className="xl:hidden">
          {flight ? (
            <div className="relative border-t border-line">
              <Row icon={<PlaneTakeoff size={20} strokeWidth={1.8} aria-hidden="true" />}>
                <PlaceInput
                  value={from}
                  onChange={setFrom}
                  label="From"
                  placeholderPrefix="From, e.g."
                  className="h-14 pr-14 text-copy font-medium"
                />
              </Row>
              <Row icon={<PlaneLanding size={20} strokeWidth={1.8} aria-hidden="true" />} divided>
                <PlaceInput
                  value={to}
                  onChange={setTo}
                  label="To"
                  placeholderPrefix="To, e.g."
                  className="h-14 pr-14 text-copy font-medium"
                />
              </Row>
              <button
                type="button"
                aria-label="Swap origin and destination"
                onClick={swap}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-white text-ink shadow-[0_2px_8px_rgba(16,24,40,0.14)]"
              >
                <ArrowUpDown size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Row icon={<MapPin size={20} strokeWidth={1.8} aria-hidden="true" />}>
              <PlaceInput
                value={where}
                onChange={setWhere}
                label="Destination"
                kind="stay"
                placeholderPrefix="Going to, e.g."
                className="h-14 text-copy font-medium"
              />
            </Row>
          )}

          <Perforation />

          <Row icon={<CalendarDays size={20} strokeWidth={1.8} aria-hidden="true" />}>
            <div className="-mx-3 flex min-w-0 flex-1 items-center [&_button]:h-14 [&_button]:text-copy [&_button]:font-medium">
              {departField}
              <span aria-hidden="true" className="text-label">
                –
              </span>
              {returnField}
            </div>
          </Row>
          <Row icon={<Users size={20} strokeWidth={1.8} aria-hidden="true" />} divided>
            <TravellersField
              key={tab}
              kind={people}
              initial={flight ? undefined : stayInitial}
              className="h-14 text-copy font-medium"
            />
          </Row>

          <div className="p-3 pt-1">
            <button
              type="submit"
              className={`flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-lead ${SEARCH_BUTTON}`}
            >
              <Search size={20} strokeWidth={2.4} aria-hidden="true" />
              {jet ? "Find jets" : "Search"}
            </button>
          </div>
        </div>

        {/* Desktop: one row, with Search on a perforated stub. */}
        <div className={`hidden items-stretch xl:flex ${flight ? "border-t border-line" : ""}`}>
          <div className="flex min-w-0 flex-1 items-center gap-1 py-2 pl-4">
            {flight ? (
              <>
                <Cell icon={<PlaneTakeoff size={20} strokeWidth={1.8} aria-hidden="true" />} grow={1}>
                  <PlaceInput
                    value={from}
                    onChange={setFrom}
                    label="From"
                    placeholderPrefix="From, e.g."
                    className="h-12 text-lead"
                  />
                </Cell>
                <button
                  type="button"
                  aria-label="Swap origin and destination"
                  onClick={swap}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-shell text-ink"
                >
                  <ArrowLeftRight size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <Cell icon={<PlaneLanding size={20} strokeWidth={1.8} aria-hidden="true" />} grow={1}>
                  <PlaceInput
                    value={to}
                    onChange={setTo}
                    label="To"
                    placeholderPrefix="To, e.g."
                    className="h-12 text-lead"
                  />
                </Cell>
              </>
            ) : (
              <Cell icon={<MapPin size={20} strokeWidth={1.8} aria-hidden="true" />} grow={2}>
                <PlaceInput
                  value={where}
                  onChange={setWhere}
                  label="Destination"
                  kind="stay"
                  placeholderPrefix="Going to, e.g."
                  className="h-12 text-lead"
                />
              </Cell>
            )}
            <Rule />
            <Cell icon={<CalendarDays size={20} strokeWidth={1.8} aria-hidden="true" />} grow={1.3}>
              <div className="-mx-3 flex min-w-0 items-center">
                {departField}
                <span aria-hidden="true" className="text-label">
                  –
                </span>
                {returnField}
              </div>
            </Cell>
            <Rule />
            <Cell icon={<Users size={20} strokeWidth={1.8} aria-hidden="true" />} grow={1.45}>
              <TravellersField
                key={tab}
                kind={people}
                initial={flight ? undefined : stayInitial}
                className="h-12 text-lead"
              />
            </Cell>
          </div>

          <div aria-hidden="true" className="relative w-px self-stretch">
            <span className="absolute inset-y-3 left-0 border-l-2 border-dashed border-line" />
            <span className="absolute -top-[11px] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-shell" />
            <span className="absolute -bottom-[11px] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-shell" />
          </div>

          <div className="flex shrink-0 items-center p-3">
            <button
              type="submit"
              className={`flex h-14 items-center gap-2 rounded-2xl px-8 text-lead ${SEARCH_BUTTON}`}
            >
              <Search size={20} strokeWidth={2.4} aria-hidden="true" />
              {jet ? "Find jets" : "Search"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

/** A full-width list row on phones, with an optional hairline above. */
function Row({ icon, children, divided = false }: { icon: ReactNode; children: ReactNode; divided?: boolean }) {
  return (
    <div className={`flex min-h-14 items-center gap-3 px-4 ${divided ? "border-t border-line" : ""}`}>
      <span className="shrink-0 text-label">{icon}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

/** One field of the desktop row. */
function Cell({ icon, children, grow }: { icon: ReactNode; children: ReactNode; grow: number }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 px-2" style={{ flex: `${grow} 1 0%` }}>
      <span className="shrink-0 text-label">{icon}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function Rule() {
  return <span aria-hidden="true" className="h-8 w-px shrink-0 bg-line" />;
}

/** The tear line across a phone ticket: dashes between two punched notches. */
function Perforation() {
  return (
    <div aria-hidden="true" className="relative h-5">
      <span className="absolute inset-x-5 top-1/2 border-t-2 border-dashed border-line" />
      <span className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-shell" />
      <span className="absolute -right-2.5 top-0 h-5 w-5 rounded-full bg-shell" />
    </div>
  );
}
