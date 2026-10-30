import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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

export const metadata: Metadata = {
  title: "FLYGO Bookings",
  description: "Book flights and stays with ease.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {/* The layout persists, so a route change is an update: crossfade it. The header is held still by name. */}
          <ViewTransition default="page">
            <div className="flex min-h-full flex-1 flex-col">{children}</div>
          </ViewTransition>
        </Providers>
      </body>
    </html>
  );
}
