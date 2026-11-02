import Link from "next/link";
import { PAGE } from "@/components/site/container";
import { ArrowRight } from "lucide-react";
import { RecentSearches } from "@/components/site/recent-searches";
import { SearchBar } from "@/components/site/search-bar";
import { HostIllustration, ShareIllustration } from "@/components/ui/illustrations";

/** The search card, under the hero; "Start searching" scrolls here. */
export function SearchSection() {
  return (
    <section id="search" className={`${PAGE} scroll-mt-20`}>
      <div className="rounded-[28px] bg-shell p-4 sm:p-6 lg:p-8">
        <h2 className="mb-5 text-h3 font-semibold tracking-tight text-ink">Where to next?</h2>
        <SearchBar />
        <RecentSearches />
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: "Fly private by the seat",
    body: "Access executive private jet routes at commercial business-class fares.",
    cta: "Explore flights",
    href: "/private-jets#share",
    art: <ShareIllustration className="h-28 w-auto sm:h-36" />,
    tone: "bg-brand-soft",
  },
  {
    title: "Earn from your place",
    body: "List your apartment and get booked by travellers.",
    cta: "List your place",
    href: "/host",
    art: <HostIllustration className="h-28 w-auto sm:h-36" />,
    tone: "bg-sky-soft",
  },
];

/** The two services that aren't a search: jet sharing and hosting. */
export function FeatureBanners() {
  return (
    <section className={`${PAGE} grid gap-4 pt-16 sm:grid-cols-2 lg:pt-24`}>
      {FEATURES.map((f) => (
        <Link key={f.title} href={f.href} className={`flex items-center gap-4 rounded-[28px] p-5 sm:p-7 ${f.tone}`}>
          <div className="min-w-0 flex-1">
            <h3 className="text-h3 font-semibold tracking-tight text-ink">{f.title}</h3>
            <p className="mt-1.5 text-small text-body">{f.body}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-ink">
              {f.cta}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </span>
          </div>
          <div className="shrink-0">{f.art}</div>
        </Link>
      ))}
    </section>
  );
}
