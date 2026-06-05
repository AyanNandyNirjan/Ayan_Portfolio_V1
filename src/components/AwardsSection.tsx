import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const awards = [
  {
    date: "May 07–08, 2026",
    title: "Best Presenter Award — ICEI2026",
    description:
      'For the paper "A Hybrid Bangla Stemmer Using Dictionary and POS Aware Rule-Based Approach" at the International Conference on Electronics and Informatics 2026, organized by BEIS at Atomic Energy Centre, Dhaka.',
    link: "https://drive.google.com/file/d/1g5s-N6Ow1HXLC5mi0uih4wlEu7cI7f3u/view?usp=drive_link",
  },
  {
    date: "April 15, 2026",
    title: "AWS Academy Graduate — Cloud Foundations",
    description:
      "Certificate of Completion for AWS Academy Cloud Foundations Training Badge.",
    link: "https://www.credly.com/go/VGRvYafD",
  },
  {
    date: "November 14, 2024",
    title: "Organizer Award — National Mobile Photography Contest 2024",
    description:
      "Contributed as an organizer in the National Mobile Photography Contest in collaboration with Realme × DIUPS, managing logistics, promotion, and event execution.",
    link: "https://drive.google.com/file/d/1D9JoJQmNeSJycdDKYOYCYU2NI80ta42h/view?usp=sharing",
  },
  {
    date: "January 29, 2024",
    title: "Organizer Award — DIU Beautiful Campus Photography Exhibition",
    description:
      "Contributed as an organizer in planning, coordinating, and executing the photography exhibition on the DIU campus.",
    link: "https://drive.google.com/file/d/1-yPDULuXNhkgr4ckCMJN2B-0Fu5gtwBa/view?usp=sharing",
  },
  {
    date: "May 21, 2022",
    title: "Workshop Certificate — Ransomware in the Financial Sector",
    description:
      "Gained knowledge about ransomware attack methodologies in the financial sector, common attack vectors, prevention strategies, and incident response techniques.",
    link: "https://drive.google.com/file/d/1YbTDdkqko7cGjKqq7PR3voupDQbzIdAl/view?usp=drive_link",
  },
  {
    date: "October 04, 2019",
    title: "Certificate of Appreciation — #MilesToSmile Challenge",
    description:
      "For outstanding effort in the #MilesToSmile Challenge on World Smile Day 2019, organized by Smile Train, BD Cyclists, and Child Health Awareness Foundation (CHAF).",
    link: "https://drive.google.com/file/d/1bRtutQ9NtqQPckoSYUiOFOMpWJmqKnzf/view?usp=drive_link",
  },
];

const AwardsSection = () => {
  return (
    <section id="awards" className="py-28 relative">
      <div className="container px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <div className="flex items-start gap-4 sm:gap-8">
            <div className="pt-4 sm:pt-6">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-2">// Recognition</p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight"
              >
                Awards &amp; Achievements
              </motion.h2>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs sm:text-right">
            Selected honors from academia, industry, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {awards.map((award, i) => (
            <motion.a
              key={award.title}
              href={award.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`bento-card bento-card-glow group p-6 block ${
                i === 0 ? "md:col-span-4" : i === 1 ? "md:col-span-2" : "md:col-span-3"
              }`}
            >
              <ExternalLink className="absolute top-4 right-4 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_-8px_hsl(var(--primary)/0.6)]">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-1">{award.date}</p>
                  <h3 className="text-base font-bold mb-2 leading-snug group-hover:text-primary transition-colors tracking-tight">{award.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{award.description}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
