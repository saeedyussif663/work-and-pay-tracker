import {
  CalendarCheck2,
  Clock3,
  FileCheck2,
  Receipt,
  Users,
} from "lucide-react";

const cards = [
  {
    title: "Once logged, never edited",
    description:
      "Every work session is permanently recorded to keep payment history trustworthy.",
    icon: FileCheck2,
    wide: false,
    stamp: "LOGGED",
  },
  {
    title: "Time-stamped to the second",
    description:
      "Every record captures the exact date and time for complete accountability.",
    icon: Clock3,
    wide: false,
    stamp: "10:42",
  },
  {
    title: "Completion updates itself",
    description:
      "Jobs automatically move through their lifecycle as work is completed.",
    icon: CalendarCheck2,
    wide: false,
    stamp: "AUTO",
  },
  {
    title: "Built for hundreds of riders",
    description:
      "Track multiple vehicles, riders and jobs without messy spreadsheets.",
    icon: Users,
    wide: true,
    stamp: "RIDERS",
  },
  {
    title: "Know what you're owed",
    description:
      "See expected earnings, completed payments and outstanding balances at a glance.",
    icon: Receipt,
    wide: true,
    stamp: "PAY",
  },
];

function Illustration({
  icon: Icon,
  stamp,
}: {
  icon: React.ElementType;
  stamp: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-background">
      {/* graph paper */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* receipt */}
      <div className="absolute left-1/2 top-1/2 h-44 w-40 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card shadow-lg">
        <div className="border-b border-border p-4">
          <div className="h-2 w-20 rounded bg-border" />
          <div className="mt-2 h-2 w-28 rounded bg-border" />
        </div>

        <div className="space-y-3 p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2 flex-1 rounded bg-border" />
              <div className="flex gap-1">
                {[...Array(4)].map((_, j) => (
                  <span
                    key={j}
                    className="h-4 w-[2px] rounded-full bg-success"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* floating icon */}
      <div className="absolute left-1/2 top-1/2 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-border bg-card shadow-xl">
        <Icon className="h-8 w-8 text-primary" />
      </div>

      {/* stamp */}
      <div className="absolute right-6 top-6 rotate-[-18deg] rounded-md border border-primary px-3 py-1 font-mono text-[10px] tracking-[0.35em] text-primary">
        {stamp}
      </div>

      {/* decorative circles */}
      <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full border border-primary/15" />
      <div className="absolute -left-8 bottom-10 h-40 w-40 rounded-full border border-primary/10" />
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  stamp,
}: (typeof cards)[number]) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-16/10 border-b border-border bg-background p-5">
        <Illustration icon={icon} stamp={stamp} />
      </div>

      <div className="p-6">
        <h3 className="font-heading text-2xl font-semibold text-foreground">
          {title}
        </h3>

        <p className="mt-3 text-muted-foreground leading-7">{description}</p>
      </div>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-5 sm:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
            WHY WORK/PAY
          </p>

          <h2 className="mt-4 font-heading text-5xl font-bold tracking-tight text-foreground">
            Everything you need to keep work and payments accountable.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Built around permanent records, accurate timestamps and simple
            workflows so every completed job can be trusted.
          </p>
        </div>

        {/* top row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {cards.slice(0, 3).map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>

        {/* bottom row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {cards.slice(3).map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
