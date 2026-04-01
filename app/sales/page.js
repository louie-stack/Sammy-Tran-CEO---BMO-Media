"use client";
import { useState } from "react";

const pipeline = [
  {
    stage: "Prospect",
    color: "#64748b",
    deals: [
      { company: "Alo Yoga", contact: "Lisa Chen", value: "$5,200/mo", days: 8 },
      { company: "Graza Olive Oil", contact: "Tom R.", value: "$2,800/mo", days: 3 },
      { company: "Starface", contact: "Megan K.", value: "$4,500/mo", days: 12 },
    ],
  },
  {
    stage: "Qualified",
    color: "#3b82f6",
    deals: [
      { company: "Ritual Beauty", contact: "James Walsh", value: "$6,000/mo", days: 5 },
      { company: "Fly By Jing", contact: "Sarah T.", value: "$3,200/mo", days: 9 },
      { company: "Jolie Skin", contact: "Alex M.", value: "$4,100/mo", days: 14 },
      { company: "Brightland", contact: "Rachel S.", value: "$2,600/mo", days: 2 },
    ],
  },
  {
    stage: "Proposal Sent",
    color: "#8b5cf6",
    deals: [
      { company: "Centr Fitness", contact: "Mike D.", value: "$4,200/mo", days: 6 },
      { company: "Our Place", contact: "Luz R.", value: "$5,500/mo", days: 11 },
    ],
  },
  {
    stage: "Negotiation",
    color: "#f59e0b",
    deals: [
      { company: "MoonBrew", contact: "Dan S.", value: "$3,800/mo", days: 18 },
      { company: "Strands Haircare", contact: "Eric D.", value: "$7,200/mo", days: 22 },
    ],
  },
  {
    stage: "Closed Won",
    color: "#10b981",
    deals: [
      { company: "LA Clippers", contact: "Charisse S.", value: "$8,500/mo", days: 0 },
      { company: "Travel Pro", contact: "Andy S.", value: "$4,000/mo", days: 0 },
      { company: "Allegiance Flag", contact: "Katie L.", value: "$2,200/mo", days: 0 },
      { company: "Nursing Queen", contact: "Quinn R.", value: "$1,800/mo", days: 0 },
      { company: "James Michelle", contact: "Jordan T.", value: "$5,600/mo", days: 0 },
    ],
  },
];

const followUps = [
  { company: "Jolie Skin", contact: "Alex M.", overdue: 3, lastContact: "Proposal follow-up" },
  { company: "Brightland", contact: "Rachel S.", overdue: 1, lastContact: "Initial outreach reply" },
  { company: "Starface", contact: "Megan K.", overdue: 5, lastContact: "Discovery call booked" },
  { company: "MoonBrew", contact: "Dan S.", overdue: 2, lastContact: "Contract revision sent" },
  { company: "Fly By Jing", contact: "Sarah T.", overdue: 7, lastContact: "Qualification call" },
];

export default function SalesPage() {
  const [activeStage, setActiveStage] = useState(null);

  return (
    <div style={{ minHeight: "100vh", padding: "32px", position: "relative" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "20px" }}>🎸</span>
            <div style={{ fontSize: "11px", color: "#a855f7", letterSpacing: "0.2em", fontFamily: "monospace" }}>MARCELINE — SALES & BD</div>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#f1f5f9" }}>Pipeline</h1>
        </div>

        {/* Revenue Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
          {[
            { label: "MTD Pipeline Value", value: "$180k", sub: "16 active deals", color: "#3b82f6" },
            { label: "Closed This Month", value: "$42k", sub: "5 deals won", color: "#10b981" },
            { label: "Forecast (60 days)", value: "$95k", sub: "Based on velocity", color: "#a855f7" },
          ].map((s) => (
            <div key={s.label} className="card-hover" style={{
              background: "rgba(15,21,32,0.85)", border: `1px solid ${s.color}20`,
              borderRadius: "12px", padding: "18px 20px", backdropFilter: "blur(8px)",
              borderLeft: `3px solid ${s.color}`,
            }}>
              <div style={{ fontSize: "10px", color: "#475569", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: "6px" }}>{s.label}</div>
              <div style={{ fontSize: "26px", fontWeight: "800", color: s.color, fontFamily: "monospace" }}>{s.value}</div>
              <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Kanban Pipeline */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>DEAL PIPELINE</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", overflowX: "auto" }}>
            {pipeline.map((col) => (
              <div key={col.stage}>
                <div style={{
                  fontSize: "10px", fontFamily: "monospace", color: col.color,
                  padding: "4px 0", marginBottom: "8px", borderBottom: `1px solid ${col.color}30`,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span>{col.stage.toUpperCase()}</span>
                  <span style={{ background: `${col.color}20`, padding: "1px 6px", borderRadius: "4px" }}>{col.deals.length}</span>
                </div>
                {col.deals.map((d, i) => (
                  <div key={i} className="card-hover" style={{
                    background: "rgba(15,21,32,0.8)", border: `1px solid ${col.color}20`,
                    borderRadius: "8px", padding: "10px 12px", marginBottom: "6px",
                    backdropFilter: "blur(8px)",
                  }}>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#e2e8f0", marginBottom: "2px" }}>{d.company}</div>
                    <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "4px" }}>{d.contact}</div>
                    <div style={{ fontSize: "11px", color: col.color, fontFamily: "monospace" }}>{d.value}</div>
                    {d.days > 0 && (
                      <div style={{ fontSize: "9px", color: d.days > 10 ? "#f59e0b" : "#64748b", marginTop: "4px" }}>
                        {d.days}d in stage
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Follow-up Queue */}
        <div>
          <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>
            OVERDUE FOLLOW-UPS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {followUps.map((f, i) => (
              <div key={i} className="card-hover" style={{
                background: "rgba(15,21,32,0.8)", border: "1px solid rgba(239,68,68,0.1)",
                borderRadius: "8px", padding: "12px 16px", backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", gap: "16px",
                borderLeft: `3px solid ${f.overdue >= 5 ? "#ef4444" : "#f59e0b"}`,
              }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#e2e8f0" }}>{f.company}</span>
                  <span style={{ fontSize: "11px", color: "#64748b", marginLeft: "8px" }}>{f.contact}</span>
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>{f.lastContact}</div>
                <div style={{
                  fontSize: "11px", fontFamily: "monospace", fontWeight: "600",
                  color: f.overdue >= 5 ? "#ef4444" : "#f59e0b",
                  background: f.overdue >= 5 ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
                  padding: "2px 8px", borderRadius: "4px",
                }}>
                  {f.overdue}d overdue
                </div>
                <button className="action-btn" style={{
                  padding: "4px 12px", borderRadius: "6px", fontSize: "10px",
                  background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)",
                  color: "#a855f7", cursor: "pointer",
                }}>Follow Up</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
