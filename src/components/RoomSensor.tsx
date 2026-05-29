"use client";

import { useEffect, useState, useCallback, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Droplets, Wifi, WifiOff, RefreshCw } from "lucide-react";

type SensorData = {
  online: boolean;
  temperature?: number;
  humidity?: number;
  updatedAt?: number;
};

// Relatable room comfort checks
function getComfortLabel(temp: number, hum: number) {
  if (temp > 32) return { label: "VIBE: SAUNA SIMULATOR 🥵", color: "#ff4d4d" };
  if (temp < 18) return { label: "VIBE: CRISP & CHILLY 🥶", color: "#4f9eff" };
  if (hum > 75) return { label: "VIBE: JUNGLE ATMOSPHERE 🌴", color: "#4f9eff" };
  if (hum < 25) return { label: "VIBE: ARID DESERT ZONE 🏜️", color: "#f5a623" };
  return { label: "VIBE: PERFECTLY COZY ☕", color: "#4caf50" };
}

function timeAgo(ms: number) {
  const seconds = Math.floor((Date.now() - ms) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

export default function RoomSensor() {
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/sensor");
      const json = await res.json();
      setData(json);
    } catch {
      setData({ online: false });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => fetchData(), 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const cardStyle: CSSProperties = {
    position: "relative",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(12px)",
    overflow: "hidden",
    padding: "clamp(1.25rem, 4vw, 2rem)", 
    width: "100%",
    boxSizing: "border-box",
  };

  const comfort = data?.online && data.temperature !== undefined && data.humidity !== undefined
    ? getComfortLabel(data.temperature, data.humidity)
    : null;

  const currentTemp = data?.temperature ?? 22;
  const currentHum = data?.humidity ?? 45;

  const tempPulseDuration = Math.max(0.6, 4.5 - (currentTemp / 12)); 
  const tempGlowRadius = Math.min(75, 35 + (currentTemp * 0.8));

  const humidityDuration = Math.max(0.8, 5.0 - (currentHum / 20));
  const particleRadius = Math.min(5.5, 1.5 + (currentHum / 22));

  const panelStyle: CSSProperties = {
    position: "relative",
    padding: "4rem 1rem",
    overflow: "hidden",
    width: "100%",
    boxSizing: "border-box",
  };

  const orbStyle2: CSSProperties = {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: data?.online
      ? "radial-gradient(circle, rgba(79,158,255,0.06), transparent 75%)"
      : "radial-gradient(circle, rgba(255,77,77,0.04), transparent 75%)",
    filter: "blur(90px)",
    top: "-100px",
    left: "-150px",
    pointerEvents: "none",
    transition: "background 0.5s ease",
  };

  return (
    <section id="room-sensor" style={panelStyle}>
      <div style={orbStyle2} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          Live Node Integration
        </motion.p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
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
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Room <span style={{ color: "var(--accent)" }}>Monitor.</span>
          </motion.h2>

          <motion.button
            onClick={() => fetchData(true)}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "999px",
              padding: "0.6rem 1.25rem",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
            }}
          >
            <motion.div animate={{ rotate: refreshing ? 360 : 0 }} transition={{ duration: 0.6 }}>
              <RefreshCw size={14} />
            </motion.div>
            Sync Sensor
          </motion.button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }}>

          {/* Left Side — Room Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={cardStyle}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "0.25rem",
                }}>
                  Live Room Monitor
                </p>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  margin: 0,
                }}>
                  ESP32 + BME280
                </h3>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: data?.online ? "rgba(76,175,80,0.1)" : "rgba(255,77,77,0.1)",
                  border: `1px solid ${data?.online ? "rgba(76,175,80,0.3)" : "rgba(255,77,77,0.3)"}`,
                  borderRadius: "999px",
                  padding: "0.3rem 0.75rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: data?.online ? "#4caf50" : "#ff4d4d",
                  fontFamily: "var(--font-display)",
                  whiteSpace: "nowrap"
                }}>
                  {data?.online ? (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4caf50" }}
                      />
                      <Wifi size={11} /> Online
                    </>
                  ) : (
                    <>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff4d4d" }} />
                      <WifiOff size={11} /> Offline
                    </>
                  )}
                </div>

                <motion.button
                  onClick={() => fetchData(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                  }}
                >
                  <motion.div animate={{ rotate: refreshing ? 360 : 0 }} transition={{ duration: 0.6 }}>
                    <RefreshCw size={13} />
                  </motion.div>
                </motion.button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", justifyContent: "center", padding: "3rem 0" }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{
                      width: "32px", height: "32px",
                      borderRadius: "50%",
                      border: "2px solid rgba(241,90,36,0.2)",
                      borderTop: "2px solid var(--accent)",
                    }}
                  />
                </motion.div>
              ) : !data?.online ? (
                <motion.div
                  key="offline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: "center", padding: "2rem 0" }}
                >
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#ff4d4d", marginBottom: "0.4rem" }}>
                    Node Offline
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                    ESP32 check-in failed. Verify connection settings.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="online"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ position: "relative", marginBottom: "1.5rem", width: "100%" }}>
                    <svg viewBox="0 0 280 140" style={{ width: "100%", height: "auto", display: "block" }}>
                      <rect x="10" y="10" width="260" height="120" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                      <line x1="10" y1="110" x2="270" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <rect x="180" y="25" width="60" height="45" rx="3" fill="rgba(79,158,255,0.06)" stroke="rgba(79,158,255,0.2)" strokeWidth="1.5" />
                      <line x1="210" y1="25" x2="210" y2="70" stroke="rgba(79,158,255,0.15)" strokeWidth="1" />
                      <line x1="180" y1="47" x2="240" y2="47" stroke="rgba(79,158,255,0.15)" strokeWidth="1" />
                      <path d="M40 110 L40 65 Q40 58 47 58 L75 58 Q82 58 82 65 L82 110" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                      <circle cx="78" cy="84" r="2" fill="rgba(255,255,255,0.15)" />

                      {[
                        { cx: 120, cy: 50, delay: 0 },
                        { cx: 135, cy: 65, delay: 0.4 },
                        { cx: 150, cy: 45, delay: 0.8 },
                        { cx: 125, cy: 80, delay: 1.2 },
                        { cx: 155, cy: 75, delay: 0.2 },
                      ].map((p, i) => (
                        <motion.circle
                          key={i}
                          cx={p.cx}
                          cy={p.cy}
                          r={particleRadius}
                          fill={`rgba(79,158,255,${Math.min(0.6, currentHum / 100 + 0.1)})`}
                          initial={{ opacity: 0, cy: p.cy + 10 }}
                          animate={{ opacity: [0, 0.7, 0], cy: [p.cy + 10, p.cy - 10] }}
                          transition={{ repeat: Infinity, duration: humidityDuration, delay: p.delay, ease: "easeInOut" }}
                        />
                      ))}

                      <motion.ellipse
                        cx="140" cy="110" ry="8"
                        fill={`rgba(241,90,36,${Math.min(0.25, currentTemp / 100)})`}
                        animate={{ 
                          rx: [40, tempGlowRadius, 40], 
                          opacity: [0.12, Math.min(0.35, currentTemp / 75), 0.12] 
                        }}
                        transition={{ repeat: Infinity, duration: tempPulseDuration, ease: "easeInOut" }}
                      />

                      <rect x="100" y="75" width="22" height="38" rx="11" fill="none" stroke="rgba(241,90,36,0.3)" strokeWidth="1.5" />
                      <motion.rect
                        x="107" width="8" rx="4" fill="var(--accent)"
                        initial={{ height: 0, y: 112 }}
                        animate={{
                          height: Math.min(32, Math.max(8, (currentTemp - 15) * 1.5)),
                          y: 112 - Math.min(32, Math.max(8, (currentTemp - 15) * 1.5)),
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                      <circle cx="111" cy="113" r="6" fill="var(--accent)" opacity="0.8" />
                    </svg>
                  </div>

                  {/* Mobile Wrap Safe Info Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                    <div style={{ background: "rgba(241,90,36,0.06)", border: "1px solid rgba(241,90,36,0.15)", borderRadius: "14px", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent)" }}>
                        <Thermometer size={14} />
                        <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-display)" }}>
                          Temperature
                        </span>
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
                        {data.temperature?.toFixed(1)}°C
                      </div>
                    </div>

                    <div style={{ background: "rgba(79,158,255,0.06)", border: "1px solid rgba(79,158,255,0.15)", borderRadius: "14px", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#4f9eff" }}>
                        <Droplets size={14} />
                        <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-display)" }}>
                          Humidity
                        </span>
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 800, color: "#4f9eff", lineHeight: 1 }}>
                        {data.humidity?.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Refined Room Vibe Check Display */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    {comfort && (
                      <span style={{ fontSize: "0.85rem", fontWeight: 800, color: comfort.color, fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}>
                        {comfort.label}
                      </span>
                    )}
                    {data.updatedAt && (
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                        Updated {timeAgo(data.updatedAt)}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Side — Info Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={cardStyle}>
            <h3 style={{ margin: "0 0 1.5rem 0", fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: 700 }}>
              Behind the Monitor
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: 1.65, margin: "0 0 1.25rem 0" }}>
              This panel streams live temperature and humidity readings directly
              from an ESP32 microcontroller with a BME280 sensor placed in my room.
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: 1.65, margin: "0 0 1.5rem 0" }}>
              The ESP32 POSTs sensor data every 30 seconds to a Next.js API route,
              stored in Upstash Redis with a 5-minute TTL.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["ESP32", "BME280", "Next.js API", "Upstash Redis"].map((tag) => (
                <span key={tag} style={{
                  background: "rgba(241,90,36,0.08)",
                  border: "1px solid rgba(241,90,36,0.2)",
                  borderRadius: "999px",
                  padding: "0.35rem 0.9rem",
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}