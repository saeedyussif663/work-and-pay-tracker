import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-280 items-center justify-between gap-4 px-5 py-4.5 sm:px-10">
        <div className="flex items-center gap-1 font-mono text-[15px] font-semibold tracking-wide">
          <span className="text-primary">[</span>
          WORK / PAY
          <span className="text-primary">]</span>
        </div>

        <nav className="hidden gap-7 text-sm text-foreground/80 min-[860px]:flex">
          <a
            href="#how"
            className="border-b border-transparent py-1.5 hover:border-foreground"
          >
            How it works
          </a>
          <a
            href="#preview"
            className="border-b border-transparent py-1.5 hover:border-foreground"
          >
            Dashboard
          </a>
          <a
            href="#features"
            className="border-b border-transparent py-1.5 hover:border-foreground"
          >
            Features
          </a>
        </nav>
        <Button size="lg" asChild>
          <Link to="/signup">Get started</Link>
        </Button>
      </div>
    </header>
  );
}
