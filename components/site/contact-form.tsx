"use client";

import { useId, useState, type FormEvent } from "react";

/**
 * Underlined fields on an open white page — the design keeps the form as light
 * as possible so the page reads as an invitation, not a support ticket.
 */
export function ContactForm() {
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

  if (sent) {
    return (
      <p
        role="status"
        className="animate-rise rounded-lg bg-sky-tint px-6 py-8 text-center text-copy text-ink"
      >
        Thanks — your message is on its way. We&apos;ll be in touch within one working day.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="stagger">
      <div className="grid gap-8 md:grid-cols-3">
        <UnderlineField label="Your Name" name="name" autoComplete="name" required />
        <UnderlineField
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <UnderlineField
          label="Phone Number (optional)"
          name="phone"
          type="tel"
          autoComplete="tel"
        />
      </div>

      <div className="mt-10">
        <UnderlineField label="Message" name="message" multiline />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-10 inline-flex h-[46px] items-center justify-center rounded-md bg-brand px-6 text-copy font-medium text-white shadow-[0_2px_10px_rgba(245,134,52,0.35)] transition-colors duration-200 hover:bg-brand-hover active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Sending…" : "Leave us a message"}
      </button>
    </form>
  );
}

function UnderlineField({
  label,
  multiline = false,
  ...props
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const id = useId();
  const shared =
    "w-full border-0 border-b border-line bg-transparent pb-3 text-copy text-ink outline-none transition-colors duration-200 placeholder:text-muted focus:border-sky";

  return (
    <div>
      <label htmlFor={id} className="mb-3 block text-copy text-label">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} rows={4} {...props} className={`${shared} resize-y`} />
      ) : (
        <input id={id} {...props} className={shared} />
      )}
    </div>
  );
}
