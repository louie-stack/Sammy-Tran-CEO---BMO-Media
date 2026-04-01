"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";

const mo = { fontFamily: "'Space Mono', monospace" };
const GREEN = "#C4F000";
const IN = { fontFamily: "'Inter', sans-serif" };

function Reveal({ children, delay = 0, y = 30 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: "spring", bounce: 0, duration: 1.2, delay }}>
      {children}
    </motion.div>
  );
}

const bpData = [
  { day: "19", sys: 128, dia: 83 }, { day: "20", sys: 124, dia: 80 }, { day: "21", sys: 122, dia: 78 },
  { day: "22", sys: 119, dia: 76 }, { day: "23", sys: 126, dia: 82 }, { day: "24", sys: 121, dia: 79 },
  { day: "25", sys: 118, dia: 75 }, { day: "26", sys: 123, dia: 80 }, { day: "27", sys: 120, dia: 77 },
  { day: "28", sys: 117, dia: 74 }, { day: "29", sys: 125, dia: 81 }, { day: "30", sys: 119, dia: 76 },
  { day: "31", sys: 122, dia: 79 }, { day: "1", sys: 121, dia: 79 },
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
  { date: "Apr 1, 2026", pain: 2, notes: "Mild ache lower left after 3+ hrs seated. Prone press stretches helped." },
  { date: "Mar 29, 2026", pain: 4, notes: "Flare-up after long drive. Ice pack, prone press x10. Settled within 2 hours." },
  { date: "Mar 26, 2026", pain: 2, notes: "Manageable. Morning walk noticeably reduced stiffness." },
];

const wellnessBreakdown = [
  { label: "Sleep", score: 7.5, color: "#06b6d4" },
  { label: "BP", score: 8.5, color: "#10b981" },
  { label: "Activity", score: 8.0, color: "#06b6d4" },
  { label: "Back Pain", score: 6.5, color: "#f59e0b" },
  { label: "Nutrition", score: 8.0, color: "#10b981" },
];

