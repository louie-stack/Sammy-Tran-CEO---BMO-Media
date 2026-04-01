"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "../components/Nav";
import GlowCard from "../components/GlowCard";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

function Reveal({ children, delay = 0, y = 40 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

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
  { text: "Q2 Retention Strategy doc ready for review", tag: "REVIEW", color: "#3b82f6", icon: "📄" },
  { text: "Klaviyo flow error on MoonBrew — Jake flagged", tag: "ACTION", color: "#ef4444", icon: "⚠️" },
];

const STATS = [
  { label: "Active Clients", value: "12" },
  { label: "Emails Drafted", value: "7" },
  { label: "Calls Logged", value: "3" },
  { label: "Tasks Pending", value: "14" },
];

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [greeting, setGreeting] = useState("Good morning");

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
    <div style={{ background: "#080B12", minHeight: "100vh", color: "#E8E8F0" }}>
      {/* Noise */}
      <div style={{ position: "fixed", inset: 0, opacity: 0.016, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />
      {/* Atmospheric back-lighting */}
      <div style={{ position: "fixed", top: "-30%", right: "-20%", width: "900px", height: "900px", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, rgba(37,99,235,0.03) 40%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", left: "-15%", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 60%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />
      {/* Top glow line */}
      <div style={{ position: "fixed", top: 54, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)", pointerEvents: "none", zIndex: 0 }} />

      <Nav />

      {/* ── HERO ── */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: "54px", minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 60px 60px", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.1 }}
                style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ ...mo, fontSize: 9, color: "#3b82f6" }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "rgba(59,130,246,0.7)", letterSpacing: "0.18em" }}>BMO MEDIA — AI OS</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ ...jk, lineHeight: 1.06, letterSpacing: "-0.03em" }}>
                <span style={{ display: "block", color: "#E8E8F0", fontWeight: 300, fontSize: "clamp(2.5rem, 4vw, 4.5rem)" }}>{greeting},</span>
                <span style={{ display: "block", fontWeight: 800, fontSize: "clamp(2.8rem, 5vw, 5.5rem)", background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.65) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sammy.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
                style={{ ...mo, fontSize: 11, color: "#334", marginTop: 14 }}>{date}</motion.p>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6 }}
              style={{ textAlign: "right" }}>
              <div style={{ ...mo, fontSize: 36, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.03em", lineHeight: 1 }}>{time}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end", marginTop: 8 }}>
                {[0, 0.3, 0.6].map((d, i) => (
                  <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px rgba(16,185,129,0.6)", animation: `gPulse 2s ease-in-out ${d}s infinite` }} />
                ))}
                <span style={{ ...mo, fontSize: 9, color: "#2a3a2a", marginLeft: 4 }}>ALL SYSTEMS NOMINAL</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {/* Top glow accent */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)" }} />
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: "28px 0",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  <div style={{ ...jk, fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 800, color: "#E8E8F0", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ ...mo, fontSize: 9, color: "#334", letterSpacing: "0.15em", marginTop: 6 }}>{s.label.toUpperCase()}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)" }} />
      </section>

      {/* ── MAIN GRID ── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1440, margin: "0 auto", padding: "64px 60px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* Agents */}
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span style={{ ...mo, fontSize: 9, color: "#3b82f6" }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.15em" }}>AGENT STATUS</span>
              </div>
            </Reveal>
            {AGENTS.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.06}>
                <GlowCard style={{ marginBottom: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, borderLeft: `2px solid rgba(${a.rgb},0.5)` }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{a.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ ...jk, fontSize: 13, fontWeight: 700, color: "#D8DCE8" }}>{a.name}</span>
                      <span style={{ ...mo, fontSize: 9, color: `rgba(${a.rgb},0.7)`, letterSpacing: "0.08em" }}>{a.role}</span>
                    </div>
                    <div style={{ ...mo, fontSize: 10, color: "#334", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.lastAction}</div>
                  </div>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                    background: a.status === "active" ? "#10b981" : "#f59e0b",
                    boxShadow: `0 0 8px ${a.status === "active" ? "rgba(16,185,129,0.7)" : "rgba(245,158,11,0.7)"}`,
                    animation: "gPulse 2s ease-in-out infinite",
                  }} />
                </GlowCard>
              </Reveal>
            ))}
          </div>

          {/* Priorities */}
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span style={{ ...mo, fontSize: 9, color: "#3b82f6" }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.15em" }}>TODAY'S PRIORITIES</span>
              </div>
            </Reveal>
            {PRIORITIES.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <GlowCard style={{ marginBottom: 10, padding: "18px 20px", borderLeft: `2px solid ${p.color}` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ ...jk, fontSize: 13, color: "#B8BDC8", lineHeight: 1.55, marginBottom: 10 }}>{p.text}</div>
                      <span style={{
                        ...mo, fontSize: 8, fontWeight: 700, letterSpacing: "0.12em",
                        color: p.color, background: `${p.color}12`,
                        padding: "3px 9px", borderRadius: 3, border: `1px solid ${p.color}22`,
                      }}>{p.tag}</span>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div style={{ marginTop: 24 }}>
                <div style={{ ...mo, fontSize: 9, color: "#2a3040", letterSpacing: "0.15em", marginBottom: 12 }}>QUICK ACTIONS</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Review Drafts", "Pipeline Update", "Today's Calls", "Research Brief"].map((btn) => (
                    <button key={btn} style={{
                      ...mo, padding: "7px 14px", borderRadius: 5, fontSize: 10,
                      background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.12)",
                      color: "rgba(59,130,246,0.55)", cursor: "pointer", letterSpacing: "0.06em",
                      transition: "all 0.25s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.08)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)"; e.currentTarget.style.color = "rgba(59,130,246,0.85)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,0.04)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.12)"; e.currentTarget.style.color = "rgba(59,130,246,0.55)"; }}
                    >{btn}</button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}}`}</style>
    </div>
  );
}
