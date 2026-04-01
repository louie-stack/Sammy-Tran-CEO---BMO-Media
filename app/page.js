"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "../components/Nav";
import GlowCard from "../components/GlowCard";

const IN = { fontFamily: "'Inter', sans-serif" };
const MO = { fontFamily: "'Space Mono', monospace" };
const GREEN = "#C4F000";

function Reveal({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const AGENTS = [
  { name: "BMO", role: "Chief of Staff", color: GREEN, rgb: "196,240,0", status: "active", lastAction: "Morning brief compiled — 4 priorities flagged", emoji: "🤖" },
  { name: "Marceline", role: "Sales & BD", color: "#a855f7", rgb: "168,85,247", status: "active", lastAction: "3 follow-up sequences triggered", emoji: "🎸" },
  { name: "Princess Bubblegum", role: "Research", color: "#ec4899", rgb: "236,72,153", status: "standby", lastAction: "Retention.com competitor brief updated", emoji: "👑" },
  { name: "Jake", role: "Builder", color: "#eab308", rgb: "234,179,8", status: "active", lastAction: "Klaviyo flow deployed — MoonBrew", emoji: "🐕" },
  { name: "Finn", role: "Health", color: "#06b6d4", rgb: "6,182,212", status: "standby", lastAction: "Week 8 tirzepatide check-in logged", emoji: "⚔️" },
];

const PRIORITIES = [
  { text: "3 email drafts awaiting your approval", tag: "URGENT", color: "#ef4444", icon: "📧" },
  { text: "Discovery call with Ritual Beauty — today at 2:00 PM", tag: "TODAY", color: "#f59e0b", icon: "📞" },
  { text: "Q2 Retention Strategy doc ready for review", tag: "REVIEW", color: GREEN, icon: "📄" },
  { text: "Klaviyo flow error on MoonBrew — Jake flagged", tag: "ACTION", color: "#ef4444", icon: "⚠️" },
];

const STATS = [
  { label: "Active Clients", value: "12", suffix: "" },
  { label: "Emails Drafted", value: "7", suffix: "" },
  { label: "Calls Logged", value: "3", suffix: "" },
  { label: "Tasks Pending", value: "14", suffix: "" },
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
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.5}50%{opacity:1}}`}</style>

      <Nav />

      {/* HERO */}
      <section style={{ paddingTop: 54, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 60px 64px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ ...MO, fontSize: 9, color: GREEN, letterSpacing: "0.18em" }}>BMO MEDIA — AI OS</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ ...IN, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              <span style={{ display: "block", color: "rgba(255,255,255,0.5)", fontWeight: 300, fontSize: "clamp(2.4rem, 4vw, 4.2rem)" }}>{greeting},</span>
              <span style={{ display: "block", fontWeight: 800, fontSize: "clamp(2.8rem, 5vw, 5.2rem)", color: "#fff" }}>Sammy.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              style={{ ...MO, fontSize: 10, color: "#444", marginTop: 12 }}>{date}</motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
            style={{ textAlign: "right" }}>
            <div style={{ ...MO, fontSize: 36, fontWeight: 700, color: GREEN, letterSpacing: "0.03em", lineHeight: 1 }}>{time}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end", marginTop: 8 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: GREEN, boxShadow: `0 0 6px ${GREEN}80`, animation: "gPulse 2s ease-in-out infinite", display: "block" }} />
              <span style={{ ...MO, fontSize: 9, color: "#444" }}>ALL SYSTEMS NOMINAL</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 0", borderRight: i < STATS.length - 1 ? "1px solid #1a1a1a" : "none" }}>
                  <div style={{ ...IN, fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                    {s.value}<span style={{ color: GREEN }}>{s.suffix}</span>
                  </div>
                  <div style={{ ...MO, fontSize: 9, color: "#444", letterSpacing: "0.15em", marginTop: 6 }}>{s.label.toUpperCase()}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "56px 60px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* Agents */}
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ ...MO, fontSize: 9, color: GREEN }}>✦</span>
                <span style={{ ...MO, fontSize: 9, color: "#444", letterSpacing: "0.15em" }}>AGENT STATUS</span>
              </div>
            </Reveal>
            {AGENTS.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.05}>
                <GlowCard style={{ marginBottom: 8, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{a.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ ...IN, fontSize: 13, fontWeight: 600, color: "#fff" }}>{a.name}</span>
                      <span style={{ ...MO, fontSize: 8, color: "#444", letterSpacing: "0.06em" }}>{a.role.toUpperCase()}</span>
                    </div>
                    <div style={{ ...IN, fontSize: 12, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.lastAction}</div>
                  </div>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: a.status === "active" ? GREEN : "#555", boxShadow: a.status === "active" ? `0 0 6px ${GREEN}80` : "none", animation: a.status === "active" ? "gPulse 2s ease-in-out infinite" : "none" }} />
                </GlowCard>
              </Reveal>
            ))}
          </div>

          {/* Priorities */}
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ ...MO, fontSize: 9, color: GREEN }}>✦</span>
                <span style={{ ...MO, fontSize: 9, color: "#444", letterSpacing: "0.15em" }}>TODAY'S PRIORITIES</span>
              </div>
            </Reveal>
            {PRIORITIES.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <GlowCard style={{ marginBottom: 8, padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ ...IN, fontSize: 13, color: "#ccc", lineHeight: 1.55, marginBottom: 10 }}>{p.text}</div>
                      <span style={{ ...MO, fontSize: 8, fontWeight: 700, letterSpacing: "0.12em", color: p.color, background: `${p.color}14`, padding: "2px 8px", borderRadius: 70, border: `1px solid ${p.color}30` }}>{p.tag}</span>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}

            <Reveal delay={0.28}>
              <div style={{ marginTop: 20 }}>
                <div style={{ ...MO, fontSize: 9, color: "#333", letterSpacing: "0.15em", marginBottom: 10 }}>QUICK ACTIONS</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Review Drafts", "Pipeline Update", "Today's Calls", "Research Brief"].map((btn) => (
                    <button key={btn} style={{ ...MO, padding: "7px 14px", borderRadius: 4, fontSize: 9, background: "transparent", border: `1px solid ${GREEN}30`, color: `${GREEN}80`, cursor: "pointer", letterSpacing: "0.06em", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.color = GREEN; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = `${GREEN}30`; e.currentTarget.style.color = `${GREEN}80`; }}
                    >{btn}</button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
