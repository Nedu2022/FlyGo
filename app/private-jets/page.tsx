import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { CinematicHero } from "@/components/site/hero";
import { JetRouteSearch } from "@/components/jets/jet-route-search";
import { JetOfferCard } from "@/components/jets/jet-offer-card";
import { PAGE } from "@/components/site/container";
import { ShareIllustration } from "@/components/ui/illustrations";
import { JET_CITIES, findCity, jetOffers } from "@/lib/jet-data";

export const metadata: Metadata = {
  title: "Private jet charter and jet sharing",
  description: "Charter a private jet from Lagos, Abuja and beyond, or share one and split the cost.",
  alternates: { canonical: "/private-jets" },
  openGraph: { title: "Private jet charter and jet sharing", description: "Charter a private jet from Lagos, Abuja and beyond, or share one and split the cost.", url: "/private-jets" },
};

const cityParam = (value: string | string[] | undefined, fallback: string) =>
  (typeof value === "string" && (JET_CITIES.find((c) => c.code === value.toUpperCase()) ?? findCity(value))?.code) ||
  fallback;

export default async function PrivateJetsPage({ searchParams }: PageProps<"/private-jets">) {
  const params = await searchParams;
  const from = cityParam(params.from, "LOS");
  let to = cityParam(params.to, "DXB");
  if (to === from) to = from === "DXB" ? "LOS" : "DXB";
  const fromCity = JET_CITIES.find((c) => c.code === from)!.city;
  const toCity = JET_CITIES.find((c) => c.code === to)!.city;
  const offers = jetOffers(from, to);

  return (
    <>
      <SiteHeader variant="solid" />
      <CinematicHero
        image="/images/photos/jet-hero.webp"
        imageAlt="A black private jet on the runway"
        imagePosition="center 60%"
        title={
          <>
            Fly private, together<span className="text-brand">.</span>
          </>
        }
        subtitle="Book a jet for yourself, or share one and split the cost."
      >
        <JetRouteSearch from={from} to={to} />
      </CinematicHero>

      <main className="mt-6 flex-1 bg-shell sm:mt-8">
        <div className={`${PAGE} py-8 sm:py-12`}>
          <h2 className="text-h2 font-bold tracking-tight text-ink">
            {fromCity} to {toCity}
          </h2>
          <p className="mt-1 text-copy text-body">
            {offers.length} {offers.length === 1 ? "jet" : "jets"} available · prices for the whole jet
          </p>

          <ul className="mt-6 space-y-4">
            {offers.map((offer) => (
              <li key={offer.id}>
                <JetOfferCard offer={offer} from={fromCity} to={toCity} />
              </li>
            ))}
          </ul>

          <section id="share" className="mt-10 scroll-mt-24 rounded-[28px] bg-white p-5 sm:flex sm:items-center sm:gap-8 sm:p-8">
            <ShareIllustration className="mx-auto h-32 w-auto shrink-0 sm:mx-0 sm:h-40" />
            <div className="mt-4 sm:mt-0">
              <h2 className="text-h3 font-semibold tracking-tight text-ink">How sharing works</h2>
              <ol className="mt-3 space-y-2 text-small text-body">
                {[
                  "Pick a jet and tap “Share with others”.",
                  "Join a group on your route, or start one.",
                  "Everyone who joins splits the cost. More people, lower price each.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-tiny font-bold text-brand-hover">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter flush />
    </>
  );
}
