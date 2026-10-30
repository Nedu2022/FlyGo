"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, StepMarker } from "@/components/auth/auth-shell";
import { PasswordField, TextField } from "@/components/auth/fields";
import { GoogleButton, OrDivider, PrimaryButton } from "@/components/auth/buttons";
import { getApiErrorMessage, useAuth } from "@/components/auth/auth-context";

export default function SignUpDetailsPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const user = await signup(
        String(form.get("fullName")),
        String(form.get("email")),
        String(form.get("password")),
      );
      router.push(user.status === "DOCUMENTS_REQUIRED" ? "/onboarding/documents" : "/dashboard");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to create your account."));
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthShell
      backHref="/signup"
      topRight={<StepMarker step={1} label="Details" />}
      title="Your details"
    >
      <form onSubmit={handleSubmit} className="stagger flex flex-col gap-5">
        <TextField
          label="Full name"
          starred
          name="fullName"
          autoComplete="name"
          placeholder="Ada Okafor"
          required
        />
        <TextField
          label="Email address"
          starred
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
        <PasswordField
          label="Password"
          starred
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          minLength={8}
          required
        />

        <PrimaryButton type="submit" pending={pending} className="mt-3">
          Next
        </PrimaryButton>

        {error ? <p role="alert" className="-mt-2 text-small text-red-600">{error}</p> : null}

        <OrDivider />
        <GoogleButton />
      </form>
    </AuthShell>
  );
}
