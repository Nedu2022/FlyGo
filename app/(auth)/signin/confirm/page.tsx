"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MailCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Checkbox } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";
import { OtpInput } from "@/components/auth/otp-input";
import { useAuth } from "@/components/auth/auth-context";

/**
 * Step two of passwordless sign-in: enter the emailed code. Returning users
 * go straight in; new emails get one short set-up screen. Profile details
 * (name, phone, documents) are added later from the account page.
 */
function Confirm() {
  const router = useRouter();
  const email = useSearchParams().get("email") ?? "";
  const { signIn, isKnownEmail } = useAuth();

  const [step, setStep] = useState<"code" | "setup">("code");
  const [code, setCode] = useState("");
  const [deals, setDeals] = useState(true);
  const [busy, setBusy] = useState(false);

  if (!email) {
    return (
      <AuthShell heading="Something went wrong" backHref="/signin">
        <p className="text-copy text-body">
          No email address was given.{" "}
          <Link href="/signin" className="font-semibold text-brand">
            Try again
          </Link>
        </p>
      </AuthShell>
    );
  }

  const verify = (value: string) => {
    if (value.length < 6) return;
    // No backend yet: any 6-digit code is accepted.
    if (isKnownEmail(email)) {
      signIn(email);
      router.push("/");
    } else {
      setStep("setup");
    }
  };

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    signIn(email);
    router.push("/");
  };

  if (step === "setup") {
    return (
      <AuthShell heading="Let’s get you set up" subtitle={`We’ll create an account for ${email}.`}>
        <form onSubmit={create} className="flex flex-col gap-5">
          <Checkbox label="Email me FLYGO’s best deals" checked={deals} onChange={setDeals} />
          <PrimaryButton busy={busy}>Create account</PrimaryButton>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell heading="Check your email" backHref="/signin">
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-3 rounded-2xl bg-shell p-4">
          <MailCheck size={22} strokeWidth={1.9} aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
          <p className="text-small text-body">
            We sent a 6-digit code to <span className="font-semibold text-ink">{email}</span>.
          </p>
        </div>

        <OtpInput value={code} onChange={setCode} onComplete={verify} />

        <PrimaryButton type="button" disabled={code.length < 6} onClick={() => verify(code)}>
          Continue
        </PrimaryButton>
      </div>
    </AuthShell>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense>
      <Confirm />
    </Suspense>
  );
}
