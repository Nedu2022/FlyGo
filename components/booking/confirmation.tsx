import type { ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

/** Booked screen for flights and stays: reference first, then the details. */
export function Confirmation({
  title,
  referenceLabel,
  reference,
  email,
  children,
  next,
}: {
  title: string;
  referenceLabel: string;
  reference: string;
  email?: string;
  children: ReactNode;
  next: { label: string; href: string };
}) {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="bg-canvas">
        <div className="mx-auto w-full max-w-[600px] px-5 py-10 sm:py-16">
          <div className="text-center">
            <span className="animate-badge-in mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
              <Check size={28} strokeWidth={2.6} aria-hidden="true" />
            </span>
            <h1 className="mt-5 text-h1 font-bold tracking-tight text-ink">{title}</h1>
            {email ? <p className="mt-2 text-copy text-body">Confirmation sent to {email}</p> : null}
          </div>

          <div className="animate-rise mt-8 rounded-2xl bg-white p-5 sm:p-6">
            <p className="text-tiny font-medium uppercase tracking-[0.14em] text-label">{referenceLabel}</p>
            <p className="mt-1 font-mono text-h2 font-bold tracking-[0.12em] text-ink">{reference}</p>
            <div className="mt-5 border-t border-dashed border-line pt-5">{children}</div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/account"
              className="flex h-12 flex-1 items-center justify-center rounded-xl bg-brand text-copy font-semibold text-white"
            >
              View my trips
            </Link>
            <Link
              href={next.href}
              className="flex h-12 flex-1 items-center justify-center rounded-xl bg-white text-copy font-semibold text-ink"
            >
              {next.label}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter flush />
    </>
  );
}

export function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 text-small">
      <dt className="text-body">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
