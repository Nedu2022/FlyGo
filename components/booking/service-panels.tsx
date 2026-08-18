"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "@/components/booking/booking-shell";
import {
  ADDITIONAL_SERVICES,
  PROTECTION_REASONS,
  SEAT_OPTIONS,
  SMS_SERVICES,
} from "@/lib/flight-data";

export function ServicePanels() {
  const [added, setAdded] = useState<string[]>([]);

  const toggle = (id: string) =>
    setAdded((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  return (
    <div className="flex flex-col gap-12">
      <section>
        <SectionHeading
          icon={<Image src="/images/icons/seat.svg" alt="" width={24} height={24} />}
          title="Choose your seat mate"
        />
        <div className="mt-6 max-w-[720px] pl-0 sm:pl-9">
          <p className="mb-2 text-copy text-ink">Available seats</p>
          <div className="relative flex h-[52px] items-center rounded-lg border border-line bg-white transition-colors duration-200 focus-within:border-sky">
            <label htmlFor="seat" className="sr-only">
              Available seats
            </label>
            <select
              id="seat"
              className="h-full w-full cursor-pointer appearance-none bg-transparent px-4 pr-10 text-copy text-label outline-none"
            >
              {SEAT_OPTIONS.map((seat) => (
                <option key={seat}>{seat}</option>
              ))}
            </select>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="pointer-events-none absolute right-4 text-label">
              <path d="m6 9 6 7 6-7Z" />
            </svg>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          icon={<Image src="/images/icons/protect.svg" alt="" width={24} height={24} />}
          title="Travel protection and insurance"
          trailing={<PerPerson />}
        />
        <div className="mt-5">
          <p className="text-copy leading-relaxed text-ink">
            Travel Protection for unexpected travel occurrences. Covered reasons for
            canceling or interrupting your trip include these examples:
          </p>
          <ul className="mt-4 space-y-2.5">
            {PROTECTION_REASONS.map((reason) => (
              <li key={reason} className="flex gap-3 text-small leading-relaxed text-body">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-body" />
                {reason}
              </li>
            ))}
          </ul>
          <AddButton on={added.includes("protection")} onClick={() => toggle("protection")} />
        </div>
      </section>

      <section>
        <SectionHeading
          icon={<Image src="/images/icons/protect.svg" alt="" width={24} height={24} />}
          title="Additional services"
          trailing={<PerPerson />}
        />
        <div className="mt-5 space-y-5">
          {ADDITIONAL_SERVICES.map((service) => (
            <div key={service.title}>
              <h3 className="text-copy font-medium text-ink">{service.title}</h3>
              <p className="mt-1.5 text-small leading-relaxed text-body">{service.body}</p>
            </div>
          ))}
          <AddButton on={added.includes("services")} onClick={() => toggle("services")} />
        </div>
      </section>

      <section>
        <SectionHeading
          icon={<Image src="/images/icons/bell.svg" alt="" width={20} height={22} />}
          title="SMS Notification"
          trailing={<PerPerson />}
        />
        <div className="mt-5 space-y-5">
          {SMS_SERVICES.map((service) => (
            <div key={service.title}>
              <h3 className="text-copy font-medium text-ink">{service.title}</h3>
              <p className="mt-1.5 text-small leading-relaxed text-body">{service.body}</p>
            </div>
          ))}
          <AddButton on={added.includes("sms")} onClick={() => toggle("sms")} />
        </div>
      </section>

      <div className="flex justify-center gap-4">
        <Link
          href="/booking/details"
          className="flex h-[48px] w-[112px] items-center justify-center rounded-lg border border-line bg-white text-copy text-body transition-colors duration-200 hover:border-muted"
        >
          Back
        </Link>
        <Link
          href="/booking/payment"
          className="flex h-[48px] w-[112px] items-center justify-center rounded-lg bg-sky text-copy font-medium text-white transition-all duration-200 hover:bg-sky-hover active:translate-y-px"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

function PerPerson() {
  return (
    <p className="text-copy text-brand">
      $23 <span className="text-body">Per person</span>
    </p>
  );
}

function AddButton({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`mt-6 h-[44px] w-[110px] rounded-lg text-copy font-medium transition-all duration-200 active:translate-y-px ${ on ? "bg-sky-soft text-sky ring-1 ring-inset ring-sky" : "bg-sky text-white hover:bg-sky-hover" }`}
    >
      {on ? "Added" : "Add"}
    </button>
  );
}
