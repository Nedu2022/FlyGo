import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What FLYGO collects, why, and your rights.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="2 November 2026"
      sections={[
        { heading: "What we collect", body: "Your name, email, phone, and the trip details needed to book. For verification, your ID document and a selfie." },
        { heading: "Why", body: "To make and manage bookings, prevent fraud, pay hosts, and meet legal duties." },
        { heading: "Who we share it with", body: "Only the airline, hotel, host or operator you book with, our payment and verification partners, and authorities where the law requires." },
        { heading: "How long we keep it", body: "As long as your account is open, then only what the law requires us to keep." },
        { heading: "Your rights", body: "You can see, correct or delete your data under the Nigeria Data Protection Act 2023. Ask us through the Contact page." },
      ]}
    />
  );
}
