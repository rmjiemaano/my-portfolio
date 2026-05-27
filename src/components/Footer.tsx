import { type CSSProperties } from "react";

export default function Footer() {
  const footerStyle: CSSProperties = {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "2rem 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
    maxWidth: "1100px",
    margin: "0 auto",
  };

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={footerStyle}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "1rem",
          color: "var(--text-primary)",
        }}>
          your<span style={{ color: "var(--accent)" }}>name</span>
        </span>
        <span style={{
          color: "var(--text-muted)",
          fontSize: "0.8rem",
          fontFamily: "var(--font-body)",
        }}>
          © {new Date().getFullYear()} — Built with Next.js & Framer Motion
        </span>
      </div>
    </footer>
  );
}