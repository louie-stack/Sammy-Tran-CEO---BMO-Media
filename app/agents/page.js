"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";

const IN = { fontFamily: "'Inter', sans-serif" };
const MO = { fontFamily: "'Space Mono', monospace" };
const GREEN = "#C4F000";

function Reveal({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", bounce: 0, duration: 1.2, delay }}>
      {children}
    </motion.div>
  );
}

const agents = [
  {
    id: "bmo", name: "BMO", role: "Chief of Staff", rank: "01",
    color: GREEN, rgb: "196,240,0", status: "active", emoji: "🤖",
    headline: "The one who keeps the whole operation running.",
    desc: "Your main agent. Handles morning briefs, email triage, task delegation, and keeps every other agent coordinated. The one you talk to first — and last.",
    tasksToday: 18, tasksWeek: 102, uptime: "99.4",
    capabilities: ["Morning brief", "Email drafting & triage", "Task delegation", "Calendar coordination", "End-of-day debrief"],
    integrations: ["Gmail", "Google Calendar", "Slack", "Notion"],
    queue: [
      { task: "Compile morning brief", project: "All agents", pct: 100 },
      { task: "Draft reply — Ritual Beauty", project: "Inbox", pct: 80 },
      { task: "Route research to PB", project: "Centr Fitness", pct: null },
    ],
  },
  {
    id: "marceline", name: "Marceline", role: "Sales & BD Lead", rank: "02",
    color: "#a855f7", rgb: "168,85,247", status: "active", emoji: "🎸",
    headline: "Lead triage. Pipeline tracking. Revenue momentum.",
    desc: "Handles inbound lead scoring, proposal drafting, CRM visibility and follow-up sequences. Marceline keeps the pipeline moving so nothing falls through the cracks.",
    tasksToday: 11, tasksWeek: 67, uptime: "98.1",
    capabilities: ["Lead triage & scoring", "Proposal drafting", "Pipeline tracking", "Follow-up sequences", "CRM updates"],
    integrations: ["HubSpot CRM", "Gmail", "Typeform", "Calendly"],
    queue: [
      { task: "Follow-up — Jolie Skin (3d)", project: "Pipeline", pct: null },
      { task: "Draft proposal — Centr Fitness", project: "Sales", pct: 60 },
      { task: "Pipeline report — weekly", project: "All deals", pct: 100 },
    ],
  },
  {
    id: "pb", name: "Princess Bubblegum", role: "Research & Strategy", rank: "03",
    color: "#ec4899", rgb: "236,72,153", status: "standby", emoji: "👑",
    headline: "Intelligence. Strategy. The edge you need.",
    desc: "Market analysis, competitor intel, client research and Nexmail product strategy. PB turns raw information into actionable edge for Sammy and the team.",
    tasksToday: 4, tasksWeek: 29, uptime: "96.2",
    capabilities: ["Competitor intelligence", "Market trend analysis", "Client research packs", "Nexmail strategy", "Strategic briefs"],
    integrations: ["Perplexity", "Google Search", "Notion", "Klaviyo Blog"],
    queue: [
      { task: "Centr Fitness pre-call research", project: "Client Research", pct: 100 },
      { task: "Nexmail strategy v2", project: "Product", pct: 45 },
      { task: "Retention.com competitive update", project: "Intel", pct: 100 },
    ],
  },
  {
    id: "jake", name: "Jake", role: "Builder", rank: "04",
    color: "#eab308", rgb: "234,179,8", status: "active", emoji: "🐕",
    headline: "Code. Flows. Integrations. Built without being asked twice.",
    desc: "Builds and maintains all technical infrastructure — Klaviyo flows, n8n automations, Shopify integrations, dashboards, and API pipelines.",
    tasksToday: 9, tasksWeek: 58, uptime: "97.5",
    capabilities: ["Klaviyo flow builds", "n8n automation", "Shopify integrations", "API pipelines", "Dashboard builds"],
    integrations: ["Klaviyo API", "n8n", "Shopify Admin", "Vercel", "Postscript"],
    queue: [
      { task: "MoonBrew cart flow v3", project: "Klaviyo", pct: 100 },
      { task: "Fix Gorgias webhook auth", project: "n8n", pct: 40 },
      { task: "Weekly metrics dashboard", project: "Reporting", pct: 100 },
    ],
  },
  {
    id: "finn", name: "Finn", role: "Health & Wellness", rank: "05",
    color: "#06b6d4", rgb: "6,182,212", status: "standby", emoji: "⚔️",
    headline: "The human hero keeping the body in check.",
    desc: "BP tracking, sciatica management, tirzepatide cycle monitoring, and workout accountability. Finn keeps Sammy operating at peak physical performance.",
    tasksToday: 3, tasksWeek: 21, uptime: "94.8",
    capabilities: ["Daily BP logging", "Tirzepatide tracking", "Workout log", "Sciatica / back log", "Weekly wellness score"],
    integrations: ["Health log", "Fitness tracker", "Calendar reminders"],
    queue: [
      { task: "Morning BP check-in", project: "Daily", pct: 100 },
      { task: "Week 8 tirzepatide log", project: "Cycle", pct: 100 },
      { task: "Weekly wellness summary", project: "Report", pct: null },
    ],
  },
];

