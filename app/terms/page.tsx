import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The rules for booking and hosting on FLYGO.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="2 November 2026"
      sections={[
        { heading: "Who we are", body: "FLYGO Bookings sells flights, stays and private jet seats from airlines, hotels, hosts and operators. Your contract for each trip is with that provider." },
        { heading: "Prices and payment", body: "Prices include taxes and fees shown before you pay. You're charged once the booking is confirmed." },
        { heading: "Changes and cancellations", body: "Each fare or room has its own rules, shown before you book. Refunds follow those rules and the provider's approval." },
        { heading: "Your account", body: "Keep your sign-in email secure. Some services, like private jets, jet sharing and hosting, need identity verification." },
        { heading: "Hosts", body: "Hosts must own or be allowed to let their place, describe it truthfully, and honour confirmed bookings." },
        { heading: "Contact", body: "Questions about these terms? Reach us through the Contact page." },
      ]}
    />
  );
}
