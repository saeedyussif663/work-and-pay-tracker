export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
      {/* <span className="inline-block h-2 w-2 rounded-sm bg-primary" /> */}
      {children}
    </div>
  );
}
