"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";

const mo = { fontFamily: "'Space Mono', monospace" };
const GREEN = "#C4F000";
const IN = { fontFamily: "'Inter', sans-serif" };

function Reveal({ children, delay = 0, y = 30 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const briefs = [
  { title: "Klaviyo Ecosystem — Q2 2026 Trends", status: "In Progress", pct: 72, tag: "Market Intel", color: "#ec4899", rgb: "236,72,153" },
  { title: "Centr Fitness Pre-Call Research Pack", status: "Complete", pct: 100, tag: "Client Research", color: "#10b981", rgb: "16,185,129" },
  { title: "Nexmail Product Strategy v2", status: "In Progress", pct: 45, tag: "Product", color: "#a855f7", rgb: "168,85,247" },
];

const competitors = [
  { name: "Retention.com", threat: "High", color: "#ef4444", rgb: "239,68,68", updated: "Apr 1, 2026", notes: "Strong identity resolution product. Growing fast in DTC space. Watch their new Klaviyo Sync feature — direct overlap with our lifecycle positioning." },
  { name: "Yotpo", threat: "Medium", color: "#f59e0b", rgb: "245,158,11", updated: "Mar 28, 2026", notes: "Expanding from loyalty into full CRM suite. Strong brand recognition. Their lifecycle offering is still shallow compared to BMO's strategy depth." },
  { name: "Rejoiner", threat: "Low", color: "#10b981", rgb: "16,185,129", updated: "Mar 20, 2026", notes: "Niche email automation player losing ground to native Klaviyo flows. Not a major threat for enterprise-tier clients." },
];

const insights = [
  { text: "Klaviyo announces AI-powered segmentation beta — BMO clients eligible for early access", source: "Klaviyo Blog", date: "Apr 1" },
  { text: "BFCM 2026 planning starts now — brands locking in retainer budgets in Q2", source: "eCom Industry Report", date: "Mar 31" },
  { text: "SMS opt-in rates declining post-TCPA enforcement — strategy review needed for 4 clients", source: "Attentive Research", date: "Mar 29" },
  { text: "Tiered loyalty outperforms points-only by 34% in retention rate (Q1 2026 data)", source: "Loyalty360", date: "Mar 27" },
  { text: "Subscription growth fastest in food & beverage — Centr + MoonBrew direct opportunity", source: "Recharge Data", date: "Mar 25" },
];

export default function ResearchPage() {
  const [expandedComp, setExpandedComp] = useState(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh", color: "#E8E8F0" }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.016, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} /><Nav />

      {/* Hero */}
      <div style={{ paddingTop: 54, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "70px 60px 0" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>👑</span>
              <span style={{ ...mo, fontSize: 9, color: "rgba(236,72,153,0.7)", letterSpacing: "0.18em" }}>PRINCESS BUBBLEGUM — RESEARCH & STRATEGY</span>
            </div>
            <h1 style={{ ...IN, fontSize: "clamp(2.2rem, 4vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 6 }}>Research & Strategy</h1>
            <p style={{ ...mo, fontSize: 11, color: "#2a3040" }}>Market intelligence · competitor tracking · client research · Nexmail product strategy</p>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "56px 60px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Active Briefs */}
            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...mo, fontSize: 9, color: "#ec4899" }}>✦</span>
                  <span style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.15em" }}>ACTIVE BRIEFS</span>
                </div>
              </Reveal>
              {briefs.map((b, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <GlowCard style={{ padding: "18px 22px", marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <div style={{ ...IN, fontSize: 13, fontWeight: 600, color: "#C0C5D2", marginBottom: 6 }}>{b.title}</div>
                        <span style={{ ...mo, fontSize: 8, color: b.color, background: `${b.color}10`, padding: "2px 8px", borderRadius: 3, border: `1px solid ${b.color}20` }}>{b.tag}</span>
                      </div>
                      <span style={{ ...mo, fontSize: 12, color: b.pct === 100 ? "#10b981" : "#f59e0b", flexShrink: 0, marginLeft: 12 }}>{b.pct}%</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 3 }}>
                      <div style={{ width: `${b.pct}%`, height: 3, borderRadius: 4, background: b.color, transition: "width 0.6s ease" }} />
                    </div>
                  </GlowCard>
                </Reveal>
              ))}
            </div>

            {/* Nexmail Strategy */}
            <Reveal delay={0.2}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ ...mo, fontSize: 9, color: "#a855f7" }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.15em" }}>NEXMAIL PRODUCT STRATEGY</span>
              </div>
              <GlowCard style={{ padding: "24px", borderTop: "1px solid rgba(168,85,247,0.2)" }}>
                {/* Back-light accent */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(180deg, rgba(168,85,247,0.05) 0%, transparent 100%)", borderRadius: "14px 14px 0 0", pointerEvents: "none" }} />
                <div style={{ position: "relative" }}>
                  <div style={{ ...IN, fontSize: 15, fontWeight: 700, color: "#D0D5E2", marginBottom: 10 }}>Nexmail v2 — Strategy Brief</div>
                  <p style={{ fontSize: 13, color: "#4a5570", lineHeight: 1.7, marginBottom: 16 }}>
                    Positioned as a high-touch lifecycle intelligence layer sitting above Klaviyo. Core differentiator: human-verified AI strategy + execution, not just automation.
                  </p>
                  {[
                    "AI send-time optimisation per subscriber segment",
                    "Predictive churn scoring integrated with Klaviyo tags",
                    "White-glove onboarding for brands doing $1M+ email revenue",
                    "BMO strategy layer — not a pure SaaS play",
                  ].map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, paddingBottom: 8, borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                      <span style={{ color: "#a855f7", fontSize: 9, marginTop: 3, opacity: 0.6 }}>▸</span>
                      <span style={{ fontSize: 12, color: "#4a5570", lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, padding: "10px 14px", background: "rgba(168,85,247,0.05)", borderRadius: 7, border: "1px solid rgba(168,85,247,0.1)" }}>
                    <span style={{ ...mo, fontSize: 9, color: "#a855f7" }}>NEXT → </span>
                    <span style={{ fontSize: 12, color: "#4a5570" }}>Pricing model validation — internal review Apr 7</span>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Competitor Intel */}
            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...mo, fontSize: 9, color: "#ec4899" }}>✦</span>
                  <span style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.15em" }}>COMPETITOR INTEL</span>
                </div>
              </Reveal>
              {competitors.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.07}>
                  <GlowCard
                    style={{ padding: "16px 20px", marginBottom: 10, cursor: "pointer", borderLeft: `2px solid rgba(${c.rgb},0.5)` }}
                    onClick={() => setExpandedComp(expandedComp === c.name ? null : c.name)}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: expandedComp === c.name ? 12 : 0 }}>
                      <span style={{ ...IN, fontSize: 13, fontWeight: 600, color: "#C0C5D2" }}>{c.name}</span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ ...mo, fontSize: 8, fontWeight: 700, color: c.color, background: `rgba(${c.rgb},0.08)`, padding: "2px 7px", borderRadius: 3 }}>{c.threat.toUpperCase()} THREAT</span>
                        <span style={{ color: "#2a3040", fontSize: 10 }}>{expandedComp === c.name ? "▲" : "▼"}</span>
                      </div>
                    </div>
                    {expandedComp === c.name && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <p style={{ fontSize: 12, color: "#4a5570", lineHeight: 1.65, marginBottom: 6 }}>{c.notes}</p>
                        <span style={{ ...mo, fontSize: 9, color: "#2a3040" }}>Updated: {c.updated}</span>
                      </motion.div>
                    )}
                  </GlowCard>
                </Reveal>
              ))}
            </div>

            {/* Market Insights */}
            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...mo, fontSize: 9, color: "#ec4899" }}>✦</span>
                  <span style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.15em" }}>MARKET INSIGHTS</span>
                </div>
              </Reveal>
              <GlowCard style={{ padding: "22px 24px" }}>
                {insights.map((ins, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, paddingBottom: i < insights.length - 1 ? 16 : 0, marginBottom: i < insights.length - 1 ? 16 : 0, borderBottom: i < insights.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <div style={{ width: 2, background: "rgba(236,72,153,0.35)", borderRadius: 2, flexShrink: 0, alignSelf: "stretch" }} />
                    <div>
                      <p style={{ fontSize: 12, color: "#4a5570", lineHeight: 1.65, marginBottom: 6 }}>{ins.text}</p>
                      <div style={{ display: "flex", gap: 10 }}>
                        <span style={{ ...mo, fontSize: 9, color: "rgba(236,72,153,0.6)" }}>{ins.source}</span>
                        <span style={{ ...mo, fontSize: 9, color: "#2a3040" }}>{ins.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



