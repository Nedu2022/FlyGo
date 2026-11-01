"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Checkbox, PasswordField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [remember, setRemember] = useState(false);
  const [pending, setPending] = useState(false);
  const [mismatch, setMismatch] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("password") !== data.get("confirmPassword")) {
      setMismatch(true);
      return;
    }

    setMismatch(false);
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    router.push("/password-reset-success");
  }

  return (
    <AuthShell
      backHref="/verify"
      title="Choose a new password"
      subtitle="Use at least 8 characters."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 pt-6">
        <PasswordField
          label="New password"
          name="password"
          autoComplete="new-password"
          placeholder="Enter password"
          minLength={8}
          required
        />
        <div>
          <PasswordField
            label="Confirm password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Enter password"
            minLength={8}
            required
          />
          {mismatch ? (
            <p role="alert" className="animate-rise mt-2 text-copy text-red-500">
              Those passwords don&apos;t match yet.
            </p>
          ) : null}
        </div>

        <Checkbox label="Remember me" checked={remember} onChange={setRemember} />

        <PrimaryButton type="submit" pending={pending} className="mt-4">
          Reset Password
        </PrimaryButton>

        <Link
          href="/signin"
          className="text-center text-copy font-medium text-brand transition-colors duration-200"
        >
          Back to Login
        </Link>
      </form>
    </AuthShell>
  );
}
