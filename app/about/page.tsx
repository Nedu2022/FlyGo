import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { MobileApp } from "@/components/site/mobile-app";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { StillHaveQuestions } from "@/components/site/sections";
import {
  AboutHero,
  AboutMission,
  AboutVision,
  CoreValues,
  OffersBanner,
} from "@/components/about/sections";

export const metadata = {
  title: "About — FLYGO Bookings",
  description:
    "Why Flygo exists: our mission, our vision and the values behind every booking.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <AboutHero />
      <AboutMission />
      <AboutVision />
      <OffersBanner />
      <CoreValues />
      <Testimonials />
      <MobileApp />
      <Faq />
      <StillHaveQuestions />
      <SiteFooter />
    </>
  );
}
