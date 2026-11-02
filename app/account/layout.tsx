import { NO_INDEX } from "@/lib/seo";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PAGE } from "@/components/site/container";
import { AccountShell } from "@/components/account/account-shell";

export const metadata = {
  title: "Your account",
  ...NO_INDEX,
};

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className={PAGE}>
        <AccountShell>{children}</AccountShell>
      </main>
      <SiteFooter />
    </>
  );
}
