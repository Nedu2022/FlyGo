import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { SectionHeader } from "@/components/site/section-header";
import { StayTile } from "@/components/stays/stay-card";
import { Rail, RAIL_ITEM } from "@/components/site/rail";
import { PAGE } from "@/components/site/container";
import { STAYS } from "@/lib/liteapi";

export const metadata: Metadata = {
  title: "Hotels and apartments",
  description: "Book top-rated hotels and short-let apartments with free cancellation on many rooms. Full price shown up front.",
  alternates: { canonical: "/hotels" },
  openGraph: { title: "Hotels and apartments", description: "Book top-rated hotels and short-let apartments with free cancellation on many rooms. Full price shown up front.", url: "/hotels" },
};

const byRating = [...STAYS].sort((a, b) => b.rating - a.rating);

export default function HotelsPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <Hero variant="stay" />

      <section className={`${PAGE} pt-16 lg:pt-24`}>
        <SectionHeader title="Top-rated hotels" href="/hotels/search" />
        <Rail label="Top-rated hotels" className="mt-6">
          {byRating
            .filter((h) => h.type === "hotel")
            .map((hotel) => (
              <li key={hotel.id} className={RAIL_ITEM}>
                <StayTile hotel={hotel} />
              </li>
            ))}
        </Rail>
      </section>

      <section className={`${PAGE} pb-16 pt-16 lg:pb-24 lg:pt-24`}>
        <SectionHeader title="Apartments" href="/hotels/search?type=apartments" />
        <Rail label="Apartments" className="mt-6">
          {byRating
            .filter((h) => h.type === "apartment")
            .map((hotel) => (
              <li key={hotel.id} className={RAIL_ITEM}>
                <StayTile hotel={hotel} />
              </li>
            ))}
        </Rail>
      </section>

      <SiteFooter />
    </>
  );
}
