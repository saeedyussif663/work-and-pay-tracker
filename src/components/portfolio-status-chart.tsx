import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export type StatusBreakdown = {
  status: "On track" | "Behind" | "Completed";
  count: number;
};

const statusColor: Record<StatusBreakdown["status"], string> = {
  "On track": "var(--success)",
  Behind: "var(--primary)",
  Completed: "var(--muted-foreground)",
};

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: StatusBreakdown }[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 font-mono text-xs shadow-sm">
      <p className="font-semibold text-foreground">{item.status}</p>
      <p className="mt-1 text-muted-foreground">
        {item.count} vehicle{item.count === 1 ? "" : "s"}
      </p>
    </div>
  );
}

interface PortfolioStatusChartProps {
  data: StatusBreakdown[];
}

export function PortfolioStatusChart({ data }: PortfolioStatusChartProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="font-heading text-base font-bold tracking-tightest text-foreground">
        Portfolio Status
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Vehicles by current status
      </p>

      {total === 0 ? (
        <div className="flex h-56 items-center justify-center">
          <p className="text-sm text-muted-foreground">No vehicles yet</p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative h-44 w-44 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={54}
                  outerRadius={80}
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.map((entry) => (
                    <Cell key={entry.status} fill={statusColor[entry.status]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-2xl font-bold text-foreground">
                {total}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                Vehicles
              </span>
            </div>
          </div>

          <div className="w-full space-y-2.5 sm:flex-1">
            {data.map((item) => (
              <div key={item.status} className="flex items-center gap-2.5">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: statusColor[item.status] }}
                />
                <span className="flex-1 text-sm text-foreground">
                  {item.status}
                </span>
                <span className="font-mono text-sm font-semibold text-foreground">
                  {item.count}
                </span>
                <span className="w-10 text-right font-mono text-xs text-muted-foreground">
                  {total ? Math.round((item.count / total) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
