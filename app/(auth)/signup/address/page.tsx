"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, StepMarker } from "@/components/auth/auth-shell";
import { CountrySelect, PhoneField, TextField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";

export default function SignUpAddressPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    router.push("/signup/verification");
  }

  return (
    <AuthShell
      backHref="/signup/details"
      topRight={<StepMarker step={2} label="House Info" />}
      title="Register Individual Account!"
      subtitle="For the purpose of industry regulation, your details are required."
      seal="Your Info is safely secured"
    >
      <form onSubmit={handleSubmit} className="stagger flex flex-col gap-5">
        <PhoneField label="Phone number" name="phone" placeholder="090912345567" required />
        <TextField
          label="Address"
          name="address"
          placeholder="Enter the house/Apartment/home/ hotel address"
          required
        />
        <CountrySelect label="Country" name="country" />

        <PrimaryButton type="submit" pending={pending} className="mt-3">
          Next
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}
