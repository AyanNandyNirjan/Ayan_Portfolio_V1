import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkle } from "lucide-react";
import travelTribeImg from "@/assets/projects/travel-tribe.jpg";
import hungryFoxImg from "@/assets/projects/hungry-fox.jpg";
import arfSecurityImg from "@/assets/projects/arf-security.jpg";
import unimatchImg from "@/assets/projects/unimatch.jpg";
import shopwaveImg from "@/assets/projects/shopwave.jpg";

const projects = [
  {
    number: "001",
    title: "Travel Tribe",
    caption: "All-in-one travel platform for booking, itinerary planning, and discovery",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/AyanNandyNirjan/Travel_Tribe",
    live: "https://travel-tribe.vercel.app/",
    image: travelTribeImg,
  },
  {
    number: "002",
    title: "Hungry Fox",
    caption: "Food ordering web app for browsing restaurants and live delivery tracking",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/AyanNandyNirjan/Hungry_Fox",
    live: null,
    image: hungryFoxImg,
  },
  {
    number: "003",
    title: "ARF Security",
    caption: "Linux CLI utility for secure file encryption and decryption",
    tags: ["Python", "Bash", "Linux"],
    github: "https://github.com/AyanNandyNirjan/arf-security-os",
    live: null,
    image: arfSecurityImg,
  },
  {
    number: "004",
    title: "Unimatch",
    caption: "Mobile app helping international students find peers, housing, and resources",
    tags: ["React Native", "Node.js", "Firebase"],
    github: "https://github.com/AyanNandyNirjan/UniMatch_App",
    live: "https://drive.google.com/file/d/1P_nem7Mgkkl17WAg8ijxmLg8Y53zlLCB/view?usp=drivesdk",
    image: unimatchImg,
  },
  {
    number: "005",
    title: "ShopWave",
    caption: "Full-featured ecommerce platform with checkout and admin dashboard",
    tags: ["Next.js", "Tailwind CSS", "PostgreSQL", "Supabase"],
    github: "https://github.com/AyanNandyNirjan/Shop_Wave",
    live: "https://shop-wave-master-ybkjzs.free.laravel.cloud/",
    image: shopwaveImg,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="container px-4 sm:px-6">
        {/* MY PROJECTS header with sparkles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 sm:gap-8 mb-10 sm:mb-14"
        >
          <Sparkle className="w-7 h-7 sm:w-10 sm:h-10 text-foreground rotate-12" strokeWidth={1.2} />
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-center">
            My Projects
          </h2>
          <Sparkle className="w-7 h-7 sm:w-10 sm:h-10 text-foreground -rotate-12" strokeWidth={1.2} />
        </motion.div>

        {/* Uniform 3 column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bento-card bento-card-glow group p-5 flex flex-col h-full"
            >
              {/* Project thumbnail */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-secondary/40">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/90">
                  // {project.number}
                </div>
              </div>

              {/* Title */}
              <div className="pt-5 px-1">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {project.caption}
                </p>
              </div>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 px-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-secondary/60 text-secondary-foreground border border-border/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-auto pt-5 px-1 flex gap-2">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-xs font-mono uppercase tracking-[0.18em] hover:bg-primary/90 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live View
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-muted text-muted-foreground px-4 py-2.5 text-xs font-mono uppercase tracking-[0.18em] cursor-not-allowed"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Coming Soon
                  </span>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/40 px-4 py-2.5 text-xs font-mono uppercase tracking-[0.18em] text-foreground hover:border-primary hover:text-primary transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
