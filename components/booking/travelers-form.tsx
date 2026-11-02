"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Panel } from "@/components/booking/booking-shell";
import { useBooking, type Passenger } from "@/components/booking/booking-context";
import { useAuth } from "@/components/auth/auth-context";
import { SelectField, TextField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";

const TITLES = ["mr", "ms", "mrs", "miss", "dr"].map((t) => ({ value: t, label: t[0].toUpperCase() + t.slice(1) }));
const GENDERS = [
  { value: "m", label: "Male" },
  { value: "f", label: "Female" },
];
const COUNTRIES = [
  { value: "NG", label: "Nigeria" },
  { value: "GH", label: "Ghana" },
  { value: "KE", label: "Kenya" },
  { value: "ZA", label: "South Africa" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
];

/** The passenger fields Duffel needs to create an order. */
export function TravelersForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { offer, passenger, setPassenger } = useBooking();
  const [pending, setPending] = useState(false);
  const needsPassport = offer.passenger_identity_documents_required;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    const get = (key: string) => String(f.get(key) ?? "").trim();
    setPending(true);
    setPassenger({
      title: get("title") as Passenger["title"],
      given_name: get("given_name"),
      family_name: get("family_name"),
      gender: get("gender") as Passenger["gender"],
      born_on: get("born_on"),
      email: get("email"),
      phone_number: get("phone_number"),
      passport: needsPassport
        ? {
            unique_identifier: get("passport"),
            issuing_country_code: get("country"),
            expires_on: get("expires_on"),
          }
        : undefined,
    });
    router.push("/booking/services");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Panel title="Passenger 1 · Adult">
        <p className="-mt-3 mb-5 text-small text-label">Names must match the passport.</p>
        <div className="grid gap-4 sm:grid-cols-[120px_1fr_1fr]">
          <SelectField label="Title" name="title" options={TITLES} defaultValue={passenger?.title} />
          <TextField label="First name" name="given_name" required autoComplete="given-name" defaultValue={passenger?.given_name} />
          <TextField label="Last name" name="family_name" required autoComplete="family-name" defaultValue={passenger?.family_name} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField label="Date of birth" name="born_on" type="date" required defaultValue={passenger?.born_on} />
          <SelectField label="Gender" name="gender" options={GENDERS} defaultValue={passenger?.gender} />
        </div>
      </Panel>

      {needsPassport ? (
        <Panel title="Passport">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Passport number" name="passport" required defaultValue={passenger?.passport?.unique_identifier} />
            <SelectField label="Issuing country" name="country" options={COUNTRIES} defaultValue={passenger?.passport?.issuing_country_code} />
            <TextField label="Expiry date" name="expires_on" type="date" required defaultValue={passenger?.passport?.expires_on} />
          </div>
        </Panel>
      ) : null}

      <Panel title="Contact">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={passenger?.email ?? user?.email}
          />
          <TextField
            label="Phone"
            name="phone_number"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+234 801 234 5678"
            defaultValue={passenger?.phone_number ?? user?.phone}
          />
        </div>
      </Panel>

      <PrimaryButton pending={pending} className="sm:max-w-[240px]">
        Continue
      </PrimaryButton>
    </form>
  );
}
