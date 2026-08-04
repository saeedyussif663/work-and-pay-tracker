import { Button } from '../ui/button';

export default function CtaBand() {
  return (
    <div className="bg-foreground py-16 text-background">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-6 px-5 sm:px-10 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between">
        <div>
          <h2 className="max-w-[16ch] font-heading text-[26px] font-bold leading-tight tracking-tightest sm:text-[36px]">
            Stop arguing about who paid what.
          </h2>
          <p className="mt-2.5 max-w-[42ch] text-[15px] text-background/65">
            Every payment gets a timestamp and a permanent place in the record —
            from the first cedi to the last.
          </p>
        </div>
        <Button size="lg" className="w-fit">
          Get started
        </Button>
      </div>
    </div>
  );
}
