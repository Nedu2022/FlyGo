import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PAGE } from "@/components/site/container";
import { AccountView } from "@/components/account/account-view";

export const metadata = {
  title: "Your account — FLYGO Bookings",
};

export default function AccountPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className={PAGE}>
        <AccountView />
      </main>
      <SiteFooter />
    </>
  );
}
