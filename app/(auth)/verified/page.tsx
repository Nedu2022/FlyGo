import Image from "next/image";
import { AuthShell } from "@/components/auth/auth-shell";
import { PrimaryLink } from "@/components/auth/buttons";

export default function VerifiedPage() {
  return (
    <AuthShell
      icon={
        <Image
          src="/images/auth/success-check.svg"
          alt=""
          width={180}
          height={180}
          priority
          className="h-[170px] w-[170px] sm:h-[200px] sm:w-[200px]"
        />
      }
      title="Congratulations!"
      subtitle="Your account is verified. Your next trip is a few clicks away."
    >
      <div className="pt-10">
        <PrimaryLink href="/dashboard">Go to Dashboard</PrimaryLink>
      </div>
    </AuthShell>
  );
}
