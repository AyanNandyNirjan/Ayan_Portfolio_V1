import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Plus, Sparkle } from "lucide-react";

const volunteering: { year: string; title: string; org: string; link?: string }[] = [
  {
    year: "Aug 2023 - Aug 2024",
    title: "Head of Online Moderation",
    org: "DIU Photographic Society (DIUPS)",
    link: "https://drive.google.com/file/d/1xEAeSfYnQudBKA4kiB6AcJ7WjkvFTLvG/view?usp=drive_link",
  },
  {
    year: "Nov 2022 - Nov 2023",
    title: "General Member",
    org: "Cyber Security Club, DIU",
  },
  {
    year: "Jan 2019 - Ongoing",
    title: "Active Member",
    org: "BDCyclist",
  },
];

const education = [
  {
    year: "2022 - 2026",
    title: "B.Sc. in Computer Science & Engineering",
    org: "Daffodil International University",
    note: "CGPA: 3.70 / 4.00",
  },
  {
    year: "2019 - 2020",
    title: "Higher Secondary Certificate (HSC)",
    org: "BCIC College, Dhaka",
    note: "GPA: 5.00 / 5.00",
  },
  {
    year: "2008 - 2018",
    title: "Secondary School Certificate (SSC)",
    org: "Dhanmondi Govt. Boys' High School",
    note: "GPA: 5.00 / 5.00",
  },
];

const PlusIcon = () => (
  <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground">
    <Plus className="w-3.5 h-3.5" />
  </span>
);

const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="container px-4 sm:px-6">
        {/* SELF-SUMMARY header with sparkle decorations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 sm:gap-8 mb-10 sm:mb-14"
        >
          <Sparkle className="w-7 h-7 sm:w-10 sm:h-10 text-foreground rotate-12" strokeWidth={1.2} />
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-center">
            Self-Summary
          </h2>
          <Sparkle className="w-7 h-7 sm:w-10 sm:h-10 text-foreground -rotate-12" strokeWidth={1.2} />
        </motion.div>

        {/* Top row: portrait + bio */}
        <div className="grid lg:grid-cols-12 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bento-card p-4 sm:p-5"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-background">
              <img
                src="https://res.cloudinary.com/dk46nqbdc/image/upload/v1779736102/ChatGPT_Image_May_26_2026_01_07_50_AM_wizffi.png"
                alt="Ayan Nandy Nirjan"
                className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="lg:col-span-8 bento-card bento-card-glow p-6 sm:p-10 relative flex flex-col justify-between"
          >
            <Sparkle className="absolute top-6 left-6 w-6 h-6 text-foreground/70" strokeWidth={1.2} />
            <div>
              <div className="flex flex-wrap gap-2 mt-6 mb-4">
                {["Front-End Developer", "Research Enthusiast", "Technical PM"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-border text-muted-foreground bg-background/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ayan Nandy Nirjan
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mb-3">
                I'm a <span className="text-foreground font-medium">front-end developer, research enthusiast, and technical project manager</span>. Computer Science &amp; Engineering graduate from Daffodil International University, comfortable across React, Next.js, Python, and Linux-based tooling, with a strong eye for clean architecture and user experience.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mb-5">
                I enjoy turning research and ideas into shipped products — coordinating people, scoping the work, and building the interface myself. Open to roles in <span className="text-foreground font-medium">front-end engineering, applied research, and technical project management</span>.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Python", "Linux", "Git", "Tailwind CSS", "Project Management"].map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-foreground/90 border border-border"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Volunteering + Education */}
        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          <motion.div
            id="volunteering"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card p-6 sm:p-8"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-foreground/90 mb-6">
              Volunteering
            </p>
            <div className="space-y-5">
              {volunteering.map((v, i) => (
                <div key={i}>
                  <p className="text-xs text-muted-foreground mb-1">{v.year}</p>
                  <h4 className="text-sm sm:text-base font-bold tracking-tight">{v.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground/80">{v.org}</p>
                  {v.link && (
                    <a
                      href={v.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            id="education"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="bento-card p-6 sm:p-8"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-foreground/90 mb-6">
              Education
            </p>
            <div className="space-y-5">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="text-xs text-muted-foreground mb-1">{e.year}</p>
                  <h4 className="text-sm sm:text-base font-bold tracking-tight">{e.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground/80">
                    {e.org}
                    {e.note ? <span className="text-primary/80"> — {e.note}</span> : null}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom row: 3 utility cards */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* Profiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 bento-card p-6 sm:p-8 flex flex-col gap-6"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">Stay With Me</p>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight">Profiles & Contact</p>
                <p className="text-sm text-muted-foreground italic mt-2 max-w-xl">
                  "Code with curiosity. Build with purpose. Lead with empathy."
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/60">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/90">
                  Open to opportunities
                </span>
              </div>
            </div>

            {/* Social profiles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { icon: Github, href: "https://github.com/AyanNandyNirjan", label: "GitHub", handle: "@AyanNandyNirjan" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/ayan-nandy-nirjan/", label: "LinkedIn", handle: "ayan-nandy-nirjan" },
                { icon: Facebook, href: "https://www.facebook.com/ayan.nandy.121/", label: "Facebook", handle: "ayan.nandy.121" },
                { icon: Instagram, href: "https://www.instagram.com/dopamine_420/", label: "Instagram", handle: "@dopamine_420" },
                { icon: Mail, href: "mailto:ayannandy1408@gmail.com", label: "Email", handle: "ayannandy1408@gmail.com" },
              ].map(({ icon: Icon, href, label, handle }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative rounded-2xl border border-border bg-background/40 p-4 hover:border-primary/60 hover:bg-background/70 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground group-hover:text-primary group-hover:border-primary/60 transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">{handle}</p>
                </a>
              ))}
            </div>

            {/* Contact strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-border">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="tel:+8801964881408" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="font-mono">+880 1964-881408</span>
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Mirpur, Dhaka</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
