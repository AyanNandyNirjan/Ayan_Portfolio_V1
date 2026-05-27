import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const experiences = [
  {
    year: "Aug 2023 - Aug 2024",
    org: "DIU Photographic Society (DIUPS)",
    role: "Head of Online Moderation",
    description: "Managed online community platforms, moderated discussions, coordinated digital engagement, and supported the society's virtual presence and member communications.",
    link: "https://drive.google.com/file/d/1xEAeSfYnQudBKA4kiB6AcJ7WjkvFTLvG/view?usp=drive_link",
  },
  {
    year: "Nov 2022 - Nov 2023",
    org: "Cyber Security Club, DIU",
    role: "General Member",
    description: "Participated in cybersecurity workshops and seminars. Engaged with peers on network security, ethical hacking, and digital safety.",
    link: null,
  },
  {
    year: "Jan 2019 - Ongoing",
    org: "BDCyclist",
    role: "Active Member",
    description: "Engaged in organized cycling events, community rides, and advocacy for cycling culture across Bangladesh.",
    link: null,
  },
];

const education = [
  {
    year: "2022 - 2026",
    org: "Daffodil International University",
    role: "B.Sc. in Computer Science & Engineering",
    description: "CGPA: 3.70 / 4.00 — Dhaka, Bangladesh.",
    link: null,
  },
  {
    year: "2019 - 2020",
    org: "BCIC College",
    role: "Higher Secondary Certificate (HSC)",
    description: "GPA: 5.00 / 5.00 — Dhaka, Bangladesh.",
    link: null,
  },
  {
    year: "2008 - 2018",
    org: "Dhanmondi Govt. Boys' High School",
    role: "Secondary School Certificate (SSC)",
    description: "GPA: 5.00 / 5.00 — Dhaka, Bangladesh.",
    link: null,
  },
];

const TimelineItem = ({ item, index }: { item: typeof experiences[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative flex flex-col sm:flex-row gap-2 sm:gap-6 pb-8 last:pb-0"
  >
    <div className="sm:w-36 shrink-0 pt-1">
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {item.year}
      </span>
    </div>
    <div className="relative pl-6 border-l border-border flex-1">
      <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
      <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-1.5">
        {item.org}
      </p>
      <h4 className="text-base md:text-lg font-bold mb-2 tracking-tight group-hover:text-primary transition-colors">
        {item.role}
      </h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-primary hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Certificate
        </a>
      )}
      {/* Progress bar accent */}
      <div className="mt-4 h-px w-full bg-border overflow-hidden">
        <div className="h-full w-0 group-hover:w-full bg-primary transition-all duration-700" />
      </div>
    </div>
  </motion.div>
);

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-28 relative bg-surface">
      <div className="container px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Experience */}
          <div>
            <div className="flex items-start gap-4 sm:gap-8 mb-12">
              <div className="pt-4 sm:pt-6">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-2">// Community</p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                >
                  Volunteering
                </motion.h2>
              </div>
            </div>
            <div className="space-y-0">
              {experiences.map((exp, i) => (
                <TimelineItem key={i} item={exp} index={i} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div id="education">
            <div className="flex items-start gap-4 sm:gap-8 mb-12">
              <div className="pt-4 sm:pt-6">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-2">// Academics</p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                >
                  Education
                </motion.h2>
              </div>
            </div>
            <div className="space-y-0">
              {education.map((edu, i) => (
                <TimelineItem key={i} item={edu} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
