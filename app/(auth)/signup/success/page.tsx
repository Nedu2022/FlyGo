import Image from "next/image";
import { AuthShell } from "@/components/auth/auth-shell";
import { PrimaryLink } from "@/components/auth/buttons";

export const metadata = { title: "Account created — FLYGO Bookings" };

export default function SignUpSuccessPage() {
  return (
    <AuthShell
      icon={
        <Image
          src="/images/auth/success-check.svg"
          alt=""
          width={180}
          height={180}
          priority
          className="h-[160px] w-[160px] sm:h-[190px] sm:w-[190px]"
        />
      }
      title="You're all set"
      subtitle="Your FLYGO account is ready."
    >
      <div className="pt-6">
        <PrimaryLink href="/dashboard">Go to dashboard</PrimaryLink>
      </div>
    </AuthShell>
  );
}
