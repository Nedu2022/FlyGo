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
      topRight={<StepMarker step={3} label="Verify" />}
      title="Check your inbox"
      subtitle="Enter the 6-digit code we sent you."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-6">
        <div className="animate-rise">
          <p className="mb-3 text-small font-medium text-ink">Verification code</p>
          <OtpInput value={code} onChange={setCode} onComplete={verify} invalid={invalid} />
        </div>

        <PrimaryButton type="submit" pending={pending}>
          Verify
        </PrimaryButton>

        <div className="flex items-center justify-between gap-4 text-copy">
          <button
            type="button"
            onClick={() => setCooldown(RESEND_SECONDS)}
            disabled={cooldown > 0}
            className="font-medium text-brand transition-colors duration-200 disabled:cursor-not-allowed disabled:text-muted"
          >
            {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
          </button>
          <Link
            href="/forgot-password"
            className="text-ink transition-colors duration-200"
          >
            Change email or phone
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
