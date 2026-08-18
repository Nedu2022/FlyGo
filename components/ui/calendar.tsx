"use client";

import { useEffect, useRef, useState } from "react";

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
      <div className="w-[330px] rounded-2xl bg-white p-6 shadow-[0_20px_50px_-18px_rgba(16,24,40,0.35)]">
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
  const wrap = useRef<HTMLDivElement>(null);

  // Close on an outside click or Esc, the way a native popover behaves.
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!wrap.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <span className="mb-2 flex items-center gap-2 text-small text-white">
        {toggle}
        {label}
      </span>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex h-[46px] w-full items-center gap-2.5 rounded-lg px-4 text-left transition-colors duration-200 ${
          disabled ? "bg-white/8" : "bg-white/15 hover:bg-white/22"
        }`}
      >
        <span className={disabled ? "text-white/35" : "text-white/80"}>{icon}</span>
        <span
          className={`truncate text-copy ${disabled ? "text-white/35" : "text-white"}`}
        >
          {FORMAT.format(value)}
        </span>
      </button>

      {open && !disabled ? (
        <div className="absolute left-0 top-full z-40 mt-2">
          <Calendar value={value} onSelect={onChange} onClose={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
