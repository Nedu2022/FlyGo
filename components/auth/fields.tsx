"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";

/** Tall, softly-bordered input; focus lifts a faint blue halo rather than a ring. */
const inputBase =
  "h-[56px] w-full rounded-[10px] border border-line bg-white px-5 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted hover:border-muted focus:border-sky focus:shadow-[0_0_0_4px_var(--color-sky-soft)]";

export const fieldLabel = "mb-2 block text-[16px] text-label";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  /** Marks the label with the design's trailing asterisk. */
  starred?: boolean;
};

function Label({
  htmlFor,
  children,
  starred,
}: {
  htmlFor: string;
  children: string;
  starred?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={fieldLabel}>
      {children}
      {starred ? <span aria-hidden="true">*</span> : null}
    </label>
  );
}

export function TextField({ label, starred, className = "", ...props }: FieldProps) {
  const generatedId = useId();
  const id = props.id ?? generatedId;

  return (
    <div className={className}>
      <Label htmlFor={id} starred={starred}>
        {label}
      </Label>
      <input {...props} id={id} className={inputBase} />
    </div>
  );
}

export function PasswordField({ label, starred, className = "", ...props }: FieldProps) {
  const generatedId = useId();
  const id = props.id ?? generatedId;
  const [visible, setVisible] = useState(false);

  return (
    <div className={className}>
      <Label htmlFor={id} starred={starred}>
        {label}
      </Label>
      <div className="relative">
        <input
          {...props}
          id={id}
          type={visible ? "text" : "password"}
          className={`${inputBase} pr-[86px]`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-controls={id}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded px-1 text-[15px] font-semibold text-ink transition-colors duration-200 hover:text-sky"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

/** Dial codes offered by the phone field, flag first so it reads at a glance. */
const DIAL_CODES = [
  { code: "+234", country: "Nigeria", flag: <FlagNG /> },
  { code: "+44", country: "United Kingdom", flag: <FlagGB /> },
  { code: "+1", country: "United States", flag: <FlagUS /> },
] as const;

/**
 * Email-or-phone field. Typing anything non-numeric hides the dial code, so a
 * single input serves both halves of "Email / Phone Number".
 */
export function PhoneOrEmailField({
  label,
  starred,
  className = "",
  ...props
}: FieldProps) {
  const generatedId = useId();
  const id = props.id ?? generatedId;
  const [dial, setDial] = useState<string>(DIAL_CODES[0].code);
  const [value, setValue] = useState("");

  // Blank counts as "phone" so the picker is there from the start.
  const isPhone = value === "" || /^[\d\s()+-]+$/.test(value);
  const selected = DIAL_CODES.find((entry) => entry.code === dial) ?? DIAL_CODES[0];

  return (
    <div className={className}>
      <Label htmlFor={id} starred={starred}>
        {label}
      </Label>
      <div className="flex h-[56px] items-center rounded-[10px] border border-line bg-white transition-[border-color,box-shadow] duration-200 focus-within:border-sky focus-within:shadow-[0_0_0_4px_var(--color-sky-soft)] hover:border-muted">
        {isPhone ? (
          <div className="relative flex h-full shrink-0 items-center gap-2 pl-5 pr-3">
            <span aria-hidden="true" className="flex">
              {selected.flag}
            </span>
            <span className="text-[16px] text-label">{dial}</span>
            <Chevron />
            <select
              aria-label="Country dialling code"
              value={dial}
              onChange={(event) => setDial(event.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0"
            >
              {DIAL_CODES.map((entry) => (
                <option key={entry.code} value={entry.code}>
                  {entry.country} ({entry.code})
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <input
          {...props}
          id={id}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            props.onChange?.(event);
          }}
          className={`h-full w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-muted ${
            isPhone ? "pr-5" : "px-5"
          }`}
        />
        {/* Carries the dial code to the server when the value is a number. */}
        {isPhone && value ? <input type="hidden" name="dialCode" value={dial} /> : null}
      </div>
    </div>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="inline-flex cursor-pointer select-none items-center gap-3 text-[16px] text-body"
    >
      <span className="relative inline-flex h-[22px] w-[22px] items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer h-[22px] w-[22px] cursor-pointer appearance-none rounded-[5px] border border-line transition-colors duration-200 checked:border-sky checked:bg-sky"
        />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute h-3.5 w-3.5 scale-50 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      {label}
    </label>
  );
}

function Chevron(): ReactNode {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-label"
    >
      <path d="m6 9 6 7 6-7Z" />
    </svg>
  );
}

function FlagNG() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15" aria-hidden="true">
      <rect width="22" height="15" rx="2" fill="#008751" />
      <rect x="7.3" width="7.4" height="15" fill="#ffffff" />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15" aria-hidden="true">
      <rect width="22" height="15" rx="2" fill="#012169" />
      <path d="M0 0 22 15M22 0 0 15" stroke="#ffffff" strokeWidth="3" />
      <path d="M0 0 22 15M22 0 0 15" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M11 0v15M0 7.5h22" stroke="#ffffff" strokeWidth="5" />
      <path d="M11 0v15M0 7.5h22" stroke="#C8102E" strokeWidth="3" />
    </svg>
  );
}

function FlagUS() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15" aria-hidden="true">
      <rect width="22" height="15" rx="2" fill="#ffffff" />
      {[0, 2, 4, 6].map((row) => (
        <rect key={row} y={row * 2.15} width="22" height="2.15" fill="#B22234" />
      ))}
      <rect width="10" height="8.6" fill="#3C3B6E" />
    </svg>
  );
}

/** Phone field with a fixed dial-code picker — no email fallback. */
export function PhoneField({ label, starred, className = "", ...props }: FieldProps) {
  const generatedId = useId();
  const id = props.id ?? generatedId;
  const [dial, setDial] = useState<string>(DIAL_CODES[0].code);
  const selected = DIAL_CODES.find((entry) => entry.code === dial) ?? DIAL_CODES[0];

  return (
    <div className={className}>
      <Label htmlFor={id} starred={starred}>
        {label}
      </Label>
      <div className="flex h-[56px] items-center rounded-[10px] border border-line bg-white transition-[border-color,box-shadow] duration-200 focus-within:border-sky focus-within:shadow-[0_0_0_4px_var(--color-sky-soft)] hover:border-muted">
        <div className="relative flex h-full shrink-0 items-center gap-2 pl-5 pr-3">
          <span aria-hidden="true" className="flex">
            {selected.flag}
          </span>
          <span className="text-[16px] text-label">{dial}</span>
          <Chevron />
          <select
            aria-label="Country dialling code"
            value={dial}
            onChange={(event) => setDial(event.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {DIAL_CODES.map((entry) => (
              <option key={entry.code} value={entry.code}>
                {entry.country} ({entry.code})
              </option>
            ))}
          </select>
        </div>
        <input
          {...props}
          id={id}
          type="tel"
          inputMode="tel"
          className="h-full w-full bg-transparent pr-5 text-[16px] text-ink outline-none placeholder:text-muted"
        />
        <input type="hidden" name="dialCode" value={dial} />
      </div>
    </div>
  );
}

const COUNTRIES = [
  { code: "NIG", label: "Nigeria", flag: <FlagNG /> },
  { code: "UK", label: "United Kingdom", flag: <FlagGB /> },
  { code: "US", label: "United States", flag: <FlagUS /> },
] as const;

/** Country picker showing the short code beside its flag. */
export function CountrySelect({
  label,
  name,
  className = "",
}: {
  label: string;
  name: string;
  className?: string;
}) {
  const id = useId();
  const [code, setCode] = useState<string>(COUNTRIES[0].code);
  const selected = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];

  return (
    <div className={className}>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <div className="relative flex h-[56px] items-center rounded-[10px] border border-line bg-white transition-[border-color,box-shadow] duration-200 focus-within:border-sky focus-within:shadow-[0_0_0_4px_var(--color-sky-soft)] hover:border-muted">
        <span className="pointer-events-none flex items-center gap-2.5 pl-5 text-[16px] text-ink">
          {selected.code}
          <span aria-hidden="true" className="flex">
            {selected.flag}
          </span>
        </span>
        <select
          id={id}
          name={name}
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="pointer-events-none absolute right-5 text-ink"
        >
          <path d="m6 9 6 7 6-7Z" />
        </svg>
      </div>
    </div>
  );
}
