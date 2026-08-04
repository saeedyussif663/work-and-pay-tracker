export default function Footer() {
  return (
    <footer className="border-t border-background/10 bg-foreground pb-7 pt-12 text-background">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-10">
        <div className="flex flex-col gap-10 min-[700px]:flex-row min-[700px]:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-1 font-mono text-[15px] font-semibold tracking-wide">
              <span className="text-primary">[</span>
              WORK / PAY
              <span className="text-primary">]</span>
            </div>
            <p className="max-w-[32ch] text-sm text-background/60">
              A permanent record for every vehicle you finance and every rider
              paying it off.
            </p>
          </div>
          <div className="flex flex-wrap gap-14">
            <div>
              <h4 className="mb-3.5 font-mono text-[11px] uppercase tracking-widest text-background/50">
                Product
              </h4>
              <a
                href="#how"
                className="mb-2.5 block text-sm text-background/80 hover:text-background"
              >
                How it works
              </a>
              <a
                href="#preview"
                className="mb-2.5 block text-sm text-background/80 hover:text-background"
              >
                Dashboard
              </a>
              <a
                href="#features"
                className="mb-2.5 block text-sm text-background/80 hover:text-background"
              >
                Features
              </a>
            </div>
            <div>
              <h4 className="mb-3.5 font-mono text-[11px] uppercase tracking-widest text-background/50">
                Account
              </h4>
              <a
                href="#"
                className="mb-2.5 block text-sm text-background/80 hover:text-background"
              >
                Log in
              </a>
              <a
                href="#"
                className="mb-2.5 block text-sm text-background/80 hover:text-background"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-2.5 border-t border-background/10 pt-5 font-mono text-xs text-background/45">
          <span>© 2026 Work &amp; Pay Tracker</span>
          <span>Every entry, permanent.</span>
        </div>
      </div>
    </footer>
  );
}
