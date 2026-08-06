type DashboardCardProps = {
  label: string;
  value: number;
  format?: "currency" | "number";
};

function formatValue(value: number, format: "currency" | "number") {
  if (format === "currency") {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat("en-GH").format(value);
}

export function DashboardCard({
  label,
  value,
  format = "number",
}: DashboardCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 md:p-5">
      <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 font-mono text-xl font-semibold text-foreground md:text-2xl">
        {formatValue(value, format)}
      </p>
    </div>
  );
}
