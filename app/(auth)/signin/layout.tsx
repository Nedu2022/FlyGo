import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NO_INDEX } from "@/lib/seo";

export const metadata: Metadata = { title: "Sign in", ...NO_INDEX };

export default function SignInLayout({ children }: { children: ReactNode }) {
  return children;
}
