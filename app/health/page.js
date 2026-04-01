"use client";
import { useState } from "react";
import Nav from "../../components/Nav";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const COLOR = "6,182,212";
const HEX = "#06b6d4";

function glowCard(rgb, h) {
  return {
    background: "rgba(6,10,18,0.97)",
    border: `1px solid rgba(${rgb},${h ? 0.35 : 0.14})`,
    boxShadow: h ? `0 0 28px rgba(${rgb},0.2), 0 12px 32px rgba(0,0,0,0.45)` : `0 0 14px rgba(${rgb},0.07), 0 8px 24px rgba(0,0,0,0.4)`,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  };
}

const bpData = [
  { day: "19", sys: 128, dia: 83 }, { day: "20", sys: 124, dia: 80 }, { day: "21", sys: 122, dia: 78 },
  { day: "22", sys: 119, dia: 76 }, { day: "23", sys: 126, dia: 82 }, { day: "24", sys: 121, dia: 79 },
  { day: "25", sys: 118, dia: 75 }, { day: "26", sys: 123, dia: 80 }, { day: "27", sys: 120, dia: 77 },
  { day: "28", sys: 117, dia: 74 }, { day: "29", sys: 125, dia: 81 }, { day: "30", sys: 119, dia: 76 },
  { day: "31", sys: 122, dia: 79 }, { day: "Apr 1", sys: 121, dia: 79 },
];

const workouts = [
  { day: "Mon", type: "Lower Body", done: true, rest: false },
  { day: "Tue", type: "Rest", done: true, rest: true },
  { day: "Wed", type: "Upper Body", done: true, rest: false },
  { day: "Thu", type: "Walk 5k", done: true, rest: false },
  { day: "Fri", type: "Lower Body", done: true, rest: false },
  { day: "Sat", type: "Rest", done: true, rest: true },
  { day: "Sun", type: "Upper Body", done: false, rest: false },
];

const sciaticaLog = [
  { date: "Apr 1, 2026", pain: 2, notes: "Mild ache lower left after 3+ hrs seated. Prone press stretches helped considerably." },
  { date: "Mar 29, 2026", pain: 4, notes: "Flare-up after long drive. Ice pack applied, prone press x10. Settled within 2 hours." },
  { date: "Mar 26, 2026", pain: 2, notes: "Manageable. Morning walk noticeably reduced morning stiffness." },
];

const wellnessBreakdown = [
  { label: "Sleep", score: 7.5, color: HEX },
  { label: "BP", score: 8.5, color: "#10b981" },
  { label: "Activity", score: 8.0, color: HEX },
  { label: "Back Pain", score: 6.5, color: "#f59e0b" },
  { label: "Nutrition", score: 8.0, color: "#10b981" },
];

