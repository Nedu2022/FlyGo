import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { DealsRail, Services } from "@/components/site/home";

/** Short by design: search on the golden-hour sky, every service, then deals. */
export default function FlightsHomePage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <Hero />
      <DealsRail />
      <Services />
      <SiteFooter />
    </>
  );
}
