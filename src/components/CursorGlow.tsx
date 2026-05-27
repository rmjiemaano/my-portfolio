"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const hide = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, []);

  const glowStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(241,90,36,0.07), transparent 70%)",
    pointerEvents: "none",
    zIndex: 9999,
    transform: `translate(${pos.x - 200}px, ${pos.y - 200}px)`,
    opacity: visible ? 1 : 0,
    transition: "opacity 0.3s ease",
  };

  return (
    <motion.div
      style={glowStyle}
      animate={{ x: pos.x - 200, y: pos.y - 200 }}
      transition={{ type: "spring", stiffness: 500, damping: 50, mass: 0.5 }}
    />
  );
}