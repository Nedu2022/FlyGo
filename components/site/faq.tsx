"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { FAQS, type Faq as FaqItem } from "@/lib/site-data";
import { PAGE } from "@/components/site/container";

/**
 * FAQ: a short heading, one clean column of the questions people actually
 * ask, and a single route to a person. Answers stay in the DOM (only their
 * height animates) and FAQPage structured data is emitted for search.
 */
export function Faq({ limit = 5 }: { limit?: number }) {
  const items = FAQS.slice(0, limit);

  return (
    <section className={`reveal ${PAGE} pt-16 lg:pt-24`}>
      <div className="mx-auto max-w-[760px]">
        <h2 className="text-h2 font-bold tracking-tight text-ink sm:text-center">Frequently asked questions</h2>

        <div className="mt-8 sm:mt-10">
          <FaqAccordion items={items} />
        </div>

        <p className="mt-8 text-copy text-body sm:text-center">
          Can&apos;t find an answer?{" "}
          <Link href="/contact" className="font-semibold text-ink underline decoration-line underline-offset-[6px]">
            Contact support
          </Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        // Static copy from our own data module, so there is nothing to escape.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </section>
  );
}

/** Divider-line accordion. One answer open at a time; the first starts open. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul>
      {items.map((faq, index) => {
        const isOpen = open === index;
        const panel = `${base}-panel-${index}`;
        return (
          <li key={faq.question} className="border-b border-line/70 last:border-b-0">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span className="text-copy font-semibold leading-snug text-ink sm:text-lead">{faq.question}</span>
                <span
                  aria-hidden="true"
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                    isOpen ? "bg-brand text-white" : "bg-shell text-ink"
                  }`}
                >
                  <span className="absolute h-[2px] w-3.5 rounded-full bg-current" />
                  <span
                    className={`absolute h-3.5 w-[2px] rounded-full bg-current transition-transform duration-300 ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-[640px] pb-6 pr-10 text-copy leading-relaxed text-body">{faq.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
