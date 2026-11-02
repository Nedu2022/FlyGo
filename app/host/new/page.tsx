"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Minus, Plus, X } from "lucide-react";
import { BookingShell, Panel } from "@/components/booking/booking-shell";
import { useAuth } from "@/components/auth/auth-context";
import { SelectField, TextField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";
import { AMENITIES, KINDS, saveListing, shrinkPhoto, type Listing } from "@/lib/listings";
import { money } from "@/lib/format";

const STEPS = ["Place", "Details", "Photos", "Price"] as const;
const MAX_PHOTOS = 8;

type Draft = Omit<Listing, "id" | "owner" | "createdAt">;

const EMPTY: Draft = {
  kind: "apartment",
  title: "",
  city: "",
  address: "",
  guests: 2,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  amenities: [],
  photos: [],
  description: "",
  price: 0,
  currency: "NGN",
};

/** Four short steps to list a place; it saves to the host's Hosting tab. */
export default function NewListingPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !user) router.replace("/signin?next=/host/new");
  }, [isLoading, user, router]);

  if (!user) return <div className="min-h-dvh" />;

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const next = () => {
    setError("");
    if (step === 1 && (!draft.title.trim() || !draft.city.trim() || !draft.address.trim())) return setError("Fill in all three fields.");
    if (step === 3 && draft.photos.length < 3) return setError("Add at least 3 photos.");
    if (step === 4) {
      if (!draft.price) return setError("Set a nightly price.");
      const ok = saveListing({ ...draft, id: crypto.randomUUID(), owner: user.email, createdAt: new Date().toISOString() });
      if (!ok) return setError("Couldn't save: try fewer photos.");
      return router.push("/account/hosting");
    }
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const addPhotos = async (files: FileList | null) => {
    if (!files) return;
    const room = MAX_PHOTOS - draft.photos.length;
    try {
      const shrunk = await Promise.all([...files].slice(0, room).map((f) => shrinkPhoto(f)));
      setDraft((d) => ({ ...d, photos: [...d.photos, ...shrunk] }));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const preview = (
    <div className="overflow-hidden rounded-2xl bg-white">
      <div className="relative aspect-[16/10] bg-shell">
        {draft.photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element -- local data URL
          <img src={draft.photos[0]} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-small text-label">Cover photo</span>
        )}
      </div>
      <div className="p-5">
        <p className="truncate text-copy font-semibold text-ink">{draft.title || "Your place"}</p>
        <p className="mt-0.5 text-tiny text-label">
          {draft.city || "City"} · {draft.guests} guests · {draft.bedrooms} bedroom{draft.bedrooms === 1 ? "" : "s"}
        </p>
        <p className="mt-3 text-small text-body">
          <span className="text-copy font-semibold text-ink">{draft.price ? money(draft.price, draft.currency) : "—"}</span> / night
        </p>
      </div>
    </div>
  );

  return (
    <BookingShell step={step} steps={STEPS} aside={preview}>
      {step === 1 ? (
        <Panel title="Your place">
          <div className="grid gap-4">
            <SelectField
              label="Type"
              options={[...KINDS]}
              value={draft.kind}
              onChange={(e) => set("kind", e.target.value as Draft["kind"])}
            />
            <TextField label="Title" placeholder="e.g. Bright 2-bed in Lekki Phase 1" value={draft.title} onChange={(e) => set("title", e.target.value)} maxLength={60} />
            <TextField label="City" placeholder="Lagos" value={draft.city} onChange={(e) => set("city", e.target.value)} />
            <TextField label="Address" placeholder="Shown to guests after booking" value={draft.address} onChange={(e) => set("address", e.target.value)} />
          </div>
        </Panel>
      ) : null}

      {step === 2 ? (
        <>
          <Panel title="Rooms">
            <div className="divide-y divide-line">
              <Counter label="Guests" value={draft.guests} min={1} onChange={(n) => set("guests", n)} />
              <Counter label="Bedrooms" value={draft.bedrooms} min={0} onChange={(n) => set("bedrooms", n)} />
              <Counter label="Beds" value={draft.beds} min={1} onChange={(n) => set("beds", n)} />
              <Counter label="Bathrooms" value={draft.bathrooms} min={1} onChange={(n) => set("bathrooms", n)} />
            </div>
          </Panel>
          <Panel title="Amenities">
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((a) => {
                const on = draft.amenities.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={on}
                    onClick={() => set("amenities", on ? draft.amenities.filter((x) => x !== a) : [...draft.amenities, a])}
                    className={`h-10 rounded-full px-4 text-small font-medium ${on ? "bg-ink text-white" : "bg-shell text-ink"}`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </Panel>
        </>
      ) : null}

      {step === 3 ? (
        <Panel title="Photos">
          <p className="-mt-3 mb-4 text-small text-label">At least 3. The first is the cover.</p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {draft.photos.map((src, i) => (
              <li key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-shell">
                {/* eslint-disable-next-line @next/next/no-img-element -- local data URL */}
                <img src={src} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  aria-label={`Remove photo ${i + 1}`}
                  onClick={() => set("photos", draft.photos.filter((_, j) => j !== i))}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink"
                >
                  <X size={14} strokeWidth={2.4} aria-hidden="true" />
                </button>
              </li>
            ))}
            {draft.photos.length < MAX_PHOTOS ? (
              <li>
                <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl bg-brand-soft text-small font-medium text-brand-hover">
                  <ImagePlus size={24} strokeWidth={1.9} aria-hidden="true" />
                  Add photos
                  <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} />
                </label>
              </li>
            ) : null}
          </ul>
        </Panel>
      ) : null}

      {step === 4 ? (
        <Panel title="Price and description">
          <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
            <SelectField
              label="Currency"
              options={[
                { value: "NGN", label: "NGN ₦" },
                { value: "USD", label: "USD $" },
              ]}
              value={draft.currency}
              onChange={(e) => set("currency", e.target.value as Draft["currency"])}
            />
            <TextField
              label="Price per night"
              inputMode="numeric"
              value={draft.price || ""}
              onChange={(e) => set("price", Number(e.target.value.replace(/\D/g, "")))}
            />
          </div>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-small font-medium text-ink">Description (optional)</span>
            <textarea
              rows={4}
              maxLength={500}
              value={draft.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="What guests will love about your place"
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-copy text-ink outline-none placeholder:text-muted focus:border-sky"
            />
          </label>
        </Panel>
      ) : null}

      {error ? (
        <p role="alert" className="text-small text-red-600">
          {error}
        </p>
      ) : null}

      <div className="flex gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="h-12 rounded-xl bg-white px-6 text-copy font-semibold text-ink"
          >
            Back
          </button>
        ) : null}
        <PrimaryButton type="button" onClick={next} className="flex-1 sm:max-w-[240px]">
          {step === 4 ? "Submit listing" : "Continue"}
        </PrimaryButton>
      </div>
    </BookingShell>
  );
}

function Counter({ label, value, min, onChange }: { label: string; value: number; min: number; onChange: (n: number) => void }) {
  const btn = "flex h-9 w-9 items-center justify-center rounded-full bg-shell text-ink disabled:opacity-40";
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-copy text-ink">{label}</span>
      <span className="flex items-center gap-3">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)} className={btn}>
          <Minus size={16} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <span className="w-5 text-center text-copy font-semibold text-ink" aria-live="polite">
          {value}
        </span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= 20} onClick={() => onChange(value + 1)} className={btn}>
          <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}

