import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkle } from "lucide-react";
import travelTribeImg from "@/assets/projects/travel-tribe.jpg";
import hungryFoxImg from "@/assets/projects/hungry-fox.jpg";
import arfSecurityImg from "@/assets/projects/arf-security.jpg";
import unimatchImg from "@/assets/projects/unimatch.jpg";
import shopwaveImg from "@/assets/projects/shopwave.jpg";
import localEmailServerImg from "@/assets/projects/local-email-server.jpg";
import screenSenseImg from "@/assets/projects/screen-sense.jpg";
import drivingAssistantImg from "@/assets/projects/driving-assistant.jpg";

const projects = [
  {
    number: "001",
    title: "Travel Tribe",
    caption: "Plan trips with friends",
    tags: ["React", "Node", "MongoDB"],
    github: "https://github.com/AyanNandyNirjan/Travel-Tribe",
    live: "",
    image: travelTribeImg,
  },
  {
    number: "002",
    title: "Hungry Fox",
    caption: "Food delivery experience",
    tags: ["Next.js", "Stripe", "Tailwind"],
    github: "https://github.com/AyanNandyNirjan/Hungry-Fox",
    live: "",
    image: hungryFoxImg,
  },
  {
    number: "003",
    title: "ARF Security",
    caption: "Security agency website",
    tags: ["React", "Framer Motion"],
    github: "https://github.com/AyanNandyNirjan/ARF-Security",
    live: "",
    image: arfSecurityImg,
  },
  {
    number: "004",
    title: "UniMatch",
    caption: "University finder platform",
    tags: ["React", "Firebase"],
    github: "https://github.com/AyanNandyNirjan/UniMatch",
    live: "",
    image: unimatchImg,
  },
  {
    number: "005",
    title: "ShopWave",
    caption: "Modern e-commerce store",
    tags: ["Next.js", "Stripe"],
    github: "https://github.com/AyanNandyNirjan/ShopWave",
    live: "",
    image: shopwaveImg,
  },
  {
    number: "006",
    title: "Local E-mail Server",
    caption: "Self-hosted mail server",
    tags: ["Node.js", "SMTP", "Networking"],
    github: "https://github.com/AyanNandyNirjan/Local_Email_Server",
    live: "",
    image: localEmailServerImg,
  },
  {
    number: "007",
    title: "Screen Sense",
    caption: "ML-powered screen analytics",
    tags: ["ML", "React", "Vercel"],
    github: "https://github.com/AyanNandyNirjan/Screen-Sense",
    live: "https://screen-sense-ml.vercel.app/auth",
    image: screenSenseImg,
  },
  {
    number: "008",
    title: "Driving Assistant",
    caption: "Computer vision driving aid",
    tags: ["Python", "OpenCV", "AI"],
    github: "https://github.com/AyanNandyNirjan/Driving_Assistant",
    live: "",
    image: drivingAssistantImg,
  },

  // ─── ADD MORE PROJECTS BELOW (uncomment & fill in) ───
  // {
  //   number: "009",
  //   title: "Project Nine",
  //   caption: "Short caption",
  //   tags: ["Tag1", "Tag2"],
  //   github: "https://github.com/...",
  //   live: "",
  //   image: project009Img, // add: import project009Img from "@/assets/projects/project-009.jpg";
  // },
  // {
  //   number: "010",
  //   title: "Project Ten",
  //   caption: "Short caption",
  //   tags: ["Tag1", "Tag2"],
  //   github: "https://github.com/...",
  //   live: "",
  //   image: project010Img,
  // },
];

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-white/60 mb-4">
            <Sparkle className="w-4 h-4" />
            Selected Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-white/20 transition"
            >
              <div className="relative overflow-hidden rounded-xl aspect-video mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 text-xs font-mono text-white/80 bg-black/50 px-2 py-1 rounded">
                  {project.number}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-white/60 mb-3">{project.caption}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-white hover:text-white/80"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live View
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm text-white/40">
                    <ExternalLink className="w-4 h-4" />
                    Coming Soon
                  </span>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-white hover:text-white/80"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length > 6 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition text-sm font-medium"
            >
              {showAll ? "See Less" : `See More (${projects.length - 6})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
