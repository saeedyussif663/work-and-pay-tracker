import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type CumulativePoint = {
  /** ISO year-month, e.g. "2026-07" */
  month: string;
  expected: number;
  actual: number;
};

const currency = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  maximumFractionDigits: 0,
});

const compactCurrency = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  notation: "compact",
  maximumFractionDigits: 1,
});

const monthLabel = new Intl.DateTimeFormat("en-GH", { month: "short" });

function formatMonth(iso: string) {
  const [year, month] = iso.split("-").map(Number);
  return monthLabel.format(new Date(year, month - 1, 1));
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: CumulativePoint }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  const delta = point.actual - point.expected;
  const ahead = delta >= 0;

  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 font-mono text-xs shadow-sm">
      <p className="font-semibold text-foreground">
        {formatMonth(point.month)}
      </p>
      <p className="mt-1 text-muted-foreground">
        Expected {currency.format(point.expected)}
      </p>
      <p className="text-success">Actual {currency.format(point.actual)}</p>
      <p
        className="mt-1 font-semibold"
        style={{ color: ahead ? "var(--success)" : "var(--primary)" }}
      >
        {ahead ? "+" : "−"}
        {currency.format(Math.abs(delta))} {ahead ? "ahead" : "behind"}
      </p>
    </div>
  );
}

interface ExpectedVsActualChartProps {
  data: CumulativePoint[];
}

export function ExpectedVsActualChart({ data }: ExpectedVsActualChartProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-base font-bold tracking-tightest text-foreground">
            Expected vs. Actual
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Cumulative collections across the whole portfolio
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-4 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 border-t-2 border-dashed border-foreground/40" />
            Expected
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-0.5 w-4"
              style={{ backgroundColor: "var(--success)" }}
            />
            Actual
          </span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-muted-foreground">Not enough data yet</p>
        </div>
      ) : (
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            >
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tickFormatter={formatMonth}
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => compactCurrency.format(v)}
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={false}
                tickLine={false}
                width={56}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="expected"
                stroke="var(--muted-foreground)"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="var(--success)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--success)", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
