"use client";

import Image from "next/image";
import { BarAction, DashPage, FilterButton } from "@/components/dashboard/shell";
import { Avatar } from "@/components/dashboard/icons";
import { LISTINGS, type Listing } from "@/lib/dashboard-data";

export default function PropertiesPage() {
  return (
    <DashPage
      title="Manage Your Properties"
      subtitle="View and update details of your listed properties."
      actions={
        <>
          <BarAction label="Add new property" />
          <BarAction label="Deactivate all listings" tone="brand" icon={false} />
        </>
      }
    >
      <section className="min-w-0 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lead font-semibold text-ink">All Properties</h2>
          <FilterButton />
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {LISTINGS.map((listing) => (
            <li key={listing.id}>
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
      </section>
    </DashPage>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="group relative rounded-xl border border-line bg-white">
      <div className="relative h-[170px] w-full overflow-hidden rounded-t-xl">
        <Image
          src={listing.image}
          alt={listing.name}
          fill
          sizes="(max-width: 768px) 92vw, 340px"
          className="object-cover transition-colors duration-500"
        />
      </div>

      {/* Sits on the card, not inside the clipped photo, so it straddles the edge. */}
      <div className="absolute left-4 top-[151px] flex -space-x-3">
        {listing.guests.map((guest) => (
          <Avatar key={guest} name={guest} size={38} className="ring-2 ring-white" />
        ))}
      </div>

      <div className="px-4 pb-4 pt-7">
        <h3 className="flex items-center gap-2 text-copy font-semibold text-ink">
          {listing.name}
          {listing.live ? (
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#22c55e]"
              title="Listing is live"
            />
          ) : null}
        </h3>
        <p className="mt-1 text-small text-label">{listing.views}</p>

        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="flex items-center gap-1.5 text-small text-brand">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5v5M12 16h.01" />
            </svg>
            {listing.upcoming}
          </p>

          <div className="flex items-center gap-3 text-label">
            <IconButton label={`Edit ${listing.name}`} path="m5 19 .8-3.6L16.3 4.9a2 2 0 0 1 2.8 2.8L8.6 18.2 5 19Z" />
            <IconButton label={`Preview ${listing.name}`} path="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" extra={<circle cx="12" cy="12" r="3" />} />
            <IconButton label={`Delete ${listing.name}`} path="M5 7h14M10 7V5h4v2M6.5 7l.8 12h9.4l.8-12" danger />
          </div>
        </div>
      </div>
    </article>
  );
}

function IconButton({
  label,
  path,
  extra,
  danger = false,
}: {
  label: string;
  path: string;
  extra?: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`transition-colors duration-200 ${danger ? "hover:text-red-500" : "hover:text-sky"}`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={path} />
        {extra}
      </svg>
    </button>
  );
}
