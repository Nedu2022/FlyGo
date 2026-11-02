import type { Metadata } from "next";
import Link from "next/link";
import { BedDouble, Headset, House, Plane, Search } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { LostIllustration } from "@/components/ui/illustrations";
import { PrivateJet } from "@/components/site/search-bar";

export const metadata: Metadata = {
  title: "404 - Page Not Found · FLYGO",
  robots: { index: false },
};

const QUICK_LINKS = [
  { href: "/flights", label: "Flights", icon: <Plane size={16} strokeWidth={2} /> },
  { href: "/hotels", label: "Hotels & Stays", icon: <BedDouble size={16} strokeWidth={2} /> },
  { href: "/private-jets", label: "Private Jets", icon: <PrivateJet size={16} strokeWidth={2} /> },
  { href: "/contact", label: "24/7 Support", icon: <Headset size={16} strokeWidth={2} /> },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="mx-auto flex w-full max-w-[620px] flex-1 flex-col items-center px-5 py-14 text-center sm:py-20">
        <LostIllustration className="h-44 w-auto sm:h-56" />

        <span className="mt-6 inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-tiny font-bold uppercase tracking-[0.14em] text-brand">
          Error 404 · Destination not found
        </span>

        <h1 className="mt-3 text-h1 sm:text-display font-bold tracking-tight text-ink">
          Looks like this flight went off course
        </h1>

        <p className="mt-3 max-w-[480px] text-copy text-body leading-relaxed">
          We couldn&rsquo;t locate the page or flight path you were looking for. The route may have
          changed, expired, or the link was mistyped. Let&rsquo;s get you back on track.
        </p>

        {/* Action Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-copy font-semibold text-white shadow-[0_10px_22px_-10px_rgba(245,134,52,0.8)] transition-all hover:bg-brand-hover active:translate-y-px"
          >
            <House size={18} strokeWidth={2.2} />
            Back to homepage
          </Link>
          <Link
            href="/flights"
            className="flex h-12 items-center gap-2 rounded-full bg-shell px-6 text-copy font-semibold text-ink transition-colors hover:bg-line"
          >
            <Search size={18} strokeWidth={2} />
            Search flights
          </Link>
        </div>

        {/* Quick Destinations */}
        <div className="mt-10 w-full pt-8 border-t border-line">
          <p className="text-tiny font-semibold uppercase tracking-[0.12em] text-label">
            Popular destinations & services
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
            {QUICK_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-small font-medium text-ink transition-colors hover:border-ink hover:bg-shell"
                >
                  <span className="text-brand">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Reassurance text */}
        <p className="mt-8 text-tiny text-body">
          Need help with an existing booking? Check your{" "}
          <Link href="/account" className="font-semibold text-ink underline underline-offset-2">
            My Trips
          </Link>{" "}
          or speak with our{" "}
          <Link href="/contact" className="font-semibold text-brand underline underline-offset-2">
            24/7 Concierge Support
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
