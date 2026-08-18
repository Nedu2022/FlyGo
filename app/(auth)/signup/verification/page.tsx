"use client";

import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, StepMarker } from "@/components/auth/auth-shell";
import { PrimaryButton } from "@/components/auth/buttons";

const ACCEPTED = ".png,.pdf,.jpg,.jpeg,.docx";

export default function VerificationPage() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [pending, setPending] = useState(false);

  function accept(list: FileList | null) {
    if (!list?.length) return;
    setFiles(Array.from(list));
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    accept(event.dataTransfer.files);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/signup/success");
  }

  return (
    <AuthShell
      backHref="/signup/address"
      topRight={<StepMarker step={3} label="House Info" />}
      title="Verification"
      subtitle="Upload ID documents or business license."
      width="wide"
    >
      <form onSubmit={handleSubmit} className="mx-auto max-w-[1000px]">
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors duration-200 ${
            dragging ? "border-sky bg-sky-soft" : "border-sky/60 bg-sky-tint/60"
          }`}
        >
          <CloudUpload />

          <p className="mt-5 text-lead text-ink">png, pdf, jpg, docx accepted</p>

          <button
            type="button"
            onClick={() => input.current?.click()}
            className="mt-5 h-[46px] rounded-md bg-sky px-8 text-copy font-medium text-white transition-all duration-200 hover:bg-sky-hover active:translate-y-px"
          >
            Browse
          </button>

          <p className="mt-5 text-lead text-ink">select your file or drag and drop</p>

          <input
            ref={input}
            type="file"
            name="documents"
            multiple
            accept={ACCEPTED}
            onChange={(event) => accept(event.target.files)}
            className="sr-only"
          />

          {files.length > 0 ? (
            <ul className="animate-rise mt-6 flex w-full max-w-[520px] flex-col gap-2">
              {files.map((file) => (
                <li
                  key={file.name}
                  className="flex items-center gap-3 rounded-lg bg-white px-4 py-2.5 text-left text-small text-ink shadow-[0_1px_4px_rgba(16,24,40,0.08)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-sky)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 3.5h7l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" />
                    <path d="M13 3.5v5h5" />
                  </svg>
                  <span className="min-w-0 flex-1 truncate">{file.name}</span>
                  <span className="shrink-0 text-tiny text-muted">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => setFiles((list) => list.filter((f) => f !== file))}
                    className="shrink-0 rounded p-1 text-muted transition-colors hover:text-red-500"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                      <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mx-auto mt-9 max-w-[620px]">
          <PrimaryButton type="submit" pending={pending}>
            Next
          </PrimaryButton>
        </div>
      </form>
    </AuthShell>
  );
}

function CloudUpload() {
  return (
    <svg
      width="74"
      height="74"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-sky)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 18a4.5 4.5 0 0 1-.6-8.96 5.5 5.5 0 0 1 10.7-1.2A4.25 4.25 0 0 1 17.5 18" />
      <path d="M12 12.5V21M9 15l3-3 3 3" />
    </svg>
  );
}
