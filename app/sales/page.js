"use client";
import { useState } from "react";
import Nav from "../../components/Nav";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

function glowCard(rgb, h) {
  return {
    background: "rgba(6,10,18,0.97)",
    border: `1px solid rgba(${rgb},${h ? 0.35 : 0.15})`,
    boxShadow: h ? `0 0 30px rgba(${rgb},0.22), 0 12px 32px rgba(0,0,0,0.45)` : `0 0 15px rgba(${rgb},0.08), 0 8px 24px rgba(0,0,0,0.4)`,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  };
}

const COLOR = "168,85,247";
const HEX = "#a855f7";

const pipeline = [
  { stage: "Prospect", color: "#64748b", rgb: "100,116,139", deals: [
    { co: "Alo Yoga", contact: "Lisa Chen", value: "$5.2k/mo", days: 8 },
    { co: "Graza Olive Oil", contact: "Tom R.", value: "$2.8k/mo", days: 3 },
    { co: "Starface", contact: "Megan K.", value: "$4.5k/mo", days: 12 },
  ]},
  { stage: "Qualified", color: "#3b82f6", rgb: "59,130,246", deals: [
    { co: "Ritual Beauty", contact: "James Walsh", value: "$6k/mo", days: 5 },
    { co: "Fly By Jing", contact: "Sarah T.", value: "$3.2k/mo", days: 9 },
    { co: "Jolie Skin", contact: "Alex M.", value: "$4.1k/mo", days: 14 },
    { co: "Brightland", contact: "Rachel S.", value: "$2.6k/mo", days: 2 },
  ]},
  { stage: "Proposal", color: "#8b5cf6", rgb: "139,92,246", deals: [
    { co: "Centr Fitness", contact: "Mike D.", value: "$4.2k/mo", days: 6 },
    { co: "Our Place", contact: "Luz R.", value: "$5.5k/mo", days: 11 },
  ]},
  { stage: "Negotiation", color: "#f59e0b", rgb: "245,158,11", deals: [
    { co: "MoonBrew", contact: "Dan S.", value: "$3.8k/mo", days: 18 },
    { co: "Strands Haircare", contact: "Eric D.", value: "$7.2k/mo", days: 22 },
  ]},
  { stage: "Closed Won", color: "#10b981", rgb: "16,185,129", deals: [
    { co: "LA Clippers", contact: "Charisse S.", value: "$8.5k/mo", days: 0 },
    { co: "Travel Pro", contact: "Andy S.", value: "$4k/mo", days: 0 },
    { co: "Allegiance Flag", contact: "Katie L.", value: "$2.2k/mo", days: 0 },
    { co: "Nursing Queen", contact: "Quinn R.", value: "$1.8k/mo", days: 0 },
    { co: "James Michelle", contact: "Jordan T.", value: "$5.6k/mo", days: 0 },
  ]},
];

const followUps = [
  { co: "Jolie Skin", contact: "Alex M.", overdue: 3, note: "Proposal follow-up" },
  { co: "Starface", contact: "Megan K.", overdue: 5, note: "Discovery call booked" },
  { co: "MoonBrew", contact: "Dan S.", overdue: 2, note: "Contract revision sent" },
  { co: "Fly By Jing", contact: "Sarah T.", overdue: 7, note: "Qualification call" },
  { co: "Brightland", contact: "Rachel S.", overdue: 1, note: "Initial outreach" },
];

