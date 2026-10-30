import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { CinematicHero } from "@/components/site/hero";
import { JetRouteSearch } from "@/components/jets/jet-route-search";
import { JetOfferCard } from "@/components/jets/jet-offer-card";
import { PAGE } from "@/components/site/container";
import { JET_CITIES, findCity, jetOffers } from "@/lib/jet-data";

export const metadata = {
  title: "Private jets — FLYGO Bookings",
  description: "Book a private jet for yourself, or share one and split the cost.",
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
        </div>
      </main>

      <SiteFooter flush />
    </>
  );
}
