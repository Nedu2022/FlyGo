"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/auth/auth-context";
import { TextField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";

/** Personal details, saved for faster checkout. All optional. */
export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    updateProfile({
      fullName: String(f.get("fullName")).trim() || user.fullName,
      phone: String(f.get("phone")).trim() || undefined,
    });
    setSaved(true);
  };

  return (
    <section>
      <h2 className="text-h3 font-semibold tracking-tight text-ink">Profile</h2>
      <p className="mt-1 text-small text-body">Used to fill in your bookings.</p>

      <form onSubmit={save} onChange={() => setSaved(false)} className="mt-5 grid max-w-[560px] gap-4">
        <TextField label="Full name" name="fullName" autoComplete="name" defaultValue={user.fullName} />
        <TextField label="Email" value={user.email} readOnly disabled />
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="+234" defaultValue={user.phone} />
        <div className="flex items-center gap-4">
          <PrimaryButton className="sm:w-auto sm:px-8">Save</PrimaryButton>
          {saved ? (
            <p role="status" className="text-small text-body">
              Saved
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
