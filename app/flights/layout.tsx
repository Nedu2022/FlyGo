import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Cheap flights from Lagos",
  description: "Compare flights on 300+ airlines. See bags, refund rules and the full price before you book.",
  alternates: { canonical: "/flights" },
  openGraph: { title: "Cheap flights from Lagos", url: "/flights" },
};

export default function FlightsLayout({ children }: { children: ReactNode }) {
  return children;
}
