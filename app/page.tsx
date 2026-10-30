import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { DealsRail, Services, TrustCards } from "@/components/site/home";
import { AskAiPill } from "@/components/site/ai-assistant";

/** Short by design: search, why FLYGO, every service, the cheapest flights. */
export default function FlightsHomePage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <Hero />
      <TrustCards />
      <Services />
      <DealsRail />
      <SiteFooter />
      <AskAiPill />
    </>
  );
}
