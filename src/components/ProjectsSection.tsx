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
    caption: "AI-powered driving aid",
    tags: ["Python", "OpenCV", "AI"],
    github: "https://github.com/AyanNandyNirjan/Driving_Assistant",
    live: "",
    image: drivingAssistantImg,
  },
  // Placeholder for Project 009 - uncomment & fill in to add:
  // {
  //   number: "009",
  //   title: "Project Name",
  //   caption: "Short description",
  //   tags: ["Tag1", "Tag2"],
  //   github: "https://github.com/...",
  //   live: "",
  //   image: project009Img,
  // },
  // Placeholder for Project 010 - uncomment & fill in to add:
  // {
  //   number: "010",
  //   title: "Project Name",
  //   caption: "Short description",
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
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Sparkle className="w-4 h-4" />
            Selected Work
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-foreground">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, idx) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group rounded-2xl border border-border bg-card p-4 hover:border-foreground/20 transition-colors"
            >
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-background/80 backdrop-blur text-xs font-mono text-foreground">
                  {project.number}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{project.caption}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-full border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live View
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <ExternalLink className="w-4 h-4" />
                    Coming Soon
                  </span>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length > 6 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-full border border-border text-foreground hover:bg-accent transition-colors text-sm"
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
