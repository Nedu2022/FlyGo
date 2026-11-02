"use client";

import { useId } from "react";
import { Camera, FileCheck2, Upload } from "lucide-react";

const MAX_MB = 10;

/** Tap-to-upload tile; shows the chosen file's name. `camera` opens the front camera on phones. */
export function FilePick({
  label,
  file,
  onPick,
  accept = "image/*,application/pdf",
  camera = false,
}: {
  label: string;
  file: File | null;
  onPick: (file: File | null, error?: string) => void;
  accept?: string;
  camera?: boolean;
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 ${file ? "bg-sky-soft" : "bg-shell"}`}
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ${file ? "text-sky" : "text-brand"}`}>
        {file ? (
          <FileCheck2 size={20} strokeWidth={1.9} aria-hidden="true" />
        ) : camera ? (
          <Camera size={20} strokeWidth={1.9} aria-hidden="true" />
        ) : (
          <Upload size={20} strokeWidth={1.9} aria-hidden="true" />
        )}
      </span>
      <span className="min-w-0">
        <span className="block text-small font-medium text-ink">{label}</span>
        <span className="block truncate text-tiny text-label">{file ? file.name : `JPG, PNG or PDF, up to ${MAX_MB} MB`}</span>
      </span>
      <input
        id={id}
        type="file"
        accept={accept}
        capture={camera ? "user" : undefined}
        className="sr-only"
        onChange={(e) => {
          const picked = e.target.files?.[0] ?? null;
          if (picked && picked.size > MAX_MB * 1024 * 1024) onPick(null, `That file is over ${MAX_MB} MB.`);
          else onPick(picked);
        }}
      />
    </label>
  );
}
