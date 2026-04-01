"use client";
import { useState } from "react";

const bpData = [
  { day: "Mar 19", sys: 128, dia: 83 },
  { day: "Mar 20", sys: 124, dia: 80 },
  { day: "Mar 21", sys: 122, dia: 78 },
  { day: "Mar 22", sys: 119, dia: 76 },
  { day: "Mar 23", sys: 126, dia: 82 },
  { day: "Mar 24", sys: 121, dia: 79 },
  { day: "Mar 25", sys: 118, dia: 75 },
  { day: "Mar 26", sys: 123, dia: 80 },
  { day: "Mar 27", sys: 120, dia: 77 },
  { day: "Mar 28", sys: 117, dia: 74 },
  { day: "Mar 29", sys: 125, dia: 81 },
  { day: "Mar 30", sys: 119, dia: 76 },
  { day: "Mar 31", sys: 122, dia: 79 },
  { day: "Apr 1", sys: 121, dia: 79 },
];

const workouts = [
  { day: "Mon", type: "Lower Body", done: true },
  { day: "Tue", type: "Rest", done: true },
  { day: "Wed", type: "Upper Body", done: true },
  { day: "Thu", type: "Walk 5k", done: true },
  { day: "Fri", type: "Lower Body", done: true },
  { day: "Sat", type: "Rest", done: true },
  { day: "Sun", type: "Upper Body", done: false },
];

const sciaticaLog = [
  { date: "Apr 1", pain: 2, notes: "Mild ache lower left after sitting for 3+ hrs. Stretches helped." },
  { date: "Mar 29", pain: 4, notes: "Flare-up after long drive. Ice pack + prone press x10." },
  { date: "Mar 26", pain: 2, notes: "Manageable. Morning walk reduced stiffness significantly." },
];

const wellnessBreakdown = [
  { label: "Sleep", score: 7.5 },
  { label: "BP", score: 8.5 },
  { label: "Activity", score: 8.0 },
  { label: "Back Pain", score: 6.5 },
  { label: "Nutrition", score: 8.0 },
];

const maxSys = Math.max(...bpData.map((d) => d.sys));
const minSys = Math.min(...bpData.map((d) => d.sys));

