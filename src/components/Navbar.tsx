import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

const Wordmark = ({ className = "" }: { className?: string }) => (
  <a href="#" className={`relative inline-flex flex-col items-start leading-none ${className}`}>
    <span className="font-display font-extrabold tracking-[0.02em] text-2xl sm:text-[28px] text-foreground">
      AY<span className="text-primary">A</span>N
    </span>
    <span className="mt-1 h-[3px] w-10 bg-primary rounded-full" />
    <span className="absolute -top-1 -right-3 text-primary text-[10px] font-mono">»</span>
  </a>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/80 border-b border-border/50" : ""
      }`}
    >
      <div className="container relative flex items-center justify-between h-20 px-6">
        <Wordmark />

        {/* Desktop center links */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-7 lg:gap-9">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full bg-primary transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Open
          </div>
          <a
            href="https://drive.google.com/file/d/1BCng1LYCQ0n6dQakpLAGBWGQv_bu7vLa/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-foreground bg-card/80 hover:bg-card border border-border hover:border-primary/50 px-5 py-2.5 rounded-full transition-all"
          >
            My Resume <ArrowUpRight className="w-4 h-4" />
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border px-6 pb-6"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors border-b border-border/30 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1MtklfkjKBFdCGxbSbPkxYhDfV3tquWsN/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-sm font-mono uppercase text-primary"
          >
            Resume ↗
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
