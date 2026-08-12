import {
  DashboardCard,
  DashboardCardSkeleton,
} from "@/components/dashboard-card";
import {
  MonthlyPaymentsChart,
  type MonthlyPayment,
} from "@/components/monthly-payments-chart";
import {
  RecentActivity,
  type PaymentActivity,
} from "@/components/recent-activity";
import {
  RiderComparisonChart,
  type RiderStat,
} from "@/components/rider-comparison-chart";
import { getDashboardStats } from "@/lib/dashboard";
import { useQuery } from "@tanstack/react-query";

const DASHBOARD_CARD_COUNT = 4;

const riderStats: RiderStat[] = [
  {
    riderId: "1",
    riderName: "Kwame Mensah",
    totalExpectedReturn: 13200,
    totalPaid: 8140,
    completionPct: 62,
    status: "On track",
  },
  {
    riderId: "2",
    riderName: "Abena Owusu",
    totalExpectedReturn: 19000,
    totalPaid: 19000,
    completionPct: 100,
    status: "Completed",
  },
  {
    riderId: "3",
    riderName: "Yaw Boateng",
    totalExpectedReturn: 9500,
    totalPaid: 2100,
    completionPct: 22,
    status: "Behind",
  },
];

const monthlyPayments: MonthlyPayment[] = [
  { month: "2026-02", total: 3200 },
  { month: "2026-03", total: 4100 },
  { month: "2026-04", total: 3800 },
  { month: "2026-05", total: 5200 },
  { month: "2026-06", total: 4600 },
  { month: "2026-07", total: 5900 },
];

const recentActivity: PaymentActivity[] = [
  {
    id: "1",
    riderName: "Kwame Mensah",
    vehicleName: "TVS Bike — GT-4471-23",
    amount: 220,
    timestamp: "2026-08-06T09:14:00Z",
  },
  {
    id: "2",
    riderName: "Abena Owusu",
    vehicleName: "Bajaj Tricycle — GT-5678-23",
    amount: 350,
    timestamp: "2026-08-05T15:40:00Z",
  },
  {
    id: "3",
    riderName: "Yaw Boateng",
    vehicleName: "Honda Motorbike — GW-9012-24",
    amount: 150,
    timestamp: "2026-08-03T11:02:00Z",
  },
  {
    id: "4",
    riderName: "Kwame Mensah",
    vehicleName: "TVS Bike — GT-4471-23",
    amount: 220,
    timestamp: "2026-07-30T09:05:00Z",
  },
];

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-cards"],
    queryFn: getDashboardStats,
  });

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

      <div className="mt-6">
        <MonthlyPaymentsChart data={monthlyPayments} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RiderComparisonChart data={riderStats} />
        <RecentActivity data={recentActivity} />
      </div>
    </section>
  );
}
