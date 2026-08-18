"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell, SecuritySeal } from "@/components/auth/auth-shell";
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
      title="Forgot Your Password?"
      subtitle="No worries! Enter your email or phone number, and we’ll send you a reset link."
      seal={<SecuritySeal />}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-6">
        <PhoneOrEmailField
          label="Email / Phone Number"
          name="identifier"
          autoComplete="username"
          placeholder="Enter email or phone number"
          className="animate-rise"
          required
        />

        <PrimaryButton type="submit" pending={pending}>
          Send Reset Link
        </PrimaryButton>

        <p className="text-center text-copy text-body">
          Remembered your password?{" "}
          <Link
            href="/signin"
            className="font-semibold text-brand transition-colors duration-200 hover:text-brand-hover"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
