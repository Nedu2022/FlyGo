import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { HomeHero } from "@/components/site/home-hero";
import { DealsRail, FeatureBanners, SearchSection, StaysRail } from "@/components/site/home";
import { AskAiPill } from "@/components/site/ai-assistant";

/** Every service up top, then search, then flights, stays, jets and hosting. */
export default function HomePage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <HomeHero />
      <SearchSection />
      <DealsRail />
      <StaysRail />
      <FeatureBanners />
      <div className="h-16 lg:h-24" />
      <SiteFooter />
      <AskAiPill />
    </>
  );
}
