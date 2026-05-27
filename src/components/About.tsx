"use client";

import { motion } from "framer-motion";
import { type CSSProperties } from "react";
import { Code2, Palette, Zap, Globe } from "lucide-react";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB"] },
  { category: "Tools", items: ["Git", "Figma", "Docker", "Vercel"] },
  { category: "Other", items: ["REST APIs", "GraphQL", "AWS", "Linux"] },
];

const traits = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "I write readable, maintainable code that scales with your project.",
  },
  {
    icon: Palette,
    title: "Great Design",
    desc: "I care deeply about UI/UX — beautiful and functional go hand in hand.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "I ship quickly without cutting corners, keeping you in the loop always.",
  },
  {
    icon: Globe,
    title: "Full Stack",
    desc: "From database to deployment, I handle the entire product lifecycle.",
  },
];

export default function About() {
  const sectionStyle: CSSProperties = {
    position: "relative",
    padding: "8rem 1.5rem",
    overflow: "hidden",
  };

  const orbStyle: CSSProperties = {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(79,158,255,0.12), transparent 70%)",
    filter: "blur(60px)",
    top: "10%",
    right: "-100px",
    pointerEvents: "none",
  };

  const headingStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: "var(--text-primary)",
    marginBottom: "1rem",
    lineHeight: 1.1,
  };

  const traitCardStyle: CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "1.75rem",
    backdropFilter: "blur(10px)",
    transition: "border-color 0.3s ease, transform 0.3s ease",
  };

  const skillTagStyle: CSSProperties = {
    background: "rgba(241,90,36,0.08)",
    border: "1px solid rgba(241,90,36,0.2)",
    borderRadius: "999px",
    padding: "0.35rem 0.9rem",
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    fontFamily: "var(--font-body)",
    whiteSpace: "nowrap" as const,
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="about" style={sectionStyle}>
      <div style={orbStyle} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section label */}
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
          About Me
        </motion.p>

        {/* Heading + bio row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
            marginBottom: "5rem",
          }}
          className="about-grid"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 style={headingStyle}>
              Passionate about<br />
              building{" "}
              <span style={{ color: "var(--accent)" }}>great</span>
              <br />
              products.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}>
              Hey! I&apos;m a developer based in the Philippines with a passion
              for crafting digital experiences that are both visually stunning
              and technically solid.
            </p>
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}>
              When I&apos;m not coding, you&apos;ll find me exploring new design
              trends, contributing to open source, or leveling up my skills in
              the ever-evolving web ecosystem.
            </p>
          </motion.div>
        </div>

        {/* Trait cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "1.25rem",
            marginBottom: "5rem",
          }}
        >
          {traits.map((trait) => (
            <motion.div
              key={trait.title}
              variants={fadeUp}
              style={traitCardStyle}
              whileHover={{ y: -4, borderColor: "rgba(241,90,36,0.3)" }}
            >
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(241,90,36,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}>
                <trait.icon size={20} color="var(--accent)" />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}>
                {trait.title}
              </h3>
              <p style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}>
                {trait.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            color: "var(--accent)",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}>
            Tech Stack
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}>
            {skills.map((group) => (
              <div key={group.category}>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}>
                  {group.category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {group.items.map((item) => (
                    <span key={item} style={skillTagStyle}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}