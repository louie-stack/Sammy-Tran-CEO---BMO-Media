"use client";
import { useState, useEffect } from "react";
import ParticleField from "../components/ParticleField";

const agents = [
  { name: "BMO", emoji: "🤖", role: "Chief of Staff", lastAction: "Morning brief compiled — 4 priorities flagged", status: "active", color: "#3b82f6" },
  { name: "Marceline", emoji: "🎸", role: "Sales & BD", lastAction: "3 follow-up sequences triggered for pipeline", status: "active", color: "#a855f7" },
  { name: "Princess Bubblegum", emoji: "👑", role: "Research & Strategy", lastAction: "Competitor brief on Retention.com updated", status: "standby", color: "#ec4899" },
  { name: "Jake", emoji: "🐕", role: "Builder", lastAction: "Klaviyo flow deployed to MoonBrew account", status: "active", color: "#eab308" },
  { name: "Finn", emoji: "⚔️", role: "Health & Wellness", lastAction: "Week 8 tirzepatide check-in logged", status: "standby", color: "#06b6d4" },
];

const priorities = [
  { label: "3 email drafts awaiting your approval", tag: "URGENT", icon: "📧", color: "#ef4444" },
  { label: "Discovery call with Ritual Beauty — today at 2:00 PM", tag: "TODAY", icon: "📞", color: "#f59e0b" },
  { label: "Q2 Retention Strategy doc ready for review", tag: "REVIEW", icon: "📄", color: "#3b82f6" },
  { label: "Klaviyo flow error on MoonBrew account — Jake flagged", tag: "ACTION", icon: "⚠️", color: "#ef4444" },
];

const stats = [
  { label: "Active Clients", value: "12", icon: "🏢" },
  { label: "Emails Drafted", value: "7", icon: "✉️" },
  { label: "Calls Logged", value: "3", icon: "🎙️" },
  { label: "Tasks Pending", value: "14", icon: "📋" },
];

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "32px", position: "relative" }}>
      <ParticleField />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#3b82f6", letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: "6px" }}>
                BMO MEDIA — AI OS
              </div>
              <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#f1f5f9", lineHeight: 1.1, marginBottom: "6px" }}>
                Good morning, Sammy.
              </h1>
              <p style={{ fontSize: "14px", color: "#64748b" }}>{date}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "28px", fontWeight: "700", fontFamily: "monospace", color: "#3b82f6", letterSpacing: "0.05em" }}>{time}</div>
              <div style={{ fontSize: "11px", color: "#475569", marginTop: "4px" }}>System Online</div>
              <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end", marginTop: "6px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: "10px", color: "#10b981", fontFamily: "monospace" }}>ALL SYSTEMS NOMINAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }}>
          {stats.map((s) => (
            <div key={s.label} className="card-hover" style={{
              background: "rgba(15,21,32,0.8)", border: "1px solid rgba(59,130,246,0.12)",
              borderRadius: "12px", padding: "16px 20px", backdropFilter: "blur(8px)",
            }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>{s.icon}</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#f1f5f9", fontFamily: "monospace" }}>{s.value}</div>
              <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Agent Status */}
          <div>
            <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", marginBottom: "12px", fontFamily: "monospace" }}>
              AGENT STATUS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {agents.map((a) => (
                <div key={a.name} className="card-hover" style={{
                  background: "rgba(15,21,32,0.7)", border: `1px solid rgba(59,130,246,0.1)`,
                  borderRadius: "10px", padding: "14px 16px", backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", gap: "12px",
                  borderLeft: `3px solid ${a.color}`,
                }}>
                  <span style={{ fontSize: "22px" }}>{a.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#e2e8f0" }}>{a.name}</span>
                      <span style={{ fontSize: "10px", color: a.color, fontFamily: "monospace" }}>{a.role}</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {a.lastAction}
                    </div>
                  </div>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0,
                    background: a.status === "active" ? "#10b981" : "#f59e0b",
                    boxShadow: `0 0 8px ${a.status === "active" ? "#10b981" : "#f59e0b"}`,
                  }} />
                </div>
              ))}
            </div>
          </div>

          {/* Today's Priorities */}
          <div>
            <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", marginBottom: "12px", fontFamily: "monospace" }}>
              TODAY'S PRIORITIES
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {priorities.map((p, i) => (
                <div key={i} className="card-hover" style={{
                  background: "rgba(15,21,32,0.7)", border: "1px solid rgba(59,130,246,0.1)",
                  borderRadius: "10px", padding: "16px", backdropFilter: "blur(8px)",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ fontSize: "20px" }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", color: "#e2e8f0", marginBottom: "6px", lineHeight: 1.4 }}>{p.label}</div>
                      <span style={{
                        fontSize: "9px", fontFamily: "monospace", fontWeight: "700",
                        color: p.color, background: `${p.color}18`,
                        padding: "2px 8px", borderRadius: "4px",
                        border: `1px solid ${p.color}30`,
                      }}>{p.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ marginTop: "16px" }}>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", marginBottom: "8px", fontFamily: "monospace" }}>QUICK ACTIONS</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["Review Drafts", "Check Pipeline", "Today's Calls", "Research Brief"].map((btn) => (
                  <button key={btn} className="action-btn" style={{
                    padding: "6px 14px", borderRadius: "6px", fontSize: "11px",
                    background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)",
                    color: "#94a3b8", cursor: "pointer", fontFamily: "monospace",
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
