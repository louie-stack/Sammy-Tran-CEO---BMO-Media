"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";
import AgentSquarePFP from "../../components/AgentSquarePFP";

const MO = { fontFamily: "'Space Mono', monospace" };
const IN = { fontFamily: "'Inter', sans-serif" };
const GREEN = "#C4F000";
const PINK = "#ec4899";
const PURPLE = "#a855f7";

/* ── Helpers ─────────────────────────────────────────────────── */
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

function ProgressRing({ pct, color, size = 56 }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={3} />
      <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
        strokeWidth={3} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ - dash}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{ filter: `drop-shadow(0 0 4px ${color}80)` }} />
    </svg>
  );
}


function ThreatMeter({ threat, color, rgb }) {
  const levels = { Low: 1, Medium: 2, High: 3 };
  const n = levels[threat] || 1;
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {[1, 2, 3].map(i => (
        <motion.div key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
          style={{ width: 4, height: 8 + i * 4, borderRadius: 2, background: i <= n ? color : "rgba(255,255,255,0.08)", boxShadow: i <= n ? `0 0 6px rgba(${rgb},0.6)` : "none", transformOrigin: "bottom" }} />
      ))}
      <span style={{ ...MO, fontSize: 9, color, marginLeft: 6, letterSpacing: "0.08em" }}>{threat.toUpperCase()} THREAT</span>
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */
const CATEGORIES = [
  { key: "all", label: "Overview" },
  { key: "market", label: "Market Intel" },
  { key: "client", label: "Client Research" },
  { key: "product", label: "Product Strategy" },
  { key: "competitor", label: "Competitors" },
];

const briefs = [
  {
    title: "Klaviyo Ecosystem — Q2 2026 Trends",
    status: "In Progress", pct: 72, tag: "Market Intel", category: "market",
    color: PINK, rgb: "236,72,153", hue: 330,
    summary: "Deep-dive into Klaviyo platform trajectory for Q2 2026. Covers AI feature rollout, pricing shifts, and competitive positioning relative to BMO's service model.",
    bullets: [
      "AI-powered segmentation beta opens early access for select partners — BMO clients eligible",
      "Klaviyo raising prices ~12% on mid-tier plans from May 1 — client comms needed for 6 accounts",
      "New predictive analytics dashboard overlaps with BMO's reporting offer — differentiate now",
      "Send-time optimisation native feature launching Q2 — affects Nexmail positioning",
    ],
    sources: ["Klaviyo Partner Portal", "eCom Industry Report", "PB Research Notes"],
    dueDate: "Apr 8", assignee: "Princess Bubblegum",
  },
  {
    title: "Centr Fitness Pre-Call Research Pack",
    status: "Complete", pct: 100, tag: "Client Research", category: "client",
    color: "#10b981", rgb: "16,185,129", hue: 160,
    summary: "Full pre-call intelligence brief for Centr Fitness ahead of onboarding discovery. Covers email program audit, competitive benchmarks, and recommended strategy angles.",
    bullets: [
      "Current email program: 2 flows active (welcome + post-purchase), no segmentation",
      "3.2% average open rate — well below fitness industry benchmark of 6.1%",
      "Subscriber list: ~48k, 30-day active: 9k — significant re-engagement opportunity",
      "BFCM 2025 generated 0 email revenue — major gap to close before Q4",
      "Recommend: Full lifecycle build + SMS layer from Day 1",
    ],
    sources: ["Klaviyo Audit", "Centr Website", "Industry Benchmarks Q1 2026"],
    dueDate: "Completed Mar 30", assignee: "Princess Bubblegum",
  },
  {
    title: "Nexmail Product Strategy v2",
    status: "In Progress", pct: 45, tag: "Product", category: "product",
    color: PURPLE, rgb: "168,85,247", hue: 270,
    summary: "Second iteration of Nexmail's go-to-market positioning. Repositioning from a SaaS tool to a high-touch intelligence layer. Focus on the BMO strategy-execution gap in the market.",
    bullets: [
      "Core differentiator: human-verified AI strategy — not just automated email sends",
      "Target segment: DTC brands doing $1M–$20M in annual email revenue",
      "Pricing model: retainer-based ($2.5k–$8k/mo) vs per-send SaaS",
      "Competitive advantage: BMO execution layer + Nexmail intel = unmatched client ROI",
    ],
    sources: ["Internal Strategy Docs", "Competitor Analysis", "Client Interviews"],
    dueDate: "Apr 7", assignee: "Princess Bubblegum",
  },
];

const competitors = [
  {
    name: "Retention.com", threat: "High", color: "#ef4444", rgb: "239,68,68", hue: 0,
    updated: "Apr 1, 2026",
    summary: "Strong identity resolution product. Growing fast in DTC space. Their new Klaviyo Sync feature has direct overlap with BMO's lifecycle positioning.",
    bullets: [
      "Launched native Klaviyo integration Q1 — reducing friction for mid-market DTC",
      "Raised Series B ($40M) — accelerating sales team and product roadmap",
      "Targeting BMO's core client base (DTC $1M–$20M ARR) aggressively",
      "Weakness: pure tech play, no human strategy layer — BMO's core differentiator holds",
    ],
    action: "Immediate: Update Nexmail positioning to counter Retention.com narrative",
  },
  {
    name: "Yotpo", threat: "Medium", color: "#f59e0b", rgb: "245,158,11", hue: 38,
    updated: "Mar 28, 2026",
    summary: "Expanding from loyalty into full CRM suite. Strong brand recognition. Lifecycle offering still shallow compared to BMO's strategy depth.",
    bullets: [
      "New lifecycle product launched — bundled with loyalty (potentially attractive to clients)",
      "Klaviyo partnership announcement signals intent to play in the flow space",
      "Pricing accessible for smaller brands — could pull from BMO's lower-tier pipeline",
      "No dedicated strategy team — execution quality is self-serve",
    ],
    action: "Monitor quarterly. Update client decks to highlight BMO strategy vs Yotpo self-serve.",
  },
  {
    name: "Rejoiner", threat: "Low", color: "#10b981", rgb: "16,185,129", hue: 160,
    updated: "Mar 20, 2026",
    summary: "Niche email automation player losing ground to native Klaviyo flows. Not a major threat for enterprise-tier clients.",
    bullets: [
      "Declining market share as Klaviyo native features improve",
      "Customer base skews toward smaller brands under $500k revenue",
      "No AI roadmap visible — falling behind on product innovation",
    ],
    action: "No action needed. Revisit in Q3.",
  },
];

const insights = [
  { text: "Klaviyo announces AI-powered segmentation beta — BMO clients eligible for early access", source: "Klaviyo Blog", date: "Apr 1", category: "market", urgent: true },
  { text: "BFCM 2026 planning starts now — brands locking in retainer budgets in Q2", source: "eCom Industry Report", date: "Mar 31", category: "market", urgent: true },
  { text: "SMS opt-in rates declining post-TCPA enforcement — strategy review needed for 4 clients", source: "Attentive Research", date: "Mar 29", category: "client", urgent: true },
  { text: "Tiered loyalty outperforms points-only by 34% in retention rate (Q1 2026 data)", source: "Loyalty360", date: "Mar 27", category: "market", urgent: false },
  { text: "Subscription growth fastest in food & beverage — Centr + MoonBrew direct opportunity", source: "Recharge Data", date: "Mar 25", category: "client", urgent: false },
  { text: "Average email open rate down 0.8% industry-wide in Q1 — subject line testing critical", source: "Mailcharts", date: "Mar 24", category: "market", urgent: false },
  { text: "Nexmail competitor Retention.com raises $40M — accelerating into BMO's core market", source: "TechCrunch", date: "Mar 22", category: "competitor", urgent: true },
];

/* ── Main Component ───────────────────────────────────────────── */
export default function ResearchPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openBrief, setOpenBrief] = useState(null);
  const [openCompetitor, setOpenCompetitor] = useState(null);
  const [intelFilter, setIntelFilter] = useState("all");


  const filteredInsights = intelFilter === "all" ? insights : insights.filter(i => i.category === intelFilter);
  const showBriefs = activeCategory === "all" || ["market", "client", "product"].includes(activeCategory);
  const showCompetitors = activeCategory === "all" || activeCategory === "competitor";
  const showIntel = activeCategory === "all" || activeCategory === "market" || activeCategory === "client";
  const filteredBriefs = activeCategory === "all" ? briefs : briefs.filter(b => b.category === activeCategory);
  const filteredCompetitors = competitors;

  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .brief-card:hover { transform: translateY(-2px); }
        .brief-card { transition: transform 0.25s; cursor: pointer; }
        .intel-row:hover { background: rgba(255,255,255,0.025) !important; }
        .intel-row { transition: background 0.2s; cursor: pointer; border-radius: 8px; }
        .comp-card:hover { transform: translateY(-1px); }
        .comp-card { transition: transform 0.2s; cursor: pointer; }
        .cat-btn:hover { background: rgba(255,255,255,0.05) !important; }
      `}</style>

      <Nav />

      <div style={{ display: "flex", paddingTop: 54, position: "relative", zIndex: 1 }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{ width: 220, flexShrink: 0, borderRight: "1px solid #111", display: "flex", flexDirection: "column", position: "sticky", top: 54, height: "calc(100vh - 54px)", overflowY: "auto" }}>
          {/* PB Agent */}
          <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid #111", position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <AgentSquarePFP src="/agents/pb-pfp.png" accent="#ec4899" size={52} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#e0e0e8" }}>Princess Bubblegum</div>
                <div style={{ ...MO, fontSize: 9, color: "#555" }}>Research & Strategy</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 5px rgba(245,158,11,0.6)", animation: "gPulse 2s infinite", display: "block" }} />
              <span style={{ ...MO, fontSize: 9, color: "#555" }}>STANDBY</span>
            </div>
          </div>

          {/* Category nav */}
          <div style={{ padding: "16px 10px", flex: 1 }}>
            <div style={{ ...MO, fontSize: 9, color: "#333", letterSpacing: "0.14em", padding: "0 10px", marginBottom: 8 }}>SECTIONS</div>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.key;
              return (
                <div key={cat.key} className="cat-btn" onClick={() => setActiveCategory(cat.key)}
                  style={{ padding: "9px 12px", borderRadius: 8, cursor: "pointer", borderLeft: isActive ? `2px solid ${GREEN}` : "2px solid transparent", background: isActive ? `rgba(196,240,0,0.05)` : "transparent", marginBottom: 2, transition: "all 0.2s", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "#666" }}>{cat.label}</span>
                  {isActive && <span style={{ width: 5, height: 5, borderRadius: "50%", background: GREEN, animation: "gPulse 2s infinite", display: "block" }} />}
                </div>
              );
            })}
          </div>

          {/* Quick stats */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid #111" }}>
            <div style={{ ...MO, fontSize: 9, color: "#333", letterSpacing: "0.14em", marginBottom: 14 }}>INTEL STATUS</div>
            {[
              { label: "Active Briefs", value: "3", color: PINK },
              { label: "Threats Tracked", value: "3", color: "#ef4444" },
              { label: "Insights This Week", value: "7", color: PURPLE },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#555" }}>{s.label}</span>
                <span style={{ ...MO, fontSize: 12, color: s.color, fontWeight: 700 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, overflowY: "auto", maxHeight: "calc(100vh - 54px)" }}>

          {/* Hero */}
          <div style={{ position: "relative", padding: "60px 56px 40px", borderBottom: "1px solid #111", overflow: "hidden" }}>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: PINK, boxShadow: `0 0 8px ${PINK}80`, animation: "gPulse 2s infinite", display: "block" }} />
                <span style={{ ...MO, fontSize: 11, color: `${PINK}99`, letterSpacing: "0.18em" }}>RESEARCH & STRATEGY</span>
              </div>
              <h1 style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.06, marginBottom: 10 }}>
                Research & Strategy
              </h1>
              <p style={{ ...MO, fontSize: 11, color: "#555" }}>Market intelligence · competitor tracking · client research · Nexmail strategy</p>
            </motion.div>
          </div>

          {/* Content area */}
          <div style={{ padding: "40px 56px 100px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>

              {/* ── CENTER COLUMN ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

                {/* Active Briefs */}
                {showBriefs && (
                  <section>
                    <Reveal>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                        <div>
                          <div style={{ ...MO, fontSize: 10, color: GREEN, letterSpacing: "0.18em", marginBottom: 6 }}>ACTIVE BRIEFS</div>
                          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Research Briefs</h2>
                        </div>
                        <span style={{ ...MO, fontSize: 10, color: "#444" }}>{filteredBriefs.length} BRIEFS</span>
                      </div>
                    </Reveal>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {filteredBriefs.map((b, i) => (
                        <Reveal key={b.title} delay={i * 0.07}>
                          <div className="brief-card" onClick={() => setOpenBrief(b)}>
                            <GlowCard style={{ "--base": b.hue, padding: "20px 24px", borderLeft: `3px solid rgba(${b.rgb},0.5)` }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <ProgressRing pct={b.pct} color={b.color} size={52} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: "#e0e0e8" }}>{b.title}</span>
                                    {b.status === "Complete" && <span style={{ ...MO, fontSize: 9, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: 70, border: "1px solid rgba(16,185,129,0.2)", flexShrink: 0 }}>COMPLETE</span>}
                                  </div>
                                  <div style={{ display: "flex", align: "center", gap: 10 }}>
                                    <span style={{ ...MO, fontSize: 10, color: b.color, background: `rgba(${b.rgb},0.08)`, padding: "2px 8px", borderRadius: 3, border: `1px solid rgba(${b.rgb},0.15)` }}>{b.tag}</span>
                                    <span style={{ ...MO, fontSize: 10, color: "#444" }}>Due {b.dueDate}</span>
                                  </div>
                                </div>
                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{b.pct}<span style={{ fontSize: 12, color: b.color }}>%</span></div>
                                  <div style={{ ...MO, fontSize: 9, color: "#444", marginTop: 3 }}>CLICK TO OPEN</div>
                                </div>
                              </div>
                            </GlowCard>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </section>
                )}

                {/* Competitor Intel */}
                {showCompetitors && (
                  <section>
                    <Reveal>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                        <div>
                          <div style={{ ...MO, fontSize: 10, color: "#ef4444", letterSpacing: "0.18em", marginBottom: 6 }}>THREAT MATRIX</div>
                          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Competitor Intel</h2>
                        </div>
                      </div>
                    </Reveal>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {filteredCompetitors.map((c, i) => (
                        <Reveal key={c.name} delay={i * 0.07}>
                          <div className="comp-card" onClick={() => setOpenCompetitor(c)}>
                            <GlowCard style={{ "--base": c.hue, padding: "18px 24px", borderLeft: `3px solid rgba(${c.rgb},0.5)` }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                  <div style={{ fontSize: 15, fontWeight: 700, color: "#e0e0e8", marginBottom: 6 }}>{c.name}</div>
                                  <ThreatMeter threat={c.threat} color={c.color} rgb={c.rgb} />
                                </div>
                                <div style={{ textAlign: "right" }}>
                                  <div style={{ ...MO, fontSize: 10, color: "#333", marginBottom: 4 }}>UPDATED</div>
                                  <div style={{ ...MO, fontSize: 11, color: "#555" }}>{c.updated}</div>
                                  <div style={{ ...MO, fontSize: 9, color: "#444", marginTop: 6 }}>CLICK FOR BRIEF</div>
                                </div>
                              </div>
                            </GlowCard>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* ── RIGHT RAIL — Live Intel Feed ── */}
              {showIntel && (
                <div style={{ position: "sticky", top: 40 }}>
                  <Reveal>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                      <div>
                        <div style={{ ...MO, fontSize: 10, color: GREEN, letterSpacing: "0.18em", marginBottom: 6 }}>LIVE FEED</div>
                        <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>Market Intel</h2>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: GREEN, boxShadow: `0 0 5px ${GREEN}80`, animation: "gPulse 2s infinite", display: "block" }} />
                        <span style={{ ...MO, fontSize: 9, color: "#555" }}>LIVE</span>
                      </div>
                    </div>
                  </Reveal>

                  {/* Filter chips */}
                  <Reveal delay={0.1}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                      {[{ k: "all", label: "All" }, { k: "market", label: "Market" }, { k: "client", label: "Client" }, { k: "competitor", label: "Competitor" }].map(f => (
                        <button key={f.k} onClick={() => setIntelFilter(f.k)}
                          style={{ ...MO, fontSize: 9, padding: "4px 11px", borderRadius: 70, cursor: "pointer", transition: "all 0.2s", background: intelFilter === f.k ? `rgba(196,240,0,0.08)` : "transparent", border: intelFilter === f.k ? `1px solid ${GREEN}40` : "1px solid #1a1a1a", color: intelFilter === f.k ? GREEN : "#444", letterSpacing: "0.06em" }}>
                          {f.label.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </Reveal>

                  <GlowCard style={{ padding: "6px 0" }}>
                    <AnimatePresence mode="popLayout">
                      {filteredInsights.map((ins, i) => (
                        <motion.div key={ins.text} className="intel-row"
                          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          style={{ padding: "14px 18px", borderBottom: i < filteredInsights.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: "transparent" }}>
                          <div style={{ display: "flex", gap: 12 }}>
                            <div style={{ width: 2, background: ins.urgent ? `rgba(196,240,0,0.4)` : "rgba(255,255,255,0.06)", borderRadius: 2, flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                                <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.55, flex: 1 }}>{ins.text}</p>
                                {ins.urgent && (
                                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, flexShrink: 0, marginTop: 5, animation: "gPulse 1.5s infinite" }} />
                                )}
                              </div>
                              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                <span style={{ ...MO, fontSize: 9, color: "rgba(196,240,0,0.6)", background: "rgba(196,240,0,0.06)", padding: "2px 6px", borderRadius: 3 }}>{ins.source}</span>
                                <span style={{ ...MO, fontSize: 9, color: "#333" }}>{ins.date}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </GlowCard>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BRIEF MODAL ── */}
      <AnimatePresence>
        {openBrief && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpenBrief(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 100 }} />
            <div style={{ position: "fixed", inset: 0, zIndex: 101, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", pointerEvents: "none" }}>
            <motion.div initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              style={{ width: "min(680px, 92vw)", maxHeight: "80vh", overflowY: "auto", background: "#111", borderRadius: 18, border: `1px solid rgba(${openBrief.rgb},0.2)`, boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(${openBrief.rgb},0.05)`, pointerEvents: "all" }}>
              {/* Modal header */}
              <div style={{ padding: "28px 32px 20px", borderBottom: "1px solid #1a1a1a", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${openBrief.color}, transparent)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                      <span style={{ ...MO, fontSize: 9, color: openBrief.color, background: `rgba(${openBrief.rgb},0.08)`, padding: "3px 10px", borderRadius: 70, border: `1px solid rgba(${openBrief.rgb},0.2)` }}>{openBrief.tag.toUpperCase()}</span>
                      <span style={{ ...MO, fontSize: 9, color: "#444" }}>DUE {openBrief.dueDate.toUpperCase()}</span>
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: 0 }}>{openBrief.title}</h2>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, marginLeft: 20 }}>
                    <ProgressRing pct={openBrief.pct} color={openBrief.color} size={60} />
                    <button onClick={() => setOpenBrief(null)} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid #222", color: "#777", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                  </div>
                </div>
              </div>
              {/* Modal body */}
              <div style={{ padding: "24px 32px 32px" }}>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, marginBottom: 24 }}>{openBrief.summary}</p>
                <div style={{ ...MO, fontSize: 10, color: "#444", letterSpacing: "0.12em", marginBottom: 12 }}>KEY FINDINGS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {openBrief.bullets.map((pt, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                      style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < openBrief.bullets.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <span style={{ color: openBrief.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                      <span style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>{pt}</span>
                    </motion.div>
                  ))}
                </div>
                <div style={{ marginTop: 24, padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid #1a1a1a" }}>
                  <div style={{ ...MO, fontSize: 9, color: "#444", marginBottom: 6, letterSpacing: "0.1em" }}>SOURCES</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {openBrief.sources.map(s => (
                      <span key={s} style={{ ...MO, fontSize: 10, color: PURPLE, background: "rgba(196,240,0,0.06)", padding: "3px 10px", borderRadius: 4, border: "1px solid rgba(168,85,247,0.15)" }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                  <button style={{ ...MO, flex: 1, padding: "12px 0", borderRadius: 8, background: `rgba(${openBrief.rgb},0.08)`, border: `1px solid rgba(${openBrief.rgb},0.2)`, color: openBrief.color, cursor: "pointer", fontSize: 10, letterSpacing: "0.08em" }}>SHARE BRIEF</button>
                  <button style={{ ...MO, flex: 1, padding: "12px 0", borderRadius: 8, background: "transparent", border: "1px solid #222", color: "#666", cursor: "pointer", fontSize: 10, letterSpacing: "0.08em" }}>EXPORT PDF</button>
                  <button onClick={() => setOpenBrief(null)} style={{ ...MO, flex: 1, padding: "12px 0", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid #222", color: "#999", cursor: "pointer", fontSize: 10, letterSpacing: "0.08em" }}>CLOSE</button>
                </div>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ── COMPETITOR MODAL ── */}
      <AnimatePresence>
        {openCompetitor && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpenCompetitor(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 100 }} />
            <div style={{ position: "fixed", inset: 0, zIndex: 101, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", pointerEvents: "none" }}>
            <motion.div initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              style={{ width: "min(620px, 92vw)", maxHeight: "80vh", overflowY: "auto", background: "#111", borderRadius: 18, border: `1px solid rgba(${openCompetitor.rgb},0.2)`, boxShadow: `0 30px 80px rgba(0,0,0,0.6)`, pointerEvents: "all" }}>
              <div style={{ padding: "28px 32px 20px", borderBottom: "1px solid #1a1a1a", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${openCompetitor.color}, transparent)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{openCompetitor.name}</h2>
                    <ThreatMeter threat={openCompetitor.threat} color={openCompetitor.color} rgb={openCompetitor.rgb} />
                  </div>
                  <button onClick={() => setOpenCompetitor(null)} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid #222", color: "#777", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                </div>
              </div>
              <div style={{ padding: "24px 32px 32px" }}>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, marginBottom: 24 }}>{openCompetitor.summary}</p>
                <div style={{ ...MO, fontSize: 10, color: "#444", letterSpacing: "0.12em", marginBottom: 12 }}>INTELLIGENCE POINTS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {openCompetitor.bullets.map((pt, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                      style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < openCompetitor.bullets.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <span style={{ color: openCompetitor.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                      <span style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>{pt}</span>
                    </motion.div>
                  ))}
                </div>
                <div style={{ marginTop: 20, padding: "14px 16px", background: `rgba(${openCompetitor.rgb},0.04)`, borderRadius: 10, border: `1px solid rgba(${openCompetitor.rgb},0.12)` }}>
                  <div style={{ ...MO, fontSize: 9, color: openCompetitor.color, marginBottom: 6, letterSpacing: "0.1em" }}>RECOMMENDED ACTION</div>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{openCompetitor.action}</p>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                  <button style={{ ...MO, flex: 1, padding: "12px 0", borderRadius: 8, background: `rgba(${openCompetitor.rgb},0.08)`, border: `1px solid rgba(${openCompetitor.rgb},0.2)`, color: openCompetitor.color, cursor: "pointer", fontSize: 10, letterSpacing: "0.08em" }}>UPDATE BRIEF</button>
                  <button onClick={() => setOpenCompetitor(null)} style={{ ...MO, flex: 1, padding: "12px 0", borderRadius: 8, background: "transparent", border: "1px solid #222", color: "#666", cursor: "pointer", fontSize: 10, letterSpacing: "0.08em" }}>CLOSE</button>
                </div>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}