export default function AgentsPage() {
  const [sel, setSel] = useState(null);
  const a = sel !== null ? agents[sel] : null;

  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.5}50%{opacity:1}}`}</style>
      <Nav />

      {/* Hero */}
      <div style={{ paddingTop: 54 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "72px 60px 48px" }}>
          <Reveal>
            <div style={{ ...MO, fontSize: 9, color: GREEN, letterSpacing: "0.18em", marginBottom: 14 }}>AGENT ROSTER</div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 style={{ ...IN, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 10 }}>Your AI Team</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: 15, color: "#555", maxWidth: 500, lineHeight: 1.6 }}>
              Five agents. One mission. Every function of the business covered and running while you focus on what matters.
            </p>
          </Reveal>
        </div>

        {/* Divider */}
        <div style={{ borderBottom: "1px solid #1a1a1a" }} />
      </div>

      {/* Agent Grid — BMO case-study card style */}
      {sel === null && (
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "48px 60px 100px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {agents.map((ag, i) => (
              <Reveal key={ag.id} delay={i * 0.07}>
                <div
                  onClick={() => setSel(i)}
                  style={{ cursor: "pointer", background: "#0D0D0D", border: "1px solid #1f1f1f", borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#333"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1f1f1f"}
                >
                  {/* Image / video area */}
                  <div style={{ width: "100%", aspectRatio: "16/7", background: "#111", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* Subtle radial tint */}
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 60%, rgba(${ag.rgb},0.08) 0%, transparent 65%)` }} />
                    <span style={{ fontSize: 64, filter: "drop-shadow(0 0 30px rgba(255,255,255,0.05))", position: "relative", zIndex: 1 }}>{ag.emoji}</span>
                    <div style={{ position: "absolute", bottom: 16, left: 20, ...MO, fontSize: 8, color: ag.color, letterSpacing: "0.15em" }}>AGENT {ag.rank}</div>
                    <div style={{ position: "absolute", top: 16, right: 16, display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: ag.status === "active" ? GREEN : "#444", boxShadow: ag.status === "active" ? `0 0 5px ${GREEN}80` : "none", animation: ag.status === "active" ? "gPulse 2s ease-in-out infinite" : "none", display: "block" }} />
                      <span style={{ ...MO, fontSize: 8, color: "#444" }}>{ag.status.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px 24px 24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", marginBottom: 2 }}>{ag.name}</div>
                        <div style={{ fontSize: 13, color: "#555" }}>{ag.role}</div>
                      </div>
                      <div style={{ display: "flex", gap: 16, textAlign: "right" }}>
                        <div>
                          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>{ag.tasksToday}<span style={{ color: GREEN, fontSize: 16 }}>+</span></div>
                          <div style={{ ...MO, fontSize: 8, color: "#444", marginTop: 2 }}>TODAY</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>{ag.uptime}<span style={{ color: GREEN, fontSize: 14 }}>%</span></div>
                          <div style={{ ...MO, fontSize: 8, color: "#444", marginTop: 2 }}>UPTIME</div>
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: 13, color: "#444", lineHeight: 1.6, marginBottom: 16 }}>{ag.headline}</p>

                    {/* Capability pills */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {ag.capabilities.slice(0, 3).map((c) => (
                        <span key={c} style={{ ...MO, fontSize: 8, padding: "3px 10px", borderRadius: 70, border: "1px solid #2a2a2a", color: "#555", letterSpacing: "0.04em" }}>{c}</span>
                      ))}
                      {ag.capabilities.length > 3 && (
                        <span style={{ ...MO, fontSize: 8, padding: "3px 10px", borderRadius: 70, border: "1px solid #2a2a2a", color: "#555" }}>+{ag.capabilities.length - 3} more</span>
                      )}
                    </div>

                    <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 12, color: "#555" }}>View agent</span>
                      <span style={{ color: GREEN, fontSize: 12 }}>→</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* Agent Detail */}
      <AnimatePresence>
        {sel !== null && a && (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            style={{ maxWidth: 1440, margin: "0 auto", padding: "40px 60px 100px" }}
          >
            {/* Back */}
            <button onClick={() => setSel(null)} style={{ ...MO, fontSize: 10, color: "#555", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 32, display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = GREEN}
              onMouseLeave={e => e.currentTarget.style.color = "#555"}>
              ← ALL AGENTS
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* Left */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Video placeholder */}
                <div style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ width: "100%", aspectRatio: "16/9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 60%, rgba(${a.rgb},0.08) 0%, transparent 60%)` }} />
                    <span style={{ fontSize: 60, position: "relative", zIndex: 1 }}>{a.emoji}</span>
                    <span style={{ ...MO, fontSize: 8, color: "#333", letterSpacing: "0.15em", position: "relative", zIndex: 1 }}>VIDEO COMING SOON</span>
                  </div>
                  <div style={{ padding: "20px 24px 24px", borderTop: "1px solid #1a1a1a" }}>
                    <div style={{ ...MO, fontSize: 8, color: a.color, letterSpacing: "0.18em", marginBottom: 6 }}>AGENT {a.rank}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 3 }}>{a.name}</div>
                    <div style={{ fontSize: 13, color: "#555", marginBottom: 14 }}>{a.role}</div>
                    <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>{a.desc}</p>
                  </div>
                </div>

                {/* Capabilities */}
                <div style={{ background: "#0D0D0D", border: "1px solid #1f1f1f", borderRadius: 10, padding: "20px 22px" }}>
                  <div style={{ ...MO, fontSize: 8, color: "#333", letterSpacing: "0.15em", marginBottom: 14 }}>CAPABILITIES</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {a.capabilities.map((c) => (
                      <span key={c} style={{ ...MO, fontSize: 9, padding: "5px 12px", borderRadius: 70, border: "1px solid #2a2a2a", color: "#666", letterSpacing: "0.03em" }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Metrics — BMO stat style */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[
                    { label: "STATUS", value: a.status === "active" ? "LIVE" : "STANDBY", valueColor: a.status === "active" ? GREEN : "#555", big: false },
                    { label: "TASKS TODAY", value: String(a.tasksToday), suffix: "+", valueColor: "#fff", big: true },
                    { label: "THIS WEEK", value: String(a.tasksWeek), suffix: "", valueColor: "#fff", big: true },
                  ].map((s) => (
                    <div key={s.label} style={{ background: "#0D0D0D", border: "1px solid #1f1f1f", borderRadius: 10, padding: "18px", textAlign: "center" }}>
                      <div style={{ ...MO, fontSize: 7, color: "#333", letterSpacing: "0.14em", marginBottom: 8 }}>{s.label}</div>
                      <div style={{ ...IN, fontSize: s.big ? 26 : 14, fontWeight: 700, color: s.valueColor, letterSpacing: "-0.02em", lineHeight: 1 }}>
                        {s.value}{s.suffix && <span style={{ color: GREEN }}>{s.suffix}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Uptime bar */}
                <div style={{ background: "#0D0D0D", border: "1px solid #1f1f1f", borderRadius: 10, padding: "18px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ ...MO, fontSize: 8, color: "#333", letterSpacing: "0.12em" }}>UPTIME</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{a.uptime}<span style={{ color: GREEN }}>%</span></span>
                  </div>
                  <div style={{ background: "#111", borderRadius: 4, height: 4 }}>
                    <div style={{ width: `${a.uptime}%`, height: 4, borderRadius: 4, background: GREEN }} />
                  </div>
                </div>

                {/* Task Queue */}
                <div style={{ background: "#0D0D0D", border: "1px solid #1f1f1f", borderRadius: 10, padding: "20px 22px", flex: 1 }}>
                  <div style={{ ...MO, fontSize: 8, color: "#333", letterSpacing: "0.15em", marginBottom: 16 }}>ACTIVE QUEUE</div>
                  {a.queue.map((q, i) => (
                    <div key={i} style={{ paddingBottom: i < a.queue.length - 1 ? 14 : 0, marginBottom: i < a.queue.length - 1 ? 14 : 0, borderBottom: i < a.queue.length - 1 ? "1px solid #111" : "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: q.pct !== null ? 7 : 0 }}>
                        <span style={{ fontSize: 12, color: "#555" }}>{q.task}</span>
                        <span style={{ ...MO, fontSize: 8, color: "#333", flexShrink: 0, marginLeft: 8 }}>{q.project}</span>
                      </div>
                      {q.pct !== null ? (
                        <div>
                          <div style={{ background: "#111", borderRadius: 3, height: 2 }}>
                            <div style={{ width: `${q.pct}%`, height: 2, borderRadius: 3, background: q.pct === 100 ? GREEN : "#555" }} />
                          </div>
                          <div style={{ ...MO, fontSize: 8, color: "#333", marginTop: 4 }}>{q.pct === 100 ? "Complete" : `${q.pct}%`}</div>
                        </div>
                      ) : (
                        <div style={{ ...MO, fontSize: 8, color: "#333" }}>QUEUED</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Integrations */}
                <div style={{ background: "#0D0D0D", border: "1px solid #1f1f1f", borderRadius: 10, padding: "20px 22px" }}>
                  <div style={{ ...MO, fontSize: 8, color: "#333", letterSpacing: "0.15em", marginBottom: 12 }}>INTEGRATIONS</div>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    {a.integrations.map((int) => (
                      <span key={int} style={{ ...MO, fontSize: 9, padding: "4px 12px", borderRadius: 70, border: "1px solid #2a2a2a", color: "#555", letterSpacing: "0.03em" }}>{int}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
