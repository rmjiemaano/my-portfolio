"use client";

import { motion } from "framer-motion";
import { type CSSProperties } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";

const projects = [
  {
    title: "Project Alpha",
    description:
      "A full-stack SaaS platform with real-time collaboration, authentication, and a powerful dashboard. Built for scale.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    live: "https://example.com",
    github: "https://github.com",
    featured: true,
    gradient: "linear-gradient(135deg, rgba(241,90,36,0.15), rgba(79,158,255,0.1))",
    accentColor: "var(--accent)",
  },
  {
    title: "Project Beta",
    description:
      "An AI-powered content generation tool that helps creators write faster. Integrated with OpenAI and deployed on Vercel.",
    tags: ["React", "OpenAI", "Node.js", "MongoDB"],
    live: "https://example.com",
    github: "https://github.com",
    featured: true,
    gradient: "linear-gradient(135deg, rgba(79,158,255,0.15), rgba(139,92,246,0.1))",
    accentColor: "var(--accent-blue)",
  },
  {
    title: "Project Gamma",
    description:
      "E-commerce storefront with a custom CMS, cart system, and seamless checkout experience.",
    tags: ["Next.js", "Sanity", "Tailwind", "Vercel"],
    live: "https://example.com",
    github: "https://github.com",
    featured: false,
    gradient: "linear-gradient(135deg, rgba(241,90,36,0.1), rgba(241,90,36,0.05))",
    accentColor: "var(--accent)",
  },
  {
    title: "Project Delta",
    description:
      "A developer portfolio template with dark mode, animations, and a clean minimal design system.",
    tags: ["React", "Framer Motion", "TypeScript"],
    live: "https://example.com",
    github: "https://github.com",
    featured: false,
    gradient: "linear-gradient(135deg, rgba(79,158,255,0.1), rgba(79,158,255,0.05))",
    accentColor: "var(--accent-blue)",
  },
];

export default function Projects() {
  const sectionStyle: CSSProperties = {
    position: "relative",
    padding: "8rem 1.5rem",
    overflow: "hidden",
  };

  const orbStyle: CSSProperties = {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(241,90,36,0.1), transparent 70%)",
    filter: "blur(80px)",
    bottom: "0",
    right: "-150px",
    pointerEvents: "none",
  };

  const featuredCardStyle: CSSProperties = {
    position: "relative",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    overflow: "hidden",
    padding: "2.5rem",
    backdropFilter: "blur(10px)",
    transition: "border-color 0.3s ease",
  };

  const smallCardStyle: CSSProperties = {
    position: "relative",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.07)",
    overflow: "hidden",
    padding: "2rem",
    backdropFilter: "blur(10px)",
    transition: "border-color 0.3s ease",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const tagStyle: CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "999px",
    padding: "0.3rem 0.8rem",
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    fontFamily: "var(--font-body)",
    whiteSpace: "nowrap" as const,
  };

  const iconBtnStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38px",
    height: "38px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "var(--text-secondary)",
    textDecoration: "none",
    transition: "all 0.2s ease",
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" style={sectionStyle}>
      <div style={orbStyle} />

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Selected Work
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "4rem",
            lineHeight: 1.1,
          }}
        >
          Things I&apos;ve{" "}
          <span style={{ color: "var(--accent)" }}>built.</span>
        </motion.h2>

        {/* Featured projects */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {featured.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: "rgba(241,90,36,0.25)" }}
              style={{ ...featuredCardStyle, background: project.gradient }}
            >
              {/* Top row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: project.accentColor,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Featured
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={iconBtnStyle}
                    whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.25)" }}
                  >
                    <GitBranch size={16} />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={iconBtnStyle}
                    whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.25)" }}
                  >
                    <ArrowUpRight size={16} />
                  </motion.a>
                </div>
              </div>

              {/* Mock UI preview */}
              <div
                style={{
                  borderRadius: "12px",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  height: "160px",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Fake browser chrome */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "28px",
                    background: "rgba(255,255,255,0.04)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "0 12px",
                  }}
                >
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                    <div
                      key={c}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: c,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.15)",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-body)",
                    marginTop: "28px",
                  }}
                >
                  {project.title}
                </p>
              </div>

              {/* Info */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.6rem",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "1.25rem",
                }}
              >
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Smaller projects */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {rest.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: "rgba(241,90,36,0.2)" }}
              style={{ ...smallCardStyle, background: project.gradient }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {project.title}
                </h3>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={iconBtnStyle}
                    whileHover={{ scale: 1.1 }}
                  >
                    <GitBranch size={14} />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={iconBtnStyle}
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowUpRight size={14} />
                  </motion.a>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}