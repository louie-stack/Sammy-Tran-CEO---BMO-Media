"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";

const MO = { fontFamily: "'Space Mono', monospace" };
const IN = { fontFamily: "'Inter', sans-serif" };
const GREEN = "#C4F000";
const PURPLE = "#a855f7";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", bounce: 0, duration: 1.1, delay }}>
      {children}
    </motion.div>
  );
}

function CountUp({ value, duration = 1.4 }) {
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
      const p = Math.min((now - start) / (duration * 1000), 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(`${prefix}${Math.round(e * raw)}${hasSuffix ? "k" : ""}`);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);
  return <span ref={ref}>{display}</span>;
}

function ColourCard({ rgb, children, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <GlowCard style={style}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: `radial-gradient(ellipse at 50% 100%, rgba(${rgb},0.1) 0%, transparent 60%)`, opacity: hov ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</div>
    </GlowCard>
  );
}

const stages = [
  { key: "all", label: "All Pipeline", color: PURPLE, rgb: "168,85,247" },
  { key: "prospect", label: "Prospect", color: "#64748b", rgb: "100,116,139" },
  { key: "qualified", label: "Qualified", color: "#3b82f6", rgb: "59,130,246" },
  { key: "proposal", label: "Proposal", color: "#8b5cf6", rgb: "139,92,246" },
  { key: "negotiation", label: "Negotiation", color: "#f59e0b", rgb: "245,158,11" },
  { key: "closed", label: "Closed Won", color: "#10b981", rgb: "16,185,129" },
  { key: "followups", label: "Follow-ups", color: "#ef4444", rgb: "239,68,68" },
];

const pipeline = [
  { key: "prospect", stage: "Prospect", color: "#64748b", rgb: "100,116,139", deals: [
    { co: "Alo Yoga", contact: "Lisa Chen", value: "$5.2k/mo", days: 8, note: "Warm intro via mutual contact" },
    { co: "Graza Olive Oil", contact: "Tom R.", value: "$2.8k/mo", days: 3, note: "Inbound — found via podcast" },
    { co: "Starface", contact: "Megan K.", value: "$4.5k/mo", days: 12, note: "Discovery call booked" },
  ]},
  { key: "qualified", stage: "Qualified", color: "#3b82f6", rgb: "59,130,246", deals: [
    { co: "Ritual Beauty", contact: "James Walsh", value: "$6k/mo", days: 5, note: "Strong fit — Klaviyo + SMS setup needed" },
    { co: "Fly By Jing", contact: "Sarah T.", value: "$3.2k/mo", days: 9, note: "Qualification call scheduled" },
    { co: "Jolie Skin", contact: "Alex M.", value: "$4.1k/mo", days: 14, note: "Budget confirmed, awaiting proposal" },
    { co: "Brightland", contact: "Rachel S.", value: "$2.6k/mo", days: 2, note: "Initial call completed" },
  ]},
  { key: "proposal", stage: "Proposal", color: "#8b5cf6", rgb: "139,92,246", deals: [
    { co: "Centr Fitness", contact: "Mike D.", value: "$4.2k/mo", days: 6, note: "Proposal sent — awaiting review" },
    { co: "Our Place", contact: "Luz R.", value: "$5.5k/mo", days: 11, note: "Deck reviewed, verbal yes — contract pending" },
  ]},
  { key: "negotiation", stage: "Negotiation", color: "#f59e0b", rgb: "245,158,11", deals: [
    { co: "MoonBrew", contact: "Dan S.", value: "$3.8k/mo", days: 18, note: "Contract revision sent — no response" },
    { co: "Strands Haircare", contact: "Eric D.", value: "$7.2k/mo", days: 22, note: "22 days stalled — needs direct call" },
  ]},
  { key: "closed", stage: "Closed Won", color: "#10b981", rgb: "16,185,129", deals: [
    { co: "LA Clippers", contact: "Charisse S.", value: "$8.5k/mo", days: 0, note: "Active — onboarding complete" },
    { co: "Travel Pro", contact: "Andy S.", value: "$4k/mo", days: 0, note: "Active — Month 2" },
    { co: "Allegiance Flag", contact: "Katie L.", value: "$2.2k/mo", days: 0, note: "Active — Month 1" },
    { co: "Nursing Queen", contact: "Quinn R.", value: "$1.8k/mo", days: 0, note: "Active — Month 3" },
    { co: "James Michelle", contact: "Jordan T.", value: "$5.6k/mo", days: 0, note: "Active — Month 5" },
  ]},
];

