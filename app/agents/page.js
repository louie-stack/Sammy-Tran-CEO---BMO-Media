"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "../../components/Nav";

const IN = { fontFamily: "'Inter', sans-serif" };
const MO = { fontFamily: "'Space Mono', monospace" };
const GREEN = "#C4F000";

function useIsMobile() {
  const [v, setV] = useState(false);
  useEffect(() => { const c = () => setV(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);
  return v;
}

const agents = [
  {
    id: "bmo", name: "BMO", role: "Chief of Staff", rank: "01",
    color: GREEN, rgb: "196,240,0", status: "active", pct: 72, emoji: "🤖",
    headline: "The one who keeps the whole operation running.",
    desc: "Your main agent. Handles morning briefs, email triage, task delegation, and keeps every other agent coordinated. The one you talk to first — and last.",
    model: "Claude Sonnet", uptime: "99.4%", tasksToday: 18, tasksWeek: 102,
    capabilities: ["Morning briefs", "Email triage", "Task delegation", "Calendar coord", "EOD debrief"],
    apis: ["Gmail", "Google Calendar", "Slack", "Notion"],
    queue: [
      { task: "Compile morning brief", project: "All agents", pct: 100 },
      { task: "Draft reply — Ritual Beauty", project: "Inbox", pct: 80 },
      { task: "Route research to PB", project: "Centr Fitness", pct: null },
    ],
    video: null,
  },
  {
    id: "marceline", name: "MARCELINE", role: "Sales & BD Lead", rank: "02",
    color: "#a855f7", rgb: "168,85,247", status: "active", pct: 60, emoji: "🎸",
    headline: "Lead triage. Pipeline tracking. Revenue momentum.",
    desc: "Handles inbound lead scoring, proposal drafting, CRM visibility and follow-up sequences. Marceline keeps the pipeline moving so nothing falls through the cracks.",
    model: "Claude Sonnet", uptime: "98.1%", tasksToday: 11, tasksWeek: 67,
    capabilities: ["Lead triage", "Proposal drafting", "Pipeline tracking", "Follow-up seqs", "CRM updates"],
    apis: ["HubSpot CRM", "Gmail", "Typeform", "Calendly"],
    queue: [
      { task: "Follow-up — Jolie Skin (3d)", project: "Pipeline", pct: null },
      { task: "Draft proposal — Centr Fitness", project: "Sales", pct: 60 },
      { task: "Pipeline report — weekly", project: "All deals", pct: 100 },
    ],
    video: null,
  },
  {
    id: "pb", name: "PRINCESS BUBBLEGUM", role: "Research & Strategy", rank: "03",
    color: "#ec4899", rgb: "236,72,153", status: "standby", pct: 45, emoji: "👑",
    headline: "Intelligence. Strategy. The edge you need.",
    desc: "Market analysis, competitor intel, client research and Nexmail product strategy. PB turns raw information into actionable edge for Sammy and the team.",
    model: "Claude Opus", uptime: "96.2%", tasksToday: 4, tasksWeek: 29,
    capabilities: ["Competitor intel", "Market analysis", "Client research", "Nexmail strategy", "Strategic briefs"],
    apis: ["Perplexity", "Google Search", "Notion", "Klaviyo Blog"],
    queue: [
      { task: "Centr Fitness pre-call research", project: "Client Research", pct: 100 },
      { task: "Nexmail strategy v2", project: "Product", pct: 45 },
      { task: "Retention.com competitive update", project: "Intel", pct: 100 },
    ],
    video: null,
  },
  {
    id: "jake", name: "JAKE", role: "Builder", rank: "04",
    color: "#eab308", rgb: "234,179,8", status: "active", pct: 80, emoji: "🐕",
    headline: "Code. Flows. Integrations. Built without being asked twice.",
    desc: "Builds and maintains all technical infrastructure — Klaviyo flows, n8n automations, Shopify integrations, dashboards, and API pipelines. Jake makes things run.",
    model: "Claude Sonnet", uptime: "97.5%", tasksToday: 9, tasksWeek: 58,
    capabilities: ["Klaviyo flows", "n8n automation", "Shopify integrations", "API pipelines", "Dashboard builds"],
    apis: ["Klaviyo API", "n8n", "Shopify Admin", "Vercel", "Postscript"],
    queue: [
      { task: "MoonBrew cart flow v3", project: "Klaviyo", pct: 100 },
      { task: "Fix Gorgias webhook auth", project: "n8n", pct: 40 },
      { task: "Weekly metrics dashboard", project: "Reporting", pct: 100 },
    ],
    video: null,
  },
  {
    id: "finn", name: "FINN", role: "Health & Wellness", rank: "05",
    color: "#06b6d4", rgb: "6,182,212", status: "standby", pct: null, emoji: "⚔️",
    headline: "The human hero keeping the body in check.",
    desc: "BP tracking, sciatica management, tirzepatide cycle monitoring, and workout accountability. Finn keeps Sammy operating at peak physical performance.",
    model: "Claude Haiku", uptime: "94.8%", tasksToday: 3, tasksWeek: 21,
    capabilities: ["Daily BP logging", "Tirzepatide tracking", "Workout log", "Sciatica log", "Wellness score"],
    apis: ["Health log", "Fitness tracker", "Calendar reminders"],
    queue: [
      { task: "Morning BP check-in", project: "Daily", pct: 100 },
      { task: "Week 8 tirzepatide log", project: "Cycle", pct: 100 },
      { task: "Weekly wellness summary", project: "Report", pct: null },
    ],
    video: null,
  },
];

const CHAT_AGENTS = {
  0: { name: "BMO", label: "B", color: "196,240,0", hex: GREEN, sys: "You are BMO, Chief of Staff for Sammy Tran at BMO Media. You handle morning briefs, email triage, task delegation and calendar coordination. Be concise, structured, professional. No em dashes. Max 3 sentences." },
  1: { name: "Marceline", label: "M", color: "168,85,247", hex: "#a855f7", sys: "You are Marceline, Sales & BD agent for BMO Media. You handle lead triage, proposals, pipeline tracking and follow-up sequences. Be sharp, direct, revenue-focused. No em dashes. Max 3 sentences." },
  2: { name: "Princess Bubblegum", label: "P", color: "236,72,153", hex: "#ec4899", sys: "You are Princess Bubblegum, Research & Strategy agent for BMO Media. You handle competitor intel, market analysis and strategic briefs. Be analytical, precise, insight-driven. No em dashes. Max 3 sentences." },
  3: { name: "Jake", label: "J", color: "234,179,8", hex: "#eab308", sys: "You are Jake, Builder agent for BMO Media. You handle Klaviyo flows, n8n automations, Shopify integrations and technical infrastructure. Be technical, practical, solution-focused. No em dashes. Max 3 sentences." },
  4: { name: "Finn", label: "F", color: "6,182,212", hex: "#06b6d4", sys: "You are Finn, Health & Wellness agent for BMO Media. You track BP, tirzepatide cycles, workouts and sciatica management for Sammy. Be supportive, clear, health-focused. No em dashes. Max 3 sentences." },
};

function QueueRow({ task: t, agent: a, isLast }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "8px 10px", borderRadius: 8, marginBottom: 4,
      background: h ? `rgba(${a.rgb},0.06)` : "transparent",
      border: h ? `1px solid rgba(${a.rgb},0.18)` : "1px solid transparent",
      borderBottom: !isLast && !h ? "1px solid rgba(255,255,255,0.04)" : undefined,
      transition: "all 0.2s",
    }}>
      <span style={{ fontSize: 12, color: "#666" }}>{t.task}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ ...MO, fontSize: 11, color: "#777" }}>{t.project}</span>
        {t.pct != null && (
          <>
            <div style={{ width: 40, height: 2, background: "#111", borderRadius: 1 }}>
              <div style={{ width: `${t.pct}%`, height: "100%", background: a.color, borderRadius: 1 }} />
            </div>
            <span style={{ ...MO, fontSize: 11, color: a.color, minWidth: 24, textAlign: "right" }}>{t.pct}%</span>
          </>
        )}
        {t.pct == null && <span style={{ ...MO, fontSize: 11, color: "#777" }}>•</span>}
      </div>
    </div>
  );
}

