"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";
import AgentSquarePFP from "../../components/AgentSquarePFP";

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

const BP_DATA = [
  { day: "19", sys: 128, dia: 83 }, { day: "20", sys: 124, dia: 80 },
  { day: "21", sys: 122, dia: 78 }, { day: "22", sys: 119, dia: 76 },
  { day: "23", sys: 126, dia: 82 }, { day: "24", sys: 121, dia: 79 },
  { day: "25", sys: 118, dia: 75 }, { day: "26", sys: 123, dia: 80 },
  { day: "27", sys: 120, dia: 77 }, { day: "28", sys: 117, dia: 74 },
  { day: "29", sys: 125, dia: 81 }, { day: "30", sys: 119, dia: 76 },
  { day: "31", sys: 122, dia: 79 }, { day: "1",  sys: 121, dia: 79 },
];

const WEIGHT_DATA = [
  { week: 1, weight: 192.4 }, { week: 2, weight: 190.8 }, { week: 3, weight: 189.2 },
  { week: 4, weight: 188.6 }, { week: 5, weight: 187.1 }, { week: 6, weight: 185.9 },
  { week: 7, weight: 185.2 }, { week: 8, weight: 184.1 },
];

const SLEEP_DATA = [
  { day: "Mon", hrs: 7.2 }, { day: "Tue", hrs: 6.8 }, { day: "Wed", hrs: 7.5 },
  { day: "Thu", hrs: 8.1 }, { day: "Fri", hrs: 6.4 }, { day: "Sat", hrs: 8.8 },
  { day: "Sun", hrs: 7.0 },
];

const WORKOUTS = [
  { day: "Mon", type: "Lower Body", done: true, rest: false, duration: "48 min", calories: 320 },
  { day: "Tue", type: "Rest", done: true, rest: true, duration: "—", calories: 0 },
  { day: "Wed", type: "Upper Body", done: true, rest: false, duration: "52 min", calories: 290 },
  { day: "Thu", type: "Walk 5k", done: true, rest: false, duration: "38 min", calories: 210 },
  { day: "Fri", type: "Lower Body", done: true, rest: false, duration: "50 min", calories: 340 },
  { day: "Sat", type: "Rest", done: true, rest: true, duration: "—", calories: 0 },
  { day: "Sun", type: "Upper Body", done: false, rest: false, duration: "—", calories: 0 },
];

const TIRZEPATIDE = {
  week: 8, totalWeeks: 12, dose: "7.5mg", nextDate: "Apr 8",
  startDate: "Feb 11", targetDose: "15mg",
  log: [
    { week: 1, dose: "2.5mg", date: "Feb 11", note: "Started. Mild nausea day 2." },
    { week: 3, dose: "5mg",   date: "Feb 25", note: "Appetite noticeably reduced." },
    { week: 5, dose: "5mg",   date: "Mar 11", note: "Energy improved. No side effects." },
    { week: 7, dose: "7.5mg", date: "Mar 25", note: "Dose increased. Mild fatigue first 2 days." },
    { week: 8, dose: "7.5mg", date: "Apr 1",  note: "Holding 7.5mg. Good tolerance." },
  ],
};

const SCIATICA = [
  { date: "Apr 1",  pain: 2, trigger: "Prolonged sitting 3h+", relief: "Prone press x10, ice", duration: "~45 min" },
  { date: "Mar 29", pain: 4, trigger: "Long drive (2h)",        relief: "Ice pack, stretching",  duration: "~2 hrs" },
  { date: "Mar 26", pain: 2, trigger: "Morning stiffness",      relief: "Morning walk",           duration: "~30 min" },
  { date: "Mar 22", pain: 3, trigger: "Heavy lower body session",relief: "Rest + ibuprofen",      duration: "~1.5 hrs" },
  { date: "Mar 18", pain: 1, trigger: "Desk work",              relief: "Posture correction",     duration: "~20 min" },
];

