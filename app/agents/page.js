"use client";
import { useState, useEffect } from "react";
import Nav from "../../components/Nav";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

function glowCard(rgb, h) {
  return {
    background: "rgba(6,10,18,0.97)",
    border: `1px solid rgba(${rgb},${h ? 0.4 : 0.18})`,
    boxShadow: h
      ? `0 0 30px rgba(${rgb},0.28), 0 0 80px rgba(${rgb},0.12), 0 16px 40px rgba(0,0,0,0.55), inset 0 0 40px rgba(${rgb},0.06)`
      : `0 0 18px rgba(${rgb},0.12), 0 12px 32px rgba(0,0,0,0.45)`,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  };
}

const agents = [
  {
    id: "bmo", name: "BMO", role: "Chief of Staff", rank: "01",
    color: "#3b82f6", rgb: "59,130,246", status: "active", emoji: "🤖",
    headline: "The one who keeps the whole operation running.",
    desc: "Your main agent. Handles morning briefs, email triage, task delegation, and keeps every other agent coordinated. The one you talk to first.",
    model: "Claude Sonnet", uptime: "99.4%", tasksToday: 18, tasksWeek: 102,
    capabilities: ["Morning brief compilation", "Email draft & triage", "Task delegation", "Calendar coordination", "End-of-day debrief"],
    integrations: ["Gmail", "Google Calendar", "Slack", "Notion"],
    queue: [
      { task: "Compile morning brief", project: "All agents", pct: 100 },
      { task: "Draft reply — Ritual Beauty", project: "Inbox", pct: 80 },
      { task: "Route research request to PB", project: "Centr Fitness", pct: null },
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
      { task: "Follow-up — Jolie Skin (3 days)", project: "Pipeline", pct: null },
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
      { task: "MoonBrew abandoned cart flow v3", project: "Klaviyo", pct: 100 },
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function AgentsPage() {
  const [sel, setSel] = useState(0);
  const [trans, setTrans] = useState(false);
  const isMobile = useIsMobile();
  const a = agents[sel];

  function pick(i) {
    if (i === sel) return;
    setTrans(true);
    setTimeout(() => { setSel(i); setTrans(false); }, 220);
  }

  const activeCount = agents.filter(ag => ag.status === "active").length;

  return (
    <div style={{ background: "#080B12", minHeight: "100vh", color: "#E8E8F0", position: "relative" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}} @keyframes slowZoom{0%{transform:scale(1)}100%{transform:scale(1.04)}}`}</style>

      {/* Noise */}
      <div style={{ position: "fixed", inset: 0, opacity: 0.015, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />
      {/* Atmosphere */}
      <div style={{ position: "fixed", top: "-15%", right: "-5%", width: "45%", height: "70%", borderRadius: "50%", background: `radial-gradient(circle, rgba(${a.rgb},0.04) 0%, transparent 55%)`, filter: "blur(80px)", pointerEvents: "none", zIndex: 0, transition: "background 0.5s" }} />

      <Nav />

      {/* Hero Banner */}
      <div style={{ position: "relative", width: "100%", height: isMobile ? 180 : 260, overflow: "hidden", marginTop: 54, background: `linear-gradient(135deg, rgba(${a.rgb},0.08) 0%, rgba(6,10,18,0.95) 60%)` }}>
        {/* Decorative grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #080B12 0%, rgba(8,11,18,0.3) 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #080B12 0%, transparent 15%, transparent 85%, #080B12 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px 16px" : "0 60px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ ...mo, fontSize: 9, color: "#3b82f6" }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#3b82f6", letterSpacing: "0.12em" }}>AGENT ROSTER</span>
              </div>
              <h1 style={{ ...jk, fontSize: isMobile ? 22 : 30, fontWeight: 800, letterSpacing: "-0.02em" }}>Your AI Team</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {[0, 0.3, 0.6].map((d, i) => (
                <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 6px rgba(59,130,246,0.5)", animation: `gPulse 2s ease-in-out ${d}s infinite` }} />
              ))}
              <span style={{ ...mo, fontSize: 10, color: "#445", marginLeft: 4 }}>{activeCount} of 5 online</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px 60px" : "0 60px 80px", position: "relative", zIndex: 2 }}>

        {/* Agent Selector Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", borderBottom: "1px dashed rgba(255,255,255,0.05)" }}>
          {agents.map((ag, i) => {
            const on = i === sel;
            return (
              <div
                key={ag.id}
                onClick={() => pick(i)}
                style={{
                  padding: "14px 0", cursor: "pointer", position: "relative",
                  borderBottom: on ? `2px solid ${ag.color}` : "2px solid transparent",
                  borderRight: i < agents.length - 1 ? "1px dashed rgba(255,255,255,0.04)" : "none",
                  boxShadow: on ? `0 2px 20px rgba(${ag.rgb},0.15), inset 0 -4px 20px rgba(${ag.rgb},0.05)` : "none",
                  transition: "all 0.25s",
                }}
              >
                {on && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(0deg, rgba(${ag.rgb},0.05) 0%, transparent 100%)`, pointerEvents: "none" }} />}
                <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 16, position: "relative" }}>
                  <span style={{ fontSize: 16 }}>{ag.emoji}</span>
                  <div>
                    <span style={{ ...jk, fontSize: 12, fontWeight: 800, color: on ? "#E8E8F0" : "#445" }}>{ag.name}</span>
                    {!isMobile && <div style={{ ...mo, fontSize: 9, color: on ? `rgba(${ag.rgb},0.7)` : "#334" }}>{ag.role}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Agent Detail */}
        <div style={{ opacity: trans ? 0 : 1, transform: trans ? "translateY(6px)" : "translateY(0)", transition: "all 0.22s", paddingTop: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>

            {/* Left — Identity + Video placeholder */}
            <div>
              <div style={{ ...glowCard(a.rgb, false), borderRadius: 14, padding: "28px", marginBottom: 16 }}>
                {/* Video placeholder area */}
                <div style={{
                  width: "100%", aspectRatio: "16/9", borderRadius: 10, marginBottom: 20,
                  background: `linear-gradient(135deg, rgba(${a.rgb},0.12), rgba(${a.rgb},0.04))`,
                  border: `1px solid rgba(${a.rgb},0.2)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: 8,
                }}>
                  <span style={{ fontSize: 48 }}>{a.emoji}</span>
                  <span style={{ ...mo, fontSize: 9, color: `rgba(${a.rgb},0.5)`, letterSpacing: "0.1em" }}>CHARACTER VIDEO</span>
                  <span style={{ ...mo, fontSize: 8, color: "#334" }}>COMING SOON</span>
                </div>

                <div style={{ marginBottom: 6 }}>
                  <span style={{ ...mo, fontSize: 9, color: `rgba(${a.rgb},0.6)`, letterSpacing: "0.15em" }}>AGENT {a.rank}</span>
                </div>
                <h2 style={{ ...jk, fontSize: 26, fontWeight: 800, letterSpacing: "-0.01em", marginBottom: 4, color: "#E8E8F0" }}>{a.name}</h2>
                <div style={{ ...mo, fontSize: 11, color: a.color, marginBottom: 12 }}>{a.role}</div>
                <p style={{ ...jk, fontSize: 13, color: "#667", lineHeight: 1.6, marginBottom: 20 }}>{a.headline}</p>
                <p style={{ fontSize: 13, color: "#556", lineHeight: 1.7 }}>{a.desc}</p>
              </div>

              {/* Capabilities */}
              <div style={{ ...glowCard(a.rgb, false), borderRadius: 12, padding: "20px 22px" }}>
                <div style={{ ...mo, fontSize: 9, color: "#334", letterSpacing: "0.12em", marginBottom: 12 }}>CAPABILITIES</div>
                {a.capabilities.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ color: a.color, fontSize: 10, marginTop: 2 }}>▸</span>
                    <span style={{ fontSize: 13, color: "#889", lineHeight: 1.4 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Stats + Queue */}
            <div>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[
                  { label: "STATUS", value: a.status === "active" ? "ONLINE" : "STANDBY", color: a.status === "active" ? "#10b981" : "#f59e0b" },
                  { label: "TASKS TODAY", value: a.tasksToday },
                  { label: "THIS WEEK", value: a.tasksWeek },
                ].map((s, i) => (
                  <div key={i} style={{ ...glowCard(a.rgb, false), borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ ...mo, fontSize: 8, color: "#334", letterSpacing: "0.1em", marginBottom: 6 }}>{s.label}</div>
                    <div style={{ ...jk, fontSize: 20, fontWeight: 800, color: s.color || "#E8E8F0" }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Task Queue */}
              <div style={{ ...glowCard(a.rgb, false), borderRadius: 12, padding: "20px 22px", marginBottom: 16 }}>
                <div style={{ ...mo, fontSize: 9, color: "#334", letterSpacing: "0.12em", marginBottom: 16 }}>ACTIVE QUEUE</div>
                {a.queue.map((q, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#889" }}>{q.task}</span>
                      <span style={{ ...mo, fontSize: 9, color: "#445" }}>{q.project}</span>
                    </div>
                    {q.pct !== null ? (
                      <div>
                        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 3, height: 3 }}>
                          <div style={{ width: `${q.pct}%`, height: 3, borderRadius: 3, background: q.pct === 100 ? "#10b981" : a.color, transition: "width 0.5s" }} />
                        </div>
                        <div style={{ ...mo, fontSize: 9, color: "#334", marginTop: 3 }}>{q.pct}%</div>
                      </div>
                    ) : (
                      <div style={{ ...mo, fontSize: 9, color: "#334" }}>QUEUED</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Integrations */}
              <div style={{ ...glowCard(a.rgb, false), borderRadius: 12, padding: "20px 22px" }}>
                <div style={{ ...mo, fontSize: 9, color: "#334", letterSpacing: "0.12em", marginBottom: 12 }}>INTEGRATIONS</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {a.integrations.map((int) => (
                    <span key={int} style={{
                      ...mo, fontSize: 10, padding: "4px 10px", borderRadius: 4,
                      background: `rgba(${a.rgb},0.06)`, border: `1px solid rgba(${a.rgb},0.15)`,
                      color: `rgba(${a.rgb},0.8)`,
                    }}>{int}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
