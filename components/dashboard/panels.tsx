import type { ReactNode } from "react";
import Link from "next/link";
import { Avatar, DashIcon } from "@/components/dashboard/icons";
import { RevenueBars } from "@/components/dashboard/charts";
import {
  NOTIFICATIONS,
  QUICK_LINKS,
  STAT_TILES,
  TOP_PROPERTIES,
} from "@/lib/dashboard-data";

/** White rounded surface every dashboard panel sits on. */
export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

export function PanelHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-h4 font-bold text-ink">{title}</h2>
        {subtitle ? <p className="mt-1 text-small text-label">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const TILE_TONES = {
  rose: { surface: "bg-tile-rose", chip: "bg-[#f2607a]" },
  amber: { surface: "bg-tile-amber", chip: "bg-[#f0913c]" },
  mint: { surface: "bg-tile-mint", chip: "bg-[#2fbf70]" },
  lilac: { surface: "bg-tile-lilac", chip: "bg-[#8b5cf6]" },
} as const;

export function MonthSummary() {
  return (
    <Panel>
      <PanelHeading
        title="Summary for the month"
        subtitle="Sales Summery"
        action={
          <button
            type="button"
            className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-line px-4 text-small font-medium text-body transition-colors duration-200 hover:border-sky hover:text-sky"
          >
            <DashIcon name="export" size={17} />
            Export
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_TILES.map((tile) => {
          const tone = TILE_TONES[tile.tone];
          return (
            <div
              key={tile.label}
              className={`rounded-2xl p-5 transition-colors duration-300 ${tone.surface}`}
            >
              <span
                className={`mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl text-white ${tone.chip}`}
              >
                <DashIcon name={tile.icon} size={21} strokeWidth={1.8} />
              </span>
              <p className="text-h3 font-bold leading-none text-ink">{tile.value}</p>
              <p className="mt-2 text-small text-body">{tile.label}</p>
              <Link
                href={tile.href}
                className="mt-2 inline-block text-small font-medium text-brand transition-colors duration-200 hover:text-brand-hover"
              >
                {tile.action}
              </Link>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */

export function QuickLinks() {
  return (
    <Panel className="h-full">
      <h2 className="text-h4 font-bold text-ink">Quick links</h2>
      <ul className="mt-5 flex flex-col gap-2">
        {QUICK_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-small text-body transition-colors duration-200 hover:bg-sky-tint hover:text-sky"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-soft text-sky">
                <DashIcon name={link.icon} size={18} />
              </span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */

export function RevenueChart({
  title = "Total Revenue",
  action,
  height = 260,
}: {
  title?: string;
  action?: ReactNode;
  height?: number;
}) {
  return (
    <Panel>
      <PanelHeading
        title={title}
        action={
          action ?? (
            <Link
              href="/dashboard/insights"
              className="shrink-0 text-small font-medium text-sky transition-colors duration-200 hover:text-sky-hover"
            >
              View Insights
            </Link>
          )
        }
      />
      <RevenueBars height={height} />
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */

export function Notifications() {
  return (
    <Panel className="h-full">
      <PanelHeading
        title="Notifications"
        action={
          <Link
            href="/dashboard/messages"
            className="shrink-0 text-small font-medium text-brand transition-colors duration-200 hover:text-brand-hover"
          >
            View
          </Link>
        }
      />
      <ul className="flex flex-col gap-5">
        {NOTIFICATIONS.map((note) => (
          <li key={note.name} className="flex gap-3">
            <Avatar name={note.name} size={42} />
            <div className="min-w-0">
              <p className="text-small font-semibold text-[#5b5bd6]">{note.name}</p>
              <p className="mt-0.5 text-small leading-snug text-body">{note.message}</p>
              <p className="mt-1 text-tiny text-muted">{note.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */

const RAIL_TONES = {
  blue: { fill: "bg-[#3b82f6]", track: "bg-[#bfdbfe]", chip: "border-[#3b82f6] text-[#3b82f6]" },
  green: { fill: "bg-[#34d399]", track: "bg-[#bbf7dc]", chip: "border-[#34d399] text-[#10a06b]" },
  purple: { fill: "bg-[#8b5cf6]", track: "bg-[#ddd2fd]", chip: "border-[#8b5cf6] text-[#8b5cf6]" },
  orange: { fill: "bg-[#f59e42]", track: "bg-[#fde3c4]", chip: "border-[#f59e42] text-[#e0812a]" },
} as const;

export function TopProperties() {
  return (
    <Panel className="h-full">
      <PanelHeading
        title="Top Properties"
        action={
          <Link
            href="/dashboard/properties"
            className="shrink-0 text-small font-medium text-brand transition-colors duration-200 hover:text-brand-hover"
          >
            View&nbsp; Summary
          </Link>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[440px] border-collapse text-left">
          <thead>
            <tr className="text-small font-normal text-muted">
              <th scope="col" className="pb-3 font-normal">#</th>
              <th scope="col" className="pb-3 font-normal">Name</th>
              <th scope="col" className="pb-3 font-normal">Popularity</th>
              <th scope="col" className="pb-3 text-right font-normal">Sales</th>
            </tr>
          </thead>
          <tbody>
            {TOP_PROPERTIES.map((property, index) => {
              const tone = RAIL_TONES[property.tone];
              return (
                <tr key={property.name} className="border-t border-line">
                  <td className="py-4 pr-3 text-small text-label">{property.rank}</td>
                  <td className="py-4 pr-4 text-small font-medium text-ink">{property.name}</td>
                  <td className="w-[45%] py-4 pr-4">
                    <span className={`block h-1.5 w-full overflow-hidden rounded-full ${tone.track}`}>
                      <span
                        className={`animate-grow-rail block h-full rounded-full ${tone.fill}`}
                        style={{
                          width: `${property.popularity}%`,
                          animationDelay: `${index * 0.08}s`,
                        }}
                      />
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`inline-block rounded-md border px-2.5 py-1 text-small font-medium ${tone.chip}`}
                    >
                      {property.sales}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
