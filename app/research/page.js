"use client";
import { useState } from "react";
import Nav from "../../components/Nav";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const COLOR = "236,72,153";
const HEX = "#ec4899";

function glowCard(rgb, h) {
  return {
    background: "rgba(6,10,18,0.97)",
    border: `1px solid rgba(${rgb},${h ? 0.35 : 0.14})`,
    boxShadow: h ? `0 0 28px rgba(${rgb},0.2), 0 12px 32px rgba(0,0,0,0.45)` : `0 0 14px rgba(${rgb},0.07), 0 8px 24px rgba(0,0,0,0.4)`,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  };
}

const briefs = [
  { title: "Klaviyo Ecosystem — Q2 2026 Trends", status: "In Progress", pct: 72, tag: "Market Intel", color: HEX, rgb: COLOR },
  { title: "Centr Fitness Pre-Call Research Pack", status: "Complete", pct: 100, tag: "Client Research", color: "#10b981", rgb: "16,185,129" },
  { title: "Nexmail Product Strategy v2", status: "In Progress", pct: 45, tag: "Product", color: "#a855f7", rgb: "168,85,247" },
];

const competitors = [
  { name: "Retention.com", threat: "High", color: "#ef4444", rgb: "239,68,68", updated: "Apr 1", notes: "Strong identity resolution. Growing fast in DTC. Watch their new Klaviyo Sync feature launching Q2." },
  { name: "Yotpo", threat: "Medium", color: "#f59e0b", rgb: "245,158,11", updated: "Mar 28", notes: "Expanding from loyalty into full CRM suite. Still shallow on lifecycle strategy vs BMO depth." },
  { name: "Rejoiner", threat: "Low", color: "#10b981", rgb: "16,185,129", updated: "Mar 20", notes: "Niche email automation player, losing ground to native Klaviyo flows. Not a major threat for enterprise." },
];

const insights = [
  { text: "Klaviyo announces AI segmentation beta — BMO clients eligible for early access", source: "Klaviyo Blog", date: "Apr 1" },
  { text: "BFCM 2026 brand budget planning underway — Q2 is the window to lock in retainer clients", source: "eCom Report", date: "Mar 31" },
  { text: "SMS opt-in rates declining post-TCPA — strategy review needed for 4 active clients", source: "Attentive Research", date: "Mar 29" },
  { text: "Tiered loyalty programs outperform points-only by 34% in retention (Q1 2026)", source: "Loyalty360", date: "Mar 27" },
  { text: "Subscription growth fastest in food & beverage — Centr + MoonBrew direct opportunity", source: "Recharge Data", date: "Mar 25" },
];

