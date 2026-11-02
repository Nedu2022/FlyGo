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

          <section id="share" className="mt-10 scroll-mt-24 rounded-[28px] border border-line bg-white p-6 sm:flex sm:items-center sm:gap-10 sm:p-8">
            <ShareIllustration className="mx-auto h-32 w-auto shrink-0 sm:mx-0 sm:h-40" />
            <div className="mt-4 sm:mt-0">
              <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-tiny font-semibold text-brand">
                By-The-Seat Aviation
              </span>
              <h2 className="mt-2 text-h3 font-bold tracking-tight text-ink">Fly private, by the seat</h2>
              <p className="mt-1 text-small text-body">
                Experience private aviation on confirmed routes at commercial business-class fares.
              </p>
              <ol className="mt-4 space-y-3 text-small text-body">
                {[
                  {
                    title: "Confirmed routes",
                    desc: "Select from scheduled executive departures or book seats on shared charter routes.",
                  },
                  {
                    title: "Fixed per-seat pricing",
                    desc: "Guaranteed single-seat fares with VIP private terminal (FBO) boarding and zero airport queues.",
                  },
                  {
                    title: "Verified members",
                    desc: "Fly in comfort alongside identity-verified professionals and vetted travelers.",
                  },
                ].map((step, i) => (
                  <li key={step.title} className="flex gap-3 items-start">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-tiny font-bold text-brand mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <strong className="font-semibold text-ink">{step.title}</strong>
                      <p className="text-tiny text-body mt-0.5">{step.desc}</p>
                    </div>
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
