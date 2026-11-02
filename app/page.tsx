import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { DealsRail, FeatureBanners, StaysRail } from "@/components/site/home";
import { AskAiPill } from "@/components/site/ai-assistant";

/**
 * Straightforward Kayak-style home: instant search right up front,
 * top deals, stays, and quick actions.
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <Hero />
      <DealsRail />
      <StaysRail />
      <FeatureBanners />
      <div className="h-16 lg:h-24" />
      <SiteFooter />
      <AskAiPill />
    </>
  );
}