const followUps = [
  { co: "Starface", contact: "Megan K.", overdue: 5, note: "Discovery call booked", assignee: "Marceline", color: "#ef4444", rgb: "239,68,68" },
  { co: "Fly By Jing", contact: "Sarah T.", overdue: 7, note: "Qualification call", assignee: "Marceline", color: "#ef4444", rgb: "239,68,68" },
  { co: "MoonBrew", contact: "Dan S.", overdue: 2, note: "Contract revision sent", assignee: "BMO", color: "#f59e0b", rgb: "245,158,11" },
  { co: "Jolie Skin", contact: "Alex M.", overdue: 3, note: "Proposal follow-up", assignee: "Marceline", color: "#f59e0b", rgb: "245,158,11" },
  { co: "Brightland", contact: "Rachel S.", overdue: 1, note: "Initial outreach", assignee: "BMO", color: "#f59e0b", rgb: "245,158,11" },
];

export default function SalesPage() {
  const [active, setActive] = useState("all");

  const closedWon = pipeline.find(c => c.key === "closed");
  const closedTotal = closedWon ? closedWon.deals.reduce((s, d) => s + parseFloat(d.value.replace(/[$k\/mo]/g, "")), 0) : 0;
  const activeDeals = pipeline.filter(c => c.key !== "closed").reduce((acc, col) => acc + col.deals.length, 0);
  const totalDeals = pipeline.reduce((acc, col) => acc + col.deals.length, 0);

  const activeStage = stages.find(s => s.key === active);
  const stageData = pipeline.find(p => p.key === active);

  const stats = [
    { label: "CLOSED THIS MONTH", value: `$${closedTotal.toFixed(0)}k` },
    { label: "ACTIVE DEALS", value: String(activeDeals) },
    { label: "TOTAL DEALS", value: String(totalDeals) },
    { label: "FOLLOW-UPS OVERDUE", value: String(followUps.length) },
  ];

  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}}`}</style>
      <Nav />

      <div style={{ display: "flex", flex: 1, paddingTop: 54 }}>

        {/* ── SIDEBAR ── */}
        <div style={{ width: 220, flexShrink: 0, borderRight: "1px solid #111", display: "flex", flexDirection: "column", position: "sticky", top: 54, height: "calc(100vh - 54px)", overflowY: "auto" }}>
          {/* Agent header */}
          <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid #111" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", border: `1.5px solid ${PURPLE}40`, flexShrink: 0 }}>
                <img src="/agents/marceline.png" alt="Marceline" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 10%" }} />
              </div>
              <div>
                <div style={{ ...IN, fontSize: 12, fontWeight: 700, color: "#e0e0e8" }}>Marceline</div>
                <div style={{ ...MO, fontSize: 8, color: "#555" }}>Sales & BD</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: GREEN, boxShadow: `0 0 5px ${GREEN}80`, animation: "gPulse 2s infinite", display: "block" }} />
              <span style={{ ...MO, fontSize: 8, color: "#555" }}>ACTIVE</span>
            </div>
          </div>

          {/* Stage nav */}
          <div style={{ padding: "14px 10px", flex: 1 }}>
            <div style={{ ...MO, fontSize: 8, color: "#333", letterSpacing: "0.14em", padding: "0 10px", marginBottom: 8 }}>PIPELINE</div>
            {stages.map((s) => {
              const count = s.key === "all" ? totalDeals
                : s.key === "followups" ? followUps.length
                : pipeline.find(p => p.key === s.key)?.deals.length ?? 0;
              const isActive = active === s.key;
              return (
                <div key={s.key} onClick={() => setActive(s.key)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", borderRadius: 8, cursor: "pointer", borderLeft: isActive ? `2px solid ${s.color}` : "2px solid transparent", background: isActive ? `rgba(${s.rgb},0.06)` : "transparent", marginBottom: 2, transition: "all 0.2s" }}>
                  <span style={{ ...IN, fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "#666" }}>{s.label}</span>
                  <span style={{ ...MO, fontSize: 9, color: isActive ? s.color : "#333", background: isActive ? `rgba(${s.rgb},0.12)` : "transparent", padding: "1px 7px", borderRadius: 4 }}>{count}</span>
                </div>
              );
            })}
          </div>

          {/* Stats strip */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid #111" }}>
            <div style={{ ...MO, fontSize: 8, color: "#333", letterSpacing: "0.14em", marginBottom: 12 }}>MONTH TOTALS</div>
            {[
              { label: "Closed MRR", value: `$${closedTotal.toFixed(0)}k` },
              { label: "Active deals", value: String(activeDeals) },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ ...IN, fontSize: 11, color: "#555" }}>{s.label}</span>
                <span style={{ ...MO, fontSize: 11, color: "#fff", fontWeight: 700 }}>{s.value}<span style={{ color: GREEN, fontSize: 9 }}>+</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "48px 60px 100px" }}>

          {/* Page header */}
          <Reveal>
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: activeStage?.color || PURPLE, boxShadow: `0 0 8px ${activeStage?.color || PURPLE}80`, animation: "gPulse 2s infinite", display: "block" }} />
                <span style={{ ...MO, fontSize: 11, color: `${activeStage?.color || PURPLE}99`, letterSpacing: "0.18em" }}>SALES & BD</span>
              </div>
              <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.06, marginBottom: 8 }}>
                {active === "all" ? "Pipeline Overview" : active === "followups" ? "Overdue Follow-ups" : `${activeStage?.label}`}
              </h1>
              {active === "all" && <p style={{ ...MO, fontSize: 11, color: "#555" }}>Lead triage · proposals · CRM · follow-up sequences</p>}
            </div>
          </Reveal>

          {/* Stats — only on all view */}
          {active === "all" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 56 }}>
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "28px 0", borderRight: i < 3 ? "1px solid #111" : "none", paddingRight: i < 3 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0 }}>
                    <div style={{ fontSize: "clamp(1.5rem, 1.8vw, 2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      <CountUp value={s.value} /><span style={{ color: GREEN }}>+</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#666", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* ALL VIEW — show all columns */}
          {active === "all" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
              {pipeline.map((col, ci) => (
                <Reveal key={col.stage} delay={ci * 0.06}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid rgba(${col.rgb},0.2)` }}>
                      <span style={{ ...MO, fontSize: 9, color: col.color, letterSpacing: "0.1em" }}>{col.stage.toUpperCase()}</span>
                      <span style={{ ...MO, fontSize: 9, color: col.color, background: `rgba(${col.rgb},0.1)`, padding: "2px 7px", borderRadius: 4 }}>{col.deals.length}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {col.deals.map((d, di) => (
                        <ColourCard key={di} rgb={col.rgb} style={{ padding: "12px 14px", borderLeft: `2px solid rgba(${col.rgb},0.4)` }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#d0d0d8", marginBottom: 3 }}>{d.co}</div>
                          <div style={{ ...MO, fontSize: 9, color: "#444", marginBottom: 6 }}>{d.contact}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ ...MO, fontSize: 10, color: col.color }}>{d.value}</span>
                            {d.days > 0 && <span style={{ ...MO, fontSize: 9, color: d.days > 12 ? "#f59e0b" : "#333", background: d.days > 12 ? "rgba(245,158,11,0.08)" : "#111", padding: "1px 6px", borderRadius: 3 }}>{d.days}d</span>}
                            {col.key === "closed" && <span style={{ ...MO, fontSize: 9, color: "#10b981" }}>ACTIVE</span>}
                          </div>
                        </ColourCard>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* STAGE VIEW — single stage deals */}
          {active !== "all" && active !== "followups" && stageData && (
            <div>
              <Reveal>
                <div style={{ ...MO, fontSize: 10, color: "#444", marginBottom: 24 }}>{stageData.deals.length} DEALS IN THIS STAGE</div>
              </Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                {stageData.deals.map((d, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <ColourCard rgb={stageData.rgb} style={{ padding: "24px 26px", borderLeft: `3px solid rgba(${stageData.rgb},0.5)` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{d.co}</div>
                          <div style={{ ...MO, fontSize: 10, color: "#555" }}>{d.contact}</div>
                        </div>
                        <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{d.value}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6, marginBottom: 16 }}>{d.note}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid #1a1a1a" }}>
                        {d.days > 0
                          ? <span style={{ ...MO, fontSize: 10, color: d.days > 12 ? "#f59e0b" : "#555" }}>{d.days}d in stage</span>
                          : <span style={{ ...MO, fontSize: 10, color: stageData.color }}>ACTIVE CLIENT</span>
                        }
                        {d.days > 12 && <span style={{ ...MO, fontSize: 9, color: "#ef4444", background: "rgba(239,68,68,0.08)", padding: "3px 10px", borderRadius: 70, border: "1px solid rgba(239,68,68,0.2)" }}>NEEDS ATTENTION</span>}
                      </div>
                    </ColourCard>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* FOLLOW-UPS VIEW */}
          {active === "followups" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {followUps.map((f, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <ColourCard rgb={f.rgb} style={{ padding: "20px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                      <div style={{ width: 3, height: 40, borderRadius: 2, background: f.color, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e8" }}>{f.co}</span>
                          <span style={{ ...MO, fontSize: 9, color: "#444" }}>{f.contact}</span>
                        </div>
                        <span style={{ ...MO, fontSize: 10, color: "#555" }}>{f.note}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ ...MO, fontSize: 8, color: "#333", marginBottom: 2 }}>ASSIGNED</div>
                          <div style={{ ...MO, fontSize: 10, color: PURPLE }}>{f.assignee}</div>
                        </div>
                        <span style={{ ...MO, fontSize: 10, fontWeight: 700, color: f.color, background: `rgba(${f.rgb},0.08)`, padding: "5px 12px", borderRadius: 6, border: `1px solid rgba(${f.rgb},0.2)` }}>{f.overdue}d overdue</span>
                        <button style={{ ...MO, padding: "7px 16px", borderRadius: 6, fontSize: 9, background: `rgba(${f.rgb},0.06)`, border: `1px solid rgba(${f.rgb},0.2)`, color: f.color, cursor: "pointer", letterSpacing: "0.06em" }}>FOLLOW UP</button>
                      </div>
                    </div>
                  </ColourCard>
                </Reveal>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
