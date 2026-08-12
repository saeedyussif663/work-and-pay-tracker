export type PaymentActivity = {
  id: string;
  riderName: string;
  vehicleName: string;
  amount: number;
  paidAt: string;
};

const currency = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  maximumFractionDigits: 0,
});

const fullDate = new Intl.DateTimeFormat("en-GH", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function formatWhen(iso: string, now = Date.now()) {
  const then = new Date(iso).getTime();
  const diff = now - then;

  if (diff < MINUTE) return "Just now";
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}m ago`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}h ago`;
  if (diff < 7 * DAY) return `${Math.floor(diff / DAY)}d ago`;
  return fullDate.format(new Date(iso));
}

interface RecentActivityProps {
  data: PaymentActivity[];
}

export function RecentActivitySkeleton() {
  const rows = 4;

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="h-4 w-36 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-3 w-40 animate-pulse rounded bg-muted" />

      <ul className="mt-4 divide-y divide-border">
        {Array.from({ length: rows }).map((_, i) => (
          <li
            key={i}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-muted" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div
                className="h-3.5 w-28 animate-pulse rounded bg-muted"
                style={{ animationDelay: `${i * 60}ms` }}
              />
              <div
                className="h-3 w-40 animate-pulse rounded bg-muted"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            </div>
            <div className="shrink-0 space-y-1.5 text-right">
              <div
                className="ml-auto h-3.5 w-14 animate-pulse rounded bg-muted"
                style={{ animationDelay: `${i * 60}ms` }}
              />
              <div
                className="ml-auto h-3 w-10 animate-pulse rounded bg-muted"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RecentActivity({ data }: RecentActivityProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="font-heading text-base font-bold tracking-tightest text-foreground">
        Recent Activity
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Latest payments logged
      </p>

      {data.length === 0 ? (
        <div className="flex h-56 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No payments logged yet
          </p>
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {data.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-primary" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {entry.riderName}
                </p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {entry.vehicleName}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-mono text-sm font-semibold text-success">
                  {currency.format(entry.amount)}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {formatWhen(entry.paidAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