const VITALS = [
  { label: "RESTING HR", value: "62", unit: "bpm", color: "#ec4899", trend: "↓ 2 from last week" },
  { label: "SLEEP AVG",  value: "7.4", unit: "hrs", color: "#a855f7", trend: "↑ 0.3 improvement" },
  { label: "WEIGHT",     value: "184", unit: "lbs", color: GREEN,    trend: "↓ 8.3 lbs since Wk1" },
  { label: "HYDRATION",  value: "2.4", unit: "L",   color: CYAN,     trend: "On target" },
];

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
  const avgBP = Math.round(BP_DATA.reduce((s, d) => s + d.sys, 0) / BP_DATA.length);
  const avgSleep = (SLEEP_DATA.reduce((s, d) => s + d.hrs, 0) / SLEEP_DATA.length).toFixed(1);
  const weightLost = (WEIGHT_DATA[0].weight - WEIGHT_DATA[WEIGHT_DATA.length - 1].weight).toFixed(1);

  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.5}50%{opacity:1}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
      <Nav />

      {/* ── HERO ── */}
      <div style={{ paddingTop: 54 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "64px 60px 48px" }}>
          <Reveal>
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
          </Reveal>
        </div>
        <div style={{ borderBottom: "1px solid #1a1a1a" }} />
      </div>

      {/* ── VITALS STRIP ── */}
      <div style={{ borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {VITALS.map((v, i) => (
              <Reveal key={v.label} delay={i * 0.07}>
                <div style={{ padding: "26px 0", display: "flex", flexDirection: "column", alignItems: "center", borderRight: i < 3 ? "1px solid #1a1a1a" : "none" }}>
                  <div style={{ lineHeight: 1, marginBottom: 5 }}>
                    <CountUp to={parseFloat(v.value)} suffix={v.unit} decimals={v.value.includes(".") ? 1 : 0} color={v.color} size={28} />
                  </div>
                  <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.12em", marginBottom: 4 }}>{v.label}</div>
                  <div style={{ fontSize: 11, color: "#555" }}>{v.trend}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "52px 60px 100px" }}>

        {/* ── ROW 1: Wellness Score + BP ── */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 16, marginBottom: 16 }}>

            {/* Wellness score */}
            <GlowCard style={{ padding: "32px 28px" }}>
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
                        <motion.div
                          initial={{ width: 0 }} whileInView={{ width: `${(item.score / 10) * 100}%` }}
                          viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                          style={{ height: 3, borderRadius: 3, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ ...MO, fontSize: 10, color: GREEN, background: `${GREEN}10`, padding: "4px 10px", borderRadius: 70, border: `1px solid ${GREEN}20` }}>↑ +0.3 vs last week</span>
              </div>
            </GlowCard>

            {/* BP Chart */}
            <GlowCard style={{ padding: "28px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 6 }}>BLOOD PRESSURE — 14 DAYS</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <CountUp to={BP_DATA[BP_DATA.length - 1].sys} color="#fff" size={32} />
                    <span style={{ fontSize: 18, color: "#555" }}>/</span>
                    <CountUp to={BP_DATA[BP_DATA.length - 1].dia} color="#888" size={22} />
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

        {/* ── ROW 2: Tirzepatide + Sleep ── */}
        <Reveal delay={0.05}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

            {/* Tirzepatide */}
            <GlowCard style={{ padding: "28px" }}>
              <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 20 }}>TIRZEPATIDE CYCLE</div>
              {/* Cycle progress */}
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
              {/* Progress bar */}
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
              {/* Dose log */}
              <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.12em", marginBottom: 10 }}>DOSE LOG</div>
              {TIRZEPATIDE.log.map((entry, i) => (
                <div key={i} style={{ display: "flex", gap: 12, paddingBottom: i < TIRZEPATIDE.log.length - 1 ? 10 : 0, marginBottom: i < TIRZEPATIDE.log.length - 1 ? 10 : 0, borderBottom: i < TIRZEPATIDE.log.length - 1 ? "1px solid #111" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: i === TIRZEPATIDE.log.length - 1 ? `${GREEN}15` : "#111", border: `1px solid ${i === TIRZEPATIDE.log.length - 1 ? GREEN : "#1a1a1a"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ ...MO, fontSize: 8, color: i === TIRZEPATIDE.log.length - 1 ? GREEN : "#555" }}>W{entry.week}</span>
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

            {/* Sleep + Workouts */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Sleep */}
              <GlowCard style={{ padding: "24px 26px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                  <div>
                    <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 6 }}>SLEEP — THIS WEEK</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <CountUp to={parseFloat(avgSleep)} suffix="" decimals={1} color="#fff" size={28} />
                      <span style={{ fontSize: 14, color: "#a855f7" }}>hrs avg</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 24 }}>😴</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 60 }}>
                  {SLEEP_DATA.map((s, i) => {
                    const pct = ((s.hrs - 5) / (10 - 5)) * 100;
                    const good = s.hrs >= 7;
                    return (
                      <div key={s.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                        <motion.div initial={{ height: 0 }} whileInView={{ height: `${pct}%` }} viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
                          style={{ width: "100%", background: good ? "#a855f7" : "#444", borderRadius: "3px 3px 0 0", minHeight: 4 }} />
                        <span style={{ ...MO, fontSize: 8, color: "#666" }}>{s.day.slice(0,1)}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                  {SLEEP_DATA.map(s => (
                    <div key={s.day} style={{ flex: 1, textAlign: "center" }}>
                      <span style={{ ...MO, fontSize: 8, color: s.hrs >= 7 ? "#a855f7" : "#555" }}>{s.hrs}</span>
                    </div>
                  ))}
                </div>
              </GlowCard>

              {/* Workouts */}
              <GlowCard style={{ padding: "24px 26px", flex: 1 }}>
                <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 16 }}>WORKOUTS — THIS WEEK</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 14 }}>
                  {WORKOUTS.map((w) => (
                    <div key={w.day} style={{ textAlign: "center" }}>
                      <div style={{
                        background: w.done && !w.rest ? `${GREEN}12` : w.rest ? "#111" : "#0a0a0a",
                        border: `1px solid ${w.done && !w.rest ? `${GREEN}25` : "#1a1a1a"}`,
                        borderRadius: 7, padding: "10px 4px", marginBottom: 5,
                        opacity: !w.done ? 0.35 : 1,
                      }}>
                        <div style={{ fontSize: 14, marginBottom: 3 }}>{!w.done ? "○" : w.rest ? "💤" : "✓"}</div>
                        <div style={{ ...MO, fontSize: 7, color: w.done && !w.rest ? GREEN : "#555", lineHeight: 1.3 }}>
                          {w.type.split(" ").map((wd, i) => <div key={i}>{wd}</div>)}
                        </div>
                      </div>
                      <span style={{ ...MO, fontSize: 8, color: "#666" }}>{w.day.slice(0,1)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 16, borderTop: "1px solid #1a1a1a", paddingTop: 12 }}>
                  {[
                    { l: "Sessions", v: WORKOUTS.filter(w => w.done && !w.rest).length },
                    { l: "Total Cals", v: WORKOUTS.reduce((s, w) => s + w.calories, 0) },
                    { l: "Active Mins", v: WORKOUTS.filter(w => w.done && !w.rest).reduce((s, w) => s + parseInt(w.duration) || 0, 0) },
                  ].map(s => (
                    <div key={s.l}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{s.v}<span style={{ color: GREEN, fontSize: 12 }}>{s.l === "Total Cals" ? " kcal" : s.l === "Active Mins" ? " min" : ""}</span></div>
                      <div style={{ ...MO, fontSize: 9, color: "#777" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </div>
          </div>
        </Reveal>

        {/* ── ROW 3: Weight trend + Sciatica ── */}
        <Reveal delay={0.05}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {/* Weight */}
            <GlowCard style={{ padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 6 }}>WEIGHT TREND — 8 WEEKS</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <CountUp to={WEIGHT_DATA[WEIGHT_DATA.length - 1].weight} decimals={1} color="#fff" size={30} />
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
                  { l: "START", v: `${WEIGHT_DATA[0].weight} lbs`, color: "#777" },
                  { l: "CURRENT", v: `${WEIGHT_DATA[WEIGHT_DATA.length-1].weight} lbs`, color: GREEN },
                  { l: "GOAL", v: "175 lbs", color: CYAN },
                ].map(s => (
                  <div key={s.l} style={{ background: "#111", borderRadius: 7, padding: "10px 12px", border: "1px solid #1a1a1a" }}>
                    <div style={{ ...MO, fontSize: 9, color: "#555", marginBottom: 4 }}>{s.l}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </GlowCard>

            {/* Sciatica log */}
            <GlowCard style={{ padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 6 }}>SCIATICA & BACK LOG</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                      {SCIATICA[0].pain}<span style={{ color: "#f59e0b", fontSize: 16 }}>/10</span>
                    </span>
                    <span style={{ fontSize: 13, color: "#777" }}>Last episode</span>
                  </div>
                </div>
                <div style={{ fontSize: 28, animation: "float 3s ease-in-out infinite" }}>🦴</div>
              </div>
              {/* Pain trend mini chart */}
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
      </div>
    </div>
  );
}