export default function HealthPage() {
  const [hovDay, setHovDay] = useState(null);

  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.016, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} /><Nav />

      {/* Hero */}
      <div style={{ paddingTop: 54, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "70px 60px 0" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>⚔️</span>
              <span style={{ ...mo, fontSize: 9, color: "rgba(6,182,212,0.7)", letterSpacing: "0.18em" }}>FINN — HEALTH & WELLNESS</span>
            </div>
            <h1 style={{ ...IN, fontSize: "clamp(2.2rem, 4vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 6 }}>Health Dashboard</h1>
            <p style={{ ...mo, fontSize: 11, color: "#333" }}>BP tracking · tirzepatide cycle · workouts · sciatica management</p>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "56px 60px 100px", position: "relative", zIndex: 1 }}>

        {/* Score + Breakdown bento */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, marginBottom: 36, alignItems: "stretch" }}>
            {/* Score */}
            <GlowCard style={{ padding: "32px 40px", textAlign: "center", minWidth: 190 }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(180deg, rgba(6,182,212,0.06) 0%, transparent 100%)", borderRadius: "14px 14px 0 0", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <div style={{ ...mo, fontSize: 9, color: "#333", letterSpacing: "0.15em", marginBottom: 12 }}>WELLNESS SCORE</div>
                <div style={{ ...IN, fontSize: 62, fontWeight: 900, color: "#06b6d4", lineHeight: 1 }}>7.8</div>
                <div style={{ ...mo, fontSize: 11, color: "#333", marginTop: 4 }}>/ 10</div>
                <div style={{ ...mo, fontSize: 9, color: "#10b981", marginTop: 14 }}>↑ +0.3 vs last week</div>
              </div>
            </GlowCard>
            {/* Breakdown */}
            <GlowCard style={{ padding: "26px 30px" }}>
              <div style={{ ...mo, fontSize: 9, color: "#333", letterSpacing: "0.15em", marginBottom: 18 }}>BREAKDOWN</div>
              {wellnessBreakdown.map((w) => (
                <div key={w.label} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: "#555", width: 70, flexShrink: 0 }}>{w.label}</span>
                  <div style={{ flex: 1, background: "#111", borderRadius: 4, height: 5 }}>
                    <div style={{ width: `${(w.score / 10) * 100}%`, height: 5, borderRadius: 4, background: w.color, transition: "width 0.6s ease" }} />
                  </div>
                  <span style={{ ...mo, fontSize: 11, color: "#444", width: 28, textAlign: "right" }}>{w.score}</span>
                </div>
              ))}
            </GlowCard>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* BP Chart */}
            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...mo, fontSize: 9, color: "#06b6d4" }}>✦</span>
                  <span style={{ ...mo, fontSize: 10, color: "#444", letterSpacing: "0.15em" }}>BLOOD PRESSURE — 14 DAYS</span>
                </div>
              </Reveal>
              <GlowCard style={{ padding: "24px 26px" }}>
                <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 3, height: 90, marginBottom: 10 }}>
                  {bpData.map((d, i) => {
                    const pct = Math.max(8, ((d.sys - 108) / (135 - 108)) * 100);
                    const isHigh = d.sys >= 130;
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", position: "relative" }}
                        onMouseEnter={() => setHovDay(i)}
                        onMouseLeave={() => setHovDay(null)}>
                        {hovDay === i && (
                          <div style={{ position: "absolute", bottom: "110%", background: "#0a0f1e", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 5, padding: "4px 8px", ...mo, fontSize: 9, color: "#06b6d4", whiteSpace: "nowrap", zIndex: 10 }}>
                            {d.sys}/{d.dia}
                          </div>
                        )}
                        <div style={{ width: "100%", height: `${pct}%`, minHeight: 4, background: isHigh ? "#f59e0b" : "#06b6d4", borderRadius: "3px 3px 0 0", opacity: hovDay === i ? 1 : 0.55, transition: "opacity 0.15s" }} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ ...mo, fontSize: 8, color: "#333" }}>Mar 19</span>
                  <span style={{ ...mo, fontSize: 10, color: "#06b6d4" }}>Latest: 121/79</span>
                  <span style={{ ...mo, fontSize: 8, color: "#333" }}>Apr 1</span>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <span style={{ ...mo, fontSize: 9, color: "#10b981" }}>● Normal</span>
                  <span style={{ ...mo, fontSize: 9, color: "#f59e0b" }}>● Elevated (≥130)</span>
                </div>
              </GlowCard>
            </div>

            {/* Tirzepatide */}
            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...mo, fontSize: 9, color: "#06b6d4" }}>✦</span>
                  <span style={{ ...mo, fontSize: 10, color: "#444", letterSpacing: "0.15em" }}>TIRZEPATIDE CYCLE</span>
                </div>
              </Reveal>
              <GlowCard style={{ padding: "24px 26px" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60, background: "linear-gradient(180deg, rgba(6,182,212,0.05) 0%, transparent 100%)", borderRadius: "14px 14px 0 0", pointerEvents: "none" }} />
                <div style={{ position: "relative" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 18 }}>
                    {[{ l: "Week", v: "8 / 12" }, { l: "Dose", v: "7.5mg" }, { l: "Next Dose", v: "Apr 8" }].map(s => (
                      <div key={s.l} style={{ textAlign: "center", padding: "12px", background: "rgba(6,182,212,0.04)", borderRadius: 8, border: "1px solid rgba(6,182,212,0.08)" }}>
                        <div style={{ ...IN, fontSize: 18, fontWeight: 800, color: "#06b6d4" }}>{s.v}</div>
                        <div style={{ ...mo, fontSize: 8, color: "#333", marginTop: 3 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#111", borderRadius: 5, height: 5 }}>
                    <div style={{ width: "66%", height: 5, borderRadius: 5, background: "linear-gradient(90deg, #06b6d4, #3b82f6)" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                    <span style={{ ...mo, fontSize: 8, color: "#333" }}>Wk 1 · 2.5mg</span>
                    <span style={{ ...mo, fontSize: 8, color: "#333" }}>Wk 12 · 15mg</span>
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Workout Log */}
            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...mo, fontSize: 9, color: "#06b6d4" }}>✦</span>
                  <span style={{ ...mo, fontSize: 10, color: "#444", letterSpacing: "0.15em" }}>WORKOUT LOG — THIS WEEK</span>
                </div>
              </Reveal>
              <GlowCard style={{ padding: "22px 24px" }}>
                <div style={{ display: "flex", gap: 10 }}>
                  {workouts.map((w) => (
                    <div key={w.day} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{
                        background: w.done && !w.rest ? "rgba(6,182,212,0.08)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${w.done && !w.rest ? "rgba(6,182,212,0.18)" : "#111"}`,
                        borderRadius: 8, padding: "12px 4px", marginBottom: 6,
                        opacity: w.done ? 1 : 0.35,
                      }}>
                        <div style={{ fontSize: 15, marginBottom: 4 }}>{!w.done ? "○" : w.rest ? "💤" : "✓"}</div>
                        <div style={{ ...mo, fontSize: 7, color: w.done && !w.rest ? "#06b6d4" : "#2a3040", lineHeight: 1.4 }}>
                          {w.type.split(" ").map((word, i) => <div key={i}>{word}</div>)}
                        </div>
                      </div>
                      <div style={{ ...mo, fontSize: 9, color: "#333" }}>{w.day}</div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </div>

            {/* Sciatica Log */}
            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...mo, fontSize: 9, color: "#06b6d4" }}>✦</span>
                  <span style={{ ...mo, fontSize: 10, color: "#444", letterSpacing: "0.15em" }}>SCIATICA / BACK LOG</span>
                </div>
              </Reveal>
              {sciaticaLog.map((s, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <GlowCard style={{ padding: "16px 20px", marginBottom: 10, borderLeft: `2px solid ${s.pain >= 5 ? "#ef4444" : s.pain >= 3 ? "#f59e0b" : "#10b981"}` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ ...mo, fontSize: 10, color: "#444" }}>{s.date}</span>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                        <span style={{ ...mo, fontSize: 8, color: "#333" }}>PAIN</span>
                        <span style={{ ...IN, fontSize: 18, fontWeight: 800, color: s.pain >= 5 ? "#ef4444" : s.pain >= 3 ? "#f59e0b" : "#10b981" }}>{s.pain}</span>
                        <span style={{ ...mo, fontSize: 9, color: "#333" }}>/10</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#555", lineHeight: 1.65 }}>{s.notes}</p>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





