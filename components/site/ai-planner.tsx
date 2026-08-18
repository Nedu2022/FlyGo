"use client";

import Image from "next/image";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import {
  PLANNER_BUDGETS,
  PLANNER_INTERESTS,
  PLANNER_PARTY,
  PLANNER_STAY,
  PLANNER_TRIP_TYPES,
  PLANNER_WHEN,
} from "@/lib/flight-data";
import { PAGE } from "@/components/site/container";

/** Two-step questionnaire that feeds the AI suggestion engine. */
export function AiPlanner() {
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  function toggleInterest(value: string) {
    setInterests((list) =>
      list.includes(value) ? list.filter((x) => x !== value) : [...list, value],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setDone(true);
  }

  return (
    <section
      className={`reveal ${PAGE} grid items-start gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr]`}
    >
      <form onSubmit={handleSubmit} className="rounded-xl bg-white">
        <Progress step={step} onBack={() => setStep(1)} />

        <hr className="my-7 border-line" />

        {step === 1 ? (
          <div key="step1" className="animate-rise flex flex-col gap-6">
            <SelectField label="What's your budget?" name="budget" options={PLANNER_BUDGETS} />
            <SelectField
              label="What type of trip are you planning?"
              name="tripType"
              options={PLANNER_TRIP_TYPES}
            />
            <CountryField
              label="Where are you starting from? (Current Location)"
              name="origin"
              code="NIG"
              placeholder="Lagos"
            />
            <CountryField
              label="Any specific destination in mind?"
              name="destination"
              code="US"
              placeholder="Chicago"
            />
            <Submit>Next</Submit>
          </div>
        ) : (
          <div key="step2" className="animate-rise flex flex-col gap-6">
            <SelectField label="When are you traveling?" name="when" options={PLANNER_WHEN} />

            <fieldset>
              <legend className="mb-4 text-copy text-ink">What are you interested in?</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {PLANNER_INTERESTS.map((interest) => (
                  <Check
                    key={interest}
                    label={interest}
                    checked={interests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                  />
                ))}
              </div>
            </fieldset>

            <SelectField
              label="How many people are traveling?"
              name="party"
              options={PLANNER_PARTY}
            />
            <SelectField
              label="Preferred type of accommodation?"
              name="stay"
              options={PLANNER_STAY}
            />
            <Submit>Find My Perfect Trip</Submit>

            {done ? (
              <p role="status" className="animate-rise text-center text-copy text-sky">
                Building your itinerary — we&apos;ll email your matches shortly.
              </p>
            ) : null}
          </div>
        )}
      </form>

      <div className="flex flex-col items-center gap-6 lg:flex-row-reverse lg:items-start">
        <div className="text-center lg:text-right">
          <p className="text-small text-label">AI</p>
          <h2 className="mt-1 text-h1 font-bold leading-tight tracking-tight text-ink">
            Travel Smarter with AI-Powered Suggestions
          </h2>
          <p className="mt-4 text-copy leading-relaxed text-body">
            Get personalized recommendations based on your budget, location, and
            preferences—explore like never before!
          </p>
        </div>

        <Image
          src="/images/ai/robot.svg"
          alt=""
          width={656}
          height={656}
          sizes="(max-width: 1024px) 60vw, 420px"
          className="animate-float h-auto w-[250px] shrink-0 sm:w-[350px] lg:w-[420px]"
        />
      </div>
    </section>
  );
}

function Progress({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <Dot n={1} active onClick={step === 2 ? onBack : undefined} />
      <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-line">
        <span
          className="block h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </span>
      <Dot n={2} active={step === 2} />
    </div>
  );
}

function Dot({
  n,
  active,
  onClick,
}: {
  n: number;
  active: boolean;
  onClick?: () => void;
}) {
  const shared = `flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-small transition-colors duration-300 ${ active ? "bg-brand text-white" : "bg-line text-label" }`;

  return onClick ? (
    <button type="button" onClick={onClick} aria-label="Back to step 1" className={shared}>
      {n}
    </button>
  ) : (
    <span className={shared}>{n}</span>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-copy text-ink">
        {label}
      </label>
      <div className="relative flex h-[52px] items-center rounded-lg border border-line bg-white transition-colors duration-200 focus-within:border-sky">
        <select
          id={id}
          name={name}
          className="h-full w-full cursor-pointer appearance-none bg-transparent px-4 pr-10 text-copy text-ink outline-none"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="pointer-events-none absolute right-4 text-label">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

function CountryField({
  label,
  name,
  code,
  placeholder,
}: {
  label: string;
  name: string;
  code: string;
  placeholder: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-copy text-ink">
        {label}
      </label>
      <div className="flex h-[52px] items-center rounded-lg border border-line bg-white transition-colors duration-200 focus-within:border-sky">
        <span className="relative flex h-full shrink-0 items-center gap-1.5 pl-4 pr-3 text-copy text-ink">
          {code}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-label">
            <path d="m6 9 6 7 6-7Z" />
          </svg>
          <select
            aria-label={`${label} country`}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            <option>{code}</option>
            <option>UK</option>
            <option>US</option>
            <option>NIG</option>
          </select>
        </span>
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          className="h-full w-full min-w-0 bg-transparent pr-4 text-copy text-ink outline-none placeholder:text-muted"
        />
      </div>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 text-copy text-ink">
      <span className="relative inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer h-[22px] w-[22px] cursor-pointer appearance-none rounded-[4px] border border-line transition-colors duration-200 checked:border-brand checked:bg-brand"
        />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute h-3.5 w-3.5 scale-50 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      {label}
    </label>
  );
}

function Submit({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="mt-2 h-[52px] w-full rounded-md bg-brand text-copy text-white shadow-[0_2px_10px_rgba(245,134,52,0.35)] transition-colors duration-200 hover:bg-brand-hover active:translate-y-px"
    >
      {children}
    </button>
  );
}
