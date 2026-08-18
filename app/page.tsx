import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { DestinationRail } from "@/components/site/destination-rail";
import { Adventures } from "@/components/site/adventures";
import { Stories } from "@/components/site/stories";
import { AiPlanner } from "@/components/site/ai-planner";
import { MobileApp } from "@/components/site/mobile-app";
import { OffersBanner } from "@/components/about/sections";
import { PAGE } from "@/components/site/container";

export default function FlightsHomePage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <Hero />

      <section className={`reveal ${PAGE} pt-10`}>
        <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand">
          Top Destinations
        </p>
        <h2 className="mt-2 text-h1 font-bold tracking-tight text-ink">
          Trending Destinations Just for You
        </h2>
        <p className="mt-4 max-w-[620px] text-copy leading-relaxed text-body">
          From exotic beaches to bustling cityscapes, explore top-rated destinations loved
          by travelers around the world.
        </p>

        <div className="mt-9">
          <DestinationRail />
        </div>
      </section>

      <Adventures />
      <OffersBanner />
      <Stories />
      <AiPlanner />
      <MobileApp />
      <SiteFooter />
    </>
  );
}
