"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";
import AgentSquarePFP from "../../components/AgentSquarePFP";
import { useData } from "../../hooks/useData";

const IN = { fontFamily: "'Inter', sans-serif" };
const MO = { fontFamily: "'Space Mono', monospace" };
const GREEN = "#C4F000";
const CYAN = "#06b6d4";

function Reveal({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", bounce: 0, duration: 1.1, delay }}>
      {children}
    </motion.div>
  );
}

// Animated count-up number
function CountUp({ to, suffix = "", decimals = 0, color = "#fff", size = 32 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4, ease: "easeOut",
      onUpdate: v => setVal(decimals ? parseFloat(v.toFixed(decimals)) : Math.round(v)),
    });
    return controls.stop;
  }, [inView, to]);
  return (
    <span ref={ref} style={{ fontSize: size, fontWeight: 800, color, letterSpacing: "-0.03em", lineHeight: 1 }}>
      {val}{suffix}
    </span>
  );
}

// SVG Radial progress ring
function RingGauge({ value, max = 100, size = 140, stroke = 8, color = GREEN, label, sublabel }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = value / max;
  return (
    <div ref={ref} style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a1a1a" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ * (1 - pct) } : {}}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>{value}<span style={{ fontSize: 14, color }}>{sublabel}</span></div>
        <div style={{ ...MO, fontSize: 9, color: "#777", marginTop: 4, letterSpacing: "0.1em" }}>{label}</div>
      </div>
    </div>
  );
}

// BP Bar chart
function BPChart({ data }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [hov, setHov] = useState(null);
  const maxSys = 145, minSys = 105;
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100 }}>
        {data.map((d, i) => {
          const sysPct = ((d.sys - minSys) / (maxSys - minSys)) * 100;
          const diaPct = ((d.dia - 60) / (maxSys - 60)) * 60;
          const high = d.sys >= 130;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", position: "relative" }}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
              {hov === i && (
                <div style={{ position: "absolute", bottom: "110%", left: "50%", transform: "translateX(-50%)", background: "#111", border: "1px solid #222", borderRadius: 6, padding: "5px 9px", zIndex: 10, whiteSpace: "nowrap" }}>
                  <div style={{ ...MO, fontSize: 10, color: CYAN }}>{d.sys}/{d.dia}</div>
                  <div style={{ ...MO, fontSize: 9, color: "#777" }}>Mar {d.day}</div>
                </div>
              )}
              <motion.div
                initial={{ height: 0 }} animate={inView ? { height: `${sysPct}%` } : {}}
                transition={{ duration: 0.8, delay: i * 0.04, ease: "easeOut" }}
                style={{ width: "100%", background: high ? "#f59e0b" : CYAN, borderRadius: "3px 3px 0 0", opacity: hov === i ? 1 : 0.65, minHeight: 3 }} />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ ...MO, fontSize: 9, color: "#777" }}>Mar 19</span>
        <span style={{ ...MO, fontSize: 9, color: "#777" }}>Apr 1</span>
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: CYAN, display: "block" }} /><span style={{ ...MO, fontSize: 9, color: "#777" }}>Normal</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "#f59e0b", display: "block" }} /><span style={{ ...MO, fontSize: 9, color: "#777" }}>Elevated ≥130</span></div>
      </div>
    </div>
  );
}

