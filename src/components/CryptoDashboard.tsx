"use client";

import { useEffect, useState, useCallback, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Wallet, Layers, RefreshCw, Radio, CheckCircle2, TrendingUp, Skull, ShieldCheck } from "lucide-react";

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
  dailyPnL: string;         
  dailyPnLPercent: string;  
}

export function CryptoDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  const processFetch = useCallback(async () => {
    try {
      const response = await fetch("/api/okx");
      const result = await response.json();
      if (response.ok && result.success) {
        setMetrics(result.data);
        setIsSimulated(!!result.simulated);
        setError(null);
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
    let active = true;
    async function initFetch() {
      try {
        const response = await fetch("/api/okx");
        const result = await response.json();
        if (active && response.ok && result.success) {
          setMetrics(result.data);
          setIsSimulated(!!result.simulated);
          setError(null);
        }
      } catch {
        if (active) {
          setError("Initial balance pipeline handshake dropped on synchronization pass.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    initFetch();
    return () => { active = false; };
  }, []);

  const pnlNum = parseFloat(metrics?.dailyPnL || "0");
  const isCooked = pnlNum < 0; 
  const pnlColor = isCooked ? "#ef4444" : pnlNum > 0 ? "#10b981" : "#94a3b8";
  const chartThemeColor = isCooked ? "#ef4444" : "#10b981";

  const generateChartPath = () => {
    if (!metrics?.history || metrics.history.length < 2) return { linePath: "", areaPath: "" };
    
    const chartWidth = 600;
    const chartHeight = 160;
    const padding = 15;
    
    const values = metrics.history.map(h => parseFloat(h.balance));
    const maxVal = Math.max(...values, 15.50);
    const minVal = Math.min(...values, 14.00);
    const range = maxVal - minVal || 1;

    const points = metrics.history.map((entry, index) => {
      const x = (index / (metrics.history.length - 1)) * (chartWidth - padding * 2) + padding;
      const y = chartHeight - padding - ((parseFloat(entry.balance) - minVal) / range) * (chartHeight - padding * 3);
      return { x, y };
    });

    const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

    return { linePath, areaPath };
  };

  const { linePath, areaPath } = generateChartPath();

  // Unified Styling Constants
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
    <section id="crypto-terminal" style={{ position: "relative", padding: "6rem 1.5rem", overflow: "hidden" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Top Header Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <p style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Live Node Integration {isSimulated && <span style={{ opacity: 0.5 }}>(Local Fallback Proxy Active)</span>}
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", lineHeight: 1.1, margin: 0 }}>
              OKX Engine <span style={{ color: "var(--accent)" }}>Terminal.</span>
            </h2>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.6rem 1.25rem", color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.85rem", fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Sync Metrics
          </button>
        </div>

        {/* Core Layout Conditional Renderer */}
        {loading && !metrics ? (
          <div style={{ ...cardStyle, display: "flex", flexDirection: "column", alignItems: "center", padding: "6rem 0", gap: "1rem" }}>
            <div style={{ width: "40px", height: "40px", border: "3px solid rgba(241,90,36,0.1)", borderTopColor: "var(--accent)", borderRadius: "50%" }} className="animate-spin" />
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Decrypting node streams...</p>
          </div>
        ) : error ? (
          <div style={{ ...cardStyle, borderColor: "rgba(239, 68, 68, 0.4)", color: "#ef4444" }}>
            <h3 style={{ margin: 0, fontSize: "1.25rem" }}>Synchronization Issue Detected</h3>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "0.95rem" }}>{error}</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Dynamic Status Header */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: isCooked 
                  ? "linear-gradient(90deg, rgba(239,68,68,0.08) 0%, rgba(0,0,0,0) 100%)"
                  : "linear-gradient(90deg, rgba(16,185,129,0.08) 0%, rgba(0,0,0,0) 100%)",
                border: isCooked ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(16,185,129,0.25)",
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
                  backgroundColor: isCooked ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {isCooked ? <Skull size={26} color="#ef4444" /> : <ShieldCheck size={26} color="#10b981" />}
                </div>
                <div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {"Today's Setup Tracker"}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginTop: "0.2rem" }}>
                    <span style={{ fontSize: "1.75rem", fontWeight: 900, fontFamily: "var(--font-display)", color: "var(--text-primary)", letterSpacing: "0.02em" }}>
                      Status: {isCooked ? "COOKED" : "LOCKED IN"}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "flex-end", fontWeight: 800, fontSize: "1.6rem", fontFamily: "var(--font-display)", color: pnlColor }}>
                  <TrendingUp size={20} style={{ transform: isCooked ? "rotate(180deg)" : "none", color: pnlColor }} />
                  USD {metrics?.dailyPnL}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.15rem" }}>
                  {"Daily PnL Index Return ("}{metrics?.dailyPnLPercent}{"%)"}
                </div>
              </div>
            </motion.div>

            {/* Core Metrics Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              <div style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>Total Net Valuation</span>
                  <Wallet size={18} color="var(--accent)" />
                </div>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                  ${metrics?.totalEquityUsd} <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-muted)" }}>USD</span>
                </div>
              </div>

              <div style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>Available Liquid Cash</span>
                  <CheckCircle2 size={18} color="#10b981" />
                </div>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                  ${metrics?.totalAvailableBalance} <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-muted)" }}>USD</span>
                </div>
              </div>

              <div style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>Isolated Core Margin</span>
                  <Layers size={18} color="#3b82f6" />
                </div>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                  ${metrics?.totalIsolatedMargin} <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-muted)" }}>USD</span>
                </div>
              </div>
            </div>

            {/* Performance Curve Section */}
            {metrics?.history && metrics.history.length > 0 && (
              <div style={{ ...cardStyle, padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <div>
                    <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: 700 }}>
                      1-Week Performance Curve
                    </h3>
                    <p style={{ margin: "0.25rem 0 0 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      Rolling 7-day index validation timeline
                    </p>
                  </div>
                  <div style={{ fontSize: "0.8rem", background: "rgba(255,255,255,0.04)", padding: "0.3rem 0.75rem", borderRadius: "8px", color: "var(--text-secondary)", fontWeight: 600 }}>
                    Active Period: 7D
                  </div>
                </div>

                <div style={{ width: "100%", height: "160px", position: "relative" }}>
                  <svg viewBox="0 0 600 160" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                    <defs>
                      <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={chartThemeColor} stopOpacity="0.15" />
                        <stop offset="100%" stopColor={chartThemeColor} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d={areaPath} fill="url(#chartAreaGradient)" />
                    <path d={linePath} fill="none" stroke={chartThemeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "0.75rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{metrics.history[0]?.date}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{metrics.history[metrics.history.length - 1]?.date}</span>
                </div>
              </div>
            )}

            {/* Split Grid FIXED for Mobile views: Replaces '1.3fr 1fr' with fluid auto-fit mapping */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", 
              gap: "2rem", 
              alignItems: "start" 
            }}>
              
              {/* Asset Allocation Profile */}
              <div style={cardStyle}>
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
                          <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{asset.equity}</div>
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
              </div>

              {/* Behind the Terminal Copywriting */}
              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 1.5rem 0", fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: 700 }}>
                  Behind the Terminal
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: 1.65, margin: "0 0 1.25rem 0" }}>
                  Why stream my actual financial assets onto a portfolio page? Because crypto is a long-standing personal hobby of mine, and handling raw market data makes for perfect portfolio testing grounds.
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: 1.65, margin: 0 }}>
                  Instead of designing a static mockup with hardcoded placeholders, I hooked up a live, restricted API token directly to the OKX order books. This panel monitors how my balances stack up compared to yesterday—giving a running readout of whether my trading setups are currently performing or completely melted down.
                </p>
              </div>

            </div>
            
          </div>
        )}
      </div>
    </section>
  );
}