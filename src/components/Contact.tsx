"use client";

import { motion } from "framer-motion";
import { type CSSProperties, type FormEvent, useState, useEffect } from "react";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faXTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

// Section 3.1: Global scope static rules
const LIMIT = 2;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

const socials = [
  { icon: faFacebookF, label: "Facebook", href: "https://facebook.com/yourhandle" },
  { icon: faXTwitter, label: "X", href: "https://x.com/remejie33205" },
  { icon: faLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/remejie-maano-954b34411" },
  { icon: faGithub, label: "GitHub", href: "https://github.com/rmjiemaano" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  // Section 3.2: Asynchronous local storage macro-task guard check on mount
  useEffect(() => {
    const evaluateSubmissions = () => {
      const now = Date.now();
      const stored = localStorage.getItem("contact_submissions");
      if (stored) {
        const timestamps: number[] = JSON.parse(stored);
        const recent = timestamps.filter((t) => now - t < WINDOW_MS);
        if (recent.length >= LIMIT) {
          setLimitReached(true);
        }
      }
    };

    const timeoutId = setTimeout(evaluateSubmissions, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const updateClientSideLimit = () => {
    const now = Date.now();
    const stored = localStorage.getItem("contact_submissions");
    const timestamps: number[] = stored ? JSON.parse(stored) : [];
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    localStorage.setItem("contact_submissions", JSON.stringify(recent));
    if (recent.length >= LIMIT) {
      setLimitReached(true);
    }
  };

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

  // Section 3.3: Modernized Two-Tier Validation Submission Process
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (limitReached) return;
    setIsSubmitting(true);

    try {
      // Step 1: Query your server gatekeeper to see if this IP is allowed to submit
      const gatekeeperResponse = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const gatekeeperResult = await gatekeeperResponse.json();
      
      if (gatekeeperResponse.status === 429 || gatekeeperResult.error === "RATE_LIMIT_EXCEEDED") {
        setLimitReached(true);
        alert("Submission limit reached. Please try again tomorrow.");
        setIsSubmitting(false);
        return;
      }

      if (!gatekeeperResponse.ok || !gatekeeperResult.isAllowed) {
        alert("Verification failed. Please try again later.");
        setIsSubmitting(false);
        return;
      }

      // Step 2: Since server validated the rate limit, dispatch submission from browser to Web3Forms
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const web3Result = await web3Response.json();
      
      if (web3Response.ok && web3Result.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        updateClientSideLimit();
      } else {
        alert("Web3Forms endpoint rejected the data. Verify your access key configuration.");
      }
    } catch (error) {
      console.error("Submission Sequence Exception Intercepted:", error);
      alert("An unexpected transport error occurred while dispatching form metrics.");
    } {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={sectionStyle}>
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
          Contact
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
          Let&apos;s work{" "}
          <span style={{ color: "var(--accent)" }}>together.</span>
        </motion.h2>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
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

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: Mail, text: "remejiemaano17@gmail.com", href: "mailto:remejiemaano17@gmail.com" },
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
                  <FontAwesomeIcon icon={social.icon} style={{ fontSize: "18px" }} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={cardStyle}
          >
            {limitReached ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ textAlign: "center", padding: "2rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "rgba(241,90,36,0.1)",
                    border: "1px solid rgba(241,90,36,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 30px rgba(241,90,36,0.2), 0 0 60px rgba(241,90,36,0.1)",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <motion.path
                      d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                    />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.02em",
                  }}>
                    Slow down!
                  </h3>
                  <p style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    maxWidth: "280px",
                    margin: "0 auto",
                  }}>
                    You have reached the limit of {LIMIT} messages per 24 hours.
                    Please try again tomorrow.
                  </p>
                </motion.div>

                <div style={{
                  width: "40px",
                  height: "1px",
                  background: "rgba(241,90,36,0.3)",
                }} />
              </motion.div>
            ) : sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ textAlign: "center", padding: "2rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "rgba(241,90,36,0.1)",
                    border: "1px solid rgba(241,90,36,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 30px rgba(241,90,36,0.2), 0 0 60px rgba(241,90,36,0.1)",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <motion.path
                      d="M5 13l4 4L19 7"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                    />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.02em",
                  }}>
                    Message received!
                  </h3>
                  <p style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    maxWidth: "280px",
                    margin: "0 auto",
                  }}>
                    Thanks for reaching out, I&apos;ll get back to you as soon as possible.
                  </p>
                </motion.div>

                <div style={{
                  width: "40px",
                  height: "1px",
                  background: "rgba(241,90,36,0.3)",
                }} />

                <motion.button
                  onClick={() => setSent(false)}
                  whileHover={{ scale: 1.03, borderColor: "rgba(241,90,36,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "999px",
                    padding: "0.65rem 1.75rem",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    transition: "border-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                  }}
                >
                  Send another
                </motion.button>
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
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
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    boxShadow: "0 0 30px var(--accent-glow)",
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      Sending... <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}