import Image from "next/image";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SearchCard } from "@/components/site/search-card";
import { HotelCard, ResortCountryCard } from "@/components/site/cards";
import { LovedDestinations } from "@/components/site/sections";
import { Testimonials } from "@/components/site/testimonials";
import { MobileApp } from "@/components/site/mobile-app";
import { OffersBanner } from "@/components/about/sections";
import { Faq } from "@/components/site/faq";
import { Rail } from "@/components/site/rail";
import { PAGE } from "@/components/site/container";
import { HOTELS, RESORT_COUNTRIES } from "@/lib/site-data";

export const metadata = {
  title: "Hotels — FLYGO Bookings",
  description: "Find and book luxury stays, resorts and apartments with Flygo.",
};

export default function HotelsPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      {/* Hero mirrors the flights card: photo panel with the search panel on it. */}
      <section className={PAGE}>
        <div className="relative overflow-hidden rounded-2xl bg-steel">
          <Image
            src="/images/hero/hotels-villa.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(100deg,rgba(9,104,140,0.92)_0%,rgba(9,104,140,0.72)_45%,rgba(9,104,140,0.45)_100%)]"
          />

          <div className="relative grid gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14 lg:px-14">
            <div className="flex flex-col justify-center">
              <h1 className="max-w-[560px] text-display font-bold leading-[1.22] tracking-tight text-white">
                Find Your Oasis: Explore and Book Luxury Stays
              </h1>
              <p className="mt-4 max-w-[460px] text-copy leading-relaxed text-white/75">
                A curated selection of premium accommodations for your comfort — resorts,
                apartments and boutique hotels in one place.
              </p>
            </div>

            <SearchCard defaultTab="Hotel" />
          </div>
        </div>
      </section>

      <section className={`reveal ${PAGE} pt-14`}>
        <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand">
          Top Rated
        </p>
        <h2 className="mt-2 text-h1 font-bold tracking-tight text-ink">
          Popular 5-star Hotels in your destination
        </h2>
        <p className="mt-4 max-w-[620px] text-copy leading-relaxed text-body">
          Handpicked stays with the highest guest scores, ready to book in minutes.
        </p>

        <Rail label="popular hotels" className="mt-9">
          {HOTELS.map((hotel) => (
            <li
              key={hotel.name}
              className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <HotelCard hotel={hotel} />
            </li>
          ))}
        </Rail>
      </section>

      <section className={`reveal ${PAGE} pt-16`}>
        <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand">
          Resorts
        </p>
        <h2 className="mt-2 text-h1 font-bold tracking-tight text-ink">
          Countries with amazing vacation resorts
        </h2>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESORT_COUNTRIES.map((country) => (
            <ResortCountryCard key={country.name} country={country} />
          ))}
        </div>
      </section>

      <section className={`reveal ${PAGE} pt-16`}>
        <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand">
          For Families
        </p>
        <h2 className="mt-2 text-h1 font-bold tracking-tight text-ink">
          Family-Friendly Hotels for Unforgettable Getaways
        </h2>

        <Rail label="family hotels" className="mt-9">
          {[...HOTELS].reverse().map((hotel) => (
            <li
              key={`family-${hotel.name}`}
              className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <HotelCard hotel={hotel} />
            </li>
          ))}
        </Rail>
      </section>

      <div className="pt-16">
        <OffersBanner />
      </div>

      <LovedDestinations />
      <Testimonials />
      <Faq />
      <MobileApp />
      <SiteFooter />
    </>
  );
}
