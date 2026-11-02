"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BedDouble, Building2, Clock, Plane, X } from "lucide-react";
import { PrivateJet } from "@/components/site/search-bar";
import { clearRecent, readRecent, type RecentSearch } from "@/lib/recent-searches";

const ICON = { size: 16, strokeWidth: 2, "aria-hidden": true } as const;
const ICONS = {
  Flight: <Plane {...ICON} />,
  Hotel: <BedDouble {...ICON} />,
  Apartment: <Building2 {...ICON} />,
  Jet: <PrivateJet {...ICON} />,
};

/** One-tap repeats of this device's last searches. Hidden until there are some. */
export function RecentSearches() {
  const [items, setItems] = useState<RecentSearch[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from device storage
    setItems(readRecent());
  }, []);

  if (!items.length) return null;

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-small font-medium text-body">
          <Clock size={15} strokeWidth={2} aria-hidden="true" />
          Recent searches
        </p>
        <button
          type="button"
          onClick={() => {
            clearRecent();
            setItems([]);
          }}
          className="flex items-center gap-1 text-tiny font-medium text-label"
        >
          <X size={13} strokeWidth={2.4} aria-hidden="true" />
          Clear
        </button>
      </div>
      <ul className="no-scrollbar -mx-4 mt-2.5 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {items.map((s) => (
          <li key={`${s.kind}${s.label}`} className="shrink-0">
            <Link href={s.href} className="flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5">
              <span className="text-brand">{ICONS[s.kind]}</span>
              <span>
                <span className="block text-small font-medium text-ink">{s.label}</span>
                <span className="block text-tiny text-label">{s.detail}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
