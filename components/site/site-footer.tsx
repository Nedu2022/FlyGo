import Link from "next/link";
import { LogoWord } from "@/components/brand/logo";
import {
  FOOTER_BLURB,
  FOOTER_CONTACT,
  FOOTER_LINKS,
  FOOTER_SOCIALS,
} from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.15fr_1fr_1.1fr]">
        <div>
          <LogoWord />
          <p className="mt-5 max-w-[300px] text-small leading-relaxed text-white/70">
            {FOOTER_BLURB}
          </p>
        </div>

        {FOOTER_LINKS.map((column) => (
          <div key={column.heading}>
            <h3 className="text-copy font-semibold">{column.heading}</h3>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-small text-white/75 transition-colors duration-200 hover:text-sky"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:text-right">
          <h3 className="text-copy font-semibold">Contact Us</h3>
          <ul className="mt-5 space-y-2.5 text-small text-white/75">
            <li>
              <a
                href={`mailto:${FOOTER_CONTACT.email}`}
                className="transition-colors duration-200 hover:text-sky"
              >
                {FOOTER_CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${FOOTER_CONTACT.phone}`}
                className="transition-colors duration-200 hover:text-sky"
              >
                {FOOTER_CONTACT.phone}
              </a>
            </li>
            <li>{FOOTER_CONTACT.address}</li>
          </ul>

          <h4 className="mt-7 text-copy font-semibold">Follow Us On Social</h4>
          <div className="mt-4 flex flex-wrap gap-3 lg:justify-end">
            {FOOTER_SOCIALS.map((social) => (
              <SocialIcon key={social.name} name={social.name} label={social.label} href={social.href} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-small text-white/55">
        © 2024 Flygo. All rights reserved.
      </div>
    </footer>
  );
}

/** Brand colours so each badge reads at a glance, as in the design. */
const SOCIAL_STYLES: Record<string, { bg: string; path: string }> = {
  facebook: {
    bg: "bg-[#1877f2]",
    path: "M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.8-3H13v-1.2c0-.5.2-.8.5-.8Z",
  },
  twitter: {
    bg: "bg-[#1da1f2]",
    path: "M20 7.5a6.4 6.4 0 0 1-1.9.5 3.3 3.3 0 0 0 1.4-1.8 6.6 6.6 0 0 1-2.1.8 3.3 3.3 0 0 0-5.6 3A9.3 9.3 0 0 1 5 6.6a3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.5-.4a3.3 3.3 0 0 0 2.6 3.2c-.5.2-1 .2-1.5.1a3.3 3.3 0 0 0 3 2.3A6.6 6.6 0 0 1 4 17.6 9.3 9.3 0 0 0 9 19c6 0 9.3-5 9.1-9.5A6.6 6.6 0 0 0 20 7.5Z",
  },
  linkedin: {
    bg: "bg-[#0a66c2]",
    path: "M8.3 18V10H6v8h2.3ZM7.1 8.9a1.3 1.3 0 1 0 0-2.7 1.3 1.3 0 0 0 0 2.7ZM18 18v-4.6c0-2.4-1.3-3.6-3-3.6a2.6 2.6 0 0 0-2.3 1.3V10h-2.3v8h2.3v-4.3c0-1.2.5-1.9 1.5-1.9s1.5.7 1.5 1.9V18H18Z",
  },
  youtube: {
    bg: "bg-[#ff0000]",
    path: "M21 8.4a2.4 2.4 0 0 0-1.7-1.7C17.8 6.3 12 6.3 12 6.3s-5.8 0-7.3.4A2.4 2.4 0 0 0 3 8.4C2.6 9.9 2.6 12 2.6 12s0 2.1.4 3.6a2.4 2.4 0 0 0 1.7 1.7c1.5.4 7.3.4 7.3.4s5.8 0 7.3-.4a2.4 2.4 0 0 0 1.7-1.7c.4-1.5.4-3.6.4-3.6s0-2.1-.4-3.6ZM10.2 14.8V9.2l4.8 2.8-4.8 2.8Z",
  },
  instagram: {
    bg: "bg-[linear-gradient(45deg,#f09433,#dc2743,#bc1888)]",
    path: "M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm0 5.9a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6ZM17 7.5a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM8 5h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Zm0 1.4A1.6 1.6 0 0 0 6.4 8v8A1.6 1.6 0 0 0 8 17.6h8a1.6 1.6 0 0 0 1.6-1.6V8A1.6 1.6 0 0 0 16 6.4H8Z",
  },
  tiktok: {
    bg: "bg-black ring-1 ring-white/25",
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
      className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${style.bg}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={style.path} />
      </svg>
    </a>
  );
}
