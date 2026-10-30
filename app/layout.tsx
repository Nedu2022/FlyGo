import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

/**
 * General Sans (Indian Type Foundry), served by Fontshare under the ITF Free
 * Font License. The licence forbids putting the font files in a public
 * repository, so they're loaded from Fontshare's API, which it permits,
 * rather than self-hosted from this repo.
 */
const FONT_CSS = "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap";

export const metadata: Metadata = {
  title: "FLYGO Bookings",
  description: "Book flights and stays with ease.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONT_CSS} />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
