// src/components/ProjectsSection.tsx
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
    description:
      "All-in-one travel platform for booking, itinerary planning, and discovery",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: travelTribeImg,
    live: "https://travel-tribe.vercel.app/",
    code: "https://github.com/AyanNandyNirjan/Travel-Tribe",
  },
  {
    number: "002",
    title: "Hungry Fox",
    description:
      "Food ordering web app for browsing restaurants and live delivery tracking",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
    image: hungryFoxImg,
    live: "https://hungry-fox-food-delivery.vercel.app/",
    code: "https://github.com/AyanNandyNirjan/Hungry-Fox",
  },
  {
    number: "003",
    title: "ARF Security",
    description: "Linux CLI utility for secure file encryption and decryption",
    tags: ["Python", "Bash", "Linux"],
    image: arfSecurityImg,
    live: null,
    code: "https://github.com/AyanNandyNirjan/ARF-Security",
  },
  {
    number: "004",
    title: "Unimatch",
    description:
      "Mobile app helping international students find peers, housing, and resources",
    tags: ["React Native", "Node.js", "Firebase"],
    image: unimatchImg,
    live: null,
    code: "https://github.com/AyanNandyNirjan/Unimatch",
  },
  {
    number: "005",
    title: "ShopWave",
    description:
      "Full-featured ecommerce platform with checkout and admin dashboard",
    tags: ["Next.js", "Tailwind CSS", "PostgreSQL", "Supabase"],
    image: shopwaveImg,
    live: "https://shop-wave-master-ybkjzs.free.laravel.cloud/",
    code: "https://github.com/AyanNandyNirjan/ShopWave",
  },
  {
    number: "006",
    title: "Local E-mail Server",
    description:
      "Self-hosted email server for sending and receiving mail over a local network",
    tags: ["Node.js", "SMTP", "Networking"],
    image: localEmailServerImg,
    live: null,
    code: "https://github.com/AyanNandyNirjan/Local_Email_Server",
  },
  {
    number: "007",
    title: "Screen Sense",
    description:
      "ML-powered screen-time analyzer with personalized insights and auth",
    tags: ["Machine Learning", "React", "Vercel"],
    image: screenSenseImg,
    live: "https://screen-sense-ml.vercel.app/",
    code: "https://github.com/AyanNandyNirjan/Screen-Sense",
  },
  {
    number: "008",
    title: "Driving Assistant",
    description:
      "Python-based driving assistant using computer vision for real-time alerts",
    tags: ["Python", "OpenCV", "AI"],
    image: drivingAssistantImg,
    live: null,
    code: "https://github.com/AyanNandyNirjan/Driving_Assistant",
  },

  // ===== Add more projects below (uncomment to enable) =====
  // {
  //   number: "009",
  //   title: "Project Name",
  //   description: "Short description here",
  //   tags: ["Tag1", "Tag2"],
  //   image: yourImg,
  //   live: "https://...",
  //   code: "https://github.com/...",
  // },
  // {
  //   number: "010",
  //   title: "Project Name",
  //   description: "Short description here",
  //   tags: ["Tag1", "Tag2"],
  //   image: yourImg,
  //   live: null,
  //   code: "https://github.com/...",
  // },
];

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <Sparkle className="w-6 h-6 text-foreground" />
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-foreground">
            MY PROJECTS
          </h2>
          <Sparkle className="w-6 h-6 text-foreground" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl bg-card border border-border p-4 flex flex-col"
            >
              {/* Image */}
              <div className="relative rounded-xl overflow-hidden mb-5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-foreground/90 bg-black/40 backdrop-blur px-2 py-1 rounded">
                  // {project.number}
                </span>
              </div>

              {/* Title + description */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border bg-background/40 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-auto flex gap-2">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-wider text-white rounded-lg py-2.5 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 transition-colors shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live View
                  </a>
                ) : (
                  <span className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-wider text-muted-foreground rounded-lg py-2.5 bg-muted/40 border border-border cursor-not-allowed">
                    <ExternalLink className="w-4 h-4" />
                    Coming Soon
                  </span>
                )}
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-wider text-foreground rounded-lg py-2.5 px-5 border border-border bg-background/40 hover:bg-background/80 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More toggle */}
        {projects.length > 6 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="px-6 py-3 rounded-lg border border-border bg-card text-foreground text-sm font-mono uppercase tracking-wider hover:bg-muted/40 transition-colors"
            >
              {showAll ? "Show Less" : `See More (${projects.length - 6})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
