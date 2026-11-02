"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, LogOut, Plane } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { TextField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";
import { Avatar } from "@/components/ui/avatar";

const ICON = { size: 22, strokeWidth: 1.8, "aria-hidden": true } as const;

/** Empty state for a list the traveller hasn't started yet. */
function Empty({ icon, title, note, action }: { icon: ReactNode; title: string; note: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-shell px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand">{icon}</span>
      <p className="mt-4 text-h4 font-semibold text-ink">{title}</p>
      <p className="mt-1 text-small text-body">{note}</p>
      {action}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-3 text-h3 font-semibold tracking-tight text-ink">{title}</h2>
      {children}
    </section>
  );
}

/**
 * A traveller's account, as on the big travel sites: trips, saved places
 * and profile details. Name and phone are optional and added when needed.
 */
export function AccountView() {
  const router = useRouter();
  const { user, isLoading, updateProfile, logout } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/signin");
  }, [isLoading, user, router]);

  // Fill the form once the session has loaded.
  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- seed the form from the stored profile
    setName(user.fullName);
    setPhone(user.phone ?? "");
  }, [user]);

  if (!user) return <div className="min-h-[60vh]" />;

  const save = (e: FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName: name.trim() || user.fullName, phone: phone.trim() || undefined });
    setSaved(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col gap-10 py-8 sm:py-12">
      <div className="flex items-center gap-4">
        <Avatar name={user.fullName || user.email} size={56} />
        <div className="min-w-0">
          <h1 className="truncate text-h2 font-bold tracking-tight text-ink">Hi, {user.fullName}</h1>
          <p className="truncate text-small text-body">{user.email}</p>
        </div>
      </div>

      <Section id="trips" title="Trips">
        <Empty
          icon={<Plane {...ICON} />}
          title="No trips yet"
          note="Trips you book will show up here."
          action={
            <Link href="/flights" className="mt-5 rounded-full bg-brand px-5 py-2.5 text-small font-semibold text-white">
              Search flights
            </Link>
          }
        />
      </Section>

      <Section id="saved" title="Saved">
        <Empty icon={<Heart {...ICON} />} title="Nothing saved yet" note="Deals and stays you save will show up here." />
      </Section>

      <Section id="profile" title="Profile">
        <form onSubmit={save} className="flex flex-col gap-4">
          <TextField
            label="Full name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSaved(false);
            }}
          />
          <TextField
            label="Phone (optional)"
            type="tel"
            autoComplete="tel"
            placeholder="+234"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setSaved(false);
            }}
          />
          <div className="flex items-center gap-4">
            <PrimaryButton className="sm:w-auto sm:px-8">Save</PrimaryButton>
            {saved ? <p role="status" className="text-small text-body">Saved</p> : null}
          </div>
        </form>
      </Section>

      <button
        type="button"
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="inline-flex items-center gap-2 self-start text-copy font-semibold text-red-600"
      >
        <LogOut size={18} strokeWidth={2} aria-hidden="true" />
        Sign out
      </button>
    </div>
  );
}
