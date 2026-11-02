import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { AboutHero, AboutMission, AboutVision, CoreValues } from "@/components/about/sections";

export const metadata: Metadata = {
  title: "About us",
  description: "FLYGO makes booking flights, stays and private jets simple, with honest prices.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About us", description: "FLYGO makes booking flights, stays and private jets simple, with honest prices.", url: "/about" },
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
