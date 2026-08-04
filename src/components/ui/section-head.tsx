import Eyebrow from "./eyebrow";
import Reveal from "./reveal";

export default function SectionHead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Reveal className="mb-11 max-w-160">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3.5 font-heading text-[28px] font-bold leading-[1.08] tracking-tightest sm:text-[40px]">
        {title}
      </h2>
      <p className="mt-3.5 max-w-[52ch] text-[16px] text-muted-foreground">
        {description}
      </p>
    </Reveal>
  );
}
