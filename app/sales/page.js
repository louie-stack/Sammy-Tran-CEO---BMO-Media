"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

function Reveal({ children, delay = 0, y = 30 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

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
  { co: "Starface", contact: "Megan K.", overdue: 5, note: "Discovery call booked" },
  { co: "Fly By Jing", contact: "Sarah T.", overdue: 7, note: "Qualification call" },
  { co: "MoonBrew", contact: "Dan S.", overdue: 2, note: "Contract revision sent" },
  { co: "Jolie Skin", contact: "Alex M.", overdue: 3, note: "Proposal follow-up" },
  { co: "Brightland", contact: "Rachel S.", overdue: 1, note: "Initial outreach" },
];

export default function SalesPage() {
  return (
    <div style={{ background: "#080B12", minHeight: "100vh", color: "#E8E8F0" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}}`}</style>
      <div style={{ position: "fixed", inset: 0, opacity: 0.016, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />
      <div style={{ position: "fixed", top: "-30%", right: "-20%", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(168,85,247,0.055) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <Nav />

      {/* Hero */}
      <div style={{ paddingTop: 54, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "70px 60px 0" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🎸</span>
              <span style={{ ...mo, fontSize: 9, color: "rgba(168,85,247,0.7)", letterSpacing: "0.18em" }}>MARCELINE — SALES & BD</span>
            </div>
            <h1 style={{ ...jk, fontSize: "clamp(2.2rem, 4vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 6 }}>
              <span style={{ color: "#E8E8F0" }}>Pipeline</span>
            </h1>
            <p style={{ ...mo, fontSize: 11, color: "#2a3040", marginBottom: 0 }}>Lead triage · proposals · CRM · follow-up sequences</p>
          </motion.div>
        </div>
      </div>

      {/* Revenue stats strip */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", margin: "40px 0 0" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 500, height: 1, background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.2), transparent)" }} />
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { label: "MTD PIPELINE", value: "$180k", sub: "16 active deals", color: "#3b82f6" },
              { label: "CLOSED THIS MONTH", value: "$42k", sub: "5 deals won", color: "#10b981" },
              { label: "60-DAY FORECAST", value: "$95k", sub: "Based on velocity", color: "#a855f7" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 0", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ ...jk, fontSize: "clamp(1.8rem, 2.5vw, 2.5rem)", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ ...mo, fontSize: 9, color: "#334", letterSpacing: "0.15em", marginTop: 6 }}>{s.label}</div>
                  <div style={{ ...mo, fontSize: 9, color: "#2a3040", marginTop: 3 }}>{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "48px 60px 100px", position: "relative", zIndex: 1 }}>

        {/* Pipeline */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ ...mo, fontSize: 9, color: "#a855f7" }}>✦</span>
            <span style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.15em" }}>DEAL PIPELINE</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 56 }}>
            {pipeline.map((col) => (
              <div key={col.stage}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 0 8px", marginBottom: 10, borderBottom: `1px solid rgba(${col.rgb},0.2)` }}>
                  <span style={{ ...mo, fontSize: 8, color: `rgba(${col.rgb},0.8)`, letterSpacing: "0.1em" }}>{col.stage.toUpperCase()}</span>
                  <span style={{ ...mo, fontSize: 8, color: `rgba(${col.rgb},0.6)`, background: `rgba(${col.rgb},0.08)`, padding: "1px 5px", borderRadius: 3 }}>{col.deals.length}</span>
                </div>
                {col.deals.map((d, i) => (
                  <GlowCard key={i} style={{ padding: "10px 12px", marginBottom: 7, borderLeft: `2px solid rgba(${col.rgb},0.35)` }}>
                    <div style={{ ...jk, fontSize: 12, fontWeight: 600, color: "#C0C5D2", marginBottom: 2 }}>{d.co}</div>
                    <div style={{ ...mo, fontSize: 9, color: "#2a3040", marginBottom: 4 }}>{d.contact}</div>
                    <div style={{ ...mo, fontSize: 10, color: `rgba(${col.rgb},0.85)` }}>{d.value}</div>
                    {d.days > 0 && <div style={{ ...mo, fontSize: 8, color: d.days > 12 ? "#f59e0b" : "#2a3040", marginTop: 3 }}>{d.days}d in stage</div>}
                  </GlowCard>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Follow-ups */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ ...mo, fontSize: 9, color: "#a855f7" }}>✦</span>
            <span style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.15em" }}>OVERDUE FOLLOW-UPS</span>
          </div>
        </Reveal>
        {followUps.map((f, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <GlowCard style={{ padding: "14px 20px", marginBottom: 8, display: "flex", alignItems: "center", gap: 16, borderLeft: `2px solid ${f.overdue >= 5 ? "#ef4444" : "#f59e0b"}` }}>
              <div style={{ flex: 1 }}>
                <span style={{ ...jk, fontSize: 13, fontWeight: 600, color: "#C0C5D2" }}>{f.co}</span>
                <span style={{ ...mo, fontSize: 10, color: "#2a3040", marginLeft: 10 }}>{f.contact}</span>
              </div>
              <span style={{ ...mo, fontSize: 10, color: "#334" }}>{f.note}</span>
              <span style={{ ...mo, fontSize: 10, fontWeight: 700, color: f.overdue >= 5 ? "#ef4444" : "#f59e0b", background: f.overdue >= 5 ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)", padding: "3px 9px", borderRadius: 4 }}>{f.overdue}d overdue</span>
              <button style={{ ...mo, padding: "5px 14px", borderRadius: 5, fontSize: 10, background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)", color: "rgba(168,85,247,0.7)", cursor: "pointer" }}>Follow Up</button>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
