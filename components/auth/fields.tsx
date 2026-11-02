"use client";

import { useId, type InputHTMLAttributes } from "react";

/** Tall, softly-bordered input; focus lifts a faint blue halo rather than a ring. */
const inputBase =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-copy text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted focus:border-sky focus:shadow-[0_0_0_4px_var(--color-sky-soft)]";

export const fieldLabel = "mb-1.5 block text-small font-medium text-ink";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  /** Marks the label with the design's trailing asterisk. */
  starred?: boolean;
  /** Inline validation message shown under the field. */
  error?: string;
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

export function TextField({ label, starred, error, className = "", ...props }: FieldProps) {
  const generatedId = useId();
  const id = props.id ?? generatedId;

  return (
    <div className={className}>
      <Label htmlFor={id} starred={starred}>
        {label}
      </Label>
      <input
        {...props}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputBase} ${error ? "border-red-500" : ""}`}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-small text-red-600">
          {error}
        </p>
      ) : null}
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
      className="inline-flex cursor-pointer select-none items-center gap-2.5 text-small text-body"
    >
      <span className="relative inline-flex h-[18px] w-[18px] items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[5px] border border-line transition-colors duration-200 checked:border-sky checked:bg-sky"
        />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute h-3 w-3 scale-50 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      {label}
    </label>
  );
}
