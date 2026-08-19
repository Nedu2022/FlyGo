"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Days shown in a month grid, padded to whole Monday-start weeks. */
function buildGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  // getDay() is Sunday-first; shift so Monday is column 0.
  const lead = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - lead);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    return { date, outside: date.getMonth() !== month };
  });
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export function Calendar({
  value,
  onSelect,
  onClose,
}: {
  value: Date;
  onSelect: (date: Date) => void;
  onClose?: () => void;
}) {
  const [view, setView] = useState({ year: value.getFullYear(), month: value.getMonth() });
  const [pickingMonth, setPickingMonth] = useState(false);

  const shift = (by: number) => {
    const next = new Date(view.year, view.month + by, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };

  return (
    <div className="flex items-start gap-4">
      <div className="w-[min(330px,calc(100vw-2rem))] rounded-2xl bg-white p-6 shadow-[0_20px_50px_-18px_rgba(16,24,40,0.35)]">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setPickingMonth((v) => !v)}
            aria-expanded={pickingMonth}
            className="group flex items-center gap-3 text-left"
          >
            <span className="text-h3 font-bold text-ink">{MONTHS[view.month]}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-sky)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`transition-transform duration-300 ${pickingMonth ? "rotate-90" : ""}`}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-1">
            <Arrow direction="prev" onClick={() => shift(-1)} />
            <Arrow direction="next" onClick={() => shift(1)} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-y-3 text-center">
          {WEEKDAYS.map((day) => (
            <span key={day} className="text-small text-muted">
              {day}
            </span>
          ))}

          {buildGrid(view.year, view.month).map(({ date, outside }, i) => {
            const selected = sameDay(date, value);
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onSelect(date);
                  onClose?.();
                }}
                aria-current={selected ? "date" : undefined}
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded text-copy transition-colors duration-150 ${ selected ? "bg-sky font-medium text-white" : outside ? "text-muted hover:bg-shell" : "text-ink hover:bg-sky-tint" }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {pickingMonth ? (
        <ul className="animate-rise max-h-[420px] w-[220px] overflow-y-auto rounded-2xl bg-white py-2 shadow-[0_20px_50px_-18px_rgba(16,24,40,0.35)]">
          {MONTHS.map((month, index) => {
            const on = index === view.month;
            return (
              <li key={month}>
                <button
                  type="button"
                  onClick={() => {
                    setView((v) => ({ ...v, month: index }));
                    setPickingMonth(false);
                  }}
                  aria-current={on}
                  className={`w-full px-6 py-3 text-left text-lead transition-colors duration-150 ${ on ? "bg-sky text-white" : "text-ink hover:bg-shell" }`}
                >
                  {month}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function Arrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous month" : "Next month"}
      className="flex h-8 w-8 items-center justify-center rounded-full text-sky transition-colors duration-200 hover:bg-sky-tint"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === "prev" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}

const FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

/** Field that opens the calendar in a popover and shows the chosen date. */
export function DateField({
  label,
  value,
  onChange,
  disabled = false,
  icon,
  toggle,
}: {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  toggle?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const popover = useRef<HTMLDivElement>(null);

  // Anchors the portal-rendered popover under the trigger. A backdrop-blur
  // ancestor (the glass search card) creates its own stacking context, which
  // traps a same-tree z-index popover and lets normal-flow content further
  // down the page win hit-testing wherever the popover visually overflows
  // past the card. Rendering into <body> sidesteps that entirely, so every
  // row stays clickable regardless of what's behind it. Coordinates are in
  // document space (viewport rect + scroll offset) so the popover scrolls
  // with the page like a normal element, instead of chasing the trigger via
  // a scroll listener under `position: fixed`.
  const place = () => {
    const rect = trigger.current?.getBoundingClientRect();
    if (!rect) return;
    const width = Math.min(330, window.innerWidth - 16);
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)) + window.scrollX;
    setCoords({ top: rect.bottom + window.scrollY + 8, left });
  };

  // Close on an outside click or Esc, the way a native popover behaves.
  useEffect(() => {
    if (!open) return;
    place();
    const onDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (trigger.current?.contains(target) || popover.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => place();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div className="relative min-w-0">
      {/* Matches the ticket-stub cells in the search card: micro label, then
          icon + value on one compact line. */}
      <div
        className={`rounded-lg px-3 py-2 ring-1 ring-inset transition-colors duration-200 ${
          disabled
            ? "bg-white/6 ring-white/5"
            : "bg-white/10 ring-white/10 hover:bg-white/15 hover:ring-white/20"
        }`}
      >
        <span className="flex items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.16em] text-white/55">
          {toggle}
          {label}
        </span>

        <button
          ref={trigger}
          type="button"
          disabled={disabled}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-0.5 flex w-full items-center gap-1.5 text-left outline-none focus-visible:underline focus-visible:decoration-white/70 focus-visible:underline-offset-4"
        >
          <span className={`shrink-0 ${disabled ? "text-white/30" : "text-white/70"}`}>{icon}</span>
          <span
            className={`truncate text-small font-semibold ${disabled ? "text-white/30" : "text-white"}`}
          >
            {FORMAT.format(value)}
          </span>
        </button>
      </div>

      {open && !disabled && coords
        ? createPortal(
            <div
              ref={popover}
              style={{ position: "absolute", top: coords.top, left: coords.left, zIndex: 100 }}
            >
              <Calendar value={value} onSelect={onChange} onClose={() => setOpen(false)} />
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
