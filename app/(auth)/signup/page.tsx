import Link from "next/link";
import { Briefcase, ChevronRight, UserRound } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { OrDivider, SocialButtons } from "@/components/auth/buttons";

const ACCOUNT_TYPES = [
  {
    href: "/signup/details",
    title: "Personal",
    body: "For your own trips",
    icon: UserRound,
  },
  {
    href: "/signup/details?type=business",
    title: "Business",
    body: "For companies and teams",
    icon: Briefcase,
  },
];

export const metadata = { title: "Join Flygo" };

export default function SignUpPage() {
  return (
    <AuthShell title="Create an account" subtitle="Book faster, save trips and get fare alerts.">
      <SocialButtons verb="Sign up" />

      <div className="my-6">
        <OrDivider label="or sign up with email as" />
      </div>

      <ul className="stagger flex flex-col gap-2.5">
        {ACCOUNT_TYPES.map(({ href, title, body, icon: Icon }) => (
          <li key={title}>
            <Link
              href={href}
              className="flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-copy font-semibold text-ink">{title}</span>
                <span className="block text-small text-body">{body}</span>
              </span>
              <ChevronRight size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-label" />
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-small text-body">
        Already have an account?{" "}
        <Link href="/signin" className="font-semibold text-brand">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