export default function ResearchPage() {
  const [expandedComp, setExpandedComp] = useState(null);
  const [hovBrief, setHovBrief] = useState(null);

  return (
    <div style={{ background: "#080B12", minHeight: "100vh", color: "#E8E8F0", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.015, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />
      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "50%", height: "70%", borderRadius: "50%", background: `radial-gradient(circle, rgba(${COLOR},0.04) 0%, transparent 55%)`, filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <Nav />

      <div style={{ paddingTop: 54, maxWidth: 1440, margin: "0 auto", padding: "108px 60px 0", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>👑</span>
          <span style={{ ...mo, fontSize: 9, color: HEX, letterSpacing: "0.15em" }}>PRINCESS BUBBLEGUM — RESEARCH & STRATEGY</span>
        </div>
        <h1 style={{ ...jk, fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>Research & Strategy</h1>
        <p style={{ ...mo, fontSize: 11, color: "#445", marginBottom: 32 }}>Market intelligence, competitor tracking, client research and Nexmail product strategy</p>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 60px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Left */}
          <div>
            {/* Active Briefs */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>ACTIVE BRIEFS</span>
              </div>
              {briefs.map((b, i) => (
                <div key={i}
                  onMouseEnter={() => setHovBrief(i)}
                  onMouseLeave={() => setHovBrief(null)}
                  style={{ ...glowCard(b.rgb, hovBrief === i), borderRadius: 10, padding: "18px 20px", marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ ...jk, fontSize: 13, fontWeight: 600, color: "#C8CDD8", marginBottom: 4 }}>{b.title}</div>
                      <span style={{ ...mo, fontSize: 8, color: b.color, background: `${b.color}15`, padding: "2px 7px", borderRadius: 3, border: `1px solid ${b.color}25` }}>{b.tag}</span>
                    </div>
                    <span style={{ ...mo, fontSize: 11, color: b.pct === 100 ? "#10b981" : "#f59e0b", flexShrink: 0, marginLeft: 12 }}>{b.pct}%</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 3, height: 3 }}>
                    <div style={{ width: `${b.pct}%`, height: 3, borderRadius: 3, background: b.color, transition: "width 0.5s" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Nexmail Strategy */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ ...mo, fontSize: 9, color: "#a855f7" }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>NEXMAIL PRODUCT STRATEGY</span>
              </div>
              <div style={{ ...glowCard("168,85,247", false), borderRadius: 12, padding: "22px", borderTop: "2px solid rgba(168,85,247,0.4)" }}>
                <div style={{ ...jk, fontSize: 15, fontWeight: 700, color: "#E8E8F0", marginBottom: 8 }}>Nexmail v2 — Strategy Doc</div>
                <p style={{ fontSize: 13, color: "#667", lineHeight: 1.6, marginBottom: 14 }}>
                  Nexmail is positioned as a high-touch lifecycle intelligence layer sitting above Klaviyo. Core differentiator: human-verified AI strategy + execution, not just automation.
                </p>
                {[
                  "AI send-time optimisation per subscriber segment",
                  "Predictive churn scoring integrated with Klaviyo tags",
                  "White-glove onboarding for brands doing $1M+ email revenue",
                  "BMO strategy layer — not a pure SaaS play",
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                    <span style={{ color: "#a855f7", fontSize: 10, marginTop: 2 }}>▸</span>
                    <span style={{ fontSize: 12, color: "#778", lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
                <div style={{ marginTop: 14, padding: "8px 12px", background: "rgba(168,85,247,0.06)", borderRadius: 6, border: "1px solid rgba(168,85,247,0.12)" }}>
                  <span style={{ ...mo, fontSize: 9, color: "#a855f7" }}>NEXT → </span>
                  <span style={{ fontSize: 12, color: "#778" }}>Pricing model validation — internal review Apr 7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            {/* Competitor Intel */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>COMPETITOR INTEL</span>
              </div>
              {competitors.map((c) => (
                <div key={c.name}
                  onClick={() => setExpandedComp(expandedComp === c.name ? null : c.name)}
                  style={{
                    ...glowCard(c.rgb, expandedComp === c.name),
                    borderRadius: 10, padding: "14px 18px", marginBottom: 8,
                    cursor: "pointer", borderLeft: `3px solid rgba(${c.rgb},0.7)`,
                  }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: expandedComp === c.name ? 10 : 0 }}>
                    <span style={{ ...jk, fontSize: 13, fontWeight: 600, color: "#C8CDD8" }}>{c.name}</span>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ ...mo, fontSize: 8, fontWeight: 700, color: c.color, background: `rgba(${c.rgb},0.1)`, padding: "2px 7px", borderRadius: 3 }}>{c.threat.toUpperCase()} THREAT</span>
                      <span style={{ color: "#445", fontSize: 11 }}>{expandedComp === c.name ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  {expandedComp === c.name && (
                    <div>
                      <p style={{ fontSize: 12, color: "#778", lineHeight: 1.6, marginBottom: 6 }}>{c.notes}</p>
                      <span style={{ ...mo, fontSize: 9, color: "#334" }}>Updated: {c.updated}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Market Insights */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>MARKET INSIGHTS</span>
              </div>
              {insights.map((ins, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: "1px dashed rgba(255,255,255,0.04)" }}>
                  <div style={{ width: 2, background: HEX, borderRadius: 2, flexShrink: 0, opacity: 0.5, alignSelf: "stretch" }} />
                  <div>
                    <p style={{ fontSize: 12, color: "#778", lineHeight: 1.6, marginBottom: 5 }}>{ins.text}</p>
                    <div style={{ display: "flex", gap: 10 }}>
                      <span style={{ ...mo, fontSize: 9, color: HEX }}>{ins.source}</span>
                      <span style={{ ...mo, fontSize: 9, color: "#334" }}>{ins.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