export default function SalesPage() {
  const [hovCard, setHovCard] = useState(null);

  return (
    <div style={{ background: "#080B12", minHeight: "100vh", color: "#E8E8F0", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.015, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />
      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "50%", height: "70%", borderRadius: "50%", background: `radial-gradient(circle, rgba(${COLOR},0.04) 0%, transparent 55%)`, filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <Nav />

      {/* Hero */}
      <div style={{ paddingTop: 54, maxWidth: 1440, margin: "0 auto", padding: "108px 60px 0", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>🎸</span>
          <span style={{ ...mo, fontSize: 9, color: HEX, letterSpacing: "0.15em" }}>MARCELINE — SALES & BD</span>
        </div>
        <h1 style={{ ...jk, fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>Pipeline</h1>
        <p style={{ ...mo, fontSize: 11, color: "#445", marginBottom: 32 }}>Lead triage, proposals, CRM and follow-up sequences</p>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 60px 80px", position: "relative", zIndex: 1 }}>

        {/* Revenue Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
          {[
            { label: "MTD PIPELINE VALUE", value: "$180k", sub: "16 active deals", color: "59,130,246" },
            { label: "CLOSED THIS MONTH", value: "$42k", sub: "5 deals won", color: "16,185,129" },
            { label: "60-DAY FORECAST", value: "$95k", sub: "Based on velocity", color: COLOR },
          ].map((s, i) => (
            <div key={i} style={{ ...glowCard(s.color, false), borderRadius: 12, padding: "20px 24px", borderLeft: `3px solid rgba(${s.color},0.6)` }}>
              <div style={{ ...mo, fontSize: 9, color: "#334", letterSpacing: "0.12em", marginBottom: 8 }}>{s.label}</div>
              <div style={{ ...jk, fontSize: 32, fontWeight: 800, color: `rgba(${s.color},1)`, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div style={{ ...mo, fontSize: 10, color: "#445" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Pipeline Kanban */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
            <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>DEAL PIPELINE</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {pipeline.map((col) => (
              <div key={col.stage}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", marginBottom: 8, borderBottom: `1px solid rgba(${col.rgb},0.25)` }}>
                  <span style={{ ...mo, fontSize: 9, color: `rgba(${col.rgb},0.9)`, letterSpacing: "0.1em" }}>{col.stage.toUpperCase()}</span>
                  <span style={{ ...mo, fontSize: 9, color: `rgba(${col.rgb},0.7)`, background: `rgba(${col.rgb},0.1)`, padding: "1px 6px", borderRadius: 3 }}>{col.deals.length}</span>
                </div>
                {col.deals.map((d, i) => (
                  <div key={i}
                    onMouseEnter={() => setHovCard(`${col.stage}-${i}`)}
                    onMouseLeave={() => setHovCard(null)}
                    style={{
                      ...glowCard(col.rgb, hovCard === `${col.stage}-${i}`),
                      borderRadius: 8, padding: "10px 12px", marginBottom: 6, cursor: "default",
                    }}>
                    <div style={{ ...jk, fontSize: 12, fontWeight: 600, color: "#C8CDD8", marginBottom: 2 }}>{d.co}</div>
                    <div style={{ ...mo, fontSize: 9, color: "#445", marginBottom: 4 }}>{d.contact}</div>
                    <div style={{ ...mo, fontSize: 10, color: `rgba(${col.rgb},0.9)` }}>{d.value}</div>
                    {d.days > 0 && <div style={{ ...mo, fontSize: 8, color: d.days > 12 ? "#f59e0b" : "#445", marginTop: 3 }}>{d.days}d in stage</div>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Follow-up Queue */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
            <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>OVERDUE FOLLOW-UPS</span>
          </div>
          {followUps.map((f, i) => (
            <div key={i} style={{
              ...glowCard(f.overdue >= 5 ? "239,68,68" : "245,158,11", false),
              borderRadius: 8, padding: "12px 18px", marginBottom: 6,
              display: "flex", alignItems: "center", gap: 16,
              borderLeft: `3px solid ${f.overdue >= 5 ? "#ef4444" : "#f59e0b"}`,
            }}>
              <div style={{ flex: 1 }}>
                <span style={{ ...jk, fontSize: 13, fontWeight: 600, color: "#C8CDD8" }}>{f.co}</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", marginLeft: 10 }}>{f.contact}</span>
              </div>
              <span style={{ ...mo, fontSize: 10, color: "#445" }}>{f.note}</span>
              <span style={{
                ...mo, fontSize: 10, fontWeight: 700,
                color: f.overdue >= 5 ? "#ef4444" : "#f59e0b",
                background: f.overdue >= 5 ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
                padding: "2px 8px", borderRadius: 3,
              }}>{f.overdue}d overdue</span>
              <button className="action-btn" style={{
                ...mo, padding: "4px 12px", borderRadius: 4, fontSize: 10,
                background: `rgba(${COLOR},0.06)`, border: `1px solid rgba(${COLOR},0.15)`,
                color: HEX, cursor: "pointer",
              }}>Follow Up</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
