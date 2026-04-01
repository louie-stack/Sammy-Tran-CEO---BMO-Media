"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "../components/Nav";
import GlowCard from "../components/GlowCard";
import Link from "next/link";
import OrbitingAgents from "../components/OrbitingAgents";

const IN = { fontFamily: "'Inter', sans-serif" };
const MO = { fontFamily: "'Space Mono', monospace" };
const GREEN = "#C4F000";

function Reveal({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", bounce: 0, duration: 1.2, delay }}>
      {children}
    </motion.div>
  );
}

function SectionHeader({ label, title, href, linkLabel }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24 }}>
      <div>
        <div style={{ ...MO, fontSize: 11, color: GREEN, letterSpacing: "0.18em", marginBottom: 8 }}>{label}</div>
        <h2 style={{ ...IN, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff" }}>{title}</h2>
      </div>
      {href && (
        <Link href={href} style={{ ...MO, fontSize: 11, color: "#777", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = GREEN}
          onMouseLeave={e => e.currentTarget.style.color = "#444"}>
          {linkLabel || "VIEW ALL"} <span style={{ color: GREEN }}>→</span>
        </Link>
      )}
    </div>
  );
}

// ── DATA ────────────────────────────────────────────────────────────────────

const MORNING_BRIEF = {
  date: "Wednesday, April 1 2026",
  bullets: [
    { text: "3 emails need your sign-off before 12pm", urgent: true },
    { text: "Ritual Beauty discovery call at 2:00 PM today", urgent: false },
    { text: "MoonBrew Klaviyo cart flow v3 is live", urgent: false },
    { text: "Nexmail strategy review is overdue by 2 days", urgent: true },
    { text: "Jolie Skin follow-up is 3 days overdue — Marceline is on it", urgent: false },
  ],
  emails: [
    { from: "Ritual Beauty", subject: "Re: Partnership proposal — ready to move forward", urgent: true, time: "8:14am" },
    { from: "Jolie Skin", subject: "Following up on our intro call last week", urgent: false, time: "9:02am" },
    { from: "Centr Fitness", subject: "BFCM planning kickoff — can we get on a call?", urgent: false, time: "10:31am" },
  ],
  calendar: [
    { time: "2:00 PM", title: "Discovery call — Ritual Beauty", tag: "SALES" },
    { time: "4:30 PM", title: "Team sync — weekly review", tag: "INTERNAL" },
    { time: "EOD", title: "Review Nexmail strategy v2", tag: "PRODUCT" },
  ],
};

const REVENUE = [
  { label: "MTD REVENUE", value: "$42k", suffix: "", sub: "5 deals closed", color: GREEN },
  { label: "PIPELINE VALUE", value: "$180k", suffix: "", sub: "16 active deals", color: "#fff" },
  { label: "60-DAY FORECAST", value: "$95k", suffix: "", sub: "Based on velocity", color: "#fff" },
  { label: "ACTIVE CLIENTS", value: "12", suffix: "", sub: "2 in onboarding", color: "#fff" },
];

const PROJECTS = [
  { client: "MoonBrew", type: "Email + SMS", status: "ACTIVE", color: GREEN, statusColor: GREEN, progress: 85, focus: "Subscription retention flow — v3 live", mrr: "$3.8k" },
  { client: "Centr Fitness", type: "CRM Strategy", status: "ACTIVE", color: "#a855f7", statusColor: "#a855f7", progress: 40, focus: "BFCM planning kickoff — discovery this week", mrr: "$4.2k" },
  { client: "LA Clippers", type: "Email + Loyalty", status: "ACTIVE", color: "#ec4899", statusColor: "#ec4899", progress: 70, focus: "Q2 loyalty program build in progress", mrr: "$8.5k" },
  { client: "James Michelle", type: "Email + SMS", status: "ACTIVE", color: "#eab308", statusColor: "#eab308", progress: 90, focus: "YoY revenue up 159% — BFCM attribution complete", mrr: "$5.6k" },
  { client: "Ritual Beauty", type: "Inbound", status: "PROPOSAL", color: "#06b6d4", statusColor: "#f59e0b", progress: 0, focus: "Discovery call today 2pm — proposal to follow", mrr: "TBD" },
  { client: "Jolie Skin", type: "Email", status: "NEGOTIATION", color: "#64748b", statusColor: "#f59e0b", progress: 0, focus: "3-day follow-up overdue — Marceline on it", mrr: "$4.1k" },
];

const AGENTS = [
  { name: "BMO", role: "Chief of Staff", img: "/agents/bmo.png", status: "active", color: GREEN, rgb: "196,240,0", lastAction: "Morning brief compiled", tasksToday: 18, href: "/agents" },
  { name: "Marceline", role: "Sales & BD", img: "/agents/marceline.png", status: "active", color: "#a855f7", rgb: "168,85,247", lastAction: "3 follow-up sequences triggered", tasksToday: 11, href: "/sales" },
  { name: "Princess Bubblegum", role: "Research", img: "/agents/pb.png", status: "standby", color: "#ec4899", rgb: "236,72,153", lastAction: "Nexmail strategy 45% complete", tasksToday: 4, href: "/research" },
  { name: "Jake", role: "Builder", img: "/agents/jake.png", status: "active", color: "#eab308", rgb: "234,179,8", lastAction: "MoonBrew cart flow v3 deployed", tasksToday: 9, href: "/build" },
  { name: "Finn", role: "Health", img: "/agents/finn.png", status: "standby", color: "#06b6d4", rgb: "6,182,212", lastAction: "Week 8 tirzepatide logged", tasksToday: 3, href: "/health" },
];

const PIPELINE_SNAPSHOT = [
  { co: "Ritual Beauty", value: "$6k/mo", stage: "Discovery", days: 0, urgent: false },
  { co: "MoonBrew", value: "$3.8k/mo", stage: "Negotiation", days: 18, urgent: true },
  { co: "Centr Fitness", value: "$4.2k/mo", stage: "Proposal", days: 6, urgent: false },
  { co: "Jolie Skin", value: "$4.1k/mo", stage: "Qualified", days: 14, urgent: true },
  { co: "Strands Haircare", value: "$7.2k/mo", stage: "Negotiation", days: 22, urgent: true },
];

const RECENT_BUILDS = [
  { desc: "MoonBrew abandoned cart flow v3", env: "Klaviyo", date: "Today 09:31", ok: true },
  { desc: "Weekly metrics dashboard", env: "Vercel", date: "Today 11:15", ok: true },
  { desc: "Centr Fitness welcome series", env: "Klaviyo", date: "Yesterday", ok: true },
  { desc: "Gorgias webhook patch", env: "n8n", date: "Mar 31", ok: false },
];

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
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

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 54 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "72px 60px 56px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.05 }}
              style={{ ...MO, fontSize: 11, color: GREEN, letterSpacing: "0.18em", marginBottom: 14 }}>
              BMO MEDIA — COMMAND CENTRE
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1.2, delay: 0.1 }}
              style={{ lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              <span style={{ display: "block", color: "rgba(255,255,255,0.4)", fontWeight: 300, fontSize: "clamp(2.2rem, 3.5vw, 4rem)" }}>{greeting},</span>
              <span style={{ display: "block", fontWeight: 800, fontSize: "clamp(2.8rem, 5vw, 5.5rem)", color: "#fff" }}>Sammy.</span>
            </motion.h1>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            style={{ textAlign: "right" }}>
            <div style={{ ...MO, fontSize: 40, fontWeight: 700, color: GREEN, letterSpacing: "0.02em", lineHeight: 1 }}>{time}</div>
            <div style={{ ...MO, fontSize: 11, color: "#777", marginTop: 6 }}>{MORNING_BRIEF.date}</div>
          </motion.div>
        </div>
      </section>

      {/* ── REVENUE STATS STRIP ────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {REVENUE.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "26px 0", borderRight: i < 3 ? "1px solid #1a1a1a" : "none" }}>
                  <div style={{ fontSize: "clamp(1.8rem, 2.5vw, 2.6rem)", fontWeight: 800, color: s.color, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {s.value}<span style={{ color: GREEN, fontSize: "0.7em" }}>{s.suffix}</span>
                  </div>
                  <div style={{ ...MO, fontSize: 11, color: "#777", letterSpacing: "0.14em", marginTop: 5 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: "#777", marginTop: 3 }}>{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 60px" }}>

        {/* ── MORNING BRIEF ──────────────────────────────────────────────── */}
        <section style={{ padding: "56px 0 0" }}>
          <Reveal>
            <SectionHeader label="DAILY INTEL" title="Morning Brief" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>

            {/* Summary */}
            <Reveal delay={0.06}>
              <GlowCard style={{ padding: "22px 24px", height: "100%" }}>
                <div style={{ ...MO, fontSize: 10, color: "#666", letterSpacing: "0.14em", marginBottom: 16 }}>BMO SAYS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                  {MORNING_BRIEF.bullets.map((b, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, marginTop: 6,
                        background: b.urgent ? "#ef4444" : GREEN,
                        boxShadow: b.urgent ? "0 0 5px rgba(239,68,68,0.6)" : `0 0 5px ${GREEN}80`,
                      }} />
                      <span style={{ fontSize: 14, color: b.urgent ? "#ddd" : "#aaa", lineHeight: 1.55 }}>{b.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ paddingTop: 14, borderTop: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: GREEN, boxShadow: `0 0 5px ${GREEN}80`, animation: "gPulse 2s ease-in-out infinite", display: "block" }} />
                  <span style={{ ...MO, fontSize: 10, color: "#666" }}>UPDATED 8:00 AM</span>
                </div>
              </GlowCard>
            </Reveal>

            {/* Inbox */}
            <Reveal delay={0.1}>
              <GlowCard style={{ padding: "22px 24px" }}>
                <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 14 }}>INBOX — {MORNING_BRIEF.emails.length} UNREAD</div>
                {MORNING_BRIEF.emails.map((e, i) => (
                  <div key={i} style={{ paddingBottom: i < MORNING_BRIEF.emails.length - 1 ? 12 : 0, marginBottom: i < MORNING_BRIEF.emails.length - 1 ? 12 : 0, borderBottom: i < MORNING_BRIEF.emails.length - 1 ? "1px solid #111" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#ccc" }}>{e.from}</span>
                      <span style={{ ...MO, fontSize: 10, color: "#777" }}>{e.time}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginBottom: 5 }}>{e.subject}</div>
                    {e.urgent && <span style={{ ...MO, fontSize: 10, color: "#ef4444", background: "rgba(239,68,68,0.08)", padding: "2px 7px", borderRadius: 70, border: "1px solid rgba(239,68,68,0.2)" }}>URGENT</span>}
                  </div>
                ))}
                <Link href="/sales" style={{ ...MO, fontSize: 11, color: "#777", textDecoration: "none", display: "block", marginTop: 14, paddingTop: 12, borderTop: "1px solid #1a1a1a", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = GREEN}
                  onMouseLeave={e => e.currentTarget.style.color = "#444"}>
                  OPEN ALL EMAILS →
                </Link>
              </GlowCard>
            </Reveal>

            {/* Calendar */}
            <Reveal delay={0.14}>
              <GlowCard style={{ padding: "22px 24px" }}>
                <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 14 }}>TODAY'S SCHEDULE</div>
                {MORNING_BRIEF.calendar.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, paddingBottom: i < MORNING_BRIEF.calendar.length - 1 ? 14 : 0, marginBottom: i < MORNING_BRIEF.calendar.length - 1 ? 14 : 0, borderBottom: i < MORNING_BRIEF.calendar.length - 1 ? "1px solid #111" : "none" }}>
                    <div style={{ ...MO, fontSize: 10, color: GREEN, width: 42, flexShrink: 0, paddingTop: 1 }}>{c.time}</div>
                    <div>
                      <div style={{ fontSize: 13, color: "#ccc", marginBottom: 5 }}>{c.title}</div>
                      <span style={{ ...MO, fontSize: 10, color: "#888", background: "#1a1a1a", padding: "2px 7px", borderRadius: 70, border: "1px solid #1f1f1f" }}>{c.tag}</span>
                    </div>
                  </div>
                ))}
              </GlowCard>
            </Reveal>
          </div>
        </section>

        {/* ── ACTIVE PROJECTS ─────────────────────────────────────────────── */}
        <section style={{ padding: "56px 0 0" }}>
          <Reveal>
            <SectionHeader label="CLIENT WORK" title="Active Projects" href="/sales" linkLabel="FULL PIPELINE" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.client} delay={i * 0.05}>
                <GlowCard style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", marginBottom: 3 }}>{p.client}</div>
                      <span style={{ ...MO, fontSize: 10, padding: "2px 8px", borderRadius: 70, border: "1px solid #2a2a2a", color: "#888" }}>{p.type}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{p.mrr}</div>
                      <span style={{ ...MO, fontSize: 10, color: p.statusColor }}>{p.status}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6, marginBottom: 14 }}>{p.focus}</div>
                  {p.progress > 0 && (
                    <div>
                      <div style={{ background: "#1a1a1a", borderRadius: 3, height: 2 }}>
                        <div style={{ width: `${p.progress}%`, height: 2, borderRadius: 3, background: p.color }} />
                      </div>
                      <div style={{ ...MO, fontSize: 10, color: "#777", marginTop: 4 }}>{p.progress}% this month</div>
                    </div>
                  )}
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── AGENTS ──────────────────────────────────────────────────────── */}
        <section style={{ padding: "56px 0 0" }}>
          <Reveal>
            <SectionHeader label="AI TEAM" title="Agent Status" href="/agents" />
          </Reveal>
          <Reveal delay={0.08}>
            <GlowCard style={{ padding: "40px 32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>

                {/* Orbital viz */}
                <OrbitingAgents onAgentClick={(ag) => {}} />

                {/* Agent list */}
                <div>
                  <div style={{ ...MO, fontSize: 11, color: "#777", letterSpacing: "0.15em", marginBottom: 20 }}>HOVER ORBIT TO PAUSE · CLICK TO VIEW</div>
                  {AGENTS.map((a, i) => (
                    <Link key={a.name} href={a.href} style={{ textDecoration: "none", display: "block" }}>
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < AGENTS.length - 1 ? "1px solid #111" : "none", transition: "opacity 0.2s", cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: `1.5px solid rgba(${a.rgb},0.35)`, flexShrink: 0 }}>
                          {a.img
                            ? <img src={a.img} alt={a.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%" }} />
                            : <div style={{ width: "100%", height: "100%", background: `rgba(${a.rgb},0.12)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{a.name[0]}</div>
                          }
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{a.name}</div>
                          <div style={{ fontSize: 12, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.lastAction}</div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 2, justifyContent: "flex-end", marginBottom: 3 }}>
                            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{a.tasksToday}</span>
                            <span style={{ color: GREEN, fontSize: 11 }}>+</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: a.status === "active" ? GREEN : "#333", boxShadow: a.status === "active" ? `0 0 4px ${GREEN}80` : "none", display: "block", animation: a.status === "active" ? "gPulse 2s ease-in-out infinite" : "none" }} />
                            <span style={{ ...MO, fontSize: 7, color: "#777" }}>{a.status.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </section>

        {/* ── DEALS + BUILDS ────────────────────────────────────────────── */}
        <section style={{ padding: "56px 0 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

            {/* Pipeline snapshot */}
            <div>
              <Reveal>
                <SectionHeader label="SALES PIPELINE" title="Deals Needing Attention" href="/sales" />
              </Reveal>
              <GlowCard>
                {PIPELINE_SNAPSHOT.map((d, i) => (
                  <Reveal key={d.co} delay={i * 0.05}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: i < PIPELINE_SNAPSHOT.length - 1 ? "1px solid #111" : "none" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#ccc", marginBottom: 2 }}>{d.co}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>{d.stage}</div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{d.value}</div>
                      {d.days > 0 && (
                        <span style={{ ...MO, fontSize: 10, color: d.urgent ? "#ef4444" : "#555", background: d.urgent ? "rgba(239,68,68,0.08)" : "#1e1e1e", padding: "2px 7px", borderRadius: 70, border: `1px solid ${d.urgent ? "rgba(239,68,68,0.2)" : "#1f1f1f"}`, flexShrink: 0 }}>
                          {d.days}d
                        </span>
                      )}
                      {d.days === 0 && (
                        <span style={{ ...MO, fontSize: 10, color: GREEN, background: `${GREEN}10`, padding: "2px 7px", borderRadius: 70, border: `1px solid ${GREEN}25`, flexShrink: 0 }}>NEW</span>
                      )}
                    </div>
                  </Reveal>
                ))}
              </GlowCard>
            </div>

            {/* Build status */}
            <div>
              <Reveal>
                <SectionHeader label="BUILD STATUS" title="Recent Deployments" href="/build" />
              </Reveal>
              <GlowCard>
                {RECENT_BUILDS.map((b, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: i < RECENT_BUILDS.length - 1 ? "1px solid #111" : "none" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: b.ok ? GREEN : "#ef4444", boxShadow: b.ok ? `0 0 5px ${GREEN}60` : "0 0 5px rgba(239,68,68,0.5)" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, color: "#ccc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{b.desc}</div>
                        <div style={{ ...MO, fontSize: 11, color: "#777" }}>{b.env} · {b.date}</div>
                      </div>
                      <span style={{ ...MO, fontSize: 10, color: b.ok ? GREEN : "#ef4444" }}>{b.ok ? "OK" : "FAIL"}</span>
                    </div>
                  </Reveal>
                ))}
              </GlowCard>

              {/* Health snapshot */}
              <Reveal delay={0.1}>
                <Link href="/health" style={{ textDecoration: "none', display: 'block', marginTop: '12px" }}>
                  <GlowCard style={{ padding: "18px 22px", cursor: "pointer", marginTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 8 }}>WELLNESS — FINN</div>
                        <div style={{ display: "flex", gap: 20 }}>
                          {[{ l: "SCORE", v: "7.8", s: "/10" }, { l: "BP TODAY", v: "121/79" }, { l: "TIRZEPATIDE", v: "WK 8" }].map((s) => (
                            <div key={s.l}>
                              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{s.v}<span style={{ color: GREEN, fontSize: 12 }}>{s.s || ""}</span></div>
                              <div style={{ ...MO, fontSize: 10, color: "#777", marginTop: 2 }}>{s.l}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(6,182,212,0.35)", flexShrink: 0 }}>
                        <img src="/agents/finn.png" alt="Finn" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%" }} />
                      </div>
                    </div>
                  </GlowCard>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── NEXMAIL PRODUCT ─────────────────────────────────────────────── */}
        <section style={{ padding: "56px 0 100px" }}>
          <Reveal>
            <SectionHeader label="PRODUCT" title="Nexmail — Strategy in Progress" href="/research" linkLabel="VIEW RESEARCH" />
          </Reveal>
          <Reveal delay={0.08}>
            <GlowCard style={{ padding: "32px 36px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", marginBottom: 10 }}>Nexmail v2 — Positioning & Pricing</div>
                  <p style={{ fontSize: 14, color: "#888", lineHeight: 1.75, marginBottom: 20 }}>
                    A high-touch lifecycle intelligence layer built above Klaviyo. Human-verified AI strategy + execution — not a pure SaaS play. Internal strategy review due this week.
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["AI send-time optimisation", "Predictive churn scoring", "White-glove onboarding", "BMO strategy layer"].map((tag) => (
                      <span key={tag} style={{ ...MO, fontSize: 10, padding: "4px 10px", borderRadius: 70, border: "1px solid #2a2a2a", color: "#888" }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ ...MO, fontSize: 10, color: "#777", letterSpacing: "0.14em", marginBottom: 14 }}>STRATEGY PROGRESS</div>
                  {[
                    { label: "Market positioning", pct: 80 },
                    { label: "Pricing model", pct: 45 },
                    { label: "Competitive analysis", pct: 100 },
                    { label: "Go-to-market plan", pct: 20 },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 12, color: "#888" }}>{item.label}</span>
                        <span style={{ ...MO, fontSize: 11, color: item.pct === 100 ? GREEN : "#444" }}>{item.pct}%</span>
                      </div>
                      <div style={{ background: "#1a1a1a", borderRadius: 3, height: 2 }}>
                        <div style={{ width: `${item.pct}%`, height: 2, borderRadius: 3, background: item.pct === 100 ? GREEN : "#333" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </section>
      </div>
    </div>
  );
}




