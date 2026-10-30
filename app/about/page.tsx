import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { AboutHero, AboutMission, AboutVision, CoreValues } from "@/components/about/sections";

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
      <CoreValues />
      <SiteFooter />
    </>
  );
}
