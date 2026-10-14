"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/components/auth/auth-context";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (user?.status === "DOCUMENTS_REQUIRED" && pathname !== "/onboarding/documents") {
      router.replace("/onboarding/documents");
    }
  }, [isAuthenticated, isLoading, pathname, router, user?.status]);

  if (isLoading || !isAuthenticated) return <AuthLoading />;
  if (user?.status === "DOCUMENTS_REQUIRED" && pathname !== "/onboarding/documents") {
    return <AuthLoading />;
  }

  return <>{children}</>;
}

function AuthLoading() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-white text-copy text-muted">
      <span className="animate-pulse">Restoring your FlyGo session...</span>
    </main>
  );
}
