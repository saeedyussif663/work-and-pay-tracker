import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type RiderStat = {
  riderId: string;
  riderName: string;
  totalExpectedReturn: number;
  totalPaid: number;
  completionPct: number;
  status: "On track" | "Behind" | "Completed";
};

const currency = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  maximumFractionDigits: 0,
});

const statusColor: Record<RiderStat["status"], string> = {
  "On track": "var(--success)",
  Behind: "var(--primary)",
  Completed: "var(--muted-foreground)",
};

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: RiderStat }[];
}) {
  if (!active || !payload?.length) return null;
  const rider = payload[0].payload;

  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 font-mono text-xs shadow-sm">
      <p className="font-semibold text-foreground">{rider.riderName}</p>
      <p className="mt-1 text-muted-foreground">
        {currency.format(rider.totalPaid)} /{" "}
        {currency.format(rider.totalExpectedReturn)}
      </p>
      <p className="text-muted-foreground">
        {rider.completionPct}% complete · {rider.status}
      </p>
    </div>
  );
}

interface RiderComparisonChartProps {
  data: RiderStat[];
}

export function RiderComparisonChart({ data }: RiderComparisonChartProps) {
  const sorted = [...data].sort((a, b) => a.completionPct - b.completionPct);
  const height = Math.max(sorted.length * 44, 160);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="font-heading text-base font-bold tracking-tightest text-foreground">
        Rider Comparison
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Completion rate by rider, lowest first
      </p>

      {sorted.length === 0 ? (
        <div className="flex h-40 items-center justify-center">
          <p className="text-sm text-muted-foreground">No rider data yet</p>
        </div>
      ) : (
        <div className="mt-4" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sorted}
              layout="vertical"
              margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
              barCategoryGap={12}
            >
              <CartesianGrid horizontal={false} stroke="var(--border)" />
              <XAxis
                type="number"
                domain={[0, 100]}
                unit="%"
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="riderName"
                width={110}
                tick={{
                  fill: "var(--foreground)",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                content={<CustomTooltip />}
              />
              <Bar dataKey="completionPct" radius={4} maxBarSize={20}>
                {sorted.map((entry) => (
                  <Cell key={entry.riderId} fill={statusColor[entry.status]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
