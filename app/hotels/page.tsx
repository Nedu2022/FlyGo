import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SearchCard } from "@/components/site/search-card";
import Image from "next/image";
import { HotelCard, ResortCountryCard } from "@/components/site/cards";
import {
  Journals,
  LovedDestinations,
  SectionHeading,
  StillHaveQuestions,
  WhyChooseUs,
} from "@/components/site/sections";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { HOTELS, RESORT_COUNTRIES } from "@/lib/site-data";

export default function HotelsPage() {
  return (
    <>
      <SiteHeader />

      <section className="relative isolate overflow-hidden pb-40 pt-[170px]">
        <Image
          src="/images/hero/hotels-villa.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        {/* Night-blue wash so the white headline stays legible over the villa. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(30,41,59,0.55)_0%,rgba(30,41,59,0.35)_55%,rgba(30,41,59,0.15)_100%)]"
        />
        <div className="mx-auto w-full max-w-[820px] px-5 text-center sm:px-8">
          <h1 className="animate-rise text-[36px] font-bold leading-tight tracking-tight text-white sm:text-[44px]">
            Find Your Oasis: Explore and Book Luxury Stays&quot;
          </h1>
          <p
            className="animate-rise mt-4 text-[15px] text-white/90"
            style={{ animationDelay: "0.1s" }}
          >
            Curated Selection of Premium Accommodations for Your Comfort.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-32 w-full max-w-[1200px] px-5 sm:px-8">
        <SearchCard defaultTab="Hotel" />
      </div>

      <section className="reveal mx-auto w-full max-w-[1200px] px-5 pt-16 sm:px-8">
        <SectionHeading>Popular 5-star Hotels in your destination</SectionHeading>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOTELS.map((hotel) => (
            <HotelCard key={hotel.name} hotel={hotel} />
          ))}
        </div>
      </section>

      <section className="reveal mx-auto w-full max-w-[1200px] px-5 pt-14 sm:px-8">
        <SectionHeading>Countries with amazing vacation resorts</SectionHeading>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESORT_COUNTRIES.map((country) => (
            <ResortCountryCard key={country.name} country={country} />
          ))}
        </div>
      </section>

      <section className="reveal mx-auto w-full max-w-[1200px] px-5 pt-14 sm:px-8">
        <SectionHeading>Family-Friendly Hotels for Unforgettable Getaways.</SectionHeading>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOTELS.map((hotel) => (
            <HotelCard key={`family-${hotel.name}`} hotel={hotel} />
          ))}
        </div>
      </section>

      <LovedDestinations />

      <section className="reveal mx-auto w-full max-w-[1200px] px-5 pt-6 sm:px-8">
        <SectionHeading>Popular 5-star Hotels in your destination</SectionHeading>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOTELS.map((hotel) => (
            <HotelCard key={`repeat-${hotel.name}`} hotel={hotel} />
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <Journals />
      <Testimonials />
      <Faq />
      <StillHaveQuestions />
      <SiteFooter />
    </>
  );
}
