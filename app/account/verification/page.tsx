"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Building, ChevronDown, Fingerprint, IdCard, MapPin, Smartphone } from "lucide-react";
import { useAuth, type CheckStatus, type Verification } from "@/components/auth/auth-context";
import { SelectField, TextField } from "@/components/auth/fields";
import { PrimaryButton } from "@/components/auth/buttons";
import { OtpInput } from "@/components/auth/otp-input";
import { FilePick } from "@/components/account/file-pick";
import { VerifyIllustration } from "@/components/ui/illustrations";

const ICON = { size: 20, strokeWidth: 1.9, "aria-hidden": true } as const;

const ID_TYPES = [
  { value: "passport", label: "International passport" },
  { value: "nin", label: "National ID (NIN)" },
  { value: "drivers_licence", label: "Driver's licence" },
  { value: "voters_card", label: "Voter's card" },
];

const BANKS = ["Access Bank", "GTBank", "First Bank", "Zenith Bank", "UBA", "Kuda", "Opay", "Moniepoint"].map((b) => ({
  value: b,
  label: b,
}));

type Key = keyof Verification;

/**
 * KYC from the profile, not at sign-up: travellers verify phone, ID and a
 * selfie; hosts add an address and a payout account. Each check is one row
 * that opens its own short form.
 */
export default function VerificationPage() {
  const { user, updateProfile } = useAuth();
  const [open, setOpen] = useState<Key | null>(null);
  if (!user) return null;

  const v = user.verification ?? {};
  const save = <K extends Key>(key: K, value: Verification[K]) => {
    updateProfile({ verification: { ...v, [key]: value } });
    setOpen(null);
  };

  const traveller: Key[] = ["phone", "identity", "selfie"];
  const done = traveller.filter((k) => v[k]).length;

  const row = (key: Key, icon: ReactNode, title: string, note: string, form: ReactNode) => (
    <Check
      key={key}
      icon={icon}
      title={title}
      note={note}
      status={v[key]?.status}
      open={open === key}
      onToggle={() => setOpen(open === key ? null : key)}
    >
      {form}
    </Check>
  );

  return (
    <section>
      <div className="flex flex-col items-start gap-5 rounded-3xl bg-sky-soft p-5 sm:flex-row sm:items-center sm:p-7">
        <VerifyIllustration className="h-24 w-auto shrink-0 sm:h-28" />
        <div className="min-w-0 flex-1">
          <h2 className="text-h3 font-semibold tracking-tight text-ink">Verify your identity</h2>
          <p className="mt-1 text-small text-body">Needed for private jets, jet sharing and hosting.</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-white">
              <span className="block h-full rounded-full bg-sky transition-[width] duration-500" style={{ width: `${(done / 3) * 100}%` }} />
            </span>
            <span className="text-tiny font-semibold text-ink">{done} of 3</span>
          </div>
        </div>
      </div>

      <h3 className="mb-3 mt-8 text-small font-semibold uppercase tracking-[0.12em] text-label">Travellers</h3>
      <ul className="space-y-2">
        {row("phone", <Smartphone {...ICON} />, "Phone number", v.phone?.number ?? "We text you a code", (
          <PhoneForm initial={user.phone} onDone={(number) => save("phone", { number, status: "verified" })} />
        ))}
        {row("identity", <IdCard {...ICON} />, "ID document", v.identity ? labelFor(v.identity.type) : "Passport, NIN, driver's licence or voter's card", (
          <IdentityForm onDone={(value) => save("identity", value)} />
        ))}
        {row("selfie", <Fingerprint {...ICON} />, "Selfie", "Matched to your ID photo", (
          <SelfieForm onDone={(file) => save("selfie", { file, status: "pending" })} />
        ))}
      </ul>

      <h3 className="mb-3 mt-8 text-small font-semibold uppercase tracking-[0.12em] text-label">Hosts</h3>
      <ul className="space-y-2">
        {row("address", <MapPin {...ICON} />, "Home address", v.address ? `${v.address.city}, ${v.address.state}` : "With a utility bill or bank statement", (
          <AddressForm onDone={(value) => save("address", value)} />
        ))}
        {row("payout", <Building {...ICON} />, "Payout account", v.payout ? `${v.payout.bank} ·••${v.payout.accountNumber.slice(-4)}` : "Where we send your earnings", (
          <PayoutForm name={user.fullName} onDone={(value) => save("payout", value)} />
        ))}
      </ul>
    </section>
  );
}

const labelFor = (type: string) => ID_TYPES.find((t) => t.value === type)?.label ?? type;

