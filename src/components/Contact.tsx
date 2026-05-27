"use client";

import { motion } from "framer-motion";
import { type CSSProperties, type FormEvent, useState } from "react";
import { Mail, MapPin, Send, ExternalLink, GitBranch } from "lucide-react";

const socials = [
  { icon: ExternalLink, label: "Twitter", href: "https://twitter.com/yourhandle" },
  { icon: ExternalLink, label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
  { icon: GitBranch, label: "GitHub", href: "https://github.com/yourhandle" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

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
    background: "radial-gradient(circle, rgba(241,90,36,0.12), transparent 70%)",
    filter: "blur(80px)",
    top: "0",
    left: "-150px",
    pointerEvents: "none",
  };

  const cardStyle: CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "3rem",
    backdropFilter: "blur(12px)",
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "0.9rem 1.2rem",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box" as const,
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "var(--text-muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    marginBottom: "0.5rem",
    fontFamily: "var(--font-display)",
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" style={sectionStyle}>
      <div style={orbStyle} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
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
          Contact
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
          Let&apos;s work{" "}
          <span style={{ color: "var(--accent)" }}>together.</span>
        </motion.h2>

        {/* Two column layout */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}>
              Have a project in mind or just want to say hi?
              My inbox is always open. I&apos;ll get back to you as soon as possible.
            </p>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: Mail, text: "hello@yourname.com", href: "mailto:hello@yourname.com" },
                { icon: MapPin, text: "Dumaguete, Philippines", href: "#" },
              ].map((item) => (
                <a
                  key={item.text}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                  }}
                >
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "rgba(241,90,36,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <item.icon size={16} color="var(--accent)" />
                  </div>
                  {item.text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={cardStyle}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "2rem 0" }}
              >
                <div style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}>🎉</div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                }}>
                  Message sent!
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Thanks for reaching out. I&apos;ll reply soon.
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    marginTop: "1.5rem",
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "999px",
                    padding: "0.6rem 1.5rem",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(241,90,36,0.5)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(241,90,36,0.5)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    required
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" as const }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(241,90,36,0.5)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "0.9rem 2rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-display)",
                    cursor: "pointer",
                    boxShadow: "0 0 30px var(--accent-glow)",
                  }}
                >
                  Send Message <Send size={16} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}