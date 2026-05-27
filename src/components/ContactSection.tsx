import { motion } from "framer-motion";
import { Github, Mail, Phone, MapPin, Send, Facebook, Linkedin, Instagram, Sparkle } from "lucide-react";
import { useState } from "react";

const infoBlocks = [
  {
    icon: Mail,
    label: "Email Me",
    lines: ["ayannandy1408@gmail.com"],
  },
  {
    icon: Phone,
    label: "Contact Me",
    lines: ["+880 1964-881408"],
    accent: true,
  },
  {
    icon: MapPin,
    label: "Location",
    lines: ["Mirpur", "Dhaka", "Bangladesh"],
  },
];

const socials = [
  { icon: Github, href: "https://github.com/AyanNandyNirjan", label: "GitHub" },
  { icon: Facebook, href: "https://www.facebook.com/ayan.nandy.121/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/dopamine_420/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ayan-nandy-nirjan/", label: "LinkedIn" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 max-w-6xl mx-auto">
          {/* Left — Contact info + socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-10"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-foreground mb-8">Contact Info</p>
              <div className="space-y-7">
                {infoBlocks.map((block) => (
                  <div key={block.label} className="flex items-start gap-4">
                    <span className="w-12 h-12 shrink-0 rounded-xl bg-card border border-border flex items-center justify-center text-foreground">
                      <block.icon className="w-5 h-5" />
                    </span>
                    <div className="pt-1">
                      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1.5">
                        {block.label}
                      </p>
                      {block.lines.map((line) => (
                        <p
                          key={line}
                          className={`text-sm font-semibold leading-snug ${
                            block.accent ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {block.accent && <Send className="inline w-3 h-3 mr-1 -mt-0.5" />}
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-foreground mb-5">Social Info</p>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form bento card */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bento-card bento-card-glow p-6 sm:p-10 relative"
          >
            <Sparkle className="absolute top-6 right-6 w-7 h-7 text-foreground/70" strokeWidth={1.2} />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Let's work <span className="text-primary">together.</span>
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name *"
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all text-sm"
              />
              <input
                type="email"
                placeholder="Email *"
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all text-sm"
              />
              <input
                type="text"
                placeholder="Your Subject *"
                maxLength={200}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all text-sm"
              />
              <textarea
                rows={6}
                placeholder="Your Message *"
                maxLength={1000}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all resize-none text-sm"
              />
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-secondary hover:bg-primary border border-border hover:border-primary text-foreground hover:text-primary-foreground font-semibold text-sm transition-colors"
              >
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
