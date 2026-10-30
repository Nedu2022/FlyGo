import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { DealsRail } from "@/components/site/home";

/** Short by design: search, the cheapest flights, and out. */
export default function FlightsHomePage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <Hero />
      <DealsRail />
      <SiteFooter />
    </>
  );
}
