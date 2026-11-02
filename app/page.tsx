import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { HomeHero } from "@/components/site/home-hero";
import { OffersSection } from "@/components/site/offers";
import { FeatureBanners, SearchSection } from "@/components/site/home";
import { AskAiPill } from "@/components/site/ai-assistant";

/** Services up top, their offers, then search and the jet-sharing and hosting banners. */
export default function HomePage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <HomeHero />
      <SearchSection />
      <OffersSection />
      <FeatureBanners />
      <div className="h-16 lg:h-24" />
      <SiteFooter />
      <AskAiPill />
    </>
  );
}
