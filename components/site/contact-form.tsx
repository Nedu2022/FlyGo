"use client";

import { Check, ChevronDown } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

const TOPICS = [
  "An existing booking",
  "Private jet charter",
  "Changes and refunds",
  "Payments",
  "Partnerships",
  "Something else",
];

/** Contact form card: labelled fields, a topic dropdown and one clear action. The page supplies the heading. */
export function ContactForm({ topic }: { topic?: string }) {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    // Stand-in for the real contact endpoint.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setPending(false);
    setSent(true);
  }

  return (
    <div className="rounded-[28px] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_18px_40px_-24px_rgba(16,24,40,0.35)] ring-1 ring-line sm:p-8">
      {sent ? (
        <div role="status" className="animate-rise py-10 text-center">
          <span className="animate-badge-in mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Check size={26} strokeWidth={2.4} aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-h4 font-semibold text-ink">Message sent</h2>
          <p className="mx-auto mt-2 max-w-[360px] text-copy leading-relaxed text-body">
            Thanks for getting in touch. We&apos;ll reply within one working day.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" autoComplete="name" required />
            <Field label="Email address" name="email" type="email" autoComplete="email" required />
            <SelectField label="Topic" name="topic" options={TOPICS} defaultValue={topic} />
            <Field label="Booking reference (optional)" name="reference" placeholder="FG-48213" />
          </div>
          <div className="mt-4">
            <Field label="Message" name="message" multiline required placeholder="Tell us a little about what you need" />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-6 h-[52px] w-full rounded-xl bg-brand text-copy font-semibold text-white active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  multiline = false,
  ...props
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const id = useId();
  const shared =
    "w-full rounded-lg border border-line bg-white px-4 text-copy text-ink outline-none transition-colors duration-200 placeholder:text-muted focus:border-sky focus:ring-2 focus:ring-sky/20";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-small font-medium text-ink">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} rows={5} {...props} className={`${shared} resize-y py-3`} />
      ) : (
        <input id={id} {...props} className={`${shared} h-[48px]`} />
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-small font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue={defaultValue}
          className="h-[48px] w-full cursor-pointer appearance-none rounded-lg border border-line bg-white px-4 pr-10 text-copy text-ink outline-none transition-colors duration-200 focus:border-sky focus:ring-2 focus:ring-sky/20"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-label" />
      </div>
    </div>
  );
}
