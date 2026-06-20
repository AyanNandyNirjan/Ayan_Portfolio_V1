import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkle } from "lucide-react";
import travelTribeImg from "@/assets/projects/travel-tribe.jpg";
import hungryFoxImg from "@/assets/projects/hungry-fox.jpg";
import arfSecurityImg from "@/assets/projects/arf-security.jpg";
import unimatchImg from "@/assets/projects/unimatch.jpg";
import shopwaveImg from "@/assets/projects/shopwave.jpg";
// import project006Img from "@/assets/projects/project-006.jpg";
// import project007Img from "@/assets/projects/project-007.jpg";
// import project008Img from "@/assets/projects/project-008.jpg";
// import project009Img from "@/assets/projects/project-009.jpg";
// import project010Img from "@/assets/projects/project-010.jpg";

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

  // ===========================================================
  // 👇 ADD YOUR NEW PROJECTS BELOW
  // Uncomment a block, fill in the details, and add the matching
  // image import at the top of this file.
  // The "See More" button appears automatically once length > 6.
  // ===========================================================

  // {
  //   number: "006",
  //   title: "Project Title",
  //   caption: "Short one-line description of the project",
  //   tags: ["Tech1", "Tech2", "Tech3"],
  //   github: "https://github.com/AyanNandyNirjan/your-repo",
  //   live: "https://your-live-url.com", // or set to null if not deployed
  //   image: project006Img,
  // },
  // {
  //   number: "007",
  //   title: "Project Title",
  //   caption: "Short one-line description of the project",
  //   tags: ["Tech1", "Tech2", "Tech3"],
  //   github: "https://github.com/AyanNandyNirjan/your-repo",
  //   live: null,
  //   image: project007Img,
  // },
  // {
  //   number: "008",
  //   title: "Project Title",
  //   caption: "Short one-line description of the project",
  //   tags: ["Tech1", "Tech2", "Tech3"],
  //   github: "https://github.com/AyanNandyNirjan/your-repo",
  //   live: null,
  //   image: project008Img,
  // },
  // {
  //   number: "009",
  //   title: "Project Title",
  //   caption: "Short one-line description of the project",
  //   tags: ["Tech1", "Tech2", "Tech3"],
  //   github: "https://github.com/AyanNandyNirjan/your-repo",
  //   live: null,
  //   image: project009Img,
  // },
  // {
  //   number: "010",
  //   title: "Project Title",
  //   caption: "Short one-line description of the project",
  //   tags: ["Tech1", "Tech2", "Tech3"],
  //   github: "https://github.com/AyanNandyNirjan/your-repo",
  //   live: null,
  //   image: project010Img,
  // },
];

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* MY PROJECTS header */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <Sparkle className="w-6 h-6 text-white/60" />
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            My Projects
          </h2>
          <Sparkle className="w-6 h-6 text-white/60" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col"
            >
              <div className="relative rounded-xl overflow-hidden mb-5">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <span className="absolute bottom-2 left-2 text-xs text-white/80 bg-black/50 px-2 py-1 rounded">
                  // {project.number}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-white/60">{project.caption}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider text-white/70 border border-white/15 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-auto">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live View
                  </a>
                ) : (
                  <span className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/50 text-sm font-medium cursor-not-allowed">
                    <ExternalLink className="w-4 h-4" />
                    Coming Soon
                  </span>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-white text-sm font-medium hover:bg-white/10 transition-colors"
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
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors text-sm font-medium"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
