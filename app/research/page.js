"use client";
import { useState } from "react";

const briefs = [
  { title: "Klaviyo Ecosystem — Q2 2026 Trends", status: "In Progress", pct: 72, owner: "PB", tag: "Market Intel", color: "#ec4899" },
  { title: "Centr Fitness Pre-Call Research Pack", status: "Complete", pct: 100, owner: "PB", tag: "Client Research", color: "#10b981" },
  { title: "Nexmail Product Strategy v2", status: "In Progress", pct: 45, owner: "PB", tag: "Product", color: "#a855f7" },
];

const competitors = [
  {
    name: "Retention.com",
    threat: "High",
    color: "#ef4444",
    notes: "Strong identity resolution product. Growing in DTC space. Pricing competitive at $2-5k/mo. Watch their new 'Klaviyo Sync' feature.",
    updated: "Apr 1, 2026",
  },
  {
    name: "Yotpo",
    threat: "Medium",
    color: "#f59e0b",
    notes: "Expanding from loyalty into full CRM suite. Strong brand recognition. Their lifecycle offering is still shallow vs BMO's strategy depth.",
    updated: "Mar 28, 2026",
  },
  {
    name: "Rejoiner",
    threat: "Low",
    color: "#10b981",
    notes: "Niche email automation player. Losing ground to Klaviyo native flows. Not a major threat but relevant for SMB deals.",
    updated: "Mar 20, 2026",
  },
];

const insights = [
  { text: "Klaviyo announces new AI-powered segmentation beta — BMO clients eligible for early access", source: "Klaviyo Blog", date: "Apr 1" },
  { text: "BFCM 2026 planning season starts early — brands allocating budget now (June timeline)", source: "eCom Industry Report", date: "Mar 31" },
  { text: "SMS opt-in rates declining post-TCPA enforcement — SMS strategy rethink needed for 4 clients", source: "Attentive Research", date: "Mar 29" },
  { text: "Tiered loyalty programs outperform points-only by 34% in retention rate (Q1 2026 data)", source: "Loyalty360", date: "Mar 27" },
  { text: "Subscription programs growing fastest in food & beverage vertical — Centr + MoonBrew opportunity", source: "Recharge Data", date: "Mar 25" },
];

const nexmail = {
  title: "Nexmail Product Strategy v2",
  summary: "Nexmail is positioned as a high-touch lifecycle intelligence layer sitting above Klaviyo. Core differentiator: human-verified AI strategy + execution, not just automation.",
  pillars: [
    "AI-generated send-time optimisation per subscriber segment",
    "Predictive churn scoring integrated with Klaviyo tags",
    "White-glove onboarding for brands doing $1M+ email revenue",
    "BMO-powered strategy layer — not a pure SaaS play",
  ],
  status: "In Progress",
  nextStep: "Pricing model validation — internal review Apr 7",
};

export default function ResearchPage() {
  const [expandedComp, setExpandedComp] = useState(null);

  return (
    <div style={{ minHeight: "100vh", padding: "32px" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "20px" }}>👑</span>
            <div style={{ fontSize: "11px", color: "#ec4899", letterSpacing: "0.2em", fontFamily: "monospace" }}>PRINCESS BUBBLEGUM — RESEARCH & STRATEGY</div>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#f1f5f9" }}>Research & Strategy</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Left column */}
          <div>
            {/* Active Briefs */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>ACTIVE BRIEFS</div>
              {briefs.map((b, i) => (
                <div key={i} className="card-hover" style={{
                  background: "rgba(15,21,32,0.85)", border: "1px solid rgba(236,72,153,0.1)",
                  borderRadius: "10px", padding: "16px", backdropFilter: "blur(8px)", marginBottom: "8px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#e2e8f0", marginBottom: "3px" }}>{b.title}</div>
                      <span style={{
                        fontSize: "9px", fontFamily: "monospace", color: b.color,
                        background: `${b.color}18`, padding: "2px 6px", borderRadius: "4px",
                        border: `1px solid ${b.color}30`,
                      }}>{b.tag}</span>
                    </div>
                    <span style={{
                      fontSize: "10px", fontFamily: "monospace",
                      color: b.pct === 100 ? "#10b981" : "#f59e0b",
                    }}>{b.pct}%</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "4px", height: "4px" }}>
                    <div style={{ width: `${b.pct}%`, height: "4px", borderRadius: "4px", background: b.color, transition: "width 0.5s" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Nexmail Strategy */}
            <div>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>NEXMAIL PRODUCT STRATEGY</div>
              <div className="card-hover" style={{
                background: "rgba(15,21,32,0.85)", border: "1px solid rgba(168,85,247,0.2)",
                borderRadius: "10px", padding: "18px", backdropFilter: "blur(8px)",
                borderTop: "3px solid #a855f7",
              }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>{nexmail.title}</div>
                <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.6, marginBottom: "12px" }}>{nexmail.summary}</p>
                {nexmail.pillars.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
                    <span style={{ color: "#a855f7", fontSize: "10px", marginTop: "3px" }}>▸</span>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>{p}</span>
                  </div>
                ))}
                <div style={{ marginTop: "12px", padding: "8px 12px", background: "rgba(168,85,247,0.08)", borderRadius: "6px", border: "1px solid rgba(168,85,247,0.15)" }}>
                  <span style={{ fontSize: "10px", color: "#a855f7", fontFamily: "monospace" }}>NEXT → </span>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>{nexmail.nextStep}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Competitor Intel */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>COMPETITOR INTEL</div>
              {competitors.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setExpandedComp(expandedComp === c.name ? null : c.name)}
                  className="card-hover"
                  style={{
                    background: "rgba(15,21,32,0.85)", border: "1px solid rgba(59,130,246,0.1)",
                    borderRadius: "10px", padding: "14px 16px", backdropFilter: "blur(8px)",
                    marginBottom: "8px", cursor: "pointer", borderLeft: `3px solid ${c.color}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: expandedComp === c.name ? "10px" : "0" }}>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#e2e8f0" }}>{c.name}</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{
                        fontSize: "9px", fontFamily: "monospace", fontWeight: "700",
                        color: c.color, background: `${c.color}15`, padding: "2px 8px", borderRadius: "4px",
                      }}>{c.threat.toUpperCase()} THREAT</span>
                      <span style={{ fontSize: "11px", color: "#475569" }}>{expandedComp === c.name ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  {expandedComp === c.name && (
                    <div>
                      <p style={{ fontSize: "11px", color: "#94a3b8", lineHeight: 1.6 }}>{c.notes}</p>
                      <div style={{ fontSize: "10px", color: "#475569", marginTop: "6px", fontFamily: "monospace" }}>Updated: {c.updated}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Market Insights Feed */}
            <div>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>MARKET INSIGHTS</div>
              {insights.map((ins, i) => (
                <div key={i} style={{
                  display: "flex", gap: "12px", marginBottom: "10px",
                  paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <div style={{ width: "3px", background: "#ec4899", borderRadius: "2px", flexShrink: 0, alignSelf: "stretch" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.5, marginBottom: "4px" }}>{ins.text}</p>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <span style={{ fontSize: "10px", color: "#ec4899", fontFamily: "monospace" }}>{ins.source}</span>
                      <span style={{ fontSize: "10px", color: "#475569" }}>{ins.date}</span>
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
