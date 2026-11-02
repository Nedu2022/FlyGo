import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Dancing_Script, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ScrollToTop } from "@/components/site/scroll-to-top";
import { JsonLd } from "@/components/site/json-ld";
import { FOOTER_CONTACT } from "@/lib/site-data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Kayak sets its UI in TT Hoves, a commercial font. Plus Jakarta Sans is the
 * closest free match in width and letter shapes. If FLYGO licenses TT Hoves,
 * swap this for next/font/local and keep the same CSS variable.
 */
const sans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/** Handwritten accent for a word or two in display headlines. */
const script = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "FLYGO Bookings: flights, hotels, apartments and private jets", template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "cheap flights from Lagos",
    "book flights Nigeria",
    "hotels",
    "short-let apartments",
    "private jet charter Nigeria",
    "jet sharing",
    "list your apartment",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_NG",
    url: "/",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#f58634" };

/** Organization and WebSite, once for the whole site. */
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.svg`,
      description: SITE_DESCRIPTION,
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      email: FOOTER_CONTACT.email,
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: SITE_URL, name: SITE_NAME, publisher: { "@id": `${SITE_URL}/#org` } },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={ORGANIZATION} />
        <Providers>
          <ScrollToTop />
          {/* The layout persists, so a route change is an update: crossfade it. The header is held still by name. */}
          <ViewTransition default="page">
            <div className="flex min-h-full flex-1 flex-col">{children}</div>
          </ViewTransition>
        </Providers>
      </body>
    </html>
  );
}
