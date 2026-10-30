"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeftRight, PlaneLanding, PlaneTakeoff, Search } from "lucide-react";
import { JET_CITIES } from "@/lib/jet-data";

/** From / To pickers for the private jet results, kept in the URL. */
export function JetRouteSearch({ from, to }: { from: string; to: string }) {
  const router = useRouter();
  const [origin, setOrigin] = useState(from);
  const [dest, setDest] = useState(to);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/private-jets?from=${origin}&to=${dest}`);
      }}
      className="grid gap-2 rounded-2xl bg-white p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] sm:items-center"
    >
      <CitySelect
        label="From"
        icon={<PlaneTakeoff size={20} strokeWidth={1.8} aria-hidden="true" />}
        value={origin}
        onChange={setOrigin}
      />
      <button
        type="button"
        aria-label="Swap"
        onClick={() => {
          setOrigin(dest);
          setDest(origin);
        }}
        className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-shell text-ink"
      >
        <ArrowLeftRight size={18} strokeWidth={2} aria-hidden="true" className="rotate-90 sm:rotate-0" />
      </button>
      <CitySelect
        label="To"
        icon={<PlaneLanding size={20} strokeWidth={1.8} aria-hidden="true" />}
        value={dest}
        onChange={setDest}
      />
      <button
        type="submit"
        className="flex h-14 items-center justify-center gap-2 rounded-xl bg-linear-to-br from-brand to-brand-hover px-7 text-copy font-semibold text-white"
      >
        <Search size={20} strokeWidth={2.4} aria-hidden="true" />
        Find jets
      </button>
    </form>
  );
}

function CitySelect({
  label,
  icon,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex h-14 items-center gap-3 rounded-xl bg-shell px-4">
      <span className="shrink-0 text-label">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-tiny font-medium text-label">{label}</span>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent text-copy font-semibold text-ink outline-none"
        >
          {JET_CITIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.city} ({c.code})
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
