"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  ArrowUpDown,
  BedDouble,
  Building2,
  CalendarDays,
  ChevronDown,
  MapPin,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Search,
  Users,
  X,
} from "lucide-react";
import { DateField } from "@/components/ui/calendar";
import { PlaceInput } from "@/components/site/place-input";

const TABS = [
  { label: "Flights", value: "Flight", icon: Plane },
  { label: "Hotels", value: "Hotel", icon: BedDouble },
  { label: "Apartments", value: "Apartment", icon: Building2 },
] as const;

export type SearchTab = (typeof TABS)[number]["value"];

const TRIP_KINDS = ["Return", "One-way", "Multi-city"] as const;

/** One-tap destinations under the bar, so most people never have to type. */
const POPULAR = {
  Flight: ["London (LHR)", "Dubai (DXB)", "Accra (ACC)", "New York (JFK)", "Paris (CDG)"],
  stay: ["London", "Dubai", "Lisbon", "Cape Town", "Santorini"],
} as const;
const BAGS = ["0 bags", "1 bag", "2 bags", "3 bags"] as const;

const SEARCH_BUTTON =
  "bg-linear-to-br from-brand to-brand-hover font-semibold text-white shadow-[0_6px_16px_-6px_rgba(224,117,42,0.7)] transition-[filter,transform] duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2";

/**
 * Product pills over one search bar, built to sit inside the hero's white
 * card. From `lg` the fields sit in a single row split by hairlines; below
 * that they stack with the trip type as tabs, like a native form.
 */
