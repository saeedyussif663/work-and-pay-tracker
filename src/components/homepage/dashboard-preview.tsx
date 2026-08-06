import { cn } from "@/lib/utils";
import Reveal from "../ui/reveal";
import SectionHead from "../ui/section-head";
import Tally from "../ui/tally";

export default function DashboardPreview() {
  return (
    <section id="preview" className="px-5 py-19 sm:px-10">
      <div className="mx-auto max-w-280">
        <SectionHead
          eyebrow="Dashboard preview"
          title="See exactly where every vehicle stands."
          description="One card per vehicle. No spreadsheet, no mental math — just the current state of the plan."
        />

        <Reveal>
          <div className="rounded-[20px] border border-border bg-card p-7 sm:p-10 ">
            <div className="max-w-115 rounded-2xl border border-border bg-background p-6">
              <div className="mb-4.5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[19px] font-bold">
                    TVS Bike — GT-4471-23
                  </h3>
                  <div className="mt-1 font-mono text-xs text-muted-foreground">
                    Rider: Kwame Mensah
                  </div>
                </div>
                <span className="whitespace-nowrap rounded-full bg-success/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-success">
                  On track
                </span>
              </div>

              <div className="mb-4.5 grid grid-cols-2 gap-x-5 gap-y-3.5">
                {[
                  ["Cost", "GHS 9,800", false],
                  ["Expected return", "GHS 13,200", false],
                  ["Paid to date", "GHS 8,140", true],
                  ["Remaining", "GHS 5,060", false],
                ].map(([label, value, green]) => (
                  <div key={label as string}>
                    <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                      {label}
                    </div>
                    <div
                      className={cn(
                        "font-mono text-[17px] font-semibold",
                        green && "text-success",
                      )}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  Completion
                </span>
                <span className="font-mono text-[15px] font-bold">62%</span>
              </div>
              <Tally filled={6} />

              <div className="mt-3.5 border-t border-dashed border-border pt-3 font-mono text-xs text-muted-foreground">
                Projected finish, at current pace:{" "}
                <b className="text-foreground">14 Nov 2026</b>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
