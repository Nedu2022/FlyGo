"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BedDouble, MapPin, Plus, ShieldAlert, Trash2, Users } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { EmptyState } from "@/components/account/account-shell";
import { HostIllustration } from "@/components/ui/illustrations";
import { hostReady, listingsFor, removeListing, type Listing } from "@/lib/listings";
import { money } from "@/lib/format";

export default function HostingPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the host's listings from storage
    if (user) setListings(listingsFor(user.email));
  }, [user]);

  if (!user) return null;
  const ready = hostReady(user);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-h3 font-semibold tracking-tight text-ink">Hosting</h2>
        {listings.length ? (
          <Link href="/host/new" className="flex h-10 items-center gap-1.5 rounded-full bg-brand px-4 text-small font-semibold text-white">
            <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
            New listing
          </Link>
        ) : null}
      </div>

      {!ready ? (
        <Link href="/account/verification" className="mb-4 flex items-center gap-3 rounded-2xl bg-brand-soft p-4">
          <ShieldAlert size={22} strokeWidth={1.9} aria-hidden="true" className="shrink-0 text-brand-hover" />
          <span className="min-w-0 flex-1 text-small text-ink">
            <span className="font-semibold">Finish verification</span> so guests can book your place.
          </span>
          <span className="text-small font-semibold text-brand-hover">Verify</span>
        </Link>
      ) : null}

      {listings.length ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {listings.map((l) => (
            <li key={l.id} className="overflow-hidden rounded-3xl bg-shell">
              <div className="relative aspect-[16/10] bg-line">
                {/* eslint-disable-next-line @next/next/no-img-element -- local data URL */}
                <img src={l.photos[0]} alt={l.title} className="h-full w-full object-cover" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-tiny font-semibold ${
                    ready ? "bg-white text-ink" : "bg-brand text-white"
                  }`}
                >
                  {ready ? "In review" : "Needs verification"}
                </span>
              </div>
              <div className="p-4">
                <p className="truncate text-copy font-semibold text-ink">{l.title}</p>
                <p className="mt-1 flex items-center gap-1.5 text-tiny text-label">
                  <MapPin size={13} strokeWidth={2} aria-hidden="true" /> {l.city}
                  <Users size={13} strokeWidth={2} aria-hidden="true" className="ml-2" /> {l.guests}
                  <BedDouble size={13} strokeWidth={2} aria-hidden="true" className="ml-2" /> {l.bedrooms}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-small text-body">
                    <span className="text-copy font-semibold text-ink">{money(l.price, l.currency)}</span> / night
                  </p>
                  <button
                    type="button"
                    aria-label={`Delete ${l.title}`}
                    onClick={() => {
                      removeListing(l.id);
                      setListings(listingsFor(user.email));
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-label"
                  >
                    <Trash2 size={16} strokeWidth={1.9} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          art={<HostIllustration />}
          title="List your first place"
          note="Apartments, houses or a spare room. It takes about 5 minutes."
          action={
            <Link href="/host/new" className="mt-5 rounded-full bg-brand px-5 py-2.5 text-small font-semibold text-white">
              List your place
            </Link>
          }
        />
      )}
    </section>
  );
}
