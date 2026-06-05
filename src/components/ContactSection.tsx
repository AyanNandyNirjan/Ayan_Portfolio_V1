import { motion } from "framer-motion";
import {
  Github,
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Linkedin,
  Instagram,
  Sparkle,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  {
    icon: Github,
    href: "https://github.com/AyanNandyNirjan",
    label: "GitHub",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/ayan.nandy.121/",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/dopamine_420/",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ayan-nandy-nirjan/",
    label: "LinkedIn",
  },
];

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitStatus = {
  type: "success" | "error" | "";
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (!submitStatus.message) return;

    const timer = setTimeout(() => {
      setSubmitStatus({
        type: "",
        message: "",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [submitStatus.message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitStatus.message) {
      setSubmitStatus({
        type: "",
        message: "",
      });
    }
  };

  const validateForm = () => {
    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setSubmitStatus({
        type: "",
        message: "",
      });

      const res = await fetch("/api/contact-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send message.");
      }

      setFormData(initialFormData);
      setSubmitStatus({
        type: "success",
        message: data?.message || "Message sent successfully.",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-10"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-foreground mb-8">
                Contact Info
              </p>

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
                          {block.accent && (
                            <Send className="inline w-3 h-3 mr-1 -mt-0.5" />
                          )}
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-foreground mb-5">
                Social Info
              </p>

              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bento-card bento-card-glow p-6 sm:p-10 relative overflow-hidden"
          >
            <Sparkle
              className="absolute top-6 right-6 w-7 h-7 text-foreground/70"
              strokeWidth={1.2}
            />

            <div className="mb-8">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">
                Send Message
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Let's work <span className="text-primary">together.</span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
                Have a project, idea, or question? Send a message and I will
                get back to you soon.
              </p>
            </div>

            {submitStatus.message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                  submitStatus.type === "success"
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-red-500/40 bg-red-500/10 text-red-500"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                )}
                <span>{submitStatus.message}</span>
              </motion.div>
            )}

            <div className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Name *"
                maxLength={100}
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-5 py-4 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              />

              <input
                name="email"
                type="email"
                placeholder="Email *"
                maxLength={255}
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-5 py-4 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              />

              <input
                name="subject"
                type="text"
                placeholder="Your Subject *"
                maxLength={200}
                value={formData.subject}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-5 py-4 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              />

              <textarea
                name="message"
                rows={6}
                placeholder="Your Message *"
                maxLength={1000}
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-5 py-4 rounded-xl bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all resize-none text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-secondary hover:bg-primary border border-border hover:border-primary text-foreground hover:text-primary-foreground font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;