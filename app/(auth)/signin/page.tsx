"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell, StepMarker } from "@/components/auth/auth-shell";
import { Checkbox, PasswordField, PhoneOrEmailField } from "@/components/auth/fields";
import { GoogleButton, OrDivider, PrimaryButton } from "@/components/auth/buttons";
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
    <AuthShell
      topRight={<StepMarker step={1} label="Personal Info." />}
      title="Welcome Back!"
      subtitle="Sign in to manage your bookings and explore new destinations."
    >
      <form onSubmit={handleSubmit} className="stagger flex flex-col gap-5">
        <PhoneOrEmailField
          label="Email address / Phone Number"
          name="identifier"
          autoComplete="username"
          placeholder="Enter email address"
          required
        />

        <div>
          <PasswordField
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter password"
            required
          />
          <div className="mt-4 flex items-center justify-between gap-4">
            <Checkbox label="Remember me" checked={remember} onChange={setRemember} />
            <Link
              href="/forgot-password"
              className="text-copy text-brand transition-colors duration-200 hover:text-brand-hover"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <PrimaryButton type="submit" pending={pending} className="mt-2">
          Sign in
        </PrimaryButton>

        {error ? <p role="alert" className="-mt-2 text-small text-red-600">{error}</p> : null}

        <OrDivider />
        <GoogleButton label="Sign in with Google" />

        <p className="text-center text-copy text-body">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-brand transition-colors duration-200 hover:text-brand-hover"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
