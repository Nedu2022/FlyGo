import { DashboardShell } from "@/components/dashboard/shell";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return <ProtectedRoute><DashboardShell>{children}</DashboardShell></ProtectedRoute>;
}
