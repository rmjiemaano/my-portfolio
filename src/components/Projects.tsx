"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, GitBranch, FileText, Maximize2, X } from "lucide-react";

const projects = [
  {
    title: "Autonomous Smart Floating Waste Collector with Integrated Docking System",
    description:
      "Multi-microcontroller autonomous boat (Raspberry Pi 4B, Arduino Mega, ESP32) with YOLOv26 real-time waste detection over UDP. Features ArUco marker-based auto-docking, GPS/compass fallback navigation, LoRa remote control, and SMS alert notifications.",
    tags: ["Raspberry Pi", "Arduino", "ESP32", "YOLOv26", "Python", "LoRa"],
    live: "https://docs.google.com/document/d/1n4Kst77XRPygKwaXowPM5JMBHAgsps9jYDxCeFlQKsY/edit?usp=sharing",
    github: "",
    featured: true,
    mediaType: "video",
    videoSrc: "/videos/thesis.mp4",
    aspectRatio: "16/9",
    gradient: "linear-gradient(135deg, rgba(241,90,36,0.12), rgba(79,158,255,0.08))",
    accentColor: "var(--accent)",
    liveLabel: "Research Paper",
    liveIcon: FileText,
  },
  {
    title: "Numerical Methods Calculator App",
    description:
      "An educational Android application designed to solve large systems of linear equations (up to 10x10) using 5 core numerical methods (Cramer's, Gauss, Gauss-Jordan, Jacobi, Gauss-Seidel). Features step-by-step visual solutions to minimize cognitive load, validated by a task-based study with 100% completion metrics.",
    tags: ["Java", "Android SDK", "Numerical Methods", "OOP Design"],
    live: "https://norsu.edu.ph/files/wuri/2025/C3-01.docx.pdf",
    featured: true,
    mediaType: "video",
    videoSrc: "/videos/calculator.mp4",
    aspectRatio: "9/16",
    gradient: "linear-gradient(135deg, rgba(79,158,255,0.12), rgba(139,92,246,0.08))",
    accentColor: "var(--accent-blue)",
    liveLabel: "Read Paper",
    liveIcon: FileText,
  },
];

export default function Projects() {
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

  const currentExpandedProject = projects.find((p) => p.videoSrc === expandedVideo);
  const modalAspectRatio = currentExpandedProject?.aspectRatio || "9/16";

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
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
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

  return (
    <section id="projects" style={sectionStyle}>
      <div style={orbStyle} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
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
          Things I&apos;ve <span style={{ color: "var(--accent)" }}>built.</span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {projects.map((project, index) => {
            const LiveIcon = project.liveIcon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.title}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(241,90,36,0.2)" }}
                style={{ ...featuredCardStyle, background: project.gradient }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isEven ? "1fr 1.1fr" : "1.1fr 1fr",
                    gap: "2.5rem",
                    alignItems: "center",
                  }}
                  className="project-inner-grid"
                >
                  {/* Media container side */}
                  <div style={{ order: isEven ? 0 : 1 }} className="project-image-col">
                    {project.mediaType === "video" ? (
                      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <div
                          onClick={() => setExpandedVideo(project.videoSrc || null)}
                          style={{
                            borderRadius: "16px",
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "#0c0c0b",
                            position: "relative",
                            width: "100%",
                            maxWidth: project.aspectRatio === "9/16" ? "240px" : "100%", 
                            cursor: "pointer",
                            boxShadow: "0 20px 45px rgba(0,0,0,0.5)",
                            display: "flex",
                            flexDirection: "column",
                          }}
                          className="group"
                        >
                          {/* Reusable Premium Mac Window Top Bar */}
                          <div
                            style={{
                              height: "30px",
                              background: "#161614",
                              borderBottom: "1px solid rgba(255,255,255,0.05)",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "0 12px",
                              zIndex: 3,
                              flexShrink: 0,
                            }}
                          >
                            {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                              <div
                                key={color}
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  background: color,
                                  opacity: 0.9,
                                }}
                              />
                            ))}
                          </div>

                          {/* Isolated Aspect Ratio Container for Videos */}
                          <div style={{ position: "relative", width: "100%", aspectRatio: project.aspectRatio, overflow: "hidden" }}>
                            {/* Hover Overlay Icon Indicator */}
                            <div style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(0,0,0,0.3)",
                              opacity: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 2,
                              transition: "opacity 0.2s ease",
                            }}
                            className="video-hover-overlay"
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                            >
                              <div style={{
                                background: "rgba(255,255,255,0.15)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "50%",
                                padding: "0.75rem",
                                border: "1px solid rgba(255,255,255,0.2)"
                              }}>
                                <Maximize2 size={18} color="#fff" />
                              </div>
                            </div>

                            <video
                              src={project.videoSrc}
                              autoPlay
                              loop
                              muted
                              playsInline
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Content side */}
                  <div style={{ order: isEven ? 1 : 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: project.accentColor,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      Featured Project
                    </span>

                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        lineHeight: 1.2,
                        margin: 0,
                      }}
                    >
                      {project.title}
                    </h3>

                    <div
                      style={{
                        background: "rgba(0,0,0,0.25)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "12px",
                        padding: "1rem 1.25rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.75,
                          margin: 0,
                        }}
                      >
                        {project.description}
                      </p>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={tagStyle}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          background: "var(--accent)",
                          color: "#fff",
                          padding: "0.55rem 1.2rem",
                          borderRadius: "999px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          textDecoration: "none",
                          fontFamily: "var(--font-display)",
                          boxShadow: "0 0 20px var(--accent-glow)",
                        }}
                      >
                        <LiveIcon size={13} />
                        {project.liveLabel}
                      </motion.a>

                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          style={iconBtnStyle}
                          title="GitHub"
                        >
                          <GitBranch size={15} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {expandedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedVideo(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(12px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              cursor: "zoom-out",
            }}
          >
            <motion.button
              onClick={() => setExpandedVideo(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} 
              style={{
                position: "relative",
                width: modalAspectRatio === "16/9" ? "min(90vw, 1050px)" : "auto",
                height: modalAspectRatio === "16/9" ? "auto" : "85vh",
                aspectRatio: modalAspectRatio,
                background: "#000",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
                cursor: "default",
              }}
            >
              <video
                src={expandedVideo}
                autoPlay
                controls
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}