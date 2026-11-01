"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Every route change opens at the top of the page, instantly. */
export function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
