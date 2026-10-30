import Image from "next/image";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ContactForm } from "@/components/site/contact-form";
import { FaqAccordion } from "@/components/site/faq";
import { PAGE } from "@/components/site/container";
import { FAQS, FOOTER_CONTACT } from "@/lib/site-data";

export const metadata = {
  title: "Contact — FLYGO Bookings",
  description: "Questions or support? The Flygo team is here to help you 24/7.",
};

const ICON = { size: 20, strokeWidth: 1.8, "aria-hidden": true } as const;

/** Fastest routes first: travel problems are usually urgent. */
const CHANNELS = [
  {
    title: "Call us",
    value: FOOTER_CONTACT.phone,
    note: "24 hours a day, 7 days a week",
    href: `tel:${FOOTER_CONTACT.phone}`,
    icon: <Phone {...ICON} />,
  },
  {
    title: "Email",
    value: FOOTER_CONTACT.email,
    note: "We reply within 24 hours",
    href: `mailto:${FOOTER_CONTACT.email}`,
    icon: <Mail {...ICON} />,
  },
  {
    title: "Office",
    value: FOOTER_CONTACT.address,
    note: "Monday to Friday, 9am – 5pm",
    href: null,
    icon: <MapPin {...ICON} />,
  },
];

/** Search links can pre-pick a topic, e.g. /contact?topic=private-jet. */
const TOPIC_PARAMS: Record<string, string> = { "private-jet": "Private jet charter" };

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { topic } = await searchParams;
  const preset = typeof topic === "string" ? TOPIC_PARAMS[topic] : undefined;
  return (
    <>
      <SiteHeader variant="solid" />

      <main className={`${PAGE} pt-6 sm:pt-10 lg:pt-14`}>
        <div className="grid overflow-hidden rounded-[28px] shadow-[0_1px_2px_rgba(16,24,40,0.05),0_8px_24px_-16px_rgba(16,24,40,0.25)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Brand panel: who you're talking to, and every way to reach them. */}
          <div className="relative isolate overflow-hidden bg-shell p-6 sm:p-10 lg:p-12">
            <Image
              src="/images/logo-mark.svg"
              alt=""
              width={31}
              height={41}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-16 -z-10 h-[260px] w-auto opacity-[0.07] sm:h-[340px]"
            />
            <Image src="/images/logo.svg" alt="FLYGO Bookings" width={126} height={56} className="h-11 w-auto" />

            <h1 className="mt-8 text-display font-bold tracking-tight text-ink">Contact us</h1>
            <p className="mt-3 max-w-[420px] text-lead leading-relaxed text-body">
              We&apos;re here to help, day or night.
            </p>

            <ul className="mt-8 space-y-3">
              {CHANNELS.map((channel) => {
                const body = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                      {channel.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-small text-body">{channel.title}</span>
                      <span className="block truncate text-copy font-semibold text-ink">{channel.value}</span>
                      <span className="block text-small text-label">{channel.note}</span>
                    </span>
                  </>
                );
                return (
                  <li key={channel.title}>
                    {channel.href ? (
                      <a href={channel.href} className="flex items-center gap-4 rounded-2xl bg-white p-4">
                        {body}
                        <ChevronRight size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-muted" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl bg-white p-4">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

          </div>

          <div className="bg-white">
            <ContactForm topic={preset} />
          </div>
        </div>

        <section className="mx-auto max-w-[760px] pt-16 lg:pt-24">
          <h2 className="text-center text-h1 font-bold tracking-tight text-ink">Common questions</h2>
          <div className="mt-8">
            <FaqAccordion items={FAQS.slice(0, 5)} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