export function SearchBar({ defaultTab = "Flight" }: { defaultTab?: SearchTab }) {
  const router = useRouter();
  const [tab, setTab] = useState<SearchTab>(defaultTab);
  const [kind, setKind] = useState<(typeof TRIP_KINDS)[number]>("Return");
  const [departure, setDeparture] = useState(() => new Date(2026, 11, 15));
  const [returnDate, setReturnDate] = useState(() => new Date(2027, 0, 9));
  const [from, setFrom] = useState("Lagos (LOS)");
  const [to, setTo] = useState("");
  const [where, setWhere] = useState(
    defaultTab === "Apartment" ? "Lisbon, Portugal" : "London, United Kingdom",
  );

  const flight = tab === "Flight";
  const oneWay = kind !== "Return";
  const party = flight ? "1 adult, Economy" : tab === "Hotel" ? "2 adults, 1 room" : "4 adults, 2 bedrooms";
  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const dates = (
    <>
      <DateField
        tone="inline"
        label={flight ? "Departure" : "Check in"}
        value={departure}
        onChange={setDeparture}
      />
      <span aria-hidden="true" className="text-lead text-ink">–</span>
      <DateField
        tone="inline"
        label={flight ? "Return" : "Check out"}
        value={returnDate}
        onChange={setReturnDate}
        disabled={flight && oneWay}
        placeholder="No return"
      />
    </>
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push(flight ? "/flights" : "/hotels");
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="What are you booking?"
          className="relative grid w-full grid-cols-3 rounded-full bg-shell p-1 sm:w-[420px]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-white shadow-[0_1px_2px_rgba(16,24,40,0.08),0_4px_12px_-4px_rgba(16,24,40,0.18)] transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${TABS.findIndex((t) => t.value === tab) * 100}%)` }}
          />
          {TABS.map(({ label, value, icon: Icon }) => {
            const on = tab === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(value)}
                className={`relative z-10 flex h-11 min-w-0 items-center justify-center gap-2 rounded-full text-small font-semibold transition-colors duration-200 sm:text-copy ${
                  on ? "text-ink" : "text-body"
                }`}
              >
                <Icon size={18} strokeWidth={2} aria-hidden="true" className={`hidden min-[400px]:block ${on ? "text-brand" : ""}`} />
                {label}
              </button>
            );
          })}
        </div>

        <div className={`hidden h-11 items-center gap-6 pr-2 ${flight ? "lg:flex" : ""}`}>
          <Dropdown label="Trip type" value={kind} options={TRIP_KINDS} onChange={(v) => setKind(v as typeof kind)} />
          <Dropdown label="Bags" value="0 bags" options={BAGS} />
        </div>
      </div>

      {/* Desktop: options as dropdowns, then a single-row bar. */}
      <div className="hidden lg:block">
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-shell p-1.5">
          {flight ? (
            <div className="flex min-w-0 flex-[2.2] items-center">
              <Place value={from} onChange={setFrom} placeholder="From" />
              <button
                type="button"
                aria-label="Swap origin and destination"
                onClick={swap}
                className="mx-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink transition-colors duration-200"
              >
                <ArrowLeftRight size={20} strokeWidth={2} aria-hidden="true" />
              </button>
              <Place value={to} onChange={setTo} placeholder="To" />
            </div>
          ) : (
            <div className="flex min-w-0 flex-[2.2] items-center">
              <Place value={where} onChange={setWhere} placeholder="Going to" kind="stay" />
            </div>
          )}

          <Divider />
          <div className="flex min-w-0 flex-[1.4] items-center gap-1">{dates}</div>
          <Divider />

          <input
            key={tab}
            defaultValue={party}
            aria-label={flight ? "Travellers and cabin" : "Guests and rooms"}
            className="h-12 min-w-0 flex-1 truncate rounded-lg bg-transparent px-3 text-lead text-ink outline-none transition-colors duration-200 focus:bg-shell"
          />

          <button type="submit" className={`h-14 shrink-0 rounded-xl px-8 text-lead ${SEARCH_BUTTON}`}>
            Search
          </button>
        </div>
      </div>

      {/* Phone and tablet: native-app field tiles, each with its own label. */}
      <div key={`m-${tab}`} className="animate-fade mt-3 space-y-2 lg:hidden">
        {flight ? (
          <div className="grid grid-cols-3 rounded-xl bg-shell p-1" role="radiogroup" aria-label="Trip type">
            {TRIP_KINDS.map((item) => (
              <button
                key={item}
                type="button"
                role="radio"
                aria-checked={kind === item}
                onClick={() => setKind(item)}
                className={`h-10 rounded-lg text-small font-semibold transition-colors duration-200 ${
                  kind === item ? "bg-white text-ink shadow-[0_1px_3px_rgba(16,24,40,0.12)]" : "text-body"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}

        {flight ? (
          <div className="relative rounded-2xl bg-shell">
            <Tile label="From" icon={<PlaneTakeoff size={20} strokeWidth={1.8} aria-hidden="true" />}>
              <PlaceInput value={from} onChange={setFrom} label="From" placeholderPrefix="e.g." className="mx-3 block w-[calc(100%-4.5rem)] text-copy font-semibold" />
            </Tile>
            <div className="mx-4 h-px bg-line" />
            <Tile label="To" icon={<PlaneLanding size={20} strokeWidth={1.8} aria-hidden="true" />}>
              <PlaceInput value={to} onChange={setTo} label="To" placeholderPrefix="e.g." className="mx-3 block w-[calc(100%-4.5rem)] text-copy font-semibold" />
            </Tile>
            <button
              type="button"
              aria-label="Swap origin and destination"
              onClick={swap}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_8px_rgba(16,24,40,0.14)]"
            >
              <ArrowUpDown size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="rounded-2xl bg-shell">
            <Tile
              label={tab === "Hotel" ? "Destination" : "Where"}
              icon={<MapPin size={20} strokeWidth={1.8} aria-hidden="true" />}
            >
              <PlaceInput value={where} onChange={setWhere} label="Destination" kind="stay" placeholderPrefix="e.g." className="mx-3 block w-[calc(100%-1.5rem)] text-copy font-semibold" />
            </Tile>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-shell">
            <Tile label={flight ? "Depart" : "Check in"} icon={<CalendarDays size={20} strokeWidth={1.8} aria-hidden="true" />} compact>
              <DateField tone="inline" label={flight ? "Departure" : "Check in"} value={departure} onChange={setDeparture} />
            </Tile>
          </div>
          <div className="rounded-2xl bg-shell">
            <Tile label={flight ? "Return" : "Check out"} icon={<CalendarDays size={20} strokeWidth={1.8} aria-hidden="true" />} compact>
              <DateField
                tone="inline"
                label={flight ? "Return" : "Check out"}
                value={returnDate}
                onChange={setReturnDate}
                disabled={flight && oneWay}
                placeholder="No return"
              />
            </Tile>
          </div>
        </div>

        <div className="rounded-2xl bg-shell">
          <Tile
            label={flight ? "Travellers" : "Guests"}
            icon={<Users size={20} strokeWidth={1.8} aria-hidden="true" />}
          >
            <input
              defaultValue={flight ? `${party}, 0 bags` : party}
              aria-label={flight ? "Travellers, cabin and bags" : "Guests and rooms"}
              className="mx-3 block w-[calc(100%-1.5rem)] min-w-0 bg-transparent text-copy font-semibold text-ink outline-none"
            />
          </Tile>
        </div>

        <button type="submit" className={`flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-lead ${SEARCH_BUTTON}`}>
          <Search size={20} strokeWidth={2.4} aria-hidden="true" />
          {flight ? "Search flights" : "Search stays"}
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="shrink-0 text-small text-body">Popular:</span>
        {(flight ? POPULAR.Flight : POPULAR.stay).map((place) => {
          const on = flight ? to === place : where === place;
          return (
            <button
              key={place}
              type="button"
              onClick={() => (flight ? setTo(place) : setWhere(place))}
              aria-pressed={on}
              className={`h-9 shrink-0 rounded-full px-3.5 text-small font-medium transition-colors duration-200 ${
                on ? "bg-ink text-white" : "bg-shell text-ink"
              }`}
            >
              {place.replace(/ \(.*\)$/, "")}
            </button>
          );
        })}
      </div>
    </form>
  );
}

/** A chosen place shows as a removable chip; clearing it reveals the input. */
/** A chosen place shows as a removable chip; clearing it brings back the live input. */
function Place({
  value,
  onChange,
  placeholder,
  kind = "airport",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  kind?: "airport" | "stay";
}) {
  const [draft, setDraft] = useState("");
  const commit = () => {
    if (draft.trim()) onChange(draft.trim());
    setDraft("");
  };

  return (
    <div className="flex h-12 min-w-0 flex-1 items-center px-2">
      {value ? (
        <span className="inline-flex h-10 min-w-0 items-center gap-2 rounded-lg bg-white pl-3 pr-1.5 text-lead text-ink">
          <span className="truncate">{value}</span>
          <button
            type="button"
            aria-label={`Clear ${value}`}
            onClick={() => onChange("")}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-ink"
          >
            <X size={16} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </span>
      ) : (
        <PlaceInput
          value={draft}
          onChange={setDraft}
          onSelect={(label) => {
            onChange(label);
            setDraft("");
          }}
          onBlur={commit}
          label={placeholder}
          kind={kind}
          placeholderPrefix={placeholder}
          className="h-12 px-1 text-lead"
        />
      )}
    </div>
  );
}

function Divider() {
  return <span aria-hidden="true" className="h-9 w-px shrink-0 bg-line" />;
}

/** One labelled field tile in the phone form. */
function Tile({
  label,
  icon,
  children,
  compact = false,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`flex min-h-[64px] items-center gap-3 ${compact ? "pl-3.5 pr-1" : "px-4"}`}>
      <span className="shrink-0 text-label">{icon}</span>
      <div className="min-w-0 flex-1 py-2">
        <span className="block text-tiny font-medium text-label">{label}</span>
        <div className="-mx-3 [&_button]:h-7 [&_button]:text-copy [&_button]:font-semibold">{children}</div>
      </div>
    </div>
  );
}


function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange?: (value: string) => void;
}) {
  return (
    <label className="relative inline-flex items-center text-lead text-ink">
      <select
        aria-label={label}
        value={onChange ? value : undefined}
        defaultValue={onChange ? undefined : value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className="cursor-pointer appearance-none bg-transparent pr-7 outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown size={18} strokeWidth={2.2} aria-hidden="true" className="pointer-events-none absolute right-0" />
    </label>
  );
}

