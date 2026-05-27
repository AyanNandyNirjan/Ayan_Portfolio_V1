import { motion } from "framer-motion";
import { Plus, Sparkle } from "lucide-react";

const portrait =
  "https://res.cloudinary.com/dk46nqbdc/image/upload/v1779736102/ChatGPT_Image_May_26_2026_01_07_50_AM_wizffi.png";

const featuredWorks = [
  { name: "Travel Tribe", tag: "Travel Platform" },
  { name: "Hungry Fox", tag: "Food Ordering App" },
  { name: "ARF Security", tag: "Linux Encryption Tool" },
  { name: "ShopWave", tag: "E-Commerce Suite" },
  { name: "Unimatch", tag: "Student Network" },
];

const PlusIcon = () => (
  <div className="w-10 h-10 rounded-full border border-border bg-background/40 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/60 group-hover:rotate-90 transition-all duration-500">
    <Plus className="w-4 h-4" />
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden flex items-center">
      {/* Ambient glows */}
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-accent/10 blur-[140px] pointer-events-none" />

      <div className="container relative z-10 px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 auto-rows-auto"
        >
          {/* CARD 1 — Identity (big left) */}
          <a
            href="#about"
            className="group relative lg:col-span-7 lg:row-span-2 rounded-3xl bg-card/60 border border-border hover:border-primary/40 backdrop-blur-sm p-6 sm:p-8 overflow-hidden transition-colors min-h-[340px]"
          >
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 h-full">
              <div className="relative shrink-0 w-full sm:w-56 md:w-64 aspect-[4/5] rounded-2xl overflow-hidden bg-background">
                <img
                  src={portrait}
                  alt="Ayan Nandy Nirjan"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
                    Front-End Developer · Research Enthusiast · Technical PM
                  </p>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05] tracking-tight">
                    Ayan
                    <br />
                    Nandy
                    <br />
                    <span className="text-gradient">Nirjan</span>
                  </h1>
                  <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xs">
                    Front-end developer, research enthusiast, and technical project manager — building thoughtful interfaces and shipping ideas end-to-end.
                  </p>
                </div>
              </div>

              <div className="absolute bottom-5 right-5">
                <PlusIcon />
              </div>
            </div>
          </a>

          {/* CARD 2 — Featured works marquee strip */}
          <div className="lg:col-span-5 rounded-3xl bg-card/60 border border-border backdrop-blur-sm overflow-hidden h-14 sm:h-16 flex items-center">
            <div className="flex gap-10 animate-marquee whitespace-nowrap pl-6">
              {[...featuredWorks, ...featuredWorks].map((w, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-semibold text-foreground">{w.name}</span>
                  <span className="text-muted-foreground">{w.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 3 — Credentials */}
          <a
            href="#about"
            className="group relative lg:col-span-2-5 lg:col-span-3 rounded-3xl bg-card/60 border border-border hover:border-primary/40 backdrop-blur-sm p-6 overflow-hidden transition-colors min-h-[200px] flex flex-col justify-between"
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="font-display italic text-5xl text-foreground/80 -rotate-6 select-none">
                Ayan<span className="text-primary">.</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  More about me
                </p>
                <p className="text-base sm:text-lg font-bold text-foreground">Credentials</p>
              </div>
              <PlusIcon />
            </div>
          </a>

          {/* CARD 4 — Projects */}
          <a
            href="#projects"
            className="group relative lg:col-span-2 rounded-3xl bg-card/60 border border-border hover:border-primary/40 backdrop-blur-sm p-6 overflow-hidden transition-colors min-h-[200px] flex flex-col justify-between"
          >
            <div className="flex-1 flex items-center justify-center">
              {/* Mini browser/phone mock */}
              <div className="relative w-full max-w-[180px] flex items-end gap-2">
                <div className="flex-1 aspect-video rounded-md bg-background border border-border overflow-hidden">
                  <div className="h-2 bg-secondary/60 border-b border-border" />
                  <div className="p-1.5 space-y-1">
                    <div className="h-1 w-3/4 bg-primary/50 rounded" />
                    <div className="h-1 w-1/2 bg-muted-foreground/30 rounded" />
                    <div className="h-1 w-2/3 bg-muted-foreground/30 rounded" />
                  </div>
                </div>
                <div className="w-6 h-12 rounded-sm bg-background border border-border flex items-center justify-center">
                  <div className="w-3 h-8 bg-primary/30 rounded-sm" />
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  Showcase
                </p>
                <p className="text-base sm:text-lg font-bold text-foreground">Projects</p>
              </div>
              <PlusIcon />
            </div>
          </a>

          {/* CARD 5 — Stats trio */}
          <div className="lg:col-span-7 rounded-3xl bg-card/60 border border-border backdrop-blur-sm p-5 sm:p-6 min-h-[180px]">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 h-full">
              {[
                { v: "4.0", l: "Years\nExperience" },
                { v: "+10", l: "Technologies\nMastered" },
                { v: "+5", l: "Major\nProjects" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl bg-background/60 border border-border flex flex-col items-center justify-center text-center p-4 hover:border-primary/40 transition-colors"
                >
                  <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">{s.v}</p>
                  <p className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground whitespace-pre-line">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 6 — CTA */}
          <a
            href="#contact"
            className="group relative lg:col-span-5 rounded-3xl bg-card/60 border border-border hover:border-primary/40 backdrop-blur-sm p-6 sm:p-8 overflow-hidden transition-colors min-h-[180px] flex flex-col justify-between"
          >
            <Sparkle className="w-5 h-5 text-primary" />
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                Let's
                <br />
                work <span className="text-primary">together.</span>
              </h2>
              <PlusIcon />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
