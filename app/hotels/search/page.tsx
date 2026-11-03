import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { StayResults } from "@/components/stays/stay-results";
import { STAYS, STAY_SEARCH } from "@/lib/liteapi";
import { day } from "@/lib/format";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const apartments = (await searchParams).type === "apartments";
  const title = apartments ? "Apartments in London" : "Hotels in London";
  return {
    title,
    description: `Compare ${apartments ? "apartments" : "hotels"} in London by price, rating and free cancellation.`,
    alternates: { canonical: apartments ? "/hotels/search?type=apartments" : "/hotels/search" },
  };
}

export default async function StaySearchPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const apartments = type === "apartments";
  const stays = STAYS.filter((h) => h.type === (apartments ? "apartment" : "hotel"));

  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-shell">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-8 sm:py-10">
          <h1 className="text-h2 font-bold tracking-tight text-ink">
            {apartments ? "Apartments" : "Hotels"} in {STAY_SEARCH.city}
          </h1>
          <p className="mt-1 text-small text-body">
            {day(STAY_SEARCH.checkin)} – {day(STAY_SEARCH.checkout)} · {STAY_SEARCH.adults} adults
          </p>
          <div className="mt-6">
            <StayResults stays={stays} />
          </div>
        </div>
      </main>
      <SiteFooter flush />
    </>
  );
}
