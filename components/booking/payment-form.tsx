"use client";

import { Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { TextField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";
import { Panel } from "@/components/booking/booking-shell";

/** Card details, shared by flight and stay checkout. */
export function PaymentForm({ amount, onPaid }: { amount: string; onPaid: () => void }) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    // Stand-in for the payment provider.
    await new Promise((resolve) => setTimeout(resolve, 900));
    onPaid();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Panel title="Pay by card">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Card number"
            name="cardNumber"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            required
            className="sm:col-span-2"
          />
          <TextField label="Name on card" name="cardName" autoComplete="cc-name" required className="sm:col-span-2" />
          <TextField label="Expiry" name="expiry" autoComplete="cc-exp" placeholder="MM/YY" required />
          <TextField label="CVC" name="cvc" inputMode="numeric" autoComplete="cc-csc" maxLength={4} placeholder="123" required />
        </div>
        <p className="mt-4 flex items-center gap-2 text-tiny text-label">
          <Lock size={14} strokeWidth={2} aria-hidden="true" />
          Encrypted and processed securely
        </p>
      </Panel>

      <PrimaryButton pending={pending} className="sm:max-w-[280px]">
        Pay {amount}
      </PrimaryButton>
    </form>
  );
}
