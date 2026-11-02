/** Canonical site address; set NEXT_PUBLIC_SITE_URL when the custom domain is live. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://new-flygo.vercel.app").replace(/\/$/, "");
export const SITE_NAME = "FLYGO Bookings";
export const SITE_DESCRIPTION =
  "Book flights, hotels, apartments and private jets in one place, with the full price up front. List your apartment and earn as a host.";

/** Pages that must not show up in search: personal, checkout and sign-in screens. */
export const NO_INDEX = { robots: { index: false, follow: false } } as const;
