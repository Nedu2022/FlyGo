import { BarAction, DashPage, FilterButton } from "@/components/dashboard/shell";
import { RevenueChart, TopProperties } from "@/components/dashboard/panels";
import { StatTile } from "@/components/dashboard/stat-tile";
import { EARNINGS_TILES } from "@/lib/dashboard-data";

export default function EarningsPage() {
  return (
    <DashPage
      title="Your Earnings at a Glance"
      subtitle="Track your income, view transactions, and manage your payout settings effortlessly."
      actions={
        <>
          <BarAction label="Request Payout" />
          <BarAction label="Export Report" tone="brand" icon={false} />
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {EARNINGS_TILES.map((tile) => (
          <StatTile key={tile.label} {...tile} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <RevenueChart action={<FilterButton />} height={300} />
        <TopProperties />
      </div>
    </DashPage>
  );
}
