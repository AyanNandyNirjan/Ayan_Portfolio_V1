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
    live: "https://hungry-fox-food-delivery.vercel.app/",
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
  {
    number: "006",
    title: "Local E-mail Server",
    caption: "Self-hosted SMTP mail server for sending and receiving emails on a local network",
    tags: ["Node.js", "SMTP", "Networking"],
    github: "https://github.com/AyanNandyNirjan/Local_Email_Server",
    live: null,
    image: localEmailServerImg,
  },
  {
    number: "007",
    title: "Screen Sense",
    caption: "ML-powered screen analytics platform for productivity insights",
    tags: ["Machine Learning", "React", "Vercel"],
    github: "https://github.com/AyanNandyNirjan/Screen-Sense",
    live: "https://screen-sense-ml.vercel.app/auth",
    image: screenSenseImg,
  },
  {
    number: "008",
    title: "Driving Assistant",
    caption: "Computer-vision powered driving aid for lane detection and safety alerts",
    tags: ["Python", "OpenCV", "AI"],
    github: "https://github.com/AyanNandyNirjan/Driving_Assistant",
    live: null,
    image: drivingAssistantImg,
  },
  // Placeholder for Project 009 — uncomment & fill in (also add matching image import above):
  // {
  //   number: "009",
  //   title: "Project Name",
  //   caption: "Short description",
  //   tags: ["Tag1", "Tag2"],
  //   github: "https://github.com/...",
  //   live: null,
  //   image: project009Img,
  // },
  // Placeholder for Project 010 — uncomment & fill in (also add matching image import above):
  // {
  //   number: "010",
  //   title: "Project Name",
  //   caption: "Short description",
  //   tags: ["Tag1", "Tag2"],
  //   github: "https://github.com/...",
  //   live: null,
  //   image: project010Img,
  // },
];

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* MY PROJECTS header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Sparkle className="w-4 h-4" />
            Selected Work
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-foreground">
            My Projects
          </h2>
        </div>

        {/* Uniform 3 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card p-4 hover:border-foreground/20 transition-colors"
            >
              {/* Project thumbnail */}
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

              {/* Title */}
              <div className="mb-3">
                <h3 className="text-xl font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.caption}
                </p>
              </div>

              {/* Tech stack tags */}
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

              {/* Action buttons — kept as in your design */}
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

        {/* See More / See Less */}
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