// Weight line chart
function WeightChart({ data }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const W = 400, H = 80;
  const vals = data.map(d => d.weight);
  const min = Math.min(...vals) - 2, max = Math.max(...vals) + 2;
  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((d.weight - min) / (max - min)) * H,
  }));
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${path} L ${W} ${H} L 0 ${H} Z`;
  return (
    <div ref={ref}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height: 80 }}>
        <defs>
          <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GREEN} stopOpacity="0.15" />
            <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
          </linearGradient>
          <motion.path id="wClip" d={areaPath} />
        </defs>
        <path d={areaPath} fill="url(#wGrad)" />
        <motion.path d={path} fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeInOut" }} />
        {pts.map((p, i) => (
          <motion.circle key={i} cx={p.x} cy={p.y} r="3" fill={GREEN}
            initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.6 + i * 0.05, duration: 0.3 }} />
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        {data.filter((_, i) => i % 2 === 0).map(d => (
          <span key={d.week} style={{ ...MO, fontSize: 9, color: "#777" }}>Wk{d.week}</span>
        ))}
      </div>
    </div>
  );
}

// ── DATA ─────────────────────────────────────────────────────────────────────



function PainDot({ level }) {
  const color = level >= 7 ? "#ef4444" : level >= 4 ? "#f59e0b" : level >= 2 ? "#eab308" : "#10b981";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
          <div key={n} style={{ width: 10, height: 10, borderRadius: 2, background: n <= level ? color : "#1a1a1a" }} />
        ))}
      </div>
      <span style={{ ...MO, fontSize: 10, color, fontWeight: 700 }}>{level}/10</span>
    </div>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function HealthPage() {
  const { data: hd } = useData("health");
  const BP_DATA = hd?.bpData || [];
  const WEIGHT_DATA = hd?.weightData || [];
  const SLEEP_DATA = hd?.sleepData || [];
  const WORKOUTS = hd?.workouts || [];
  const TIRZEPATIDE = hd?.tirzepatide || {};
  const SCIATICA = hd?.sciatica || [];
  const VITALS = hd?.vitals || [];

  const avgBP = BP_DATA.length ? Math.round(BP_DATA.reduce((s, d) => s + d.sys, 0) / BP_DATA.length) : 0;
  const avgSleep = SLEEP_DATA.length ? (SLEEP_DATA.reduce((s, d) => s + d.hrs, 0) / SLEEP_DATA.length).toFixed(1) : "0.0";
  const weightLost = WEIGHT_DATA.length >= 2 ? (WEIGHT_DATA[0].weight - WEIGHT_DATA[WEIGHT_DATA.length - 1].weight).toFixed(1) : "0.0";
  const [activeSection, setActiveSection] = useState("vitals");
  const healthSections = [
    { label: "Vitals", id: "vitals" },
    { label: "Medications", id: "medications" },
    { label: "Workouts", id: "workouts" },
    { label: "Sciatica", id: "sciatica" },
    { label: "Sleep", id: "sleep" },
  ];

  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.5}50%{opacity:1}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
      <Nav />

      <div style={{ display: "flex", flex: 1, paddingTop: 54 }}>

        {/* ── SIDEBAR ── */}
        <div style={{ width: 220, flexShrink: 0, borderRight: "1px solid #1a1a1a", display: "flex", flexDirection: "column", position: "sticky", top: 54, height: "calc(100vh - 54px)", overflowY: "auto" }}>
          {/* Agent header */}
          <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid #1a1a1a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <AgentSquarePFP src="/agents/finn-pfp.png" accent="#06b6d4" size={52} />
              <div>
                <div style={{ ...IN, fontSize: 13, fontWeight: 700, color: "#e0e0e8" }}>Finn</div>
                <div style={{ ...MO, fontSize: 9, color: "#555" }}>Health</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: CYAN, boxShadow: `0 0 5px ${CYAN}80`, animation: "gPulse 2s infinite", display: "block" }} />
              <span style={{ ...MO, fontSize: 9, color: "#555" }}>ACTIVE</span>
            </div>
          </div>

          {/* Section labels */}
          <div style={{ padding: "14px 10px", flex: 1 }}>
            <div style={{ ...MO, fontSize: 8, color: "#333", letterSpacing: "0.14em", padding: "0 10px", marginBottom: 8 }}>SECTIONS</div>
            {healthSections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <div key={s.id} onClick={() => setActiveSection(s.id)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", borderRadius: 8, cursor: "pointer", borderLeft: isActive ? `2px solid ${CYAN}` : "2px solid transparent", background: isActive ? "rgba(6,182,212,0.05)" : "transparent", marginBottom: 2, transition: "all 0.2s" }}>
                  <span style={{ ...IN, fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "#666" }}>{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* Bottom stats */}
          <div style={{ padding: "20px 20px 24px", borderTop: "1px solid #1a1a1a" }}>
            <div style={{ ...MO, fontSize: 9, color: "#444", letterSpacing: "0.14em", marginBottom: 16 }}>CURRENT</div>
            {[
              { label: "Weight", value: "207 lbs", color: CYAN },
              { label: "BP", value: "122/80", color: "#10b981" },
            ].map(s => (
              <div key={s.label} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: s.color, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                <div style={{ ...MO, fontSize: 9, color: "#555", letterSpacing: "0.1em" }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>

          {/* Hero */}
          <div style={{ position: "relative", padding: "60px 56px 40px", borderBottom: "1px solid #111", overflow: "hidden" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: CYAN, boxShadow: `0 0 8px ${CYAN}80`, animation: "gPulse 2s infinite", display: "block" }} />
                <span style={{ ...MO, fontSize: 11, color: `${CYAN}99`, letterSpacing: "0.18em" }}>HEALTH & WELLNESS</span>
              </div>
              <h1 style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.06, marginBottom: 10 }}>
                Health Dashboard
              </h1>
              <p style={{ ...MO, fontSize: 11, color: "#555" }}>Vitals · medications · workouts · sleep · sciatica log</p>
            </motion.div>
          </div>

      {/* ── SECTION CONTENT ── */}
      <div style={{ padding: "40px 48px 100px" }}>

        {/* ── VITALS ── */}
        {activeSection === "vitals" && (
          <>
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 20, borderBottom: "1px solid #1a1a1a" }}>
                {VITALS.map((v, i) => (
                  <div key={v.label} style={{ padding: "26px 0", display: "flex", flexDirection: "column", alignItems: "center", borderRight: i < 3 ? "1px solid #1a1a1a" : "none" }}>
                    <div style={{ lineHeight: 1, marginBottom: 5 }}>
                      <CountUp to={parseFloat(v.value)} suffix={v.unit} decimals={v.value.includes(".") ? 1 : 0} color={v.color} size={28} />
                    </div>
                    <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.12em", marginBottom: 4 }}>{v.label}</div>
                    <div style={{ fontSize: 11, color: "#555" }}>{v.trend}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 16 }}>
                <GlowCard style={{ "--base": 192, padding: "32px 28px" }}>
                  <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 20 }}>WEEKLY WELLNESS SCORE</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
                    <RingGauge value={7.8} max={10} size={120} stroke={7} color={GREEN} label="/ 10" sublabel="" />
                    <div style={{ flex: 1 }}>
                      {[
                        { label: "Blood Pressure", score: 8.5, color: CYAN },
                        { label: "Activity",        score: 8.0, color: GREEN },
                        { label: "Sleep",           score: 7.5, color: "#a855f7" },
                        { label: "Back / Sciatica", score: 6.5, color: "#f59e0b" },
                        { label: "Nutrition",       score: 8.0, color: GREEN },
                      ].map((item, i) => (
                        <div key={item.label} style={{ marginBottom: 9 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 12, color: "#888" }}>{item.label}</span>
                            <span style={{ ...MO, fontSize: 10, color: item.color }}>{item.score}</span>
                          </div>
                          <div style={{ background: "#111", borderRadius: 3, height: 3 }}>
                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${(item.score / 10) * 100}%` }}
                              viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                              style={{ height: 3, borderRadius: 3, background: item.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <span style={{ ...MO, fontSize: 10, color: GREEN, background: `${GREEN}10`, padding: "4px 10px", borderRadius: 70, border: `1px solid ${GREEN}20` }}>↑ +0.3 vs last week</span>
                </GlowCard>
                <GlowCard style={{ "--base": 192, padding: "28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 6 }}>BLOOD PRESSURE — 14 DAYS</div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                        <CountUp to={BP_DATA[BP_DATA.length - 1]?.sys || 0} color="#fff" size={32} />
                        <span style={{ fontSize: 18, color: "#555" }}>/</span>
                        <CountUp to={BP_DATA[BP_DATA.length - 1]?.dia || 0} color="#888" size={22} />
                        <span style={{ ...MO, fontSize: 10, color: "#777" }}>mmHg · Today</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>14-day avg systolic</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: CYAN }}>{avgBP} <span style={{ fontSize: 12, color: "#777" }}>mmHg</span></div>
                    </div>
                  </div>
                  <BPChart data={BP_DATA} />
                </GlowCard>
              </div>
            </Reveal>
          </>
        )}

        {/* ── MEDICATIONS ── */}
        {activeSection === "medications" && (
          <Reveal delay={0}>
            <GlowCard style={{ "--base": 192, padding: "28px 32px" }}>
              <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 20 }}>TIRZEPATIDE CYCLE</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  { l: "WEEK", v: `${TIRZEPATIDE.week}`, s: `/ ${TIRZEPATIDE.totalWeeks}`, color: GREEN },
                  { l: "CURRENT DOSE", v: TIRZEPATIDE.dose, s: "", color: CYAN },
                  { l: "NEXT DOSE", v: TIRZEPATIDE.nextDate, s: "", color: "#a855f7" },
                ].map(s => (
                  <div key={s.l} style={{ background: "#111", borderRadius: 8, padding: "14px", textAlign: "center", border: "1px solid #1a1a1a" }}>
                    <div style={{ ...MO, fontSize: 9, color: "#777", marginBottom: 6 }}>{s.l}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.v}<span style={{ fontSize: 13, color: "#555" }}>{s.s}</span></div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "#888" }}>Progress to target dose ({TIRZEPATIDE.targetDose})</span>
                  <span style={{ ...MO, fontSize: 10, color: GREEN }}>Week {TIRZEPATIDE.week} of {TIRZEPATIDE.totalWeeks}</span>
                </div>
                <div style={{ background: "#111", borderRadius: 4, height: 6, marginBottom: 4 }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(TIRZEPATIDE.week / TIRZEPATIDE.totalWeeks) * 100}%` }}
                    viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ height: 6, borderRadius: 4, background: `linear-gradient(90deg, ${CYAN}, ${GREEN})` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ ...MO, fontSize: 9, color: "#555" }}>2.5mg (Wk1)</span>
                  <span style={{ ...MO, fontSize: 9, color: "#555" }}>15mg (Wk12)</span>
                </div>
              </div>
              <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.12em", marginBottom: 10 }}>DOSE LOG</div>
              {(TIRZEPATIDE.log || []).map((entry, i) => (
                <div key={i} style={{ display: "flex", gap: 12, paddingBottom: i < (TIRZEPATIDE.log || []).length - 1 ? 10 : 0, marginBottom: i < (TIRZEPATIDE.log || []).length - 1 ? 10 : 0, borderBottom: i < (TIRZEPATIDE.log || []).length - 1 ? "1px solid #111" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: i === (TIRZEPATIDE.log || []).length - 1 ? `${GREEN}15` : "#111", border: `1px solid ${i === (TIRZEPATIDE.log || []).length - 1 ? GREEN : "#1a1a1a"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ ...MO, fontSize: 8, color: i === (TIRZEPATIDE.log || []).length - 1 ? GREEN : "#555" }}>W{entry.week}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#ddd" }}>{entry.dose}</span>
                      <span style={{ ...MO, fontSize: 9, color: "#555" }}>{entry.date}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#666" }}>{entry.note}</div>
                  </div>
                </div>
              ))}
            </GlowCard>
          </Reveal>
        )}

        {/* ── WORKOUTS ── */}
        {activeSection === "workouts" && (
          <Reveal delay={0}>
            <GlowCard style={{ "--base": 73, padding: "28px 32px" }}>
              <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 20 }}>WORKOUTS — THIS WEEK</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, marginBottom: 20 }}>
                {WORKOUTS.map((w) => (
                  <div key={w.day} style={{ textAlign: "center" }}>
                    <div style={{ background: w.done && !w.rest ? `${GREEN}12` : w.rest ? "#111" : "#0a0a0a", border: `1px solid ${w.done && !w.rest ? `${GREEN}25` : "#1a1a1a"}`, borderRadius: 7, padding: "14px 4px", marginBottom: 6, opacity: !w.done ? 0.35 : 1 }}>
                      <div style={{ fontSize: 18, marginBottom: 5 }}>{!w.done ? "○" : w.rest ? "💤" : "✓"}</div>
                      <div style={{ ...MO, fontSize: 8, color: w.done && !w.rest ? GREEN : "#555", lineHeight: 1.4 }}>
                        {w.type.split(" ").map((wd, i) => <div key={i}>{wd}</div>)}
                      </div>
                    </div>
                    <span style={{ ...MO, fontSize: 9, color: "#666" }}>{w.day}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 24, borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
                {[
                  { l: "Sessions", v: String(WORKOUTS.filter(w => w.done && !w.rest).length) },
                  { l: "Total Cals", v: `${WORKOUTS.reduce((s, w) => s + w.calories, 0)} kcal` },
                  { l: "Active Mins", v: `${WORKOUTS.filter(w => w.done && !w.rest).reduce((s, w) => s + parseInt(w.duration) || 0, 0)} min` },
                ].map(s => (
                  <div key={s.l}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{s.v}</div>
                    <div style={{ ...MO, fontSize: 10, color: "#777" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        )}

        {/* ── SLEEP ── */}
        {activeSection === "sleep" && (
          <Reveal delay={0}>
            <GlowCard style={{ "--base": 270, padding: "32px 36px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                <div>
                  <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 6 }}>SLEEP — THIS WEEK</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <CountUp to={parseFloat(avgSleep)} suffix="" decimals={1} color="#fff" size={36} />
                    <span style={{ fontSize: 16, color: "#a855f7" }}>hrs avg</span>
                  </div>
                </div>
                <span style={{ fontSize: 36 }}>😴</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, marginBottom: 12 }}>
                {SLEEP_DATA.map((s, i) => {
                  const pct = ((s.hrs - 5) / (10 - 5)) * 100;
                  return (
                    <div key={s.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: `${pct}%` }} viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
                        style={{ width: "100%", background: s.hrs >= 7 ? "#a855f7" : "#444", borderRadius: "4px 4px 0 0", minHeight: 4 }} />
                      <span style={{ ...MO, fontSize: 10, color: "#666" }}>{s.day}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
                {SLEEP_DATA.map(s => (
                  <div key={s.day} style={{ flex: 1, textAlign: "center" }}>
                    <span style={{ ...MO, fontSize: 10, color: s.hrs >= 7 ? "#a855f7" : "#555", fontWeight: s.hrs >= 7 ? 700 : 400 }}>{s.hrs}h</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 16, borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
                {[
                  { l: "Best Night", v: `${Math.max(...SLEEP_DATA.map(s => s.hrs))}h`, color: "#a855f7" },
                  { l: "Worst Night", v: `${Math.min(...SLEEP_DATA.map(s => s.hrs))}h`, color: "#555" },
                  { l: "Nights ≥7h", v: `${SLEEP_DATA.filter(s => s.hrs >= 7).length}/7`, color: GREEN },
                ].map(s => (
                  <div key={s.l} style={{ flex: 1, background: "#111", borderRadius: 8, padding: "14px 16px", border: "1px solid #1a1a1a" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.v}</div>
                    <div style={{ ...MO, fontSize: 9, color: "#555", marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        )}

        {/* ── SCIATICA ── */}
        {activeSection === "sciatica" && (
          <Reveal delay={0}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <GlowCard style={{ "--base": 73, padding: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 6 }}>WEIGHT TREND — 8 WEEKS</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <CountUp to={WEIGHT_DATA[WEIGHT_DATA.length - 1]?.weight || 0} decimals={1} color="#fff" size={30} />
                      <span style={{ fontSize: 14, color: "#777" }}>lbs</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>Lost since start</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: GREEN }}>↓ {weightLost} <span style={{ fontSize: 13, color: "#777" }}>lbs</span></div>
                  </div>
                </div>
                <WeightChart data={WEIGHT_DATA} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 18 }}>
                  {[
                    { l: "START", v: `${WEIGHT_DATA[0]?.weight ?? "—"} lbs`, color: "#777" },
                    { l: "CURRENT", v: `${WEIGHT_DATA[WEIGHT_DATA.length-1]?.weight ?? "—"} lbs`, color: GREEN },
                    { l: "GOAL", v: "175 lbs", color: CYAN },
                  ].map(s => (
                    <div key={s.l} style={{ background: "#111", borderRadius: 7, padding: "10px 12px", border: "1px solid #1a1a1a" }}>
                      <div style={{ ...MO, fontSize: 9, color: "#555", marginBottom: 4 }}>{s.l}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </GlowCard>
              <GlowCard style={{ "--base": 38, padding: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 6 }}>SCIATICA & BACK LOG</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{SCIATICA[0].pain}<span style={{ color: "#f59e0b", fontSize: 16 }}>/10</span></span>
                      <span style={{ fontSize: 13, color: "#777" }}>Last episode</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 28, animation: "float 3s ease-in-out infinite" }}>🦴</div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 40, marginBottom: 18 }}>
                  {[...SCIATICA].reverse().map((s, i) => {
                    const h = (s.pain / 10) * 100;
                    const col = s.pain >= 5 ? "#ef4444" : s.pain >= 3 ? "#f59e0b" : "#10b981";
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <motion.div initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          style={{ width: "100%", background: col, borderRadius: "3px 3px 0 0", minHeight: 3 }} />
                        <span style={{ ...MO, fontSize: 8, color: "#555" }}>{s.date.split(" ")[0]}</span>
                      </div>
                    );
                  })}
                </div>
                {SCIATICA.map((s, i) => (
                  <div key={i} style={{ paddingBottom: i < SCIATICA.length - 1 ? 14 : 0, marginBottom: i < SCIATICA.length - 1 ? 14 : 0, borderBottom: i < SCIATICA.length - 1 ? "1px solid #111" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                      <span style={{ ...MO, fontSize: 10, color: "#888" }}>{s.date}</span>
                      <PainDot level={s.pain} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                      <div><span style={{ ...MO, fontSize: 9, color: "#555" }}>Trigger: </span><span style={{ fontSize: 11, color: "#888" }}>{s.trigger}</span></div>
                      <div><span style={{ ...MO, fontSize: 9, color: "#555" }}>Relief: </span><span style={{ fontSize: 11, color: "#888" }}>{s.relief}</span></div>
                    </div>
                  </div>
                ))}
              </GlowCard>
            </div>
          </Reveal>
        )}

      </div>
        </div>
      </div>
    </div>
  );
}