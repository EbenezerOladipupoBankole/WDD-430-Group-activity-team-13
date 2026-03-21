import { SiteShell } from "@/components/site-shell";
import { SellerDashboard } from "./seller-dashboard";

export default function SellerDashboardPage() {
  return (
    <SiteShell currentPath="/seller-dashboard">
      <SellerDashboard />
    </SiteShell>
  );
}
