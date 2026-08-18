import { BarAction, DashPage } from "@/components/dashboard/shell";
import {
  MonthSummary,
  Notifications,
  QuickLinks,
  RevenueChart,
  TopProperties,
} from "@/components/dashboard/panels";
import { TodoList } from "@/components/dashboard/todo-list";
import { BookingSummary } from "@/components/dashboard/booking-summary";
import { HOST } from "@/lib/dashboard-data";

export default function DashboardPage() {
  return (
    <DashPage
      title={`Welcome Back, ${HOST.firstName}`}
      subtitle="Here's a quick look at your upcoming trips and account details."
      actions={<BarAction label="Add new post" />}
    >
      <div className="flex flex-col gap-6">
        <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
          <MonthSummary />
          <QuickLinks />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <RevenueChart />
          <Notifications />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <TopProperties />
          <TodoList />
        </div>

        <BookingSummary />
      </div>
    </DashPage>
  );
}
