import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Reveal from "../ui/reveal";
import Tally from "../ui/tally";

export default function Hero() {
  return (
    <section className="px-5 pb-10 pt-14 sm:px-10 sm:pt-20">
      <div className="mx-auto grid max-w-280 items-center gap-10 min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:gap-14">
        <div>
          <h1 className="mt-4 font-heading text-[38px] font-bold leading-[1.02] tracking-tightest sm:text-[62px]">
            Every payment.
            <br />
            Logged. Permanent.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[17px] text-foreground/80">
            Track weekly installments on every bike you finance — without the
            notebook, the guesswork, or the argument over who paid what.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/signup">Get started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#preview">See a vehicle card ↓</a>
            </Button>
          </div>
        </div>

        <Reveal className="min-[900px]:ml-auto">
          <div className="relative lg:w-100 rounded-2xl border border-border bg-card px-6 pb-5.5 pt-6.5 before:absolute before:-left-2.75 before:top-1/2 before:h-5.5 before:w-5.5 before:-translate-y-1/2 before:rounded-full before:bg-background before:content-[''] after:absolute after:-right-2.75 after:top-1/2 after:h-5.5 after:w-5.5 after:-translate-y-1/2 after:rounded-full after:bg-background after:content-[''] lg:px-8 lg:pb-7 lg:pt-8 lg:before:-left-3.5 lg:before:h-7 lg:before:w-7 lg:after:-right-3.5 lg:after:h-7 lg:after:w-7">
            <div className="absolute -right-3.5 top-5 rotate-[-9deg] rounded-md border-2 border-primary bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-widest text-primary max-[420px]:right-1.5 max-[420px]:top-4 lg:-right-4 lg:top-7 lg:px-3 lg:py-1.5 lg:text-xs">
              LOGGED
            </div>

            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-wide text-muted-foreground lg:text-xs">
              <span>LOG #0842</span>
              <span>WEEKLY</span>
            </div>

            {[
              ["Rider", "K. Mensah", false],
              ["Vehicle", "GT-4471-23", false],
              ["Amount", "GHS 220.00", true],
              ["Time", "08 Aug, 09:14", false],
            ].map(([label, value, green]) => (
              <div
                key={label as string}
                className="flex justify-between border-b border-border py-2.5 font-mono text-[13px] last:border-b-0 lg:py-3.5 lg:text-[15px]"
              >
                <span className="text-muted-foreground">{label}</span>
                <span className={cn("font-semibold", green && "text-success")}>
                  {value}
                </span>
              </div>
            ))}

            <div className="my-4 border-t border-dashed border-border lg:my-5" />

            <Tally filled={6} />
            <div className="flex justify-between font-mono text-[11px] text-muted-foreground lg:text-xs">
              <span>62% paid</span>
              <span>GHS 5,060 left</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
