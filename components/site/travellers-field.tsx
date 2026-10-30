"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Minus, Plus, User } from "lucide-react";

const CABINS = ["Economy", "Premium", "Business", "First"] as const;

type Counts = { adults: number; children: number; infants: number; rooms: number };

const ROWS: {
  key: keyof Counts;
  label: string;
  note: string;
  min: number;
  max: number;
  stay?: boolean;
  flight?: boolean;
}[] = [
  { key: "adults", label: "Adults", note: "Age 12+", min: 1, max: 9 },
  { key: "children", label: "Children", note: "Age 2–11", min: 0, max: 8 },
  { key: "infants", label: "Infants", note: "Under 2, on lap", min: 0, max: 4, flight: true },
  { key: "rooms", label: "Rooms", note: "", min: 1, max: 8, stay: true },
];

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/**
 * Travellers picker: a button showing the summary ("2 adults, Economy") that
 * opens a panel with +/− counters and, for flights, the cabin class. The
 * panel renders into <body> so the hero's rounded overflow can't clip it.
 */
export function TravellersField({
  kind = "flight",
  initial,
  className = "",
  compact = false,
}: {
  kind?: "flight" | "stay" | "jet";
  initial?: Partial<Counts>;
  /** Classes for the trigger's text, so it matches the surrounding field. */
  className?: string;
  /** Short "👤 1 Economy" summary, for the one-row desktop bar. */
  compact?: boolean;
}) {
  const [counts, setCounts] = useState<Counts>({ adults: 1, children: 0, infants: 0, rooms: 1, ...initial });
  const [cabin, setCabin] = useState<(typeof CABINS)[number]>("Economy");
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  // Phones get a bottom sheet; wider screens a panel anchored under the field.
  const [sheet, setSheet] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const flight = kind === "flight";
  const jet = kind === "jet";
  const people = counts.adults + counts.children + counts.infants;
  const summary = jet
    ? plural(counts.adults, "passenger")
    : flight
      ? `${plural(people, "traveller")}, ${cabin}`
      : `${plural(counts.adults + counts.children, "guest")}, ${plural(counts.rooms, "room")}`;
  const short = jet
    ? `${counts.adults}`
    : flight
      ? `${people} ${cabin}`
      : `${counts.adults + counts.children} · ${plural(counts.rooms, "room")}`;
  const title = jet ? "Passengers" : flight ? "Travellers" : "Guests";
  const rows = jet
    ? [{ key: "adults" as const, label: "Passengers", note: "Adults and children", min: 1, max: 16 }]
    : ROWS.filter((row) => (flight ? !row.stay : !row.flight));

  useEffect(() => {
    if (!open) return;
    const place = () => {
      const rect = trigger.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(340, window.innerWidth - 16);
      setCoords({
        top: rect.bottom + window.scrollY + 10,
        left: Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)) + window.scrollX,
      });
    };
    place();
    const onDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!trigger.current?.contains(target) && !panel.current?.contains(target)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  const step = (key: keyof Counts, delta: number, min: number, max: number) => {
    const next = { ...counts, [key]: Math.min(max, Math.max(min, counts[key] + delta)) };
    // One infant per adult, as airlines require.
    if (next.infants > next.adults) next.infants = next.adults;
    setCounts(next);
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => {
          setSheet(window.innerWidth < 640);
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`${title}: ${summary}`}
        className={`flex w-full min-w-0 items-center justify-between gap-2 text-left text-ink outline-none ${className}`}
      >
        {compact ? (
          <span className="flex min-w-0 items-center gap-2">
            <User size={18} strokeWidth={0} fill="currentColor" aria-hidden="true" className="shrink-0" />
            <span className="truncate">{short}</span>
          </span>
        ) : (
          <span className="truncate">{summary}</span>
        )}
        <ChevronDown
          size={18}
          strokeWidth={2}
          aria-hidden="true"
          className={`shrink-0 text-label transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && coords
        ? createPortal(
            <>
              {sheet ? (
                <div
                  aria-hidden="true"
                  className="animate-fade fixed inset-0 z-[99] bg-ink/40"
                  onClick={() => setOpen(false)}
                />
              ) : null}
              <div
                ref={panel}
                role="dialog"
                aria-label={title}
                style={sheet ? undefined : { position: "absolute", top: coords.top, left: coords.left, zIndex: 100 }}
                className={
                  sheet
                    ? "animate-rise fixed inset-x-0 bottom-0 z-[100] rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
                    : "animate-fade w-[min(340px,calc(100vw-1rem))] rounded-2xl bg-white p-5 shadow-[0_24px_48px_-16px_rgba(16,24,40,0.35)] ring-1 ring-black/5"
                }
              >
                {sheet ? <p className="mb-5 text-h4 font-bold text-ink">{title}</p> : null}
                <ul className="space-y-4">
                  {rows.map((row) => (
                    <li key={row.key} className="flex items-center justify-between gap-4">
                      <span>
                        <span className="block text-copy font-semibold text-ink">{row.label}</span>
                        {row.note ? <span className="block text-small text-label">{row.note}</span> : null}
                      </span>
                      <span className="flex items-center gap-3">
                        <Stepper
                          label={`Fewer ${row.label.toLowerCase()}`}
                          disabled={counts[row.key] <= row.min}
                          onClick={() => step(row.key, -1, row.min, row.max)}
                        >
                          <Minus size={16} strokeWidth={2.4} aria-hidden="true" />
                        </Stepper>
                        <span className="w-5 text-center text-copy font-semibold text-ink" aria-live="polite">
                          {counts[row.key]}
                        </span>
                        <Stepper
                          label={`More ${row.label.toLowerCase()}`}
                          disabled={
                            counts[row.key] >= row.max || (row.key === "infants" && counts.infants >= counts.adults)
                          }
                          onClick={() => step(row.key, 1, row.min, row.max)}
                        >
                          <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
                        </Stepper>
                      </span>
                    </li>
                  ))}
                </ul>

                {flight ? (
                  <div className="mt-5">
                    <p className="text-small font-semibold text-ink">Cabin</p>
                    <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Cabin class">
                      {CABINS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          role="radio"
                          aria-checked={cabin === item}
                          onClick={() => setCabin(item)}
                          className={`h-10 rounded-xl px-3 text-small font-semibold ${
                            cabin === item ? "bg-ink text-white" : "bg-shell text-ink"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-5 h-11 w-full rounded-xl bg-brand text-copy font-semibold text-white"
                >
                  Done
                </button>
              </div>
            </>,
            document.body,
          )
        : null}
    </>
  );
}

function Stepper({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-shell text-ink disabled:opacity-35"
    >
      {children}
    </button>
  );
}
