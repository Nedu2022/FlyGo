import { BarAction, DashPage } from "@/components/dashboard/shell";
import { Panel, PanelHeading, RevenueChart } from "@/components/dashboard/panels";
import { BookingsArea, OccupancyGauge } from "@/components/dashboard/charts";
import { StatTile } from "@/components/dashboard/stat-tile";
import { INSIGHT_TILES } from "@/lib/dashboard-data";

export default function InsightsPage() {
  return (
    <DashPage
      title="Occupancy Rate at a Glance"
      subtitle="Get a quick visual summary of how well your property is being utilized over time."
      actions={
        <>
          <BarAction label="Request Payout" />
          <BarAction label="Export Report" tone="brand" icon={false} />
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {INSIGHT_TILES.map((tile) => (
          <StatTile key={tile.label} {...tile} />
        ))}
      </div>

      <div className="mt-6">
        <Panel>
          <PanelHeading title="Bookings Over Time" />
          <BookingsArea height={300} />
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <RevenueChart title="Earnings Over Time" action={<span />} height={300} />
        <Panel>
          <PanelHeading title="Occupancy Rate" />
          <OccupancyGauge height={300} />
        </Panel>
      </div>
    </DashPage>
  );
}
