import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    count: 10,
    skills: ["Python", "C", "C++", "JavaScript", "Java", "PHP", "Bash", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Libraries",
    count: 6,
    skills: ["React", "Next.js", "Node.js", "Express.js", "TailwindCSS", "NumPy"],
  },
  {
    title: "Databases & Tools",
    count: 6,
    skills: ["PostgreSQL", "MongoDB", "Firebase", "Git & GitHub", "Vercel", "Linux"],
  },
  {
    title: "Design & Motion",
    count: 5,
    skills: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Figma"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-28 relative bg-surface">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <div className="flex items-start gap-4 sm:gap-8">
            <div className="pt-4 sm:pt-6">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-2">// Capabilities</p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold tracking-tight"
              >
                Skills &amp; Stack
              </motion.h2>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs sm:text-right">
            A diverse toolkit spanning languages, frameworks, infrastructure, and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-6xl mx-auto relative">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className={`bento-card bento-card-glow p-6 md:p-7 ${
                catIdx === 0 ? "md:col-span-4" : catIdx === 1 ? "md:col-span-2" : "md:col-span-3"
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-primary tracking-widest">
                    0{catIdx + 1}
                  </span>
                  <h3 className="text-base font-bold text-foreground tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-mono rounded-lg bg-secondary text-secondary-foreground border border-border hover:border-primary/30 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Promo bento tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-3 rounded-3xl p-6 md:p-7 bg-gradient-to-br from-primary/90 to-accent/80 text-primary-foreground flex flex-col justify-between min-h-[180px] shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)]"
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-80">
              Experience
            </div>
            <div>
              <div className="text-5xl font-extrabold tracking-tighter">4+</div>
              <div className="text-xs font-medium uppercase tracking-widest opacity-90 mt-2">
                Years building software · design · systems
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
