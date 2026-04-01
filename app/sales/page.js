"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";

function CountUp({ value, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const prefix = value.startsWith("$") ? "$" : "";
    const hasSuffix = value.endsWith("k");
    const raw = parseFloat(value.replace(/[$k\/mo]/g, ""));
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * raw);
      setDisplay(`${prefix}${current}${hasSuffix ? "k/mo" : ""}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);
  return <span ref={ref}>{display}</span>;
}

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

function SectionHeader({ label, title, right }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24 }}>
      <div>
        <div style={{ ...MO, fontSize: 11, color: PURPLE, letterSpacing: "0.18em", marginBottom: 8 }}>{label}</div>
        <h2 style={{ ...IN, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff" }}>{title}</h2>
      </div>
      {right}
    </div>
  );
}

// Coloured hover overlay for cards
function ColourCard({ color, rgb, children, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <GlowCard
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: `radial-gradient(ellipse at 50% 100%, rgba(${rgb},0.1) 0%, transparent 65%)`, opacity: hovered ? 1 : 0, transition: "opacity 0.35s", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</div>
    </GlowCard>
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

// Hot deals: negotiation + high-value qualified
const hotDeals = [
  { co: "Strands Haircare", contact: "Eric D.", value: "$7.2k/mo", stage: "Negotiation", color: "#f59e0b", rgb: "245,158,11", days: 22, note: "22 days in stage — needs close push", urgent: true },
  { co: "Ritual Beauty", contact: "James Walsh", value: "$6k/mo", stage: "Qualified", color: "#3b82f6", rgb: "59,130,246", days: 5, note: "Discovery call scheduled — fast-moving", urgent: false },
  { co: "MoonBrew", contact: "Dan S.", value: "$3.8k/mo", stage: "Negotiation", color: "#f59e0b", rgb: "245,158,11", days: 18, note: "Contract revision sent — awaiting response", urgent: true },
];

export default function SalesPage() {
  const closedWon = pipeline.find(c => c.stage === "Closed Won");
  const closedTotal = closedWon ? closedWon.deals.reduce((s, d) => s + parseFloat(d.value.replace(/[$k\/mo]/g, "")), 0) : 0;
  const activeDeals = pipeline.filter(c => c.stage !== "Closed Won").reduce((acc, col) => acc + col.deals.length, 0);
  const totalDeals = pipeline.reduce((acc, col) => acc + col.deals.length, 0);

  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}}`}</style>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ paddingTop: 54, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "60px 60px 0" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: PURPLE, boxShadow: `0 0 8px ${PURPLE}80`, animation: "gPulse 2s infinite", display: "block" }} />
              <span style={{ ...MO, fontSize: 11, color: `${PURPLE}99`, letterSpacing: "0.18em" }}>MARCELINE — SALES & BD</span>
            </div>
            <h1 style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.06, marginBottom: 10 }}>Pipeline</h1>
            <p style={{ ...MO, fontSize: 11, color: "#555" }}>Lead triage · proposals · CRM · follow-up sequences</p>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div style={{ maxWidth: 1440, margin: "48px auto 0", padding: "0 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { label: "CLOSED THIS MONTH", value: `$${closedTotal.toFixed(0)}k/mo` },
            { label: "ACTIVE DEALS", value: String(activeDeals) },
            { label: "TOTAL DEALS", value: String(totalDeals) },
            { label: "OVERDUE FOLLOW-UPS", value: String(followUps.length) },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "clamp(1.6rem, 2vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  <CountUp value={s.value} /><span style={{ color: GREEN }}>+</span>
                </div>
                <div style={{ fontSize: 14, color: "#888", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 60px 100px" }}>

        {/* ── HOT DEALS ── */}
        <section style={{ padding: "56px 0 0" }}>
          <Reveal>
            <SectionHeader
              label="PRIORITY DEALS"
              title="Needs Attention"
              right={<span style={{ ...MO, fontSize: 11, color: "#444" }}>{hotDeals.filter(d => d.urgent).length} URGENT</span>}
            />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {hotDeals.map((d, i) => (
              <Reveal key={d.co} delay={i * 0.07}>
                <ColourCard color={d.color} rgb={d.rgb} style={{ padding: "24px 26px", borderLeft: `3px solid ${d.color}60` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{d.co}</div>
                      <div style={{ ...MO, fontSize: 10, color: "#555" }}>{d.contact}</div>
                    </div>
                    <span style={{ ...MO, fontSize: 9, padding: "3px 10px", borderRadius: 70, border: `1px solid ${d.color}40`, color: d.color }}>{d.stage.toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>
                    {d.value}
                  </div>
                  <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6, marginBottom: 16 }}>{d.note}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid #1a1a1a" }}>
                    <span style={{ ...MO, fontSize: 10, color: d.days > 12 ? "#f59e0b" : "#555" }}>{d.days}d in stage</span>
                    {d.urgent && <span style={{ ...MO, fontSize: 9, color: "#ef4444", background: "rgba(239,68,68,0.08)", padding: "3px 10px", borderRadius: 70, border: "1px solid rgba(239,68,68,0.2)" }}>URGENT</span>}
                  </div>
                </ColourCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PIPELINE BOARD ── */}
        <section style={{ padding: "56px 0 0" }}>
          <Reveal>
            <SectionHeader
              label="DEAL PIPELINE"
              title="Active Board"
              right={<span style={{ ...MO, fontSize: 11, color: "#444" }}>{totalDeals} DEALS TOTAL</span>}
            />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {pipeline.map((col, ci) => (
              <Reveal key={col.stage} delay={ci * 0.06}>
                <div>
                  {/* Column header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, marginBottom: 10, borderBottom: `1px solid rgba(${col.rgb},0.25)` }}>
                    <span style={{ ...MO, fontSize: 10, color: col.color, letterSpacing: "0.1em" }}>{col.stage.toUpperCase()}</span>
                    <span style={{ ...MO, fontSize: 10, color: col.color, background: `rgba(${col.rgb},0.1)`, padding: "2px 8px", borderRadius: 4 }}>{col.deals.length}</span>
                  </div>
                  {/* Deal cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {col.deals.map((d, di) => (
                      <ColourCard key={di} color={col.color} rgb={col.rgb} style={{ padding: "14px 16px", borderLeft: `2px solid rgba(${col.rgb},0.4)` }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#d0d0d8", marginBottom: 4 }}>{d.co}</div>
                        <div style={{ ...MO, fontSize: 9, color: "#444", marginBottom: 8 }}>{d.contact}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ ...MO, fontSize: 10, color: col.color }}>{d.value}</span>
                          {d.days > 0 && (
                            <span style={{ ...MO, fontSize: 9, color: d.days > 12 ? "#f59e0b" : "#333", background: d.days > 12 ? "rgba(245,158,11,0.1)" : "#111", padding: "1px 6px", borderRadius: 3 }}>{d.days}d</span>
                          )}
                          {col.stage === "Closed Won" && (
                            <span style={{ ...MO, fontSize: 9, color: "#10b981" }}>CLOSED</span>
                          )}
                        </div>
                      </ColourCard>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── OVERDUE FOLLOW-UPS ── */}
        <section style={{ padding: "56px 0 0" }}>
          <Reveal>
            <SectionHeader
              label="ACTION REQUIRED"
              title="Overdue Follow-ups"
              right={
                <span style={{ ...MO, fontSize: 11, color: "#f59e0b", background: "rgba(245,158,11,0.08)", padding: "5px 14px", borderRadius: 70, border: "1px solid rgba(245,158,11,0.2)" }}>
                  {followUps.length} PENDING
                </span>
              }
            />
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {followUps.map((f, i) => {
              const urg = f.overdue >= 5 ? "#ef4444" : "#f59e0b";
              const urgRgb = f.overdue >= 5 ? "239,68,68" : "245,158,11";
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <ColourCard color={urg} rgb={urgRgb} style={{ padding: "18px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                      <div style={{ width: 3, height: 40, borderRadius: 2, background: urg, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e8" }}>{f.co}</span>
                          <span style={{ ...MO, fontSize: 10, color: "#444" }}>{f.contact}</span>
                        </div>
                        <span style={{ ...MO, fontSize: 10, color: "#555" }}>{f.note}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ ...MO, fontSize: 9, color: "#333", marginBottom: 2 }}>ASSIGNED TO</div>
                          <div style={{ ...MO, fontSize: 10, color: PURPLE }}>{f.assignee}</div>
                        </div>
                        <span style={{ ...MO, fontSize: 10, fontWeight: 700, color: urg, background: `rgba(${urgRgb},0.08)`, padding: "5px 12px", borderRadius: 6, border: `1px solid rgba(${urgRgb},0.2)` }}>
                          {f.overdue}d overdue
                        </span>
                        <button style={{ ...MO, padding: "7px 16px", borderRadius: 6, fontSize: 9, background: `rgba(${urgRgb},0.06)`, border: `1px solid rgba(${urgRgb},0.2)`, color: urg, cursor: "pointer", letterSpacing: "0.06em" }}>
                          FOLLOW UP
                        </button>
                      </div>
                    </div>
                  </ColourCard>
                </Reveal>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
