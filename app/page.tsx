import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { DealsRail, StaysRail } from "@/components/site/home";
import { Faq } from "@/components/site/faq";

export default function FlightsHomePage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <Hero />
      <DealsRail />
      <StaysRail />
      <Faq />
      <SiteFooter />
    </>
  );
}
