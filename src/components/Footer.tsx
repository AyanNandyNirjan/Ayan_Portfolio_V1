const footerLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 border-t border-border bg-surface relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />

      <div className="container px-6 relative flex flex-col items-center text-center gap-8">
        {/* Oversized wordmark */}
        <a href="#" className="relative inline-flex flex-col items-center leading-none">
          <span className="absolute -top-2 -right-5 text-primary text-sm font-mono">»</span>
          <span className="font-display font-extrabold tracking-[0.02em] text-5xl sm:text-6xl text-foreground">
            AY<span className="text-primary">A</span>N
          </span>
          <span className="mt-3 h-1 w-16 bg-primary rounded-full" />
        </a>

        {/* Centered nav */}
        <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Copyright single line */}
        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
          <span className="text-primary">©</span> 2026 Ayan Nandy Nirjan · Dhaka, Bangladesh · V1.1
        </p>
      </div>
    </footer>
  );
};

export default Footer;
