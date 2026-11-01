"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { PhoneOrEmailField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    router.push("/verify");
  }

  return (
    <AuthShell
      backHref="/signin"
      title="Reset your password"
      subtitle="Enter your email or phone and we’ll send you a reset link."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-6">
        <PhoneOrEmailField
          label="Email or phone"
          name="identifier"
          autoComplete="username"
          placeholder="Enter email or phone number"
          className="animate-rise"
          required
        />

        <PrimaryButton type="submit" pending={pending}>
          Send reset link
        </PrimaryButton>

        <p className="text-center text-copy text-body">
          Remembered your password?{" "}
          <Link
            href="/signin"
            className="font-semibold text-brand transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
