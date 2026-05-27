"use client";

import { useState, useEffect, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "0 2rem",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.3s ease",
    background: scrolled ? "rgba(10, 10, 15, 0.85)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
  };

  const logoStyle: CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: 800,
    color: "var(--text-primary)",
    textDecoration: "none",
    letterSpacing: "-0.02em",
    fontFamily: "var(--font-display)",
  };

  const linkStyle: CSSProperties = {
    color: "var(--text-secondary)",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: 400,
    transition: "color 0.2s ease",
    cursor: "pointer",
  };

  const ctaStyle: CSSProperties = {
    background: "var(--accent)",
    color: "#fff",
    padding: "0.55rem 1.4rem",
    borderRadius: "999px",
    fontSize: "0.875rem",
    fontWeight: 600,
    textDecoration: "none",
    fontFamily: "var(--font-display)",
    boxShadow: "0 0 20px var(--accent-glow), 0 0 40px var(--accent-soft)",
  };

  const mobileMenuStyle: CSSProperties = {
    position: "fixed",
    top: "70px",
    left: 0,
    right: 0,
    zIndex: 99,
    background: "rgba(10, 10, 15, 0.97)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "1.5rem 2rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };

  const mobileLinkStyle: CSSProperties = {
    color: "var(--text-secondary)",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: 500,
  };

  const mobileCtaStyle: CSSProperties = {
    background: "var(--accent)",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "999px",
    fontSize: "0.95rem",
    fontWeight: 600,
    textDecoration: "none",
    textAlign: "center",
    fontFamily: "var(--font-display)",
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={navStyle}
      >
        <a href="#" style={logoStyle}>
          Remejie<span style={{ color: "var(--accent)" }}> Maano</span>
        </a>

          <ul
          style={{
            gap: "2.5rem",
            listStyle: "none",
            alignItems: "center",
            margin: 0,
            padding: 0,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={ctaStyle}
          >
            Contact
          </motion.a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white md:hidden"
          style={{ backdropFilter: "blur(10px)" }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            style={mobileMenuStyle}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={mobileLinkStyle}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              style={mobileCtaStyle}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
