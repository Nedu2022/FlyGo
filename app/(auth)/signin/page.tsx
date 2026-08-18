"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell, StepMarker } from "@/components/auth/auth-shell";
import { Checkbox, PasswordField, PhoneOrEmailField } from "@/components/auth/fields";
import { GoogleButton, OrDivider, PrimaryButton } from "@/components/auth/buttons";

export default function SignInPage() {
  const router = useRouter();
  const [remember, setRemember] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    // Stand-in for the real sign-in call.
    await new Promise((resolve) => setTimeout(resolve, 900));
    router.push("/dashboard");
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
