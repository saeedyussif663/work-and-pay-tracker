import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type MonthlyPayment = {
  /** ISO year-month, e.g. "2026-07" */
  month: string;
  total: number;
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

const monthLabel = new Intl.DateTimeFormat("en-GH", {
  month: "short",
});

function formatMonth(iso: string) {
  const [year, month] = iso.split("-").map(Number);
  return monthLabel.format(new Date(year, month - 1, 1));
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: MonthlyPayment }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 font-mono text-xs shadow-sm">
      <p className="font-semibold text-foreground">
        {formatMonth(point.month)}
      </p>
      <p className="mt-1 text-muted-foreground">
        {currency.format(point.total)}
      </p>
    </div>
  );
}

export function MonthlyPaymentsChartSkeleton() {
  const barHeights = [38, 62, 45, 80, 55, 70, 48, 90, 60, 40, 75, 52];

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-3 w-52 animate-pulse rounded bg-muted" />

      <div className="mt-4 flex h-56 items-end gap-2 border-b border-border pb-0">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="flex-1 animate-pulse rounded-t-sm bg-muted"
            style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

interface MonthlyPaymentsChartProps {
  data: MonthlyPayment[];
}

export function MonthlyPaymentsChart({ data }: MonthlyPaymentsChartProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="font-heading text-base font-bold tracking-tightest text-foreground">
        Payments Received
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Total collected per month
      </p>

      {data.length === 0 ? (
        <div className="flex h-56 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No payments logged yet
          </p>
        </div>
      ) : (
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
              barCategoryGap={16}
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
              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                content={<CustomTooltip />}
              />
              <Bar
                dataKey="total"
                fill="var(--success)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
