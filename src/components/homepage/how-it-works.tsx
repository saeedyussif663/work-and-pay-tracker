import Reveal from "../ui/reveal";
import SectionHead from "../ui/section-head";

const STEPS = [
  {
    num: "01",
    title: "Add a vehicle & rider",
    body: "Enter the cost, the expected return, and the weekly installment. That's the plan — nothing to recalculate by hand later.",
  },
  {
    num: "02",
    title: "Log payments as they land",
    body: "Each payment is written to the record the moment it's received. It can be viewed forever, but never changed or removed.",
  },
  {
    num: "03",
    title: "Watch completion track itself",
    body: "Total paid, amount remaining, and the projected finish date recalculate live — based on actual pace, not the original guess.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-5 py-19 sm:px-10">
      <div className="mx-auto max-w-280">
        <SectionHead
          eyebrow="How it works"
          title="Three steps. Then it runs itself."
          description="Set the terms once when a rider takes a vehicle. From there, every figure on the page updates on its own as payments come in."
        />
        <div className="border-t border-border">
          {STEPS.map((step) => (
            <Reveal key={step.num}>
              <div className="grid grid-cols-[64px_1fr] gap-5 border-b border-border py-6 sm:grid-cols-[80px_1fr]">
                <div className="pt-0.5 font-mono text-[13px] text-primary">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-[19px] font-bold">{step.title}</h3>
                  <p className="mt-1.5 max-w-[56ch] text-[15px] text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
