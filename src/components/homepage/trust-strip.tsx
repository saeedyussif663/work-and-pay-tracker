import Chip from '../ui/chip';

export default function TrustStrip() {
  const items = [
    <>
      <b className="text-foreground">Once logged,</b> never edited
    </>,
    <>
      Time-stamped <b className="text-foreground">to the second</b>
    </>,
    <>
      Completion date <b className="text-foreground">updates itself</b>
    </>,
    <>
      Built for <b className="text-foreground">hundreds</b> of riders
    </>,
  ];

  return (
    <div className="group overflow-hidden border-y border-border py-5.5">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-3.5 px-5 group-hover:paused motion-reduce:animate-none sm:px-10">
        {[...items, ...items].map((item, i) => (
          <Chip key={i} className="shrink-0">
            {item}
          </Chip>
        ))}
      </div>
    </div>
  );
}
