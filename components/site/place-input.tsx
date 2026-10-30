"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BedDouble, MapPin, Plane } from "lucide-react";

type Place = { city: string; country: string; code?: string; airport?: string };

const AIRPORTS: Place[] = [
  { city: "Lagos", country: "Nigeria", code: "LOS", airport: "Murtala Muhammed" },
  { city: "Abuja", country: "Nigeria", code: "ABV", airport: "Nnamdi Azikiwe" },
  { city: "London", country: "United Kingdom", code: "LHR", airport: "Heathrow" },
  { city: "London", country: "United Kingdom", code: "LGW", airport: "Gatwick" },
  { city: "Dubai", country: "United Arab Emirates", code: "DXB", airport: "Dubai International" },
  { city: "Accra", country: "Ghana", code: "ACC", airport: "Kotoka" },
  { city: "New York", country: "United States", code: "JFK", airport: "John F. Kennedy" },
  { city: "Paris", country: "France", code: "CDG", airport: "Charles de Gaulle" },
  { city: "Johannesburg", country: "South Africa", code: "JNB", airport: "O. R. Tambo" },
  { city: "Cape Town", country: "South Africa", code: "CPT", airport: "Cape Town International" },
  { city: "Nairobi", country: "Kenya", code: "NBO", airport: "Jomo Kenyatta" },
  { city: "Toronto", country: "Canada", code: "YYZ", airport: "Pearson" },
  { city: "Istanbul", country: "Türkiye", code: "IST", airport: "Istanbul Airport" },
  { city: "Doha", country: "Qatar", code: "DOH", airport: "Hamad" },
  { city: "Lisbon", country: "Portugal", code: "LIS", airport: "Humberto Delgado" },
  { city: "Athens", country: "Greece", code: "ATH", airport: "Eleftherios Venizelos" },
  { city: "New Delhi", country: "India", code: "DEL", airport: "Indira Gandhi" },
  { city: "Atlanta", country: "United States", code: "ATL", airport: "Hartsfield–Jackson" },
];

const STAYS: Place[] = [
  { city: "London", country: "United Kingdom" },
  { city: "Dubai", country: "United Arab Emirates" },
  { city: "Lisbon", country: "Portugal" },
  { city: "Cape Town", country: "South Africa" },
  { city: "Santorini", country: "Greece" },
  { city: "Paris", country: "France" },
  { city: "Accra", country: "Ghana" },
  { city: "Lagos", country: "Nigeria" },
  { city: "Maldives", country: "Maldives" },
  { city: "New York", country: "United States" },
];

/** Cycled through the empty field's placeholder, so the input never sits still. */
const HINTS = ["London", "Dubai", "Accra", "New York", "Paris"];

export const placeLabel = (p: Place) => (p.code ? `${p.city} (${p.code})` : `${p.city}, ${p.country}`);

/**
 * Destination input with live suggestions: matches cities, airports and codes
 * as you type, works with arrow keys and Enter, and rotates example cities
 * through the placeholder while empty.
 */
export function PlaceInput({
  value,
  onChange,
  label,
  kind = "airport",
  placeholderPrefix = "Try",
  className = "",
  autoFocus = false,
  onSelect,
  onBlur,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  kind?: "airport" | "stay";
  placeholderPrefix?: string;
  className?: string;
  autoFocus?: boolean;
  /** Called with the chosen suggestion; defaults to `onChange`. */
  onSelect?: (label: string) => void;
  onBlur?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [hint, setHint] = useState(0);
  const listId = useId();
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  const source = kind === "airport" ? AIRPORTS : STAYS;
  const q = value.trim().toLowerCase();
  const matches = (
    q
      ? source.filter((p) => [p.city, p.country, p.code, p.airport].some((part) => part?.toLowerCase().includes(q)))
      : source
  ).slice(0, 6);

  useEffect(() => {
    if (value) return;
    const timer = window.setInterval(() => setHint((i) => (i + 1) % HINTS.length), 2200);
    return () => window.clearInterval(timer);
  }, [value]);

  // The list renders into <body> so a rounded hero's overflow can't clip it;
  // it's anchored in document coordinates so it scrolls with the field.
  useEffect(() => {
    if (!open) return;
    const place = () => {
      const rect = box.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(360, window.innerWidth - 16);
      setCoords({
        top: rect.bottom + window.scrollY + 12,
        left: Math.max(8, Math.min(rect.left - 12, window.innerWidth - width - 8)) + window.scrollX,
      });
    };
    place();
    const onDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!box.current?.contains(target) && !list.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  const choose = (place: Place) => {
    const label = placeLabel(place);
    if (onSelect) onSelect(label);
    else onChange(label);
    setOpen(false);
  };

  return (
    <div ref={box} className="relative min-w-0 flex-1">
      <input
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => {
          onChange(event.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={onBlur}
        onKeyDown={(event) => {
          if (!open || !matches.length) return;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((i) => (i + 1) % matches.length);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((i) => (i - 1 + matches.length) % matches.length);
          } else if (event.key === "Enter") {
            event.preventDefault();
            choose(matches[active]);
          } else if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        placeholder={`${placeholderPrefix} ${HINTS[hint]}`}
        aria-label={label}
        role="combobox"
        aria-expanded={open && matches.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        className={`w-full min-w-0 bg-transparent text-ink outline-none placeholder:font-normal placeholder:text-muted ${className}`}
      />

      {open && matches.length && coords
        ? createPortal(
            <ul
              ref={list}
              id={listId}
              role="listbox"
              style={{ position: "absolute", top: coords.top, left: coords.left, zIndex: 100 }}
              className="animate-fade w-[min(360px,calc(100vw-1rem))] overflow-hidden rounded-2xl bg-white py-2 shadow-[0_24px_48px_-16px_rgba(16,24,40,0.35)] ring-1 ring-black/5"
            >
              {matches.map((place, index) => {
                const Icon = kind === "stay" ? (place.code ? Plane : BedDouble) : place.code ? Plane : MapPin;
                return (
                  <li
                    key={`${place.city}-${place.code ?? place.country}`}
                    role="option"
                    aria-selected={index === active}
                  >
                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => choose(place)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left ${index === active ? "bg-shell" : ""}`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-shell text-ink">
                        <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-copy font-semibold text-ink">
                          {place.city}
                          {place.code ? <span className="font-normal text-label"> · {place.code}</span> : null}
                        </span>
                        <span className="block truncate text-small text-body">
                          {place.airport ? `${place.airport}, ${place.country}` : place.country}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>,
            document.body,
          )
        : null}
    </div>
  );
}