export default function HealthPage() {
  const [hoveredDay, setHoveredDay] = useState(null);

  return (
    <div style={{ minHeight: "100vh", padding: "32px" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "20px" }}>⚔️</span>
            <div style={{ fontSize: "11px", color: "#06b6d4", letterSpacing: "0.2em", fontFamily: "monospace" }}>FINN — HEALTH & WELLNESS</div>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#f1f5f9" }}>Health Dashboard</h1>
        </div>

        {/* Daily Wellness Score */}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "20px", marginBottom: "28px", alignItems: "stretch" }}>
          <div className="card-hover" style={{
            background: "rgba(15,21,32,0.85)", border: "1px solid rgba(6,182,212,0.2)",
            borderRadius: "14px", padding: "24px 28px", backdropFilter: "blur(8px)",
            textAlign: "center", borderTop: "3px solid #06b6d4", minWidth: "180px",
          }}>
            <div style={{ fontSize: "11px", color: "#475569", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: "10px" }}>WELLNESS SCORE</div>
            <div style={{ fontSize: "52px", fontWeight: "900", color: "#06b6d4", fontFamily: "monospace", lineHeight: 1 }}>7.8</div>
            <div style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>/ 10</div>
            <div style={{ fontSize: "11px", color: "#10b981", marginTop: "10px" }}>↑ +0.3 from last week</div>
          </div>
          <div className="card-hover" style={{
            background: "rgba(15,21,32,0.85)", border: "1px solid rgba(6,182,212,0.1)",
            borderRadius: "14px", padding: "20px 24px", backdropFilter: "blur(8px)",
          }}>
            <div style={{ fontSize: "11px", color: "#475569", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: "12px" }}>BREAKDOWN</div>
            {wellnessBreakdown.map((w) => (
              <div key={w.label} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", color: "#94a3b8", width: "70px" }}>{w.label}</span>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: "4px", height: "6px" }}>
                  <div style={{ width: `${(w.score / 10) * 100}%`, height: "6px", borderRadius: "4px", background: w.score >= 8 ? "#10b981" : w.score >= 6.5 ? "#06b6d4" : "#f59e0b" }} />
                </div>
                <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#64748b", width: "28px", textAlign: "right" }}>{w.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Left */}
          <div>
            {/* BP Chart */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>BLOOD PRESSURE — 14 DAYS</div>
              <div className="card-hover" style={{
                background: "rgba(15,21,32,0.85)", border: "1px solid rgba(6,182,212,0.1)",
                borderRadius: "12px", padding: "20px", backdropFilter: "blur(8px)",
              }}>
                {/* BP Bar Chart */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "80px", marginBottom: "6px" }}>
                  {bpData.map((d, i) => {
                    const heightPct = ((d.sys - 110) / (140 - 110)) * 100;
                    const isHigh = d.sys >= 130;
                    return (
                      <div
                        key={i}
                        onMouseEnter={() => setHoveredDay(i)}
                        onMouseLeave={() => setHoveredDay(null)}
                        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
                      >
                        {hoveredDay === i && (
                          <div style={{
                            position: "absolute", background: "#0f1520", border: "1px solid rgba(6,182,212,0.3)",
                            borderRadius: "6px", padding: "4px 8px", fontSize: "10px", color: "#06b6d4",
                            fontFamily: "monospace", whiteSpace: "nowrap", transform: "translateY(-28px)",
                            zIndex: 10,
                          }}>
                            {d.sys}/{d.dia}
                          </div>
                        )}
                        <div style={{
                          width: "100%", height: `${heightPct}%`, minHeight: "4px",
                          background: isHigh ? "#f59e0b" : "#06b6d4",
                          borderRadius: "3px 3px 0 0",
                          opacity: hoveredDay === i ? 1 : 0.7,
                          transition: "opacity 0.2s",
                        }} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "9px", color: "#475569", fontFamily: "monospace" }}>Mar 19</span>
                  <span style={{ fontSize: "10px", color: "#06b6d4", fontFamily: "monospace" }}>Latest: 121/79</span>
                  <span style={{ fontSize: "9px", color: "#475569", fontFamily: "monospace" }}>Apr 1</span>
                </div>
                <div style={{ marginTop: "8px", display: "flex", gap: "12px" }}>
                  <span style={{ fontSize: "10px", color: "#10b981" }}>● Normal range</span>
                  <span style={{ fontSize: "10px", color: "#f59e0b" }}>● Elevated</span>
                </div>
              </div>
            </div>

            {/* Tirzepatide Tracker */}
            <div>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>TIRZEPATIDE CYCLE</div>
              <div className="card-hover" style={{
                background: "rgba(15,21,32,0.85)", border: "1px solid rgba(6,182,212,0.15)",
                borderRadius: "12px", padding: "18px", backdropFilter: "blur(8px)",
                borderLeft: "3px solid #06b6d4",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                  {[
                    { label: "Week", value: "8 / 12" },
                    { label: "Current Dose", value: "7.5mg" },
                    { label: "Next Injection", value: "Apr 8" },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", fontWeight: "800", color: "#06b6d4", fontFamily: "monospace" }}>{s.value}</div>
                      <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Progress */}
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "6px", height: "6px" }}>
                  <div style={{ width: "66%", height: "6px", borderRadius: "6px", background: "linear-gradient(90deg, #06b6d4, #3b82f6)" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  <span style={{ fontSize: "9px", color: "#475569", fontFamily: "monospace" }}>Week 1 — 2.5mg</span>
                  <span style={{ fontSize: "9px", color: "#475569", fontFamily: "monospace" }}>Week 12 — 15mg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            {/* Workout Log */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>WORKOUT LOG — THIS WEEK</div>
              <div style={{ display: "flex", gap: "6px" }}>
                {workouts.map((w) => (
                  <div key={w.day} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{
                      background: w.done ? (w.type === "Rest" ? "rgba(71,85,105,0.3)" : "rgba(6,182,212,0.15)") : "rgba(15,21,32,0.6)",
                      border: `1px solid ${w.done && w.type !== "Rest" ? "rgba(6,182,212,0.3)" : "rgba(255,255,255,0.05)"}`,
                      borderRadius: "8px", padding: "10px 4px", marginBottom: "4px",
                    }}>
                      <div style={{ fontSize: "14px", marginBottom: "2px" }}>
                        {!w.done ? "○" : w.type === "Rest" ? "💤" : "✓"}
                      </div>
                      <div style={{ fontSize: "8px", color: w.done ? "#06b6d4" : "#475569", textAlign: "center", lineHeight: 1.2 }}>
                        {w.type.split(" ").map((word, i) => <div key={i}>{word}</div>)}
                      </div>
                    </div>
                    <div style={{ fontSize: "10px", color: "#475569" }}>{w.day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sciatica Log */}
            <div>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>SCIATICA / BACK LOG</div>
              {sciaticaLog.map((s, i) => (
                <div key={i} className="card-hover" style={{
                  background: "rgba(15,21,32,0.85)", border: "1px solid rgba(59,130,246,0.08)",
                  borderRadius: "10px", padding: "14px 16px", backdropFilter: "blur(8px)",
                  marginBottom: "8px",
                  borderLeft: `3px solid ${s.pain >= 5 ? "#ef4444" : s.pain >= 3 ? "#f59e0b" : "#10b981"}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{s.date}</span>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>Pain:</span>
                      <span style={{
                        fontSize: "13px", fontWeight: "700", fontFamily: "monospace",
                        color: s.pain >= 5 ? "#ef4444" : s.pain >= 3 ? "#f59e0b" : "#10b981",
                      }}>{s.pain}/10</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", color: "#64748b", lineHeight: 1.5 }}>{s.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
