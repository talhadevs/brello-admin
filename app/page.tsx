import EarningsChart from "@/components/admin/dashboard/EarningsChart";
import SubscriptionsGauge from "@/components/admin/dashboard/SubscriptionsGauge";
import MiniStatCard, {
  type MiniStatCardProps,
} from "@/components/admin/dashboard/MiniStatCard";
import RecentActivities from "@/components/admin/dashboard/RecentActivities";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";

const MINI_STATS: MiniStatCardProps[] = [
  { label: "New Intakes", value: "1,038", period: "Jul 01 - Jul 10", theme: "rose", chart: "bars" },
  { label: "Active Members", value: "18,207", period: "This month", theme: "violet", chart: "area" },
  { label: "Refills Due", value: "312", period: "Next 7 days", theme: "sky", chart: "area" },
  { label: "States Live", value: "41 / 50", period: "Coverage", theme: "amber", chart: "bars" },
];

export default function Home() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back — here&apos;s what&apos;s happening at Brello today.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
        <SubscriptionsGauge />
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        {MINI_STATS.map((s, i) => (
          <MiniStatCard key={i} {...s} index={i} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentActivities />
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
