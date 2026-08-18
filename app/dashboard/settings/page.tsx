"use client";

import { useState, type FormEvent } from "react";
import { BarAction, DashPage } from "@/components/dashboard/shell";
import { Checkbox } from "@/components/auth/fields";

const PROFILE_FIELDS = [
  { name: "fullName", label: "Full Name", placeholder: "Musfiq Rahman", type: "text" },
  { name: "email", label: "Email address", placeholder: "musfiq@flygo.com", type: "email" },
  { name: "phone", label: "Phone number", placeholder: "+234 909 123 4556", type: "tel" },
  { name: "country", label: "Country", placeholder: "Nigeria", type: "text" },
  { name: "role", label: "Role", placeholder: "Admin", type: "text" },
];

export default function SettingsPage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState({
    email: true,
    sms: false,
    payouts: true,
    marketing: false,
  });

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEditing(false);
    setSaved(true);
  }

  return (
    <DashPage
      title="Account Settings"
      subtitle="Update your preferences, change your password, or manage your notifications."
      actions={
        <>
          <BarAction label="Request Payout" />
          <BarAction label="Export Report" tone="brand" icon={false} />
        </>
      }
    >
      <section className="min-w-0 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:p-6">
        <h2 className="text-lead font-semibold text-ink">My Profile</h2>

        <form
          onSubmit={save}
          className="mt-5 rounded-xl border border-line p-5 sm:p-7"
        >
          <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
            <div className="flex flex-col items-center gap-3">
              <span className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-line text-display font-semibold text-label">
                MR
              </span>
              <button
                type="button"
                disabled={!editing}
                className="text-small text-sky transition-colors duration-200 hover:text-sky-hover disabled:cursor-not-allowed disabled:text-muted"
              >
                Change photo
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {PROFILE_FIELDS.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="sr-only">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    readOnly={!editing}
                    defaultValue={field.placeholder}
                    aria-label={field.label}
                    className={`h-[52px] w-full rounded-lg border px-4 text-copy outline-none transition-colors duration-200 ${ editing ? "border-line bg-white text-ink focus:border-sky" : "border-line bg-shell/50 text-body" }`}
                  />
                </div>
              ))}

              <div className="flex items-center justify-end gap-3">
                {saved && !editing ? (
                  <p role="status" className="animate-fade mr-auto text-small text-[#16a34a]">
                    Profile saved.
                  </p>
                ) : null}
                {editing ? (
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="h-[42px] rounded-lg border border-line px-6 text-copy text-body transition-colors hover:border-muted"
                  >
                    Cancel
                  </button>
                ) : null}
                <button
                  type={editing ? "submit" : "button"}
                  onClick={editing ? undefined : () => setEditing(true)}
                  className="h-[42px] rounded-lg bg-sky px-8 text-copy font-medium text-white transition-all duration-200 hover:bg-sky-hover active:translate-y-px"
                >
                  {editing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>

      <section className="mt-6 min-w-0 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:p-6">
        <h2 className="text-lead font-semibold text-ink">Account settings</h2>

        <div className="mt-5 rounded-xl border border-line p-5 sm:p-7">
          <h3 className="text-copy font-semibold text-ink">Notifications</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Checkbox
              label="Email me about bookings"
              checked={prefs.email}
              onChange={(v) => setPrefs((p) => ({ ...p, email: v }))}
            />
            <Checkbox
              label="Text me about bookings"
              checked={prefs.sms}
              onChange={(v) => setPrefs((p) => ({ ...p, sms: v }))}
            />
            <Checkbox
              label="Notify me on payouts"
              checked={prefs.payouts}
              onChange={(v) => setPrefs((p) => ({ ...p, payouts: v }))}
            />
            <Checkbox
              label="Product news and offers"
              checked={prefs.marketing}
              onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
            />
          </div>

          <hr className="my-7 border-line" />

          <h3 className="text-copy font-semibold text-ink">Security</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="h-[42px] rounded-lg border border-line px-5 text-copy text-body transition-colors duration-200 hover:border-sky hover:text-sky"
            >
              Change password
            </button>
            <button
              type="button"
              className="h-[42px] rounded-lg border border-line px-5 text-copy text-body transition-colors duration-200 hover:border-sky hover:text-sky"
            >
              Two-factor authentication
            </button>
            <button
              type="button"
              className="h-[42px] rounded-lg border border-red-200 px-5 text-copy text-red-500 transition-colors duration-200 hover:bg-red-50"
            >
              Delete account
            </button>
          </div>
        </div>
      </section>
    </DashPage>
  );
}
