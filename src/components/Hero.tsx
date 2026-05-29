"use client";

import { motion } from "framer-motion";
import { type CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const sectionStyle: CSSProperties = {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowX: "hidden", // Fixes horizontal orb overflow while enabling natural mobile vertical scrolling
    paddingTop: "80px",
    paddingBottom: "3rem", // Ensures breathing room at the bottom on mobile devices
  };

  const orbOneStyle: CSSProperties = {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(241,90,36,0.18), transparent 70%)",
    filter: "blur(60px)",
    top: "-100px",
    right: "-100px",
    pointerEvents: "none",
  };

  const orbTwoStyle: CSSProperties = {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(79,158,255,0.15), transparent 70%)",
    filter: "blur(60px)",
    bottom: "0px",
    left: "-150px",
    pointerEvents: "none",
  };

  const orbThreeStyle: CSSProperties = {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(241,90,36,0.1), transparent 70%)",
    filter: "blur(40px)",
    top: "40%",
    left: "30%",
    pointerEvents: "none",
  };

  const gridStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
    pointerEvents: "none",
  };

  const badgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "rgba(241,90,36,0.1)",
    border: "1px solid rgba(241,90,36,0.3)",
    borderRadius: "999px",
    padding: "0.4rem 1rem",
    fontSize: "0.8rem",
    color: "var(--accent)",
    fontWeight: 500,
    marginBottom: "1rem",
    fontFamily: "var(--font-body)",
  };

  const headingStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(2.5rem, 6vw, 7rem)", // Lowered minimum from 4rem to 2.5rem so it perfectly wraps on mobile screens
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    color: "var(--text-primary)",
    marginBottom: "2.5rem", // Reduced from 8rem to stop pushing cards out of view
    marginTop: "2rem",    // Reduced from 6rem to maximize layout efficiency
  };

  const subStyle: CSSProperties = {
    fontSize: "clamp(0.95rem, 2vw, 1.25rem)",
    color: "var(--text-secondary)",
    maxWidth: "800px",
    lineHeight: 1.6,
    margin: "0 auto 2rem",
    fontFamily: "var(--font-body)",
  };

  const btnPrimaryStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "var(--accent)",
    color: "#fff",
    padding: "0.85rem 2rem",
    borderRadius: "999px",
    fontSize: "1rem",
    fontWeight: 600,
    textDecoration: "none",
    fontFamily: "var(--font-display)",
    boxShadow: "0 0 30px var(--accent-glow), 0 0 60px var(--accent-soft)",
  };

  const btnSecondaryStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "var(--text-primary)",
    padding: "0.85rem 2rem",
    borderRadius: "999px",
    fontSize: "1rem",
    fontWeight: 500,
    textDecoration: "none",
    fontFamily: "var(--font-body)",
    backdropFilter: "blur(10px)",
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section id="home" style={sectionStyle}>
      {/* Background layers */}
      <div style={gridStyle} />
      <div style={orbOneStyle} />
      <div style={orbTwoStyle} />
      <div style={orbThreeStyle} />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 1rem",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span style={badgeStyle}>
            <Sparkles size={14} />
            Available for freelance and remote work
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} style={headingStyle}>
          I turn ideas
          <br />
          into{" "}
          <span
            style={{
              color: "var(--accent)",
              textShadow: "0 0 60px rgba(241,90,36,0.4)",
            }}
          >
            reality.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={itemVariants} style={subStyle}>
          Computer Engineering graduate open to remote work — web development,
          IT support, automation, and virtual assistance. I get things done.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          <motion.a
            href="#projects"
            style={btnPrimaryStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="#contact"
            style={btnSecondaryStyle}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator - Configured softly for mobile layouts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "1.5rem 0" }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{
              width: "8px",
              height: "32px",
              background: "linear-gradient(to bottom, var(--accent), transparent)",
            }}
          />
        </motion.div>

        {/* Achievements & Growth Highlights */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", // Safely scales cards down on narrower displays
            gap: "1rem",
            width: "100%",
            maxWidth: "850px",
            margin: "1.5rem auto 0",
          }}
        >
          {[
            {
              title: "DOST Scholar & Honors",
              description: "Dean's Lister graduate recognized for academic excellence and technical problem-solving capabilities.",
            },
            {
              title: "Adaptive Learner",
              description: "Fresh graduate motivated to tackle new engineering stacks, master workflows, and grow rapidly with a team.",
            },
            {
              title: "Full-Stack + Hardware",
              description: "Its capability extends from creating company web architectures to assembling multi-microcontroller automated systems.",
            },
          ].map((highlight, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "14px",
                padding: "1.25rem",
                textAlign: "left",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.25s ease, background-color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(241, 90, 36, 0.3)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.4rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <span style={{ color: "var(--accent)" }}>//</span> {highlight.title}
              </div>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.45,
                  fontFamily: "var(--font-body)",
                }}
              >
                {highlight.description}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}