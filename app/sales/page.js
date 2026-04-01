"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "../../components/Nav";

const MO = { fontFamily: "'Space Mono', monospace" };
const IN = { fontFamily: "'Inter', sans-serif" };
const GREEN = "#C4F000";
const PURPLE = "#a855f7";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", bounce: 0, duration: 1.2, delay }}>
      {children}
    </motion.div>
  );
}

function Pill({ label, color }) {
  return (
    <span style={{ ...MO, fontSize: 9, padding: "3px 10px", borderRadius: 70, border: `1px solid ${color}40`, color, letterSpacing: "0.08em" }}>
      {label}
    </span>
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
  { co: "Starface", contact: "Megan K.", overdue: 5, note: "Discovery call booked", assignee: "Marceline" },
  { co: "Fly By Jing", contact: "Sarah T.", overdue: 7, note: "Qualification call", assignee: "Marceline" },
  { co: "MoonBrew", contact: "Dan S.", overdue: 2, note: "Contract revision sent", assignee: "BMO" },
  { co: "Jolie Skin", contact: "Alex M.", overdue: 3, note: "Proposal follow-up", assignee: "Marceline" },
  { co: "Brightland", contact: "Rachel S.", overdue: 1, note: "Initial outreach", assignee: "BMO" },
];

export default function SalesPage() {
  const totalPipeline = pipeline.reduce((acc, col) => acc + col.deals.reduce((s, d) => s + parseFloat(d.value.replace(/[$k\/mo]/g, "")), 0), 0);
  const closedWon = pipeline.find(c => c.stage === "Closed Won");
  const closedTotal = closedWon ? closedWon.deals.reduce((s, d) => s + parseFloat(d.value.replace(/[$k\/mo]/g, "")), 0) : 0;
  const totalDeals = pipeline.reduce((acc, col) => acc + col.deals.length, 0);

  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}}
        .deal-card:hover .deal-glow { opacity: 1 !important; }
        .deal-card:hover { transform: translateY(-1px); }
        .deal-card { transition: transform 0.2s; }
        .followup-card:hover .followup-glow { opacity: 1 !important; }
        .col-card:hover .col-glow { opacity: 1 !important; }
      `}</style>
      <Nav />

      {/* ── HERO ── */}
      <div style={{ paddingTop: 54, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "60px 60px 0" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: PURPLE, boxShadow: `0 0 6px ${PURPLE}80`, animation: "gPulse 2s infinite" }} />
              <span style={{ ...MO, fontSize: 11, color: `${PURPLE}99`, letterSpacing: "0.18em" }}>MARCELINE — SALES & BD</span>
            </div>
            <h1 style={{ ...IN, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 8 }}>
              Pipeline
            </h1>
            <p style={{ ...MO, fontSize: 11, color: "#555" }}>Lead triage · proposals · CRM · follow-up sequences</p>
          </motion.div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{ maxWidth: 1440, margin: "40px auto 0", padding: "0 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
          {[
            { label: "TOTAL PIPELINE", value: `$${totalPipeline.toFixed(0)}k/mo`, color: "#3b82f6" },
            { label: "CLOSED THIS MONTH", value: `$${closedTotal.toFixed(0)}k/mo`, color: "#10b981" },
            { label: "ACTIVE DEALS", value: String(totalDeals), color: PURPLE },
            { label: "OVERDUE FOLLOW-UPS", value: String(followUps.length), color: "#f59e0b" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div style={{ padding: "28px 0", borderRight: i < 3 ? "1px solid #111" : "none", paddingLeft: i > 0 ? 24 : 0 }}>
                <div style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
                <div style={{ ...MO, fontSize: 10, color: "#555", letterSpacing: "0.12em" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "48px 60px 100px" }}>

        {/* ── PIPELINE BOARD ── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ ...MO, fontSize: 10, color: PURPLE, letterSpacing: "0.18em", marginBottom: 6 }}>DEAL PIPELINE</div>
              <h2 style={{ ...IN, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Active Board</h2>
            </div>
            <span style={{ ...MO, fontSize: 10, color: "#444" }}>{totalDeals} deals across {pipeline.length} stages</span>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 64 }}>
          {pipeline.map((col, ci) => (
            <Reveal key={col.stage} delay={ci * 0.07}>
              <div className="col-card" style={{ borderRadius: 14, background: `rgba(${col.rgb},0.04)`, border: `1px solid rgba(${col.rgb},0.12)`, overflow: "hidden", position: "relative" }}>
                {/* Column glow */}
                <div className="col-glow" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, rgba(${col.rgb},0.08) 0%, transparent 60%)`, opacity: 0, transition: "opacity 0.4s", pointerEvents: "none" }} />
                {/* Column header */}
                <div style={{ padding: "14px 14px 12px", borderBottom: `1px solid rgba(${col.rgb},0.12)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ ...MO, fontSize: 9, color: col.color, letterSpacing: "0.1em" }}>{col.stage.toUpperCase()}</span>
                  <span style={{ ...MO, fontSize: 9, color: col.color, background: `rgba(${col.rgb},0.1)`, padding: "2px 7px", borderRadius: 4 }}>{col.deals.length}</span>
                </div>
                {/* Cards */}
                <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.deals.map((d, di) => (
                    <div key={di} className="deal-card" style={{ borderRadius: 10, padding: "12px 14px", background: "rgba(255,255,255,0.03)", border: `1px solid rgba(${col.rgb},0.1)`, position: "relative", overflow: "hidden", cursor: "pointer" }}>
                      <div className="deal-glow" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 100%, rgba(${col.rgb},0.12) 0%, transparent 65%)`, opacity: 0, transition: "opacity 0.3s", pointerEvents: "none" }} />
                      <div style={{ position: "relative" }}>
                        <div style={{ ...IN, fontSize: 12, fontWeight: 600, color: "#d0d0d8", marginBottom: 3 }}>{d.co}</div>
                        <div style={{ ...MO, fontSize: 9, color: "#555", marginBottom: 6 }}>{d.contact}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ ...MO, fontSize: 10, color: col.color }}>{d.value}</span>
                          {d.days > 0 && (
                            <span style={{ ...MO, fontSize: 9, color: d.days > 12 ? "#f59e0b" : "#333", background: d.days > 12 ? "rgba(245,158,11,0.08)" : "#111", padding: "1px 6px", borderRadius: 3 }}>{d.days}d</span>
                          )}
                          {d.days === 0 && col.stage === "Closed Won" && (
                            <span style={{ ...MO, fontSize: 9, color: "#10b981" }}>✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── OVERDUE FOLLOW-UPS ── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ ...MO, fontSize: 10, color: "#f59e0b", letterSpacing: "0.18em", marginBottom: 6 }}>ACTION REQUIRED</div>
              <h2 style={{ ...IN, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Overdue Follow-ups</h2>
            </div>
            <Pill label={`${followUps.length} PENDING`} color="#f59e0b" />
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {followUps.map((f, i) => {
            const urgentColor = f.overdue >= 5 ? "#ef4444" : "#f59e0b";
            const urgentRgb = f.overdue >= 5 ? "239,68,68" : "245,158,11";
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="followup-card" style={{ borderRadius: 12, padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: `1px solid rgba(${urgentRgb},0.12)`, display: "flex", alignItems: "center", gap: 16, position: "relative", overflow: "hidden", cursor: "pointer" }}>
                  <div className="followup-glow" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 0% 50%, rgba(${urgentRgb},0.08) 0%, transparent 55%)`, opacity: 0, transition: "opacity 0.3s", pointerEvents: "none" }} />
                  <div style={{ width: 3, height: 40, borderRadius: 2, background: urgentColor, flexShrink: 0 }} />
                  <div style={{ flex: 1, position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                      <span style={{ ...IN, fontSize: 13, fontWeight: 600, color: "#d0d0d8" }}>{f.co}</span>
                      <span style={{ ...MO, fontSize: 9, color: "#444" }}>{f.contact}</span>
                    </div>
                    <span style={{ ...MO, fontSize: 10, color: "#555" }}>{f.note}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, position: "relative" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ ...MO, fontSize: 10, color: "#444", marginBottom: 2 }}>assigned to</div>
                      <div style={{ ...MO, fontSize: 10, color: PURPLE }}>{f.assignee}</div>
                    </div>
                    <span style={{ ...MO, fontSize: 10, fontWeight: 700, color: urgentColor, background: `rgba(${urgentRgb},0.08)`, padding: "4px 10px", borderRadius: 6, border: `1px solid rgba(${urgentRgb},0.2)` }}>{f.overdue}d overdue</span>
                    <button style={{ ...MO, padding: "6px 14px", borderRadius: 6, fontSize: 9, background: `rgba(${urgentRgb},0.06)`, border: `1px solid rgba(${urgentRgb},0.2)`, color: urgentColor, cursor: "pointer", letterSpacing: "0.06em" }}>FOLLOW UP</button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