function AgentsPageInner() {
  const searchParams = useSearchParams();
  const [sel, setSel] = useState(0);
  const [trans, setTrans] = useState(false);
  const isMobile = useIsMobile();

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMsgs, setChatMsgs] = useState([{ role: "assistant", agentKey: 0, text: "Morning. All five agents standing by. What do you need?" }]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs]);
  useEffect(() => { if (chatOpen) setTimeout(() => inputRef.current?.focus(), 100); }, [chatOpen]);

  const a = agents[sel];
  const ca = CHAT_AGENTS[sel];

  function pick(i) {
    if (i === sel) return;
    setTrans(true);
    setTimeout(() => { setSel(i); setTrans(false); }, 220);
  }

  async function sendChat() {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    setChatInput("");
    const userMsg = { role: "user", text };
    setChatMsgs(prev => [...prev, userMsg]);
    setChatLoading(true);
    try {
      const history = [...chatMsgs, userMsg].map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: CHAT_AGENTS[sel].sys, messages: history }),
      });
      const data = await res.json();
      setChatMsgs(prev => [...prev, { role: "assistant", agentKey: sel, text: data.reply || "No response." }]);
    } catch {
      setChatMsgs(prev => [...prev, { role: "assistant", agentKey: sel, text: "Connection issue. Try again in a moment." }]);
    }
    setChatLoading(false);
  }

  const statusLabel = a.status === "active" ? "ONLINE" : a.status === "standby" ? "STANDBY" : "OFFLINE";

  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.5}50%{opacity:1}} @keyframes slowZoom{0%{transform:scale(1)}100%{transform:scale(1.04)}} @keyframes dotPulse{0%,80%,100%{opacity:0}40%{opacity:1}}`}</style>

      <Nav />

      {/* ── HERO BANNER ── */}
      <div style={{ position: "relative", width: "100%", height: isMobile ? 180 : 280, overflow: "hidden", marginTop: 54 }}>
        {/* Grid pattern bg instead of image */}
        <div style={{ position: "absolute", inset: 0, background: "#080808", backgroundImage: "linear-gradient(rgba(196,240,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,240,0,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", animation: "slowZoom 25s ease-in-out infinite alternate" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #0D0D0D 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0D0D0D 0%, transparent 15%, transparent 85%, #0D0D0D 100%)" }} />
        {/* Agent emoji row in the banner */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 20 : 40, opacity: 0.18 }}>
          {agents.map(ag => <span key={ag.id} style={{ fontSize: isMobile ? 40 : 60 }}>{ag.emoji}</span>)}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px 20px" : "0 60px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ ...MO, fontSize: 11, color: GREEN, letterSpacing: "0.18em" }}>AGENT ROSTER</span>
              </div>
              <h1 style={{ fontSize: isMobile ? 22 : 30, fontWeight: 800, letterSpacing: "-0.02em" }}>Your AI Team</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {[0, 0.3, 0.6].map((d, i) => <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: GREEN, boxShadow: `0 0 5px ${GREEN}80`, animation: `gPulse 2s ease-in-out ${d}s infinite`, display: "block" }} />)}
              <span style={{ ...MO, fontSize: 11, color: "#777", marginLeft: 4 }}>3 of 5 online</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px 80px" : "0 60px 80px", position: "relative", zIndex: 2 }}>

        {/* ── AGENT TABS ── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", borderBottom: "1px solid #1a1a1a" }}>
          {agents.map((ag, i) => {
            const on = i === sel;
            return (
              <div key={ag.id} onClick={() => pick(i)} style={{
                padding: "14px 0", cursor: "pointer", position: "relative",
                borderBottom: on ? `2px solid ${ag.color}` : "2px solid transparent",
                borderRight: i < agents.length - 1 ? "1px solid #111" : "none",
                background: on ? `linear-gradient(0deg, rgba(${ag.rgb},0.05) 0%, transparent 100%)` : "transparent",
                transition: "all 0.22s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 16 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: ag.color, opacity: on ? 1 : 0.25, boxShadow: on ? `0 0 6px rgba(${ag.rgb},0.5)` : "none", animation: on && ag.status === "active" ? "gPulse 2s ease-in-out infinite" : "none", display: "block" }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: on ? "#fff" : "#3a3a3a" }}>{ag.name}</span>
                  {!isMobile && <span style={{ ...MO, fontSize: 10, color: on ? `rgba(${ag.rgb},0.6)` : "#2a2a2a" }}>{ag.role}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── AGENT DETAIL ── */}
        <div style={{
          opacity: trans ? 0 : 1,
          transform: trans ? "translateY(8px)" : "translateY(0)",
          transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 20 : 40,
          alignItems: "start",
          marginTop: 24,
        }}>

          {/* LEFT — Info panel */}
          <div style={{
            padding: isMobile ? "20px 18px" : "36px 32px",
            borderRadius: 12,
            background: "#0D0D0D",
            border: `1px solid rgba(${a.rgb},0.18)`,
            
            position: "relative", overflow: "hidden",
            transition: "border-color 0.4s, box-shadow 0.4s",
          }}>
            {/* Interior top glow */}
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 40% at 50% 0%, rgba(${a.rgb},0.07) 0%, transparent 70%)`, pointerEvents: "none", transition: "background 0.4s" }} />

            <div style={{ position: "relative" }}>
              {/* Role + status */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: a.color, boxShadow: `0 0 6px rgba(${a.rgb},0.5)`, display: "block", animation: a.status === "active" ? "gPulse 2s ease-in-out infinite" : "none" }} />
                <span style={{ ...MO, fontSize: 11, color: a.color, letterSpacing: "0.1em" }}>{a.role.toUpperCase()}</span>
                <span style={{ width: 1, height: 10, background: "#111", display: "block" }} />
                <span style={{ ...MO, fontSize: 11, color: "#777" }}>{statusLabel}</span>
              </div>

              {/* Name */}
              <h2 style={{ fontSize: isMobile ? 28 : 46, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.96, marginBottom: 12 }}>{a.name}</h2>
              <p style={{ fontSize: 14, fontWeight: 600, color: a.color, marginBottom: 18, opacity: 0.9 }}>{a.headline}</p>
              <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75, marginBottom: 28, maxWidth: 420 }}>{a.desc}</p>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
                {[
                  { v: a.pct != null ? a.pct + "%" : "—", l: "Progress", accent: true },
                  { v: a.tasksToday, l: "Today", accent: false },
                  { v: a.tasksWeek, l: "This week", accent: false },
                  { v: a.uptime, l: "Uptime", accent: true },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: s.accent ? a.color : "#fff", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>{s.v}</div>
                    <div style={{ ...MO, fontSize: 11, color: "#777" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid #111", marginBottom: 22 }} />

              {/* Capabilities */}
              <div style={{ marginBottom: 22 }}>
                <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.12em", marginBottom: 10 }}>CAPABILITIES</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {a.capabilities.map((c, i) => (
                    <span key={i} style={{ ...MO, fontSize: 11, color: `rgba(${a.rgb},0.8)`, padding: "4px 10px", borderRadius: 70, background: `rgba(${a.rgb},0.05)`, border: `1px solid rgba(${a.rgb},0.12)` }}>{c}</span>
                  ))}
                </div>
              </div>

              {/* APIs */}
              <div style={{ marginBottom: 22 }}>
                <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.12em", marginBottom: 10 }}>INTEGRATIONS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {a.apis.map((api, i) => (
                    <span key={i} style={{ ...MO, fontSize: 11, color: "#777", padding: "4px 10px", borderRadius: 70, background: "#1a1a1a", border: "1px solid #1f1f1f" }}>{api}</span>
                  ))}
                </div>
              </div>

              {/* Queue */}
              {a.queue.length > 0 && (
                <div>
                  <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.12em", marginBottom: 10 }}>ACTIVE QUEUE</div>
                  {a.queue.map((t, i) => <QueueRow key={i} task={t} agent={a} isLast={i === a.queue.length - 1} />)}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Character video / placeholder */}
          <div style={{ order: isMobile ? -1 : 0, height: isMobile ? 320 : 700, background: "#080808", borderRadius: 12, border: "1px solid #111", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {a.video ? (
              <>
                <video key={a.video} src={a.video} autoPlay loop muted playsInline style={{ height: "100%", width: "auto", display: "block", position: "relative", zIndex: 1 }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: "25%", height: "100%", background: "linear-gradient(90deg, #0D0D0D 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(0deg, #0D0D0D 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
              </>
            ) : (
              <>
                {/* Placeholder — same layout Issa uses but without the video */}
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 60%, rgba(${a.rgb},0.1) 0%, transparent 65%)`, transition: "background 0.4s", pointerEvents: "none" }} />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, position: "relative", zIndex: 1 }}>
                  <span style={{ fontSize: isMobile ? 72 : 100, filter: `drop-shadow(0 0 40px rgba(${a.rgb},0.3))`, animation: "slowFloat 4s ease-in-out infinite" }}>{a.emoji}</span>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ ...MO, fontSize: 11, color: `rgba(${a.rgb},0.5)`, letterSpacing: "0.15em", marginBottom: 6 }}>AGENT {a.rank}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{a.name}</div>
                    <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.1em" }}>CHARACTER VIDEO COMING SOON</div>
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(0deg, #0D0D0D 0%, transparent 100%)", pointerEvents: "none" }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── CHAT BUTTON ── */}
      <button onClick={() => setChatOpen(v => !v)} style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 200,
        width: 52, height: 52, borderRadius: "50%",
        background: chatOpen ? `rgba(${ca.color},0.14)` : "rgba(13,13,13,0.95)",
        border: `1px solid rgba(${ca.color},0.3)`,
        boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.25s",
      }}>
        {chatOpen
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ca.hex} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ca.hex} strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
        }
      </button>

      {/* ── CHAT PANEL ── */}
      <div style={{
        position: "fixed", bottom: 92, right: 28, zIndex: 199,
        width: isMobile ? "calc(100vw - 32px)" : 370, maxHeight: "62vh",
        borderRadius: 14, background: "rgba(10,10,10,0.97)",
        border: `1px solid rgba(${ca.color},0.18)`,
        boxShadow: "0 16px 48px rgba(0,0,0,0.7)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        transform: chatOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
        opacity: chatOpen ? 1 : 0, pointerEvents: chatOpen ? "all" : "none",
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Header */}
        <div style={{ padding: "13px 16px", borderBottom: `1px solid rgba(${ca.color},0.1)`, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${ca.color},0.08)`, border: `1px solid rgba(${ca.color},0.18)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: ca.hex }}>{ca.label}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{ca.name}</div>
            <div style={{ ...MO, fontSize: 10, color: `rgba(${ca.color},0.6)` }}>ONLINE · READY</div>
          </div>
          <button onClick={() => setChatMsgs([{ role: "assistant", agentKey: sel, text: "Chat cleared. What do you need?" }])} style={{ marginLeft: "auto", background: "none", border: "none", color: "#777", cursor: "pointer", fontSize: 14 }}>↺</button>
        </div>

        {/* Agent tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #111", flexShrink: 0 }}>
          {Object.values(CHAT_AGENTS).map((ag, i) => (
            <button key={i} onClick={() => pick(i)} style={{
              flex: 1, padding: "7px 4px", background: sel === i ? `rgba(${ag.color},0.07)` : "transparent",
              border: "none", borderBottom: sel === i ? `1px solid ${ag.hex}` : "1px solid transparent",
              cursor: "pointer", ...MO, fontSize: 11, color: sel === i ? ag.hex : "#333",
              transition: "all 0.2s", marginBottom: -1,
            }}>{ag.label}</button>
          ))}
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 6px", display: "flex", flexDirection: "column", gap: 8 }}>
          {chatMsgs.map((m, i) => m.role === "user" ? (
            <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ padding: "7px 11px", borderRadius: "10px 10px 3px 10px", background: "rgba(255,255,255,0.04)", border: "1px solid #1a1a1a", maxWidth: "80%", fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>{m.text}</div>
            </div>
          ) : (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: `rgba(${CHAT_AGENTS[m.agentKey ?? 0].color},0.08)`, border: `1px solid rgba(${CHAT_AGENTS[m.agentKey ?? 0].color},0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800, color: CHAT_AGENTS[m.agentKey ?? 0].hex, flexShrink: 0 }}>{CHAT_AGENTS[m.agentKey ?? 0].label}</div>
              <div style={{ padding: "7px 11px", borderRadius: "10px 10px 10px 3px", background: `rgba(${CHAT_AGENTS[m.agentKey ?? 0].color},0.04)`, border: `1px solid rgba(${CHAT_AGENTS[m.agentKey ?? 0].color},0.08)`, maxWidth: "80%", fontSize: 12, color: "#666", lineHeight: 1.5 }}>{m.text}</div>
            </div>
          ))}
          {chatLoading && (
            <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: `rgba(${ca.color},0.08)`, border: `1px solid rgba(${ca.color},0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800, color: ca.hex, flexShrink: 0 }}>{ca.label}</div>
              <div style={{ padding: "8px 12px", borderRadius: "10px 10px 10px 3px", background: `rgba(${ca.color},0.04)`, border: `1px solid rgba(${ca.color},0.08)`, display: "flex", gap: 4, alignItems: "center" }}>
                {[0, 1, 2].map(j => <span key={j} style={{ width: 4, height: 4, borderRadius: "50%", background: ca.hex, animation: `dotPulse 1.4s ${j * 0.2}s ease-in-out infinite`, display: "block" }} />)}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "9px 10px", borderTop: `1px solid rgba(${ca.color},0.08)`, display: "flex", gap: 7, flexShrink: 0 }}>
          <input
            ref={inputRef}
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()}
            placeholder={`Message ${ca.name}…`}
            style={{ flex: 1, background: `rgba(${ca.color},0.04)`, border: `1px solid rgba(${ca.color},0.12)`, borderRadius: 7, padding: "7px 10px", color: "#ccc", fontSize: 12, fontFamily: "inherit", outline: "none" }}
          />
          <button onClick={sendChat} disabled={!chatInput.trim() || chatLoading} style={{
            width: 32, height: 32, borderRadius: 7, flexShrink: 0, cursor: chatInput.trim() ? "pointer" : "not-allowed",
            background: chatInput.trim() ? `rgba(${ca.color},0.12)` : "transparent",
            border: `1px solid rgba(${ca.color},${chatInput.trim() ? 0.25 : 0.08})`,
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={chatInput.trim() ? ca.hex : "#333"} strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return <Suspense fallback={null}><AgentsPageInner /></Suspense>;
}



