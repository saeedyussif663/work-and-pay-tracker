import Reveal from "../ui/reveal";
import SectionHead from "../ui/section-head";

const FEATURES = [
  {
    title: "Immutable ledger",
    body: "Every entry is permanent once logged. No edits, no deletions — just a record both sides can point to.",
  },
  {
    title: "Real-time tracking",
    body: "Paid, remaining, and completion percentage recalculate the moment a payment lands — not at month-end.",
  },
  {
    title: "Rider comparison",
    body: "See who's ahead and who's falling behind, side by side, across every vehicle you've financed.",
    soon: false,
  },
  {
    title: "Built to scale",
    body: "Search by rider or vehicle, paginated lists — built for hundreds of riders, not a handful in a notebook.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-5 py-19 sm:px-10">
      <div className="mx-auto max-w-280">
        <SectionHead
          eyebrow="What you get"
          title="Built around one job: no more disputes."
          description=""
        />
        <Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border min-[700px]:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-card p-7">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-[17px] font-bold">{f.title}</h3>
                  {f.soon && (
                    <span className="whitespace-nowrap rounded-full border border-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-primary">
                      Soon
                    </span>
                  )}
                </div>
                <p className="text-[14.5px] text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
