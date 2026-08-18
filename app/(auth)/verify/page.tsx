"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell, StepMarker } from "@/components/auth/auth-shell";
import { OtpInput } from "@/components/auth/otp-input";
import { PrimaryButton } from "@/components/auth/buttons";

const RESEND_SECONDS = 30;

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [pending, setPending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // The shake only replays if the flag drops back to false in between.
  useEffect(() => {
    if (!invalid) return;
    const timer = setTimeout(() => setInvalid(false), 500);
    return () => clearTimeout(timer);
  }, [invalid]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const verify = useCallback(
    async (value: string) => {
      if (value.length < 6) {
        setInvalid(true);
        return;
      }
      setPending(true);
      await new Promise((resolve) => setTimeout(resolve, 900));
      router.push("/reset-password");
    },
    [router],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void verify(code);
  }

  return (
    <AuthShell
      backHref="/forgot-password"
      topRight={<StepMarker step={3} label="House Info" />}
      title="Verify Your Identity"
      subtitle="We’ve sent a 6-digit code to your email/phone. Enter it below to proceed."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-6">
        <div className="animate-rise">
          <p className="mb-5 text-center text-lead text-ink">Enter OTP</p>
          <OtpInput value={code} onChange={setCode} onComplete={verify} invalid={invalid} />
        </div>

        <PrimaryButton type="submit" pending={pending}>
          Verify &amp; Continue
        </PrimaryButton>

        <div className="flex items-center justify-between gap-4 text-copy">
          <button
            type="button"
            onClick={() => setCooldown(RESEND_SECONDS)}
            disabled={cooldown > 0}
            className="font-medium text-brand transition-colors duration-200 hover:text-brand-hover disabled:cursor-not-allowed disabled:text-muted"
          >
            {cooldown > 0 ? `Resend Code in ${cooldown}s` : "Resend Code"}
          </button>
          <Link
            href="/forgot-password"
            className="text-ink transition-colors duration-200 hover:text-sky"
          >
            Change Email/Phone
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
