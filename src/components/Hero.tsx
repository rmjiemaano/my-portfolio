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
    overflow: "hidden",
    paddingTop: "70px",
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
    marginBottom: "1.5rem",
    fontFamily: "var(--font-body)",
  };

  const headingStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(3rem, 8vw, 6.5rem)",
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: "var(--text-primary)",
    marginBottom: "1.5rem",
  };

  const subStyle: CSSProperties = {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "var(--text-secondary)",
    maxWidth: "520px",
    lineHeight: 1.7,
    marginBottom: "2.5rem",
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

  const scrollIndicatorStyle: CSSProperties = {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--text-muted)",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
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
          padding: "0 1.5rem",
          maxWidth: "900px",
        }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span style={badgeStyle}>
            <Sparkles size={14} />
            Available for freelance work
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} style={headingStyle}>
          I build things
          <br />
          for the{" "}
          <span
            style={{
              color: "var(--accent)",
              textShadow: "0 0 60px rgba(241,90,36,0.4)",
            }}
          >
            web.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={itemVariants} style={subStyle}>
          Full-stack developer crafting fast, beautiful, and user-focused
          digital experiences. From concept to deployment — I make it happen.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
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

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            gap: "3rem",
            justifyContent: "center",
            marginTop: "4rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "2+", label: "Years Experience" },
            { value: "20+", label: "Projects Built" },
            { value: "10+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--accent)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  marginTop: "0.4rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={scrollIndicatorStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
        scroll
      </motion.div>
    </section>
  );
}