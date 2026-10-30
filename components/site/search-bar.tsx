"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, ArrowUpDown, BedDouble, Building2, ChevronDown, Plane, type LucideProps } from "lucide-react";
import { DateField } from "@/components/ui/calendar";
import { PlaceInput } from "@/components/site/place-input";
import { TravellersField } from "@/components/site/travellers-field";

/** Business jet in Lucide's line style; Lucide only ships airliners. */
export function PrivateJet({ size = 24, strokeWidth = 1.9, ...props }: LucideProps) {
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
const BAGS = ["0 bags", "1 bag", "2 bags", "3 bags"];

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
  const [bags, setBags] = useState(BAGS[0]);

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
      {/* Service pills */}
      <div
        role="tablist"
        aria-label="What are you booking?"
        className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
      >
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
              className={`flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-small transition-colors duration-200 sm:text-copy ${
                on
                  ? "bg-ink font-medium text-white"
                  : "bg-white text-ink shadow-[0_1px_2px_rgba(16,24,40,0.06)]"
              }`}
            >
              <Icon size={18} strokeWidth={1.9} aria-hidden="true" className={on ? "text-brand" : "text-body"} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Desktop: trip type and bags as plain dropdowns above the bar. */}
      {flight ? (
        <div className="mt-5 hidden h-9 items-center gap-6 px-1 xl:flex">
          <InlineSelect label="Trip type" value={kind} options={kinds} onChange={(v) => setKind(v as typeof kind)} />
          {!jet ? <InlineSelect label="Bags" value={bags} options={BAGS} onChange={setBags} /> : null}
        </div>
      ) : null}

      <div
        key={tab}
        className={`animate-fade relative mt-3 rounded-2xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_12px_32px_-18px_rgba(16,24,40,0.3)] ${
          flight ? "sm:mt-4 xl:mt-2" : "sm:mt-4"
        }`}
      >
        {/* Phones, tablets and small laptops: plain rows with hairlines. */}
        <div className="xl:hidden">
          {flight ? (
            <div className="flex gap-1 border-b border-line px-2" role="radiogroup" aria-label="Trip type">
              {kinds.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={kind === item}
                  onClick={() => setKind(item)}
                  className={`-mb-px border-b-[3px] px-3 py-3 text-small font-semibold sm:text-copy ${
                    kind === item ? "border-ink text-ink" : "border-transparent text-label"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}

          {flight ? (
            <div className="relative">
              <Row>
                <PlaceInput value={from} onChange={setFrom} label="From" placeholderPrefix="From?" className="h-[52px] pr-14 text-copy" />
              </Row>
              <Row last>
                <PlaceInput value={to} onChange={setTo} label="To" placeholderPrefix="To?" className="h-[52px] pr-14 text-copy" />
              </Row>
              <button
                type="button"
                aria-label="Swap origin and destination"
                onClick={swap}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-white text-ink ring-1 ring-line"
              >
                <ArrowUpDown size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Row last>
              <PlaceInput
                value={where}
                onChange={setWhere}
                label="Destination"
                kind="stay"
                placeholderPrefix="Where to?"
                className="h-[52px] text-copy"
              />
            </Row>
          )}

          <Perforation />
          <Row>
            <div className="-mx-3 flex min-w-0 flex-1 items-center [&_button]:h-[52px] [&_button]:text-copy">
              {departField}
              <span aria-hidden="true" className="text-label">
                –
              </span>
              {returnField}
            </div>
          </Row>
          <Row last>
            <TravellersField
              key={tab}
              kind={people}
              initial={flight ? undefined : stayInitial}
              className="h-[52px] text-copy"
            />
          </Row>

          <div className="p-3 pt-0">
            <button type="submit" className={`flex h-12 w-full items-center justify-center rounded-xl text-copy ${SEARCH_BUTTON}`}>
              {jet ? "Find jets" : "Search"}
            </button>
          </div>
        </div>

        {/* Desktop: one bar. */}
        <div className="hidden items-center gap-2 p-2 xl:flex">
          {flight ? (
            <>
              <div className="flex min-w-0 flex-1 items-center px-2">
                <PlaceInput value={from} onChange={setFrom} label="From" placeholderPrefix="From?" className="h-10 text-copy" />
              </div>
              <button
                type="button"
                aria-label="Swap origin and destination"
                onClick={swap}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink"
              >
                <ArrowLeftRight size={20} strokeWidth={2} aria-hidden="true" />
              </button>
              <div className="flex min-w-0 flex-1 items-center px-2">
                <PlaceInput value={to} onChange={setTo} label="To" placeholderPrefix="To?" className="h-10 text-copy" />
              </div>
            </>
          ) : (
            <div className="flex min-w-0 flex-[2] items-center px-3">
              <PlaceInput
                value={where}
                onChange={setWhere}
                label="Destination"
                kind="stay"
                placeholderPrefix="Where to?"
                className="h-10 text-copy"
              />
            </div>
          )}
          <div className="flex h-12 shrink-0 items-stretch rounded-xl ring-1 ring-line">
            <div className="flex items-center px-1 [&_button]:text-copy">
              {departField}
              <span aria-hidden="true" className="text-label">
                –
              </span>
              {returnField}
            </div>
            <span aria-hidden="true" className="my-3 w-px bg-line" />
            <div className="flex w-[170px] items-center px-3">
              <TravellersField
                key={tab}
                kind={people}
                initial={flight ? undefined : stayInitial}
                className="h-10 text-copy"
                compact
              />
            </div>
          </div>
          <div aria-hidden="true" className="relative mx-1 w-px self-stretch">
            <span className="absolute inset-y-1 left-0 border-l-2 border-dashed border-line" />
            <span className="absolute -top-[18px] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-shell" />
            <span className="absolute -bottom-[18px] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-shell" />
          </div>
          <button type="submit" className={`h-12 shrink-0 rounded-xl px-7 text-copy ${SEARCH_BUTTON}`}>
            {jet ? "Find jets" : "Search"}
          </button>
        </div>
      </div>
    </form>
  );
}

/** A full-width row on phones, divided by a hairline. */
function Row({ children, last = false }: { children: ReactNode; last?: boolean }) {
  return <div className={`flex min-h-[52px] items-center px-4 ${last ? "" : "border-b border-line"}`}>{children}</div>;
}

/** Plain text dropdown, as in "Return ▾". */
function InlineSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative flex items-center text-copy font-medium text-ink">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="cursor-pointer appearance-none bg-transparent pr-6 outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown size={18} strokeWidth={2.2} aria-hidden="true" className="pointer-events-none absolute right-0" />
    </label>
  );
}

/** The ticket's tear line: dashes between two notches cut to the hero's grey. */
function Perforation() {
  return (
    <div aria-hidden="true" className="relative h-5">
      <span className="absolute inset-x-5 top-1/2 border-t-2 border-dashed border-line" />
      <span className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-shell" />
      <span className="absolute -right-2.5 top-0 h-5 w-5 rounded-full bg-shell" />
    </div>
  );
}
