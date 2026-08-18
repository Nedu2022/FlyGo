import Image from "next/image";
import { AuthShell } from "@/components/auth/auth-shell";
import { PrimaryLink } from "@/components/auth/buttons";

export default function PasswordResetSuccessPage() {
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
      title="Password Reset Successful!"
      subtitle="You can now log in with your new password."
    >
      <div className="pt-10">
        <PrimaryLink href="/signin">Go to Login</PrimaryLink>
      </div>
    </AuthShell>
  );
}
