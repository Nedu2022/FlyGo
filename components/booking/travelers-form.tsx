"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { TRAVELER_NOTICE } from "@/lib/flight-data";

const MONTHS = [
  "Month", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function TravelersForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    router.push("/booking/services");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="rounded-md bg-sky-tint px-5 py-4 text-[14px] leading-relaxed text-ink">
        {TRAVELER_NOTICE}
      </p>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <Field label="Email address">
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            className={inputClass}
          />
        </Field>

        <Field label="Phone number">
          <div className="flex h-[52px] items-center rounded-lg border border-line bg-white transition-colors duration-200 focus-within:border-sky">
            <span className="flex shrink-0 items-center gap-2 border-r border-line px-4">
              <svg width="18" height="13" viewBox="0 0 22 15" aria-hidden="true">
                <rect width="22" height="15" rx="2" fill="#008751" />
                <rect x="7.3" width="7.4" height="15" fill="#ffffff" />
              </svg>
              <span className="text-[15px] text-label">234</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-label">
                <path d="m6 9 6 7 6-7Z" />
              </svg>
            </span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="234"
              className="h-full w-full bg-transparent px-4 text-[15px] text-ink outline-none placeholder:text-muted"
            />
          </div>
        </Field>

        <Field label="Given names">
          <input name="givenNames" required placeholder="Enter your name" className={inputClass} />
        </Field>

        <Field label="Surname">
          <input name="surname" required placeholder="Enter your syrname" className={inputClass} />
        </Field>

        {/* Nationality and gender share the left column, as in the design. */}
        <div className="grid grid-cols-[1.4fr_1fr] gap-4">
          <Field label="Nationality">
            <SelectBox name="nationality" options={["Nigeria", "Ghana", "Kenya", "India", "United Kingdom"]} flag />
          </Field>
          <Field label="Gender">
            <SelectBox name="gender" options={["Male", "Female", "Prefer not to say"]} />
          </Field>
        </div>

        <Field label="Date of birth">
          <DateTriplet name="dob" />
        </Field>

        <Field label="Passport number">
          <input name="passport" placeholder="Enter your ps no" className={inputClass} />
        </Field>

        <Field label="Passport expiration date">
          <DateTriplet name="passportExpiry" />
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-9 h-[52px] w-full max-w-[680px] rounded-lg bg-sky text-[16px] font-medium text-white transition-all duration-200 hover:bg-sky-hover active:translate-y-px disabled:opacity-70"
      >
        {pending ? "Saving…" : "Continue"}
      </button>
    </form>
  );
}

const inputClass =
  "h-[52px] w-full rounded-lg border border-line bg-white px-4 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-muted focus:border-sky";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[15px] text-ink">{label}</p>
      {children}
    </div>
  );
}

function SelectBox({
  name,
  options,
  flag = false,
}: {
  name: string;
  options: string[];
  flag?: boolean;
}) {
  const id = useId();
  return (
    <div className="relative flex h-[52px] items-center rounded-lg border border-line bg-white transition-colors duration-200 focus-within:border-sky">
      {flag ? (
        <svg width="18" height="13" viewBox="0 0 22 15" aria-hidden="true" className="ml-4 shrink-0">
          <rect width="22" height="15" rx="2" fill="#008751" />
          <rect x="7.3" width="7.4" height="15" fill="#ffffff" />
        </svg>
      ) : null}
      <label htmlFor={id} className="sr-only">
        {name}
      </label>
      <select
        id={id}
        name={name}
        className="h-full w-full cursor-pointer appearance-none bg-transparent px-3 pr-8 text-[15px] text-label outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="pointer-events-none absolute right-3 text-label">
        <path d="m6 9 6 7 6-7Z" />
      </svg>
    </div>
  );
}

function DateTriplet({ name }: { name: string }) {
  return (
    <div className="flex h-[52px] items-center rounded-lg border border-line bg-white transition-colors duration-200 focus-within:border-sky">
      <div className="relative flex h-full flex-1 items-center border-r border-line">
        <label htmlFor={`${name}-month`} className="sr-only">
          Month
        </label>
        <select
          id={`${name}-month`}
          name={`${name}Month`}
          className="h-full w-full cursor-pointer appearance-none bg-transparent px-4 pr-8 text-[15px] text-label outline-none"
        >
          {MONTHS.map((month) => (
            <option key={month}>{month}</option>
          ))}
        </select>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="pointer-events-none absolute right-3 text-label">
          <path d="m6 9 6 7 6-7Z" />
        </svg>
      </div>
      <input
        name={`${name}Day`}
        inputMode="numeric"
        maxLength={2}
        placeholder="DD"
        aria-label="Day"
        className="h-full w-full flex-1 border-r border-line bg-transparent px-4 text-[15px] text-ink outline-none placeholder:text-muted"
      />
      <input
        name={`${name}Year`}
        inputMode="numeric"
        maxLength={4}
        placeholder="YYYY"
        aria-label="Year"
        className="h-full w-full flex-1 bg-transparent px-4 text-[15px] text-ink outline-none placeholder:text-muted"
      />
    </div>
  );
}
