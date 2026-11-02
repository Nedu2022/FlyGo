import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ContactForm } from "@/components/site/contact-form";
import { FaqAccordion } from "@/components/site/faq";
import { PAGE } from "@/components/site/container";
import { JsonLd } from "@/components/site/json-ld";
import { FAQS, FOOTER_CONTACT } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Call, email or visit FLYGO in Lagos. Answers to common booking questions.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact us", description: "Call, email or visit FLYGO in Lagos. Answers to common booking questions.", url: "/contact" },
};

const ICON = { size: 22, strokeWidth: 1.9, "aria-hidden": true } as const;

/** Fastest routes first: travel problems are usually urgent. */
const CHANNELS = [
  {
    title: "Call us",
    value: FOOTER_CONTACT.phone,
    note: "24/7",
    href: `tel:${FOOTER_CONTACT.phone}`,
    action: "Call",
    icon: <Phone {...ICON} />,
  },
  {
    title: "Email us",
    value: FOOTER_CONTACT.email,
    note: "Reply within 24 hours",
    href: `mailto:${FOOTER_CONTACT.email}`,
    action: "Email",
    icon: <Mail {...ICON} />,
  },
  {
    title: "Visit us",
    value: FOOTER_CONTACT.address,
    note: "Mon–Fri, 9am–5pm",
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FOOTER_CONTACT.address)}`,
    action: "Map",
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

      {/* 1. Every way to reach us, as ticket strips on the grey panel. */}
      <section className="px-3 sm:px-4">
        <div className="mx-auto max-w-[1600px] rounded-[24px] bg-shell px-4 pb-5 pt-6 sm:rounded-[28px] sm:px-10 sm:pb-12 sm:pt-12 lg:px-14 lg:pb-14 lg:pt-14">
          <h1 className="text-display font-bold tracking-tight text-ink">
            Get in touch<span className="text-brand">.</span>
          </h1>
          <p className="mt-3 max-w-[480px] text-lead text-body">Real people, ready to help with any booking.</p>

          <ul className="mt-6 grid gap-2.5 sm:mt-8 md:grid-cols-3 md:gap-4">
            {CHANNELS.map((channel) => (
              <li key={channel.title}>
                <a
                  href={channel.href}
                  target={channel.action === "Map" ? "_blank" : undefined}
                  rel={channel.action === "Map" ? "noreferrer" : undefined}
                  className="flex items-stretch rounded-[24px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
                >
                  <span className="flex min-w-0 flex-1 items-center gap-3 p-3 sm:gap-4 sm:p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand sm:h-12 sm:w-12 sm:rounded-2xl">
                      {channel.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-small text-body">{channel.title}</span>
                      <span className="block truncate text-copy font-medium text-ink">{channel.value}</span>
                      <span className="block text-tiny text-label">{channel.note}</span>
                    </span>
                  </span>
                  <span aria-hidden="true" className="relative w-px self-stretch">
                    <span className="absolute inset-y-3 left-0 border-l-2 border-dashed border-line" />
                    <span className="absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-shell" />
                    <span className="absolute -bottom-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-shell" />
                  </span>
                  <span className="flex w-[72px] shrink-0 items-center justify-center text-small font-medium text-brand">
                    {channel.action}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <main className={`${PAGE} flex-1`}>
        {/* 2. The message form, with what to expect beside it. */}
        <section className="grid gap-8 pt-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:pt-20">
          <div>
            <h2 className="text-h2 font-bold tracking-tight text-ink">Send us a message</h2>
            <p className="mt-2 max-w-[420px] text-copy text-body">Add your booking reference if you have one.</p>

          </div>

          <ContactForm topic={preset} />
        </section>

        {/* 3. Answers to the questions people ask most. */}
        <section id="faq" className="mx-auto max-w-[760px] scroll-mt-24 pt-16 lg:pt-24">
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }}
          />
          <h2 className="text-h2 font-bold tracking-tight text-ink sm:text-center">Common questions</h2>
          <div className="mt-6 sm:mt-8">
            <FaqAccordion items={FAQS} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
