"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, StepMarker } from "@/components/auth/auth-shell";
import { PasswordField, TextField } from "@/components/auth/fields";
import { GoogleButton, OrDivider, PrimaryButton } from "@/components/auth/buttons";

export default function SignUpDetailsPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    router.push("/signup/address");
  }

  return (
    <AuthShell
      backHref="/signup"
      topRight={<StepMarker step={1} label="Personal Info." />}
      title="Register Individual Account!"
      subtitle="For the purpose of industry regulation, your details are required."
    >
      <form onSubmit={handleSubmit} className="stagger flex flex-col gap-5">
        <TextField
          label="Your fullname"
          starred
          name="fullName"
          autoComplete="name"
          placeholder="Enter your full name"
          required
        />
        <TextField
          label="Email address"
          starred
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter email address"
          required
        />
        <PasswordField
          label="Create password"
          starred
          name="password"
          autoComplete="new-password"
          placeholder="Enter password"
          minLength={8}
          required
        />

        <PrimaryButton type="submit" pending={pending} className="mt-3">
          Next
        </PrimaryButton>

        <OrDivider />
        <GoogleButton />
      </form>
    </AuthShell>
  );
}
