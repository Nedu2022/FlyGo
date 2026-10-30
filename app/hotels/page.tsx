import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { SectionHeader } from "@/components/site/section-header";
import { HotelCard, ResortCountryCard } from "@/components/site/cards";
import { Faq } from "@/components/site/faq";
import { Rail, RAIL_ITEM } from "@/components/site/rail";
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

      <Hero variant="stay" />

      <section className={`${PAGE} pt-16 lg:pt-24`}>
        <SectionHeader
          title="Top-rated hotels"
          href="/hotels"
        />

        <Rail label="popular hotels" className="mt-6">
          {[...HOTELS].sort((a, b) => Number(b.score) - Number(a.score)).map((hotel) => (
            <li
              key={hotel.name}
              className={RAIL_ITEM}
            >
              <HotelCard hotel={hotel} />
            </li>
          ))}
        </Rail>
      </section>

      <section className={`${PAGE} pt-16 lg:pt-24`}>
        <SectionHeader
          title="Resort escapes"
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESORT_COUNTRIES.map((country) => (
            <ResortCountryCard key={country.name} country={country} />
          ))}
        </div>
      </section>

      <Faq />
      <SiteFooter />
    </>
  );
}