export default function HealthPage() {
  const [hovDay, setHovDay] = useState(null);
  const [hovScore, setHovScore] = useState(false);

  return (
    <div style={{ background: "#080B12", minHeight: "100vh", color: "#E8E8F0", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.015, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />
      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "50%", height: "70%", borderRadius: "50%", background: `radial-gradient(circle, rgba(${COLOR},0.04) 0%, transparent 55%)`, filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <Nav />

      <div style={{ paddingTop: 54, maxWidth: 1440, margin: "0 auto", padding: "108px 60px 0", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>⚔️</span>
          <span style={{ ...mo, fontSize: 9, color: HEX, letterSpacing: "0.15em" }}>FINN — HEALTH & WELLNESS</span>
        </div>
        <h1 style={{ ...jk, fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>Health Dashboard</h1>
        <p style={{ ...mo, fontSize: 11, color: "#445", marginBottom: 32 }}>BP tracking, tirzepatide cycle, workouts and sciatica management</p>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 60px 80px", position: "relative", zIndex: 1 }}>

        {/* Wellness Score + Breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, marginBottom: 28, alignItems: "stretch" }}>
          <div
            onMouseEnter={() => setHovScore(true)}
            onMouseLeave={() => setHovScore(false)}
            style={{ ...glowCard(COLOR, hovScore), borderRadius: 14, padding: "28px 32px", textAlign: "center", borderTop: `2px solid rgba(${COLOR},0.5)`, minWidth: 180 }}>
            <div style={{ ...mo, fontSize: 9, color: "#334", letterSpacing: "0.12em", marginBottom: 10 }}>WELLNESS SCORE</div>
            <div style={{ ...jk, fontSize: 56, fontWeight: 900, color: HEX, lineHeight: 1 }}>7.8</div>
            <div style={{ ...mo, fontSize: 12, color: "#445", marginTop: 4 }}>/ 10</div>
            <div style={{ ...mo, fontSize: 9, color: "#10b981", marginTop: 12 }}>↑ +0.3 from last week</div>
          </div>
          <div style={{ ...glowCard(COLOR, false), borderRadius: 14, padding: "22px 26px" }}>
            <div style={{ ...mo, fontSize: 9, color: "#334", letterSpacing: "0.12em", marginBottom: 14 }}>BREAKDOWN</div>
            {wellnessBreakdown.map((w) => (
              <div key={w.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#778", width: 70 }}>{w.label}</span>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 5 }}>
                  <div style={{ width: `${(w.score / 10) * 100}%`, height: 5, borderRadius: 4, background: w.color, transition: "width 0.5s" }} />
                </div>
                <span style={{ ...mo, fontSize: 11, color: "#556", width: 28, textAlign: "right" }}>{w.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Left */}
          <div>
            {/* BP Chart */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>BLOOD PRESSURE — 14 DAYS (MAR 19 – APR 1)</span>
              </div>
              <div style={{ ...glowCard(COLOR, false), borderRadius: 12, padding: "20px 22px" }}>
                <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 3, height: 80, marginBottom: 8 }}>
                  {bpData.map((d, i) => {
                    const heightPct = Math.max(10, ((d.sys - 108) / (135 - 108)) * 100);
                    const isHigh = d.sys >= 130;
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", position: "relative" }}
                        onMouseEnter={() => setHovDay(i)}
                        onMouseLeave={() => setHovDay(null)}>
                        {hovDay === i && (
                          <div style={{
                            position: "absolute", bottom: "105%", background: "#0a0d18",
                            border: `1px solid rgba(${COLOR},0.3)`, borderRadius: 5,
                            padding: "4px 8px", ...mo, fontSize: 9, color: HEX, whiteSpace: "nowrap", zIndex: 10,
                          }}>{d.sys}/{d.dia}</div>
                        )}
                        <div style={{
                          width: "100%", height: `${heightPct}%`, minHeight: 4,
                          background: isHigh ? "#f59e0b" : HEX,
                          borderRadius: "3px 3px 0 0",
                          opacity: hovDay === i ? 1 : 0.65,
                          transition: "opacity 0.2s",
                        }} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ ...mo, fontSize: 8, color: "#334" }}>Mar 19</span>
                  <span style={{ ...mo, fontSize: 10, color: HEX }}>Latest: 121/79</span>
                  <span style={{ ...mo, fontSize: 8, color: "#334" }}>Apr 1</span>
                </div>
                <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
                  <span style={{ ...mo, fontSize: 9, color: "#10b981" }}>● Normal</span>
                  <span style={{ ...mo, fontSize: 9, color: "#f59e0b" }}>● Elevated (≥130)</span>
                </div>
              </div>
            </div>

            {/* Tirzepatide */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>TIRZEPATIDE CYCLE</span>
              </div>
              <div style={{ ...glowCard(COLOR, false), borderRadius: 12, padding: "20px 22px", borderLeft: `3px solid rgba(${COLOR},0.5)` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                  {[{ l: "Week", v: "8 / 12" }, { l: "Dose", v: "7.5mg" }, { l: "Next Dose", v: "Apr 8" }].map(s => (
                    <div key={s.l} style={{ textAlign: "center" }}>
                      <div style={{ ...jk, fontSize: 20, fontWeight: 800, color: HEX }}>{s.v}</div>
                      <div style={{ ...mo, fontSize: 9, color: "#445", marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 5, height: 5 }}>
                  <div style={{ width: "66%", height: 5, borderRadius: 5, background: `linear-gradient(90deg, ${HEX}, #3b82f6)` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                  <span style={{ ...mo, fontSize: 8, color: "#334" }}>Wk 1 · 2.5mg</span>
                  <span style={{ ...mo, fontSize: 8, color: "#334" }}>Wk 12 · 15mg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            {/* Workout Log */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>WORKOUT LOG — THIS WEEK</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {workouts.map((w) => (
                  <div key={w.day} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{
                      ...glowCard(w.done && !w.rest ? COLOR : "100,116,139", false),
                      borderRadius: 8, padding: "12px 4px", marginBottom: 4,
                      opacity: w.done ? 1 : 0.4,
                    }}>
                      <div style={{ fontSize: 16, marginBottom: 3 }}>{!w.done ? "○" : w.rest ? "💤" : "✓"}</div>
                      <div style={{ ...mo, fontSize: 7, color: w.done && !w.rest ? HEX : "#445", lineHeight: 1.3 }}>
                        {w.type.split(" ").map((word, i) => <div key={i}>{word}</div>)}
                      </div>
                    </div>
                    <div style={{ ...mo, fontSize: 9, color: "#445" }}>{w.day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sciatica Log */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>SCIATICA / BACK LOG</span>
              </div>
              {sciaticaLog.map((s, i) => (
                <div key={i} style={{
                  ...glowCard(s.pain >= 4 ? "245,158,11" : COLOR, false),
                  borderRadius: 10, padding: "14px 18px", marginBottom: 8,
                  borderLeft: `3px solid ${s.pain >= 5 ? "#ef4444" : s.pain >= 3 ? "#f59e0b" : "#10b981"}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ ...mo, fontSize: 10, color: "#556" }}>{s.date}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ ...mo, fontSize: 9, color: "#445" }}>Pain:</span>
                      <span style={{
                        ...jk, fontSize: 15, fontWeight: 800,
                        color: s.pain >= 5 ? "#ef4444" : s.pain >= 3 ? "#f59e0b" : "#10b981",
                      }}>{s.pain}<span style={{ fontSize: 10, color: "#445" }}>/10</span></span>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: "#667", lineHeight: 1.6 }}>{s.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
