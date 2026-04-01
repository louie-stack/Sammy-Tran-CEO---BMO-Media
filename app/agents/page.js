"use client";
import { useState } from "react";
import ParticleField from "../../components/ParticleField";

const agents = [
  {
    name: "BMO",
    emoji: "🤖",
    role: "Chief of Staff",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
    status: "active",
    description: "Your main agent. Runs the operation — morning briefs, email triage, task delegation, and keeps the whole team in motion. The one you talk to.",
    capabilities: [
      "Morning brief compilation & prioritisation",
      "Email drafting and send approval workflow",
      "Task delegation to specialist agents",
      "Calendar management and scheduling",
      "End-of-day debrief and next-day prep",
    ],
    actions: [
      { time: "09:02 AM", text: "Morning brief compiled — 4 priorities flagged" },
      { time: "09:15 AM", text: "3 email drafts sent to approval queue" },
      { time: "10:43 AM", text: "Discovery call with Ritual Beauty confirmed — 2pm today" },
    ],
  },
  {
    name: "Marceline",
    emoji: "🎸",
    role: "Sales & BD Lead",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.15)",
    status: "active",
    description: "Lead triage, proposal drafts, pipeline tracking, CRM visibility and follow-up sequences. Marceline keeps the revenue engine running.",
    capabilities: [
      "Inbound lead scoring and triage",
      "Proposal and deck drafting",
      "CRM pipeline visibility and updates",
      "Follow-up sequence automation",
      "Deal velocity tracking and alerts",
    ],
    actions: [
      { time: "08:55 AM", text: "3 follow-up sequences triggered for cold leads" },
      { time: "10:10 AM", text: "Proposal draft sent for Centr Fitness — £4,200/mo" },
      { time: "11:00 AM", text: "Pipeline report: $180k active, $42k closed MTD" },
    ],
  },
  {
    name: "Princess Bubblegum",
    emoji: "👑",
    role: "Research & Strategy",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.15)",
    status: "standby",
    description: "Market analysis, competitor intel, client research and Nexmail product strategy. PB turns information into edge.",
    capabilities: [
      "Competitor analysis and monitoring",
      "Market intelligence briefs",
      "Client onboarding research packs",
      "Nexmail product strategy documentation",
      "Industry trend synthesis",
    ],
    actions: [
      { time: "Yesterday", text: "Competitor brief on Retention.com updated" },
      { time: "Yesterday", text: "Centr Fitness pre-call research pack delivered" },
      { time: "Mon Apr 1", text: "Q2 market trends brief — Klaviyo ecosystem" },
    ],
  },
  {
    name: "Jake",
    emoji: "🐕",
    role: "Builder",
    color: "#eab308",
    glow: "rgba(234,179,8,0.15)",
    status: "active",
    description: "Code, dashboards, integrations, n8n flows and Klaviyo API work. Jake makes things run — quietly, efficiently, and without being asked twice.",
    capabilities: [
      "Klaviyo flow builds and API integrations",
      "n8n workflow automation",
      "Client dashboard builds",
      "Shopify & e-commerce platform integrations",
      "Reporting and data pipeline setup",
    ],
    actions: [
      { time: "09:30 AM", text: "Klaviyo abandoned cart flow deployed — MoonBrew" },
      { time: "10:22 AM", text: "n8n webhook fixed for lead sync to CRM" },
      { time: "11:15 AM", text: "Weekly metrics dashboard pushed to Vercel" },
    ],
  },
  {
    name: "Finn",
    emoji: "⚔️",
    role: "Health & Wellness",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.15)",
    status: "standby",
    description: "BP tracking, back and sciatica management, tirzepatide cycle tracking and workout accountability. The human hero keeping the body in check.",
    capabilities: [
      "Daily blood pressure logging and trend analysis",
      "Tirzepatide cycle tracking and reminders",
      "Workout log and accountability check-ins",
      "Sciatica / back pain management notes",
      "Weekly wellness score and health brief",
    ],
    actions: [
      { time: "07:45 AM", text: "Morning BP logged: 121/79 — within range" },
      { time: "08:00 AM", text: "Week 8 tirzepatide check-in complete — next dose Apr 8" },
      { time: "Yesterday", text: "Strength session logged — lower body, 45 min" },
    ],
  },
];

export default function AgentsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight: "100vh", padding: "32px", position: "relative" }}>
      <ParticleField />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "11px", color: "#3b82f6", letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: "6px" }}>BMO MEDIA — AI OS</div>
          <h1 style={{ fontSize: "30px", fontWeight: "800", color: "#f1f5f9" }}>Agent Roster</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>Your five-agent operation. Click any card to expand.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
          {agents.map((a) => (
            <div
              key={a.name}
              onClick={() => setSelected(selected === a.name ? null : a.name)}
              className="card-hover"
              style={{
                background: "rgba(15,21,32,0.85)", border: `1px solid ${selected === a.name ? a.color + "40" : "rgba(59,130,246,0.1)"}`,
                borderRadius: "14px", padding: "24px", backdropFilter: "blur(8px)", cursor: "pointer",
                borderTop: `3px solid ${a.color}`,
                boxShadow: selected === a.name ? `0 0 40px ${a.glow}` : "none",
                transition: "all 0.35s",
              }}
            >
              {/* Agent header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
                {/* Avatar placeholder — swap for video thumbnail later */}
                <div style={{
                  width: "56px", height: "56px", borderRadius: "12px", flexShrink: 0,
                  background: `linear-gradient(135deg, ${a.color}20, ${a.color}40)`,
                  border: `1px solid ${a.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "28px",
                }}>{a.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "#f1f5f9" }}>{a.name}</span>
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: a.status === "active" ? "#10b981" : "#f59e0b",
                      boxShadow: `0 0 6px ${a.status === "active" ? "#10b981" : "#f59e0b"}`,
                    }} />
                  </div>
                  <div style={{ fontSize: "11px", color: a.color, fontFamily: "monospace", letterSpacing: "0.05em" }}>{a.role}</div>
                </div>
                <div style={{ fontSize: "12px", color: "#475569" }}>{selected === a.name ? "▲" : "▼"}</div>
              </div>

              <p style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.6, marginBottom: "14px" }}>{a.description}</p>

              {/* Capabilities */}
              <div style={{ marginBottom: selected === a.name ? "16px" : "0" }}>
                <div style={{ fontSize: "10px", color: "#475569", letterSpacing: "0.1em", fontFamily: "monospace", marginBottom: "6px" }}>CAPABILITIES</div>
                {a.capabilities.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ color: a.color, fontSize: "10px", marginTop: "3px" }}>▸</span>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>{c}</span>
                  </div>
                ))}
              </div>

              {/* Recent actions — expanded only */}
              {selected === a.name && (
                <div style={{ borderTop: `1px solid ${a.color}20`, paddingTop: "14px", marginTop: "4px" }}>
                  <div style={{ fontSize: "10px", color: "#475569", letterSpacing: "0.1em", fontFamily: "monospace", marginBottom: "8px" }}>RECENT ACTIONS</div>
                  {a.actions.map((act, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "6px", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "10px", color: "#475569", fontFamily: "monospace", whiteSpace: "nowrap", marginTop: "2px" }}>{act.time}</span>
                      <span style={{ fontSize: "11px", color: "#94a3b8", lineHeight: 1.5 }}>{act.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
