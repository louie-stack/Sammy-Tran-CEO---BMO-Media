"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

const agents = [
  {
    id: "bmo", name: "BMO", role: "Chief of Staff", rank: "01",
    color: "#3b82f6", rgb: "59,130,246", status: "active", emoji: "🤖",
    headline: "The one who keeps the whole operation running.",
    desc: "Your main agent. Handles morning briefs, email triage, task delegation, and keeps every other agent coordinated. The one you talk to first — and last.",
    model: "Claude Sonnet", uptime: "99.4%", tasksToday: 18, tasksWeek: 102,
    capabilities: ["Morning brief compilation", "Email drafting & triage", "Task delegation to agents", "Calendar coordination", "End-of-day debrief"],
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
    model: "Claude Sonnet", uptime: "98.1%", tasksToday: 11, tasksWeek: 67,
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
    model: "Claude Opus", uptime: "96.2%", tasksToday: 4, tasksWeek: 29,
    capabilities: ["Competitor intelligence", "Market trend analysis", "Client research packs", "Nexmail product strategy", "Strategic briefs"],
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
    desc: "Builds and maintains all technical infrastructure — Klaviyo flows, n8n automations, Shopify integrations, dashboards, and API pipelines. Jake makes things run.",
    model: "Claude Sonnet", uptime: "97.5%", tasksToday: 9, tasksWeek: 58,
    capabilities: ["Klaviyo flow builds", "n8n workflow automation", "Shopify integrations", "API pipeline setup", "Dashboard builds"],
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
    desc: "BP tracking, sciatica and back management, tirzepatide cycle monitoring, and workout accountability. Finn keeps Sammy operating at peak physical performance.",
    model: "Claude Haiku", uptime: "94.8%", tasksToday: 3, tasksWeek: 21,
    capabilities: ["Daily BP logging & trends", "Tirzepatide cycle tracking", "Workout accountability", "Sciatica / back log", "Weekly wellness score"],
    integrations: ["Health log", "Fitness tracker", "Calendar reminders"],
    queue: [
      { task: "Morning BP check-in", project: "Daily", pct: 100 },
      { task: "Week 8 tirzepatide log", project: "Cycle", pct: 100 },
      { task: "Weekly wellness summary", project: "Report", pct: null },
    ],
  },
];

