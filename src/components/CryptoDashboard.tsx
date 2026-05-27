"use client";

import { useEffect, useState, useCallback, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Wallet, ShieldAlert, Layers, RefreshCw, Radio, CheckCircle2, TrendingUp, IceCream } from "lucide-react";

interface CryptoAsset {
  currency: string;
  equity: string;
  available: string;
  frozen: string;
  upl: string;
}

interface HistoryEntry {
  date: string;
  balance: string;
}

interface DashboardMetrics {
  totalEquityUsd: string;
  totalIsolatedMargin: string;
  totalAvailableBalance: string;
  previousEquityUsd?: string; 
  assets: CryptoAsset[];
  history: HistoryEntry[];
  monthlyPnL: string;
  monthlyPnLPercent: string;
}

export function CryptoDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const processFetch = useCallback(async () => {
    try {
      const response = await fetch("/api/okx");
      const result = await response.json();
      
      if (response.ok && result.success) {
        setMetrics(result.data);
      } else {
        setError(result.error || "An unexpected error occurred while parsing API response logs.");
      }
    } catch {
      setError("Failed to construct standard transport loop connection over local interfaces.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    processFetch();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    processFetch();
  }, [processFetch]);

  const currentEquity = parseFloat(metrics?.totalEquityUsd || "0");
  const isLockedIn = true; // Retains your green "LOCKED IN" setup status header

  // Decouples the chart styling to replicate the exact red/pink cliff trendline from your OKX mobile UI
  const isChartRed = currentEquity === 0;
  const chartThemeColor = isChartRed ? "#ef4444" : "#10b981";

  const generateChartPath = () => {
    if (!metrics?.history || metrics.history.length < 2) return { linePath: "", areaPath: "" };
    
    const chartWidth = 600;
    const chartHeight = 160;
    const padding = 10;
    
    const values = metrics.history.map(h => parseFloat(h.balance));
    const maxVal = Math.max(...values, 70.49) * 1.05;
    const minVal = 0;
    const range = maxVal - minVal || 1;

    const points = metrics.history.map((entry, index) => {
      const x = (index / (metrics.history.length - 1)) * (chartWidth - padding * 2) + padding;
      const y = chartHeight - padding - ((parseFloat(entry.balance) - minVal) / range) * (chartHeight - padding * 2);
      return { x, y };
    });

    const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

    return { linePath, areaPath };
  };

  const { linePath, areaPath } = generateChartPath();

  const panelStyle: CSSProperties = {
    position: "relative",
    padding: "6rem 1.5rem",
    overflow: "hidden",
  };

  const ambientGlowStyle: CSSProperties = {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: isChartRed
      ? "radial-gradient(circle, rgba(239,68,68,0.04), transparent 75%)"
      : "radial-gradient(circle, rgba(16,185,129,0.05), transparent 75%)",
    filter: "blur(90px)",
    bottom: "-100px",
    right: "-150px",
    pointerEvents: "none",
    transition: "background 0.5s ease",
  };

  const cardStyle: CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "24px",
    padding: "2.5rem",
    backdropFilter: "blur(16px)",
  };

  const subCardStyle: CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: "16px",
    padding: "1.5rem",
  };

  return (
    <section id="crypto-terminal" style={panelStyle}>
      <div style={ambientGlowStyle} />

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

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
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
            OKX Engine <span style={{ color: "var(--accent)" }}>Terminal.</span>
          </motion.h2>

          <motion.button
            onClick={handleRefresh}
            disabled={loading}
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
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Sync Metrics
          </motion.button>
        </div>

        {loading && !metrics ? (
          <div style={{ ...cardStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 0", gap: "1rem" }}>
            <div className="animate-spin" style={{ width: "40px", height: "40px", border: "3px solid rgba(241,90,36,0.1)", borderTopColor: "var(--accent)", borderRadius: "50%" }} />
            <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>Decrypting node stream signatures...</p>
          </div>
        ) : error ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ ...cardStyle, border: "1px solid rgba(239,68,68,0.2)", display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ShieldAlert color="#ef4444" size={24} />
            </div>
            <div>
              <h4 style={{ color: "var(--text-primary)", margin: "0 0 0.25rem 0", fontFamily: "var(--font-display)", fontWeight: 700 }}>API Handshake Fault</h4>
              <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.9rem", lineHeight: 1.5 }}>{error}</p>
            </div>
          </motion.div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* SETUP TRACKER PROFILE HEADER BAR */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: "linear-gradient(90deg, rgba(16,185,129,0.06) 0%, rgba(0,0,0,0) 100%)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: "20px",
                padding: "1.5rem 2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1.5rem"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(16,185,129,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <IceCream size={26} color="#10b981" />
                </div>
                <div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {"Today's Setup Tracker"}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginTop: "0.2rem" }}>
                    <span style={{ fontSize: "1.75rem", fontWeight: 900, fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                      Status: LOCKED IN
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "flex-end", fontWeight: 800, fontSize: "1.5rem", fontFamily: "var(--font-display)", color: "#10b981" }}>
                  <TrendingUp size={20} />
                  USD {metrics?.monthlyPnL}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.15rem" }}>
                  {"1M PnL Index Return ("}{metrics?.monthlyPnLPercent}{"%)"}
                </div>
              </div>
            </motion.div>

            {/* BALANCE CARD TILES */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Net Valuation</span>
                  <Wallet size={18} color="var(--accent)" />
                </div>
                <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                  ${metrics?.totalEquityUsd} <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-muted)" }}>USD</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Available Liquid Cash</span>
                  <CheckCircle2 size={18} color="#10b981" />
                </div>
                <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                  ${metrics?.totalAvailableBalance} <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-muted)" }}>USD</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Isolated Core Margin</span>
                  <Layers size={18} color="#3b82f6" />
                </div>
                <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                  ${metrics?.totalIsolatedMargin} <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-muted)" }}>USD</span>
                </div>
              </motion.div>
            </div>

            {/* PERFORMANCE CURVE TIMELINE CHART */}
            {metrics?.history && metrics.history.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ ...cardStyle, padding: "2rem" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <div>
                    <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: 700 }}>
                      1-Month Performance Curve
                    </h3>
                    <p style={{ margin: "0.25rem 0 0 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      Rolling 30-day index validation timeline
                    </p>
                  </div>
                  <div style={{ fontSize: "0.8rem", background: "rgba(255,255,255,0.04)", padding: "0.3rem 0.75rem", borderRadius: "8px", color: "var(--text-secondary)", fontWeight: 600 }}>
                    Active Period: 30D
                  </div>
                </div>

                <div style={{ width: "100%", height: "160px", position: "relative", overflow: "visible" }}>
                  <svg viewBox="0 0 600 160" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                    <defs>
                      <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={chartThemeColor} stopOpacity="0.12" />
                        <stop offset="100%" stopColor={chartThemeColor} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <motion.path 
                      key={`area-${linePath}`}
                      d={areaPath} 
                      fill="url(#chartAreaGradient)" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />

                    <motion.path 
                      key={`line-${linePath}`}
                      d={linePath} 
                      fill="none" 
                      stroke={chartThemeColor} 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "0.75rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>{metrics.history[0]?.date}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>{metrics.history[metrics.history.length - 1]?.date}</span>
                </div>
              </motion.div>
            )}

            {/* ASSET ALLOCATION PROFILE AND DOCUMENTATION WRITEUPS */}
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2rem", alignItems: "start" }} className="contact-grid">
              
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={cardStyle}>
                <h3 style={{ margin: "0 0 1.5rem 0", fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Radio size={16} color="var(--accent)" /> Asset Allocation Profile
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {metrics?.assets && metrics.assets.length > 0 ? (
                    metrics.assets.map((asset) => (
                      <div key={asset.currency} style={{ ...subCardStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "1.1rem" }}>{asset.currency}</div>
                          <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: "0.25rem" }}>Available: {asset.available}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>{asset.equity}</div>
                          {parseFloat(asset.upl) !== 0 && (
                            <div style={{ fontSize: "0.8rem", color: parseFloat(asset.upl) >= 0 ? "#10b981" : "#ef4444", marginTop: "0.25rem" }}>
                              {parseFloat(asset.upl) >= 0 ? "+" : ""}{asset.upl} USD
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>No active non-zero accounting targets tracked inside Unified Margin fields.</p>
                  )}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={cardStyle}>
                <h3 style={{ margin: "0 0 1.5rem 0", fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: 700 }}>
                  Behind the Terminal
                </h3>
                
                <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: 1.65, margin: "0 0 1.25rem 0" }}>
                  Why stream my actual financial assets onto a portfolio page? Because crypto is a long-standing personal hobby of mine, and handling raw market data makes for a perfect testing grounds.
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: 1.65, margin: 0 }}>
                  Instead of designing a static mockup with hardcoded placeholders, I hooked up a live, restricted API token directly to the OKX order books. This panel monitors how my balances stack up compared to yesterday—giving a running readout of whether my trading setups are currently performing or completely melted down.
                </p>
              </motion.div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}