type DashboardCardProps = {
  label: string;
  value: number;
};

export function DashboardCard({ label, value }: DashboardCardProps) {
  return (
    <div className="rounded-md shadow-none border border-[#F5F5F5] p-4 flex-1">
      <p className="text-[#757575] font-medium">{label}</p>
      <p className="text-3xl font-semibold text-[#333333]">{value}</p>
    </div>
  );
}
