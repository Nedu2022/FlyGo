"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Checkbox, PasswordField, PhoneOrEmailField } from "@/components/auth/fields";
import { OrDivider, PrimaryButton, SocialButtons } from "@/components/auth/buttons";
import { getApiErrorMessage, useAuth } from "@/components/auth/auth-context";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [remember, setRemember] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const user = await login(String(form.get("identifier")), String(form.get("password")));
      router.push(user.status === "DOCUMENTS_REQUIRED" ? "/onboarding/documents" : "/dashboard");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to sign in with those details."));
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to see your trips and bookings.">
      <SocialButtons />

      <div className="my-6">
        <OrDivider label="or sign in with email" />
      </div>

      <form onSubmit={handleSubmit} className="stagger flex flex-col gap-4">
        <PhoneOrEmailField
          label="Email or phone"
          name="identifier"
          autoComplete="username"
          placeholder="you@example.com"
          required
        />

        <div>
          <PasswordField
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            required
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <Checkbox label="Remember me" checked={remember} onChange={setRemember} />
            <Link href="/forgot-password" className="text-small font-medium text-brand">
              Forgot password?
            </Link>
          </div>
        </div>

        <PrimaryButton type="submit" pending={pending} className="mt-2">
          Sign in
        </PrimaryButton>

        {error ? <p role="alert" className="text-small text-red-600">{error}</p> : null}
      </form>

      <p className="mt-6 text-center text-small text-body">
        New to FLYGO?{" "}
        <Link href="/signup" className="font-semibold text-brand">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
