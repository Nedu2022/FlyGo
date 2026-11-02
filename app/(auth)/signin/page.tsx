"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { TextField } from "@/components/auth/fields";
import { OrDivider, PrimaryButton, SocialButtons } from "@/components/auth/buttons";

/**
 * One screen for signing in and signing up, as on Kayak: continue with Apple
 * or Google, or enter an email and we send a code. No passwords.
 */
export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }

    setBusy(true);
    router.push(`/signin/confirm?email=${encodeURIComponent(trimmed)}`);
  }

  return (
    <AuthShell heading="Sign in or create an account">
      <SocialButtons />

      <div className="my-6">
        <OrDivider label="or use your email" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          autoFocus
        />

        <PrimaryButton busy={busy}>Continue</PrimaryButton>

        <p className="text-center text-tiny text-label">
          By continuing you accept our{" "}
          <Link href="/about" className="underline underline-offset-2">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/about" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthShell>
  );
}
