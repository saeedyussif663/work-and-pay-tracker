import { DashboardCard } from "@/components/dashboard-card";

const stats = [
  { label: "Total Vehicles", value: 0, format: "number" as const },
  { label: "Total Payments", value: 0, format: "currency" as const },
  { label: "Expected Return", value: 0, format: "currency" as const },
  { label: "Total Cost", value: 0, format: "currency" as const },
];

export default function Dashboard() {
  return (
    <section>
      <div>
        <h1 className="font-heading text-lg font-bold tracking-tightest text-foreground md:text-xl">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Get an overview of the performance of your investments
        </p>
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
        {stats.map((stat, i) => (
          <DashboardCard
            key={i}
            label={stat.label}
            value={stat.value}
            format={stat.format}
          />
        ))}
      </div>
    </section>
  );
}
