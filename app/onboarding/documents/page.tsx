"use client";

import { DocumentUpload } from "@/components/auth/document-upload";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DocumentsPage() {
  return <ProtectedRoute><DocumentUpload /></ProtectedRoute>;
}
