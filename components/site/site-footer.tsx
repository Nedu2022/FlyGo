import Link from "next/link";
import { BottomNav } from "@/components/site/bottom-nav";
import { FOOTER_BLURB, FOOTER_LINKS, FOOTER_SOCIALS } from "@/lib/site-data";

/**
 * Light footer: tagline, socials and copyright on the left, link columns on
 * the right, and the wordmark set huge along the bottom with a golden-hour
 * skyline showing through the letters. `flush` drops the top gap for pages whose
 * content ends on a tinted panel.
 */
export function SiteFooter({ flush = false }: { flush?: boolean }) {
  return (
    <>
      <footer
        className={`overflow-hidden bg-shell text-ink ${flush ? "" : "mt-20 lg:mt-28"}`}
      >
        <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-6 pt-10 sm:gap-12 sm:px-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20 lg:px-16 lg:pt-16">
          <div>
            <p className="max-w-[420px] text-lead text-ink">{FOOTER_BLURB}</p>
            <div className="mt-7 flex gap-3">
              {FOOTER_SOCIALS.map((social) => (
                <SocialIcon
                  key={social.name}
                  name={social.name}
                  label={social.label}
                  href={social.href}
                />
              ))}
            </div>
            <p className="mt-6 text-small text-label">
              © {new Date().getFullYear()} FLYGO Bookings. All rights reserved.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-y-10 lg:gap-x-16"
          >
            {FOOTER_LINKS.map((column, index) => (
              <div key={column.heading} className={index === 0 ? "row-span-2 sm:row-span-1" : ""}>
                <h3 className="text-copy font-bold text-ink sm:text-lead">
                  {column.heading}
                </h3>
                <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-copy text-body transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* The wordmark, cut out of a golden-hour skyline. */}
        <div className="mx-auto mt-10 w-full max-w-[1600px] px-2 sm:mt-16 sm:px-4 lg:mt-24">
          <p
            aria-hidden="true"
            className="select-none bg-[url(/images/photos/dubai.webp)] bg-cover bg-[center_62%] bg-clip-text text-center text-[33vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-transparent min-[1600px]:text-[540px]"
          >
            FLYGO
          </p>
        </div>
        <div className="h-6 lg:h-10" />
      </footer>
      <BottomNav />
    </>
  );
}

/** Icon path for each social badge. Badges are monochrome so the footer stays quiet. */
const SOCIAL_STYLES: Record<string, { path: string }> = {
  facebook: {
    path: "M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.8-3H13v-1.2c0-.5.2-.8.5-.8Z",
  },
  instagram: {
    path: "M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm0 5.9a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6ZM17 7.5a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM8 5h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Zm0 1.4A1.6 1.6 0 0 0 6.4 8v8A1.6 1.6 0 0 0 8 17.6h8a1.6 1.6 0 0 0 1.6-1.6V8A1.6 1.6 0 0 0 16 6.4H8Z",
  },
  x: {
    path: "M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z",
  },
  tiktok: {
    path: "M15.6 4.5c.4 1.9 1.5 3 3.4 3.2v2.4a5.9 5.9 0 0 1-3.4-1.1v4.9a4.9 4.9 0 1 1-4.2-4.9v2.5a2.4 2.4 0 1 0 1.7 2.3V4.5h2.5Z",
  },
};

function SocialIcon({
  name,
  label,
  href,
}: {
  name: string;
  label: string;
  href: string;
}) {
  const style = SOCIAL_STYLES[name] ?? SOCIAL_STYLES.facebook;
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-ink transition-colors duration-200"
    >
      <svg
        width={name === "x" ? 18 : 24}
        height={name === "x" ? 18 : 24}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={style.path} />
      </svg>
    </a>
  );
}
