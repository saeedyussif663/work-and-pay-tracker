import { DashboardCard } from '@/components/dashboard-card';

const stats = [
  { label: 'Total Invested', value: 0 },
  { label: 'Total Recouped', value: 0 },
  { label: 'Net Profit', value: 0 },
  { label: 'Outstanding', value: 0 },
];

export default function Dashboard() {
  return (
    <section>
      <div>
        <h1 className="text-[#333333] text-lg md:text-xl font-semibold">
          Dashboard
        </h1>
        <p>Get an overview of the performance of your investments</p>
      </div>

      <div className="mt-4 w-full flex items-center gap-6">
        {stats.map((stat, i) => (
          <DashboardCard key={i} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}
