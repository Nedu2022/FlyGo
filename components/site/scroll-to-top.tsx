"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/** Every route change smoothly returns the page to the top. */
export function ScrollToTop() {
  return (
    <Suspense fallback={null}>
      <RouteScrollReset />
    </Suspense>
  );
}

function RouteScrollReset() {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, search]);

  return null;
}
