import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ContactForm } from "@/components/site/contact-form";
import { MobileApp } from "@/components/site/mobile-app";
import { Newsletter } from "@/components/site/newsletter";
import { CONTACT_INFO, CONTACT_SOCIAL_LINKS } from "@/lib/site-data";

export const metadata = {
  title: "Contact — FLYGO Bookings",
  description: "Questions or support? The Flygo team is here to help you 24/7.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-16 pt-12 sm:px-8">
        <div className="flex items-start justify-between gap-8">
          <div className="animate-rise">
            <h1 className="flex flex-wrap items-center gap-4 text-h1 font-bold tracking-tight text-ink">
              Get in Touch with Us
              <Handset />
            </h1>
            <p className="mt-3 max-w-[420px] text-copy leading-relaxed text-body">
              Have questions or need support? We&apos;re here to help you 24/7.
            </p>
          </div>

          <div className="hidden flex-col gap-4 sm:flex">
            {["facebook", "instagram", "twitter"].map((name) => (
              <SocialBubble key={name} name={name} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <ContactForm />
        </div>
      </section>

      <section className="bg-sky-tint">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
          <div>
            <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand">
              Contact Info
            </p>
            <h2 className="mt-3 max-w-[280px] text-h2 font-bold leading-tight text-ink">
              We are always happy to assist you
            </h2>
          </div>

          {CONTACT_INFO.map((group) => (
            <div key={group.heading}>
              <h3 className="text-copy font-bold text-ink">{group.heading}</h3>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-7 bg-ink" />
              <ul className="mt-5 space-y-4 text-small leading-relaxed text-body">
                {group.lines.map((line) => (
                  <li key={line} className="whitespace-pre-line">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-copy font-bold text-ink">Social Media:</h3>
            <span aria-hidden="true" className="mt-3 block h-[3px] w-7 bg-ink" />
            <p className="mt-5 text-small text-body">Follow us on:</p>
            <ul className="mt-3 list-disc pl-5 text-small leading-relaxed text-body">
              <li>
                {CONTACT_SOCIAL_LINKS.map((name, index) => (
                  <span key={name}>
                    <a href="#" className="transition-colors duration-200 hover:text-sky">
                      {name}
                    </a>
                    {index < CONTACT_SOCIAL_LINKS.length - 1 ? " | " : ""}
                  </span>
                ))}
              </li>
            </ul>
            <Link
              href="/signup"
              className="mt-6 inline-flex h-[42px] items-center justify-center rounded-md bg-sky px-5 text-small font-medium text-white transition-colors duration-200 hover:bg-sky-hover"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
      <MobileApp />
      <SiteFooter />
    </>
  );
}

/** The orange handset that sits beside the page title. */
function Handset() {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="animate-float shrink-0"
    >
      <defs>
        <linearGradient id="handset" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f9a03c" />
          <stop offset="100%" stopColor="#e0512f" />
        </linearGradient>
      </defs>
      <path
        d="M17 6c-5 0-9 4-9 9 0 4.5 3 7 6.5 7.6 2.4.4 4.3-1.3 4.8-3.6.5-2.3 2-3.6 4.4-3.6h16.6c2.4 0 3.9 1.3 4.4 3.6.5 2.3 2.4 4 4.8 3.6C53 22 56 19.5 56 15c0-5-4-9-9-9H17Z"
        fill="url(#handset)"
        transform="rotate(-38 32 32)"
      />
    </svg>
  );
}

function SocialBubble({ name }: { name: string }) {
  const paths: Record<string, string> = {
    facebook:
      "M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.8-3H13v-1.2c0-.5.2-.8.5-.8Z",
    instagram:
      "M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm0 5.9a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6ZM17 7.5a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM8 5h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Zm0 1.4A1.6 1.6 0 0 0 6.4 8v8A1.6 1.6 0 0 0 8 17.6h8a1.6 1.6 0 0 0 1.6-1.6V8A1.6 1.6 0 0 0 16 6.4H8Z",
    twitter:
      "M20 7.5a6.4 6.4 0 0 1-1.9.5 3.3 3.3 0 0 0 1.4-1.8 6.6 6.6 0 0 1-2.1.8 3.3 3.3 0 0 0-5.6 3A9.3 9.3 0 0 1 5 6.6a3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.5-.4a3.3 3.3 0 0 0 2.6 3.2c-.5.2-1 .2-1.5.1a3.3 3.3 0 0 0 3 2.3A6.6 6.6 0 0 1 4 17.6 9.3 9.3 0 0 0 9 19c6 0 9.3-5 9.1-9.5A6.6 6.6 0 0 0 20 7.5Z",
  };

  return (
    <a
      href="#"
      aria-label={name}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-200 hover:border-sky hover:bg-sky hover:text-white"
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={paths[name]} />
      </svg>
    </a>
  );
}
