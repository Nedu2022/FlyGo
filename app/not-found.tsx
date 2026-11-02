import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { LostIllustration } from "@/components/ui/illustrations";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

const LINKS = [
  { href: "/flights", label: "Flights" },
  { href: "/hotels", label: "Hotels" },
  { href: "/hotels/search?type=apartments", label: "Apartments" },
  { href: "/private-jets", label: "Private jets" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="mx-auto flex w-full max-w-[560px] flex-1 flex-col items-center px-5 py-14 text-center sm:py-20">
        <LostIllustration className="h-44 w-auto sm:h-56" />
        <p className="mt-6 text-small font-semibold uppercase tracking-[0.16em] text-brand">Error 404</p>
        <h1 className="mt-2 text-h1 font-bold tracking-tight text-ink">This page flew off course</h1>
        <p className="mt-2 text-copy text-body">It may have moved, or the link is wrong.</p>
        <Link
          href="/"
          className="mt-7 flex h-12 items-center rounded-full bg-brand px-7 text-copy font-semibold text-white shadow-[0_10px_22px_-10px_rgba(224,117,42,0.8)]"
        >
          Back to home
        </Link>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="flex h-10 items-center rounded-full bg-shell px-4 text-small font-medium text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
