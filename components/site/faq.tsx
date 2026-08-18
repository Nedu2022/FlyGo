"use client";

import { useState } from "react";
import { FAQS } from "@/lib/site-data";

export function Faq() {
  // First question starts open, matching the design.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="reveal mx-auto w-full max-w-[900px] px-5 py-16 sm:px-8">
      <h2 className="text-center text-[28px] font-bold text-ink sm:text-[32px]">
        Frequently asked questions
      </h2>
      <p className="mt-2 text-center text-[13px] text-body">
        Everything you need to know about the Flygo and pricing.
      </p>

      <div className="mt-10">
        {FAQS.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div key={faq.question} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium text-ink">{faq.question}</span>
                  <span className="shrink-0 text-brand">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9.5" />
                      <path d="M7.5 12h9" />
                      <path
                        d="M12 7.5v9"
                        className={`origin-center transition-transform duration-300 ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </svg>
                  </span>
                </button>
              </h3>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="max-w-[680px] pb-5 text-[13px] leading-relaxed text-body">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
