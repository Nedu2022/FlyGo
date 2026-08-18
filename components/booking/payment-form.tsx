"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SectionHeading } from "@/components/booking/booking-shell";
import { PAYMENT_METHODS } from "@/lib/flight-data";

export function PaymentForm() {
  const router = useRouter();
  const [method, setMethod] = useState("card");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    // Stand-in for the real payment call.
    await new Promise((resolve) => setTimeout(resolve, 900));
    router.push("/booking/confirmed");
  }

  return (
    <form onSubmit={handleSubmit}>
      <SectionHeading
        icon={<Image src="/images/icons/money-bag.svg" alt="" width={24} height={24} />}
        title="Payment"
      />

      <div className="mt-6 flex flex-wrap gap-4">
        {PAYMENT_METHODS.map((option) => {
          const active = method === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setMethod(option.id)}
              aria-pressed={active}
              className={`relative flex h-[64px] min-w-[180px] flex-1 items-center gap-3 rounded-lg border px-5 text-copy transition-colors duration-200 ${ active ? "border-sky bg-sky-tint text-sky" : "border-line bg-white text-label hover:border-muted" }`}
            >
              <MethodMark id={option.id} />
              {option.label}
              {active ? (
                <span className="absolute right-4 flex h-5 w-5 items-center justify-center rounded-full bg-sky text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {method === "card" ? (
        <div className="animate-rise mt-8 grid max-w-[760px] gap-6 sm:grid-cols-2">
          <Field label="Card number" name="cardNumber" placeholder="0000 0000 0000" inputMode="numeric" />
          <Field label="Card name" name="cardName" placeholder="Enter card name" />
          <Field label="Expiry date" name="expiry" placeholder="DD/MM" />
          <Field label="cvc" name="cvc" placeholder="000" inputMode="numeric" maxLength={4} />
        </div>
      ) : (
        <p className="animate-rise mt-8 max-w-[760px] rounded-lg bg-sky-tint px-5 py-4 text-copy text-ink">
          You&apos;ll be redirected to {method === "flutterwave" ? "Flutterwave" : "Paystack"} to
          finish paying securely.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-9 h-[52px] w-full max-w-[760px] rounded-lg bg-sky text-copy font-medium text-white transition-all duration-200 hover:bg-sky-hover active:translate-y-px disabled:opacity-70"
      >
        {pending ? "Processing…" : "Continue"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  ...props
}: {
  label: string;
  name: string;
  placeholder?: string;
  inputMode?: "numeric";
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-copy text-ink">
        {label}
      </label>
      <input
        {...props}
        id={name}
        name={name}
        required
        className="h-[52px] w-full rounded-lg border border-line bg-white px-4 text-copy text-ink outline-none transition-colors duration-200 placeholder:text-muted focus:border-sky"
      />
    </div>
  );
}

function MethodMark({ id }: { id: string }) {
  if (id === "card") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
        <path d="M2.5 9.5h19" />
      </svg>
    );
  }
  if (id === "flutterwave") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-[#f5a623]">
        <path d="M4 6h6l10 12h-6L4 6Z" opacity="0.85" />
        <path d="M4 14h7l-3 4H4v-4Z" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-[#0ba4db]">
      <rect x="3" y="4" width="18" height="3.2" rx="1" />
      <rect x="3" y="9" width="18" height="3.2" rx="1" />
      <rect x="3" y="14" width="11" height="3.2" rx="1" />
    </svg>
  );
}
