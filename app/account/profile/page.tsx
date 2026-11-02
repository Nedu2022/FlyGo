"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/auth/auth-context";
import { SelectField, TextField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";

const CURRENCIES = [
  { value: "USD", label: "USD ($) - US Dollar" },
  { value: "EUR", label: "EUR (€) - Euro" },
  { value: "GBP", label: "GBP (£) - British Pound" },
  { value: "NGN", label: "NGN (₦) - Nigerian Naira" },
  { value: "AED", label: "AED (د.إ) - UAE Dirham" },
  { value: "CAD", label: "CAD ($) - Canadian Dollar" },
];

/** Clean, straightforward personal profile & booking details. */
export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    updateProfile({
      fullName: String(f.get("fullName")).trim() || user.fullName,
      phone: String(f.get("phone")).trim() || undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-[640px]">
      <div className="mb-8">
        <h2 className="text-h2 font-bold tracking-tight text-ink">Personal Information</h2>
        <p className="mt-1 text-copy text-body">
          Update your details used to auto-fill bookings and travel itineraries.
        </p>
      </div>

      <form onSubmit={save} className="space-y-6">
        <div className="space-y-5">
          <TextField
            label="Full name"
            name="fullName"
            autoComplete="name"
            defaultValue={user.fullName}
            placeholder="Ada Lovelace"
            required
          />

          <TextField
            label="Email address"
            value={user.email}
            readOnly
            disabled
          />

          <TextField
            label="Phone number"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 123 4567 or +44 7911 123456"
            defaultValue={user.phone}
          />

          <SelectField
            label="Preferred currency"
            name="currency"
            options={CURRENCIES}
            defaultValue="USD"
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <PrimaryButton className="sm:w-auto sm:px-9">Save changes</PrimaryButton>
          {saved ? (
            <span className="text-small font-medium text-emerald-600 animate-fade">
              Saved
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
