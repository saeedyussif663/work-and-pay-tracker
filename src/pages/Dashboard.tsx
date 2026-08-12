import {
  DashboardCard,
  DashboardCardSkeleton,
} from "@/components/dashboard/dashboard-card";
import {
  MonthlyPaymentsChart,
  MonthlyPaymentsChartSkeleton,
} from "@/components/dashboard/monthly-payments-chart";
import {
  RecentActivity,
  RecentActivitySkeleton,
} from "@/components/dashboard/recent-activity";
import {
  RiderComparisonChart,
  RiderComparisonChartSkeleton,
} from "@/components/dashboard/rider-comparison-chart";
import {
  getDashboardStats,
  getMonthlyPayments,
  getRecentPayments,
  getRiderStats,
} from "@/lib/dashboard";
import { useQuery } from "@tanstack/react-query";

const DASHBOARD_CARD_COUNT = 4;

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-cards"],
    queryFn: getDashboardStats,
  });

  const { data: monthlyPayments, isLoading: isMonthlyPaymentsLoading } =
    useQuery({
      queryKey: ["monthly-payments"],
      queryFn: getMonthlyPayments,
    });

  const { data: riderStats, isLoading: isRiderStatsLoading } = useQuery({
    queryKey: ["rider-stats"],
    queryFn: getRiderStats,
  });

  const { data: recentActivity, isLoading: isRecentActivityLoading } = useQuery(
    {
      queryKey: ["recent-payments"],
      queryFn: getRecentPayments,
    },
  );

  return (
    <section className="pb-10">
      <div>
        <h1 className="font-heading text-lg font-bold tracking-tightest text-foreground md:text-xl">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Get an overview of the performance of your investments
        </p>
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
        {isLoading
          ? Array.from({ length: DASHBOARD_CARD_COUNT }).map((_, i) => (
              <DashboardCardSkeleton key={i} />
            ))
          : stats?.map((stat, i) => (
              <DashboardCard
                key={i}
                label={stat.label}
                value={stat.value}
                format={stat.format}
              />
            ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {isRecentActivityLoading ? (
          <RecentActivitySkeleton />
        ) : (
          <RecentActivity data={recentActivity || []} />
        )}
        {isMonthlyPaymentsLoading ? (
          <MonthlyPaymentsChartSkeleton />
        ) : (
          <MonthlyPaymentsChart data={monthlyPayments || []} />
        )}
      </div>

      <div className="mt-6">
        {isRiderStatsLoading ? (
          <RiderComparisonChartSkeleton />
        ) : (
          <RiderComparisonChart data={riderStats?.data || []} />
        )}{" "}
      </div>
    </section>
  );
}
