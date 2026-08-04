import { cn } from "@/lib/utils";

export default function Tally({
  filled,
  total = 10,
}: {
  filled: number;
  total?: number;
}) {
  return (
    <div className="mt-3.5 mb-1.5 flex gap-0.75">
      {Array.from({ length: total }).map((_, i) => (
        <i
          key={i}
          className={cn(
            "h-2.5 flex-1 rounded-xs",
            i < filled ? "bg-success" : "bg-border",
          )}
        />
      ))}
    </div>
  );
}