function Check({
  icon,
  title,
  note,
  status,
  open,
  onToggle,
  children,
}: {
  icon: ReactNode;
  title: string;
  note: string;
  status?: CheckStatus;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <li className="rounded-2xl bg-shell">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-3 p-4 text-left">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand">{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-copy font-medium text-ink">{title}</span>
          <span className="block truncate text-tiny text-label">{note}</span>
        </span>
        <Status status={status} />
        <ChevronDown size={18} strokeWidth={2} aria-hidden="true" className={`shrink-0 text-label transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? <div className="animate-rise px-4 pb-5">{children}</div> : null}
    </li>
  );
}

function Status({ status }: { status?: CheckStatus }) {
  if (status === "verified") return <span className="rounded-full bg-sky px-2.5 py-1 text-tiny font-semibold text-white">Verified</span>;
  if (status === "pending") return <span className="rounded-full bg-brand-soft px-2.5 py-1 text-tiny font-semibold text-brand-hover">In review</span>;
  return <span className="rounded-full bg-white px-2.5 py-1 text-tiny font-medium text-label">To do</span>;
}

function PhoneForm({ initial, onDone }: { initial?: string; onDone: (number: string) => void }) {
  const [number, setNumber] = useState(initial ?? "");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");

  if (!sent) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="grid gap-4 sm:max-w-[420px]"
      >
        <TextField label="Phone number" type="tel" autoComplete="tel" placeholder="+234 801 234 5678" value={number} onChange={(e) => setNumber(e.target.value)} required minLength={10} />
        <PrimaryButton>Send code</PrimaryButton>
      </form>
    );
  }
  return (
    <div className="grid gap-4 sm:max-w-[420px]">
      <p className="text-small text-body">Enter the 6-digit code sent to {number}.</p>
      <OtpInput value={code} onChange={setCode} onComplete={() => onDone(number)} />
      <PrimaryButton type="button" disabled={code.length < 6} onClick={() => onDone(number)}>
        Verify
      </PrimaryButton>
    </div>
  );
}

function IdentityForm({ onDone }: { onDone: (value: NonNullable<Verification["identity"]>) => void }) {
  const [type, setType] = useState("passport");
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [error, setError] = useState("");
  const twoSided = type !== "passport";

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!front || (twoSided && !back)) return setError("Add a photo of each side.");
    const number = String(new FormData(e.currentTarget).get("number")).trim();
    onDone({ type, number, files: [front, back].filter(Boolean).map((f) => f!.name), status: "pending" });
  };

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <SelectField label="Document" options={ID_TYPES} value={type} onChange={(e) => setType(e.target.value)} />
      <TextField label="Document number" name="number" required />
      <FilePick label={twoSided ? "Front" : "Photo page"} file={front} onPick={(f, err) => (setFront(f), setError(err ?? ""))} />
      {twoSided ? <FilePick label="Back" file={back} onPick={(f, err) => (setBack(f), setError(err ?? ""))} /> : null}
      {error ? <p role="alert" className="text-small text-red-600 sm:col-span-2">{error}</p> : null}
      <PrimaryButton className="sm:col-span-2 sm:max-w-[220px]">Submit</PrimaryButton>
    </form>
  );
}

function SelfieForm({ onDone }: { onDone: (file: string) => void }) {
  const [photo, setPhoto] = useState<File | null>(null);
  return (
    <div className="grid gap-4 sm:max-w-[420px]">
      <p className="text-small text-body">Face the camera in good light, without glasses or a hat.</p>
      <FilePick label="Take a selfie" file={photo} onPick={setPhoto} accept="image/*" camera />
      <PrimaryButton type="button" disabled={!photo} onClick={() => photo && onDone(photo.name)}>
        Submit
      </PrimaryButton>
    </div>
  );
}

function AddressForm({ onDone }: { onDone: (value: NonNullable<Verification["address"]>) => void }) {
  const [proof, setProof] = useState<File | null>(null);
  const [error, setError] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!proof) return setError("Add a utility bill or bank statement from the last 3 months.");
        const f = new FormData(e.currentTarget);
        const get = (k: string) => String(f.get(k)).trim();
        onDone({ line: get("line"), city: get("city"), state: get("state"), proof: proof.name, status: "pending" });
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <TextField label="Street address" name="line" autoComplete="street-address" required className="sm:col-span-2" />
      <TextField label="City" name="city" autoComplete="address-level2" required />
      <TextField label="State" name="state" autoComplete="address-level1" required />
      <div className="sm:col-span-2">
        <FilePick label="Proof of address" file={proof} onPick={(f, err) => (setProof(f), setError(err ?? ""))} />
      </div>
      {error ? <p role="alert" className="text-small text-red-600 sm:col-span-2">{error}</p> : null}
      <PrimaryButton className="sm:col-span-2 sm:max-w-[220px]">Submit</PrimaryButton>
    </form>
  );
}

function PayoutForm({ name, onDone }: { name: string; onDone: (value: NonNullable<Verification["payout"]>) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const get = (k: string) => String(f.get(k)).trim();
        onDone({ bank: get("bank"), accountNumber: get("account"), accountName: get("accountName"), status: "pending" });
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <SelectField label="Bank" name="bank" options={BANKS} />
      <TextField label="Account number" name="account" inputMode="numeric" pattern="\d{10}" title="10-digit NUBAN" required />
      <TextField label="Account name" name="accountName" defaultValue={name} required className="sm:col-span-2" />
      <PrimaryButton className="sm:col-span-2 sm:max-w-[220px]">Save</PrimaryButton>
    </form>
  );
}
