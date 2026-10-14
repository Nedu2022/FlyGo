"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, StepMarker } from "@/components/auth/auth-shell";
import { PrimaryButton } from "@/components/auth/buttons";
import { getApiErrorMessage, useAuth } from "@/components/auth/auth-context";
import { api, type DocumentType, type UserDocument } from "@/lib/api";

const DOCUMENT_TYPES: DocumentType[] = [
  "PASSPORT",
  "NATIONAL_ID",
  "INTERNATIONAL_PASSPORT",
  "DRIVERS_LICENSE",
];

export function DocumentUpload() {
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user, logout } = useAuth();
  const [documentType, setDocumentType] = useState<DocumentType>("PASSPORT");
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [uploaded, setUploaded] = useState<UserDocument | null>(null);

  useEffect(() => {
    api.get<UserDocument[]>("/users/me/documents")
      .then(({ data }) => setDocuments(data))
      .catch((requestError) => setError(getApiErrorMessage(requestError, "Unable to load your documents.")));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Choose a document before continuing.");
      return;
    }

    setPending(true);
    setError("");
    const body = new FormData();
    body.append("file", file);

    try {
      const { data } = await api.post<UserDocument>("/users/me/documents", body, {
        params: { documentType },
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploaded(data);
      setDocuments((current) => [
        ...current.filter((document) => document.documentType !== data.documentType),
        data,
      ]);
      setFile(null);
      if (input.current) input.current.value = "";
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "We could not upload that document."));
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthShell
      topRight={<StepMarker step={3} label="Verification" />}
      title="Verify your identity"
      subtitle="Upload one document so we can finish setting up your FlyGo account."
      width="wide"
    >
      <div className="mx-auto grid max-w-[980px] gap-8 lg:grid-cols-[1fr_0.8fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-xl border border-line bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.06)] sm:p-8">
          <div>
            <label htmlFor="documentType" className="mb-2 block text-copy text-label">Document type</label>
            <select
              id="documentType"
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value as DocumentType)}
              className="h-[56px] w-full rounded-[10px] border border-line bg-white px-5 text-copy text-ink outline-none focus:border-sky focus:shadow-[0_0_0_4px_var(--color-sky-soft)]"
            >
              {DOCUMENT_TYPES.map((type) => <option key={type} value={type}>{type.replaceAll("_", " ")}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="documentFile" className="mb-2 block text-copy text-label">File</label>
            <input
              ref={input}
              id="documentFile"
              type="file"
              accept="image/*,.pdf"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="block w-full rounded-[10px] border border-dashed border-sky bg-sky-tint px-4 py-4 text-small text-body file:mr-4 file:rounded-md file:border-0 file:bg-sky file:px-4 file:py-2 file:font-medium file:text-white"
            />
          </div>

          <PrimaryButton type="submit" pending={pending}>Upload document</PrimaryButton>
          {error ? <p role="alert" className="text-small text-red-600">{error}</p> : null}
          {uploaded ? <p className="rounded-lg bg-green-50 px-4 py-3 text-small text-green-700">Uploaded successfully. Your document is pending review.</p> : null}
        </form>

        <aside className="rounded-xl bg-sky-tint p-6 sm:p-8">
          <h2 className="text-h3 font-semibold text-ink">Review status</h2>
          <p className="mt-2 text-copy leading-relaxed text-body">We will review your document before giving you access to bookings.</p>
          <ul className="mt-6 flex flex-col gap-3">
            {documents.length ? documents.map((document) => (
              <li key={document.id} className="rounded-lg bg-white px-4 py-3 text-small text-body">
                <span className="block font-semibold text-ink">{document.documentType.replaceAll("_", " ")}</span>
                <span>{document.documentStatus.replaceAll("_", " ")}</span>
              </li>
            )) : <li className="text-small text-muted">No documents uploaded yet.</li>}
          </ul>
          <button
            type="button"
            onClick={async () => { await logout(); router.replace("/login"); }}
            className="mt-8 text-small font-semibold text-sky transition-colors hover:text-sky-hover"
          >
            Sign out {user ? `of ${user.email}` : ""}
          </button>
        </aside>
      </div>
    </AuthShell>
  );
}
