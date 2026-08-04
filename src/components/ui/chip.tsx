import { cn } from '@/lib/utils';

export default function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={cn(
        'whitespace-nowrap rounded-full border border-border bg-card px-4 py-1 font-mono text-[12.5px] text-foreground/80',
        className,
      )}
    >
      {children}
    </span>
  );
}
