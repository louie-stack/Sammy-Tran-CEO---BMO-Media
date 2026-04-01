"use client";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

const AGENTS = [
  { name: "BMO", role: "CHIEF OF STAFF", color: "#3b82f6", rgb: "59,130,246", status: "active", lastAction: "Morning brief compiled — 4 priorities flagged", emoji: "🤖" },
  { name: "Marceline", role: "SALES & BD", color: "#a855f7", rgb: "168,85,247", status: "active", lastAction: "3 follow-up sequences triggered", emoji: "🎸" },
  { name: "Princess Bubblegum", role: "RESEARCH", color: "#ec4899", rgb: "236,72,153", status: "standby", lastAction: "Retention.com competitor brief updated", emoji: "👑" },
  { name: "Jake", role: "BUILDER", color: "#eab308", rgb: "234,179,8", status: "active", lastAction: "Klaviyo flow deployed — MoonBrew", emoji: "🐕" },
  { name: "Finn", role: "HEALTH & WELLNESS", color: "#06b6d4", rgb: "6,182,212", status: "standby", lastAction: "Week 8 tirzepatide check-in logged", emoji: "⚔️" },
];

const PRIORITIES = [
  { text: "3 email drafts awaiting your approval", tag: "URGENT", color: "#ef4444", icon: "📧" },
  { text: "Discovery call with Ritual Beauty — today at 2:00 PM", tag: "TODAY", color: "#f59e0b", icon: "📞" },
  { text: "Q2 Retention Strategy doc ready for your review", tag: "REVIEW", color: "#3b82f6", icon: "📄" },
  { text: "Klaviyo flow error on MoonBrew account — Jake flagged", tag: "ACTION", color: "#ef4444", icon: "⚠️" },
];

const STATS = [
  { label: "Active Clients", value: "12", delta: "+2 this month" },
  { label: "Emails Drafted", value: "7", delta: "today" },
  { label: "Calls Logged", value: "3", delta: "this week" },
  { label: "Tasks Pending", value: "14", delta: "across all agents" },
];

function glowCard(rgb, hovered) {
  return {
    background: "rgba(6,10,18,0.97)",
    border: `1px solid rgba(${rgb},${hovered ? 0.4 : 0.18})`,
    boxShadow: hovered
      ? `0 0 30px rgba(${rgb},0.28), 0 0 80px rgba(${rgb},0.12), 0 16px 40px rgba(0,0,0,0.55), inset 0 0 40px rgba(${rgb},0.06)`
      : `0 0 18px rgba(${rgb},0.12), 0 12px 32px rgba(0,0,0,0.45), inset 0 0 30px rgba(${rgb},0.03)`,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  };
}

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [greeting, setGreeting] = useState("Good morning");
  const [hoveredAgent, setHoveredAgent] = useState(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
      setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: "#080B12", minHeight: "100vh", color: "#E8E8F0", position: "relative" }}>
      {/* Noise overlay */}
      <div style={{ position: "fixed", inset: 0, opacity: 0.015, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />
      {/* Atmosphere glow */}
      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "50%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 55%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-10%", left: "-5%", width: "40%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 55%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      <Nav />

      {/* Hero */}
      <div style={{ paddingTop: 54, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "60px 60px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ ...mo, fontSize: 9, color: "#3b82f6" }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#3b82f6", letterSpacing: "0.15em" }}>BMO MEDIA — AI OS</span>
              </div>
              <h1 style={{ ...jk, fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 8 }}>
                {greeting}, Sammy.
              </h1>
              <p style={{ ...mo, fontSize: 11, color: "#445" }}>{date}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ ...mo, fontSize: 32, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.05em" }}>{time}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end", marginTop: 6 }}>
                {[0, 0.3, 0.6].map((d, i) => (
                  <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px rgba(16,185,129,0.5)", animation: `gPulse 2s ease-in-out ${d}s infinite` }} />
                ))}
                <span style={{ ...mo, fontSize: 9, color: "#334", marginLeft: 4 }}>ALL SYSTEMS NOMINAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 60px 0", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, borderBottom: "1px dashed rgba(255,255,255,0.05)", paddingBottom: 32 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ padding: "20px 24px", background: "rgba(6,10,18,0.7)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 10 }}>
              <div style={{ ...mo, fontSize: 9, color: "#334", letterSpacing: "0.12em", marginBottom: 8 }}>{s.label.toUpperCase()}</div>
              <div style={{ ...jk, fontSize: 36, fontWeight: 800, color: "#E8E8F0", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div style={{ ...mo, fontSize: 10, color: "#445" }}>{s.delta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 60px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Agents */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ ...mo, fontSize: 9, color: "#3b82f6" }}>✦</span>
              <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>AGENT STATUS</span>
            </div>
            {AGENTS.map((a, i) => (
              <div
                key={a.name}
                onMouseEnter={() => setHoveredAgent(i)}
                onMouseLeave={() => setHoveredAgent(null)}
                style={{
                  ...glowCard(a.rgb, hoveredAgent === i),
                  borderRadius: 10, padding: "14px 18px", marginBottom: 8,
                  display: "flex", alignItems: "center", gap: 14, cursor: "default",
                  borderLeft: `3px solid ${a.color}`,
                }}
              >
                <span style={{ fontSize: 22 }}>{a.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ ...jk, fontSize: 13, fontWeight: 700, color: "#E8E8F0" }}>{a.name}</span>
                    <span style={{ ...mo, fontSize: 9, color: a.color, letterSpacing: "0.08em" }}>{a.role}</span>
                  </div>
                  <div style={{ ...mo, fontSize: 10, color: "#445", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.lastAction}</div>
                </div>
                <div style={{
                  width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                  background: a.status === "active" ? "#10b981" : "#f59e0b",
                  boxShadow: `0 0 8px ${a.status === "active" ? "rgba(16,185,129,0.6)" : "rgba(245,158,11,0.6)"}`,
                  animation: "gPulse 2s ease-in-out infinite",
                }} />
              </div>
            ))}
          </div>

          {/* Priorities */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ ...mo, fontSize: 9, color: "#3b82f6" }}>✦</span>
              <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>TODAY'S PRIORITIES</span>
            </div>
            {PRIORITIES.map((p, i) => (
              <div key={i} style={{
                background: "rgba(6,10,18,0.8)", border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 10, padding: "16px 18px", marginBottom: 8,
                borderLeft: `3px solid ${p.color}`,
                transition: "all 0.3s",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...jk, fontSize: 13, color: "#C8CDD8", marginBottom: 8, lineHeight: 1.4 }}>{p.text}</div>
                    <span style={{
                      ...mo, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
                      color: p.color, background: `${p.color}15`,
                      padding: "2px 8px", borderRadius: 3, border: `1px solid ${p.color}25`,
                    }}>{p.tag}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick actions */}
            <div style={{ marginTop: 20 }}>
              <div style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.12em", marginBottom: 10 }}>QUICK ACTIONS</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Review Drafts", "Pipeline Update", "Today's Calls", "Research Brief"].map((btn) => (
                  <button key={btn} className="action-btn" style={{
                    ...mo, padding: "6px 14px", borderRadius: 4, fontSize: 10,
                    background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.15)",
                    color: "#556", cursor: "pointer", letterSpacing: "0.06em",
                  }}>{btn}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