function useIsMobile() {
  const [v, setV] = useState(false);
  useEffect(() => { const c = () => setV(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);
  return v;
}

export default function AgentsPage() {
  const [sel, setSel] = useState(0);
  const [trans, setTrans] = useState(false);
  const isMobile = useIsMobile();
  const a = agents[sel];

  function pick(i) {
    if (i === sel) return;
    setTrans(true);
    setTimeout(() => { setSel(i); setTrans(false); }, 200);
  }

  return (
    <div style={{ background: "#080B12", minHeight: "100vh", color: "#E8E8F0" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}} @keyframes slowZoom{0%{transform:scale(1)}100%{transform:scale(1.04)}}`}</style>
      <div style={{ position: "fixed", inset: 0, opacity: 0.016, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />
      <div style={{ position: "fixed", top: "-25%", right: "-15%", width: "800px", height: "800px", borderRadius: "50%", background: `radial-gradient(circle, rgba(${a.rgb},0.055) 0%, transparent 60%)`, filter: "blur(60px)", pointerEvents: "none", zIndex: 0, transition: "background 0.6s" }} />

      <Nav />

      {/* Hero */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden", marginTop: 54, paddingTop: 70, paddingBottom: 48, zIndex: 1 }}>
        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #080B12 0%, rgba(8,11,18,0.2) 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #080B12 0%, transparent 12%, transparent 88%, #080B12 100%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1440, margin: "0 auto", padding: "0 60px" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ ...mo, fontSize: 9, color: "#3b82f6" }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "rgba(59,130,246,0.6)", letterSpacing: "0.15em" }}>AGENT ROSTER</span>
              </div>
              <h1 style={{ ...jk, fontSize: isMobile ? 24 : 34, fontWeight: 800, letterSpacing: "-0.02em" }}>Your AI Team</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {[0, 0.3, 0.6].map((d, i) => (
                <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 6px rgba(59,130,246,0.5)", animation: `gPulse 2s ease-in-out ${d}s infinite` }} />
              ))}
              <span style={{ ...mo, fontSize: 10, color: "#334", marginLeft: 4 }}>3 of 5 online</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px 80px" : "0 60px 100px", position: "relative", zIndex: 2 }}>

        {/* Agent Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 40 }}>
          {agents.map((ag, i) => {
            const on = i === sel;
            return (
              <div key={ag.id} onClick={() => pick(i)} style={{
                padding: "16px 0", cursor: "pointer", position: "relative",
                borderBottom: on ? `2px solid ${ag.color}` : "2px solid transparent",
                borderRight: i < agents.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                background: on ? `linear-gradient(0deg, rgba(${ag.rgb},0.04) 0%, transparent 100%)` : "transparent",
                transition: "all 0.25s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 16 }}>
                  <span style={{ fontSize: 18 }}>{ag.emoji}</span>
                  <div>
                    <div style={{ ...jk, fontSize: 12, fontWeight: 700, color: on ? "#E8E8F0" : "#3a4555" }}>{ag.name}</div>
                    {!isMobile && <div style={{ ...mo, fontSize: 9, color: on ? `rgba(${ag.rgb},0.6)` : "#222d3a", marginTop: 1 }}>{ag.role}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Agent Detail */}
        <motion.div
          key={sel}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>

            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Identity + Video */}
              <GlowCard style={{ padding: 28 }}>
                {/* Video placeholder */}
                <div style={{
                  width: "100%", aspectRatio: "16/9", borderRadius: 10, marginBottom: 24,
                  background: `linear-gradient(135deg, rgba(${a.rgb},0.1) 0%, rgba(8,12,22,0.8) 100%)`,
                  border: `1px solid rgba(${a.rgb},0.18)`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
                  overflow: "hidden", position: "relative",
                }}>
                  {/* Back-light */}
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 120%, rgba(${a.rgb},0.18) 0%, transparent 60%)`, pointerEvents: "none" }} />
                  <span style={{ fontSize: 52, position: "relative", zIndex: 1, filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))" }}>{a.emoji}</span>
                  <span style={{ ...mo, fontSize: 9, color: `rgba(${a.rgb},0.4)`, letterSpacing: "0.15em", position: "relative", zIndex: 1 }}>CHARACTER VIDEO</span>
                  <span style={{ ...mo, fontSize: 8, color: "#222d3a", position: "relative", zIndex: 1 }}>COMING SOON</span>
                </div>

                <div style={{ ...mo, fontSize: 9, color: `rgba(${a.rgb},0.5)`, letterSpacing: "0.2em", marginBottom: 4 }}>AGENT {a.rank}</div>
                <h2 style={{ ...jk, fontSize: 28, fontWeight: 800, letterSpacing: "-0.01em", color: "#E8E8F0", marginBottom: 4 }}>{a.name}</h2>
                <div style={{ ...mo, fontSize: 10, color: a.color, letterSpacing: "0.08em", marginBottom: 14 }}>{a.role}</div>
                <p style={{ ...jk, fontSize: 13, fontStyle: "italic", color: "#4a5570", lineHeight: 1.5, marginBottom: 14 }}>{a.headline}</p>
                <p style={{ fontSize: 13, color: "#4a5570", lineHeight: 1.75 }}>{a.desc}</p>
              </GlowCard>

              {/* Capabilities */}
              <GlowCard style={{ padding: "22px 24px" }}>
                <div style={{ ...mo, fontSize: 9, color: "#2a3040", letterSpacing: "0.15em", marginBottom: 14 }}>CAPABILITIES</div>
                {a.capabilities.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", paddingBottom: 10, borderBottom: i < a.capabilities.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", marginBottom: i < a.capabilities.length - 1 ? 10 : 0 }}>
                    <span style={{ color: a.color, fontSize: 9, marginTop: 3, opacity: 0.7 }}>▸</span>
                    <span style={{ fontSize: 13, color: "#5a6480", lineHeight: 1.4 }}>{c}</span>
                  </div>
                ))}
              </GlowCard>
            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Stats bento */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { label: "STATUS", value: a.status === "active" ? "ONLINE" : "STANDBY", valueColor: a.status === "active" ? "#10b981" : "#f59e0b" },
                  { label: "TASKS TODAY", value: String(a.tasksToday), valueColor: "#E8E8F0" },
                  { label: "THIS WEEK", value: String(a.tasksWeek), valueColor: "#E8E8F0" },
                ].map((s) => (
                  <GlowCard key={s.label} style={{ padding: "16px 18px", textAlign: "center" }}>
                    <div style={{ ...mo, fontSize: 8, color: "#2a3040", letterSpacing: "0.12em", marginBottom: 8 }}>{s.label}</div>
                    <div style={{ ...jk, fontSize: s.label === "STATUS" ? 13 : 22, fontWeight: 800, color: s.valueColor }}>{s.value}</div>
                  </GlowCard>
                ))}
              </div>

              {/* Task Queue */}
              <GlowCard style={{ padding: "22px 24px", flex: 1 }}>
                <div style={{ ...mo, fontSize: 9, color: "#2a3040", letterSpacing: "0.15em", marginBottom: 18 }}>ACTIVE QUEUE</div>
                {a.queue.map((q, i) => (
                  <div key={i} style={{ paddingBottom: 16, borderBottom: i < a.queue.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", marginBottom: i < a.queue.length - 1 ? 16 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: "#5a6480" }}>{q.task}</span>
                      <span style={{ ...mo, fontSize: 9, color: "#2a3040", flexShrink: 0, marginLeft: 8 }}>{q.project}</span>
                    </div>
                    {q.pct !== null ? (
                      <div>
                        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 3, height: 3 }}>
                          <div style={{ width: `${q.pct}%`, height: 3, borderRadius: 3, background: q.pct === 100 ? "#10b981" : a.color }} />
                        </div>
                        <div style={{ ...mo, fontSize: 9, color: "#2a3040", marginTop: 4 }}>{q.pct === 100 ? "Complete" : `${q.pct}%`}</div>
                      </div>
                    ) : (
                      <div style={{ ...mo, fontSize: 9, color: "#2a3040" }}>QUEUED</div>
                    )}
                  </div>
                ))}
              </GlowCard>

              {/* Integrations */}
              <GlowCard style={{ padding: "22px 24px" }}>
                <div style={{ ...mo, fontSize: 9, color: "#2a3040", letterSpacing: "0.15em", marginBottom: 14 }}>INTEGRATIONS</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {a.integrations.map((int) => (
                    <span key={int} style={{
                      ...mo, fontSize: 10, padding: "5px 12px", borderRadius: 5,
                      background: `rgba(${a.rgb},0.06)`, border: `1px solid rgba(${a.rgb},0.14)`,
                      color: `rgba(${a.rgb},0.7)`,
                    }}>{int}</span>
                  ))}
                </div>
              </GlowCard>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
