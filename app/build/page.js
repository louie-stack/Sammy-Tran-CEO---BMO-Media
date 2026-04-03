"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import GlowCard from "../../components/GlowCard";
import AgentSquarePFP from "../../components/AgentSquarePFP";

const MO = { fontFamily: "'Space Mono', monospace" };
const IN = { fontFamily: "'Inter', sans-serif" };
const GREEN = "#C4F000";
const YELLOW = "#eab308";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", bounce: 0, duration: 1.2, delay }}>
      {children}
    </motion.div>
  );
}

function ColourCard({ rgb, hue = 73, children, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <GlowCard style={{ "--base": hue, ...style }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: `radial-gradient(ellipse at 50% 100%, rgba(${rgb},0.1) 0%, transparent 60%)`, opacity: hov ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</div>
    </GlowCard>
  );
}

function ProgressBar({ pct, color, animated = true }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 3, height: 3, overflow: "hidden" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{ height: "100%", background: color, borderRadius: 3, boxShadow: `0 0 6px ${color}60` }} />
    </div>
  );
}

function StatusDot({ status }) {
  const map = {
    live: { color: GREEN, label: "LIVE" },
    "in progress": { color: "#3b82f6", label: "IN PROGRESS" },
    testing: { color: "#f59e0b", label: "TESTING" },
    queued: { color: "#555", label: "QUEUED" },
    failed: { color: "#ef4444", label: "FAILED" },
  };
  const s = map[status.toLowerCase()] || map.queued;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, boxShadow: `0 0 5px ${s.color}80`, display: "block", animation: status === "in progress" ? "gPulse 1.5s infinite" : "none" }} />
      <span style={{ ...MO, fontSize: 9, color: s.color, letterSpacing: "0.06em" }}>{s.label}</span>
    </div>
  );
}

function TechBadge({ label, color = "#333", textColor = "#777" }) {
  return (
    <span style={{ ...MO, fontSize: 9, padding: "3px 9px", borderRadius: 4, background: color, color: textColor, letterSpacing: "0.04em" }}>{label}</span>
  );
}

/* ── Data ── */
const featuredBuild = {
  title: "MoonBrew — Full Lifecycle Email System",
  client: "MoonBrew",
  status: "In Progress",
  pct: 78,
  color: "#3b82f6", rgb: "59,130,246", hue: 217,
  description: "Complete Klaviyo lifecycle build — welcome series, post-purchase, win-back, cart abandon, and browse abandon. 7 flows, 34 emails total. Currently building win-back sequence.",
  tech: [
    { label: "Klaviyo", color: "rgba(34,197,94,0.1)", textColor: "#22c55e" },
    { label: "Figma", color: "rgba(168,85,247,0.1)", textColor: "#a855f7" },
    { label: "n8n", color: "rgba(234,179,8,0.1)", textColor: "#eab308" },
    { label: "Postman", color: "rgba(239,68,68,0.1)", textColor: "#ef4444" },
  ],
  tasks: [
    { label: "Welcome series (5 emails)", done: true },
    { label: "Post-purchase flow (4 emails)", done: true },
    { label: "Cart abandonment (3 emails)", done: true },
    { label: "Browse abandonment (2 emails)", done: true },
    { label: "Win-back sequence (6 emails)", done: false },
    { label: "SMS layer integration", done: false },
    { label: "QA + send-time optimisation", done: false },
  ],
  due: "Apr 5",
};

const activeBuilds = [
  {
    title: "Centr Fitness — Welcome Series",
    client: "Centr Fitness", status: "Testing",
    pct: 90, color: "#f59e0b", rgb: "245,158,11", hue: 38,
    tech: ["Klaviyo", "Figma"],
    due: "Apr 3", note: "QA in progress — 2 emails left to review",
  },
  {
    title: "LA Clippers — Loyalty Flow Rebuild",
    client: "LA Clippers", status: "In Progress",
    pct: 45, color: "#8b5cf6", rgb: "139,92,246", hue: 263,
    tech: ["Klaviyo", "Gorgias"],
    due: "Apr 10", note: "Segment logic being rebuilt from scratch",
  },
  {
    title: "Nexmail — Onboarding Automation",
    client: "Nexmail", status: "In Progress",
    pct: 30, color: YELLOW, rgb: "234,179,8", hue: 48,
    tech: ["n8n", "Vercel", "Supabase"],
    due: "Apr 14", note: "Webhook triggers mapped, building sequences",
  },
];

const recentDeploys = [
  { title: "MoonBrew cart abandon flow v3", env: "Klaviyo", time: "Today 09:31", status: "live", color: "#22c55e" },
  { title: "Centr Fitness SMS welcome trigger", env: "Klaviyo", time: "Today 11:15", status: "live", color: "#22c55e" },
  { title: "Weekly metrics dashboard", env: "Vercel", time: "Today 14:02", status: "live", color: "#22c55e" },
  { title: "Gorgias webhook patch", env: "n8n", time: "Yesterday 18:44", status: "failed", color: "#ef4444" },
  { title: "Allegiance Flag post-purchase v2", env: "Klaviyo", time: "Mar 31", status: "live", color: "#22c55e" },
  { title: "Jolie Skin browse abandon", env: "Klaviyo", time: "Mar 30", status: "live", color: "#22c55e" },
];

const integrations = [
  { name: "Klaviyo", status: "live", color: "#22c55e", rgb: "34,197,94", hue: 142, note: "All flows active" },
  { name: "n8n", status: "in progress", color: "#f59e0b", rgb: "245,158,11", hue: 38, note: "1 workflow failing" },
  { name: "Vercel", status: "live", color: "#22c55e", rgb: "34,197,94", hue: 142, note: "3 projects deployed" },
  { name: "Gorgias", status: "testing", color: "#f59e0b", rgb: "245,158,11", hue: 38, note: "Webhook under review" },
  { name: "Supabase", status: "live", color: "#22c55e", rgb: "34,197,94", hue: 142, note: "DB healthy" },
  { name: "Postman", status: "live", color: "#22c55e", rgb: "34,197,94", hue: 142, note: "API tests passing" },
];

const stats = [
  { label: "ACTIVE BUILDS", value: "4" },
  { label: "DEPLOYED THIS MONTH", value: "12" },
  { label: "FLOWS LIVE", value: "31" },
  { label: "FAILED DEPLOYS", value: "1" },
];

export default function BuildPage() {
  const [openBuild, setOpenBuild] = useState(null);
  const [activeSection, setActiveSection] = useState("builds");
  const sections = [
    { label: "Active Builds", count: activeBuilds.length + 1, id: "builds" },
    { label: "Deployments", count: recentDeploys.length, id: "deployments" },
    { label: "Integrations", count: integrations.length, id: "integrations" },
  ];

  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <style>{`@keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}}`}</style>
      <Nav />

      <div style={{ display: "flex", flex: 1, paddingTop: 54 }}>

        {/* ── SIDEBAR ── */}
        <div style={{ width: 220, flexShrink: 0, borderRight: "1px solid #111", display: "flex", flexDirection: "column", position: "sticky", top: 54, height: "calc(100vh - 54px)", overflowY: "auto" }}>
          {/* Agent header */}
          <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid #111" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <AgentSquarePFP src="/agents/jake-pfp.png" accent="#eab308" size={52} />
              <div>
                <div style={{ ...IN, fontSize: 13, fontWeight: 700, color: "#e0e0e8" }}>Jake</div>
                <div style={{ ...MO, fontSize: 9, color: "#555" }}>Build</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: YELLOW, boxShadow: `0 0 5px ${YELLOW}80`, animation: "gPulse 2s infinite", display: "block" }} />
              <span style={{ ...MO, fontSize: 9, color: "#555" }}>ACTIVE</span>
            </div>
          </div>

          {/* Section labels */}
          <div style={{ padding: "14px 10px", flex: 1 }}>
            <div style={{ ...MO, fontSize: 8, color: "#333", letterSpacing: "0.14em", padding: "0 10px", marginBottom: 8 }}>SECTIONS</div>
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <div key={s.id} onClick={() => setActiveSection(s.id)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", borderRadius: 8, cursor: "pointer", borderLeft: isActive ? `2px solid ${YELLOW}` : "2px solid transparent", background: isActive ? "rgba(234,179,8,0.05)" : "transparent", marginBottom: 2, transition: "all 0.2s" }}>
                  <span style={{ ...IN, fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "#666" }}>{s.label}</span>
                  <span style={{ ...MO, fontSize: 9, color: isActive ? YELLOW : "#333", background: isActive ? "rgba(234,179,8,0.1)" : "transparent", padding: "1px 7px", borderRadius: 4 }}>{s.count}</span>
                </div>
              );
            })}
          </div>

          {/* Bottom stats */}
          <div style={{ padding: "20px 20px 24px", borderTop: "1px solid #111" }}>
            <div style={{ ...MO, fontSize: 9, color: "#444", letterSpacing: "0.14em", marginBottom: 16 }}>THIS MONTH</div>
            {[
              { label: "Flows Live", value: "31", color: GREEN },
              { label: "Deployed", value: "12", color: YELLOW },
            ].map(s => (
              <div key={s.label} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                <div style={{ ...MO, fontSize: 9, color: "#555", letterSpacing: "0.1em" }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>

          {/* Hero */}
          <div style={{ position: "relative", padding: "60px 60px 40px", borderBottom: "1px solid #111", overflow: "hidden" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: YELLOW, boxShadow: `0 0 8px ${YELLOW}80`, animation: "gPulse 2s infinite", display: "block" }} />
                <span style={{ ...MO, fontSize: 11, color: `${YELLOW}99`, letterSpacing: "0.18em" }}>BUILD & AUTOMATION</span>
              </div>
              <h1 style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.06, marginBottom: 10 }}>
                Build & Integrations
              </h1>
              <p style={{ ...MO, fontSize: 11, color: "#555" }}>Email automation · flow builds · integrations · deployment log</p>
            </motion.div>
          </div>

      {/* ── SECTION CONTENT ── */}
      <div style={{ padding: "40px 60px 100px" }}>

        {/* ── ACTIVE BUILDS ── */}
        {activeSection === "builds" && (
          <>
            <Reveal delay={0}>
              <ColourCard rgb={featuredBuild.rgb} hue={featuredBuild.hue} style={{ padding: "32px 36px", borderLeft: `3px solid rgba(${featuredBuild.rgb},0.5)`, cursor: "pointer", marginBottom: 12 }}
                onClick={() => setOpenBuild(featuredBuild)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <StatusDot status={featuredBuild.status} />
                      <span style={{ ...MO, fontSize: 9, color: "#444" }}>FEATURED BUILD · DUE {featuredBuild.due.toUpperCase()}</span>
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 8 }}>{featuredBuild.title}</h2>
                    <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 520 }}>{featuredBuild.description}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 32 }}>
                    <div style={{ fontSize: 52, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{featuredBuild.pct}<span style={{ fontSize: 20, color: featuredBuild.color }}>%</span></div>
                    <div style={{ ...MO, fontSize: 9, color: "#444", marginTop: 4 }}>COMPLETE</div>
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}><ProgressBar pct={featuredBuild.pct} color={featuredBuild.color} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                  {featuredBuild.tasks.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 3, border: `1px solid ${t.done ? featuredBuild.color : "#222"}`, background: t.done ? `rgba(${featuredBuild.rgb},0.15)` : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {t.done && <span style={{ color: featuredBuild.color, fontSize: 9 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 12, color: t.done ? "#888" : "#555", textDecoration: t.done ? "line-through" : "none" }}>{t.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 6 }}>{featuredBuild.tech.map(t => <TechBadge key={t.label} {...t} />)}</div>
              </ColourCard>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {activeBuilds.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.07}>
                  <ColourCard rgb={b.rgb} hue={b.hue} style={{ padding: "22px 24px", borderLeft: `3px solid rgba(${b.rgb},0.5)`, cursor: "pointer" }}
                    onClick={() => setOpenBuild(b)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ marginBottom: 8 }}><StatusDot status={b.status} /></div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#e0e0e8", marginBottom: 4 }}>{b.title}</div>
                        <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{b.note}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{b.pct}<span style={{ fontSize: 11, color: b.color }}>%</span></div>
                        <div style={{ ...MO, fontSize: 8, color: "#444", marginTop: 2 }}>DUE {b.due.toUpperCase()}</div>
                      </div>
                    </div>
                    <div style={{ marginBottom: 14 }}><ProgressBar pct={b.pct} color={b.color} /></div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {b.tech.map(t => <TechBadge key={t} label={t} color="rgba(255,255,255,0.04)" textColor="#555" />)}
                    </div>
                  </ColourCard>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* ── INTEGRATIONS ── */}
        {activeSection === "integrations" && (
          <Reveal delay={0}>
            <GlowCard style={{ padding: "32px 36px" }}>
              <div style={{ ...MO, fontSize: 10, color: GREEN, letterSpacing: "0.18em", marginBottom: 6 }}>INTEGRATIONS</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 28 }}>Stack Status</h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {integrations.map((int, i) => (
                  <div key={int.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderBottom: i < integrations.length - 1 ? "1px solid #111" : "none" }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#d0d0d8", marginBottom: 3 }}>{int.name}</div>
                      <div style={{ ...MO, fontSize: 10, color: "#444" }}>{int.note}</div>
                    </div>
                    <StatusDot status={int.status} />
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        )}

        {/* ── DEPLOYMENTS ── */}
        {activeSection === "deployments" && (
          <Reveal delay={0}>
            <GlowCard style={{ padding: "32px 36px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div>
                  <div style={{ ...MO, fontSize: 10, color: GREEN, letterSpacing: "0.18em", marginBottom: 6 }}>DEPLOYMENT LOG</div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Recent Deploys</h2>
                </div>
                <span style={{ ...MO, fontSize: 10, color: "#444" }}>{recentDeploys.filter(d => d.status === "live").length} SUCCESSFUL</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
                {recentDeploys.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRight: i % 3 < 2 ? "1px solid #111" : "none", borderBottom: i < 3 ? "1px solid #111" : "none" }}>
                    <div style={{ width: 2, height: 36, borderRadius: 2, background: d.color, flexShrink: 0, opacity: 0.6 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#d0d0d8", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.title}</div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ ...MO, fontSize: 9, color: "#444", background: "#111", padding: "1px 7px", borderRadius: 3 }}>{d.env}</span>
                        <span style={{ ...MO, fontSize: 9, color: "#333" }}>{d.time}</span>
                      </div>
                    </div>
                    <StatusDot status={d.status} />
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        )}

      </div>

      {/* ── BUILD MODAL ── */}
        </div>
      </div>
      <AnimatePresence>
        {openBuild && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpenBuild(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", zIndex: 100 }} />
            <div style={{ position: "fixed", inset: 0, zIndex: 101, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", pointerEvents: "none" }}>
              <motion.div initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                style={{ width: "min(660px, 92vw)", maxHeight: "80vh", overflowY: "auto", background: "#111", borderRadius: 18, border: `1px solid rgba(${openBuild.rgb},0.2)`, boxShadow: `0 30px 80px rgba(0,0,0,0.6)`, pointerEvents: "all" }}>
                <div style={{ padding: "28px 32px 20px", borderBottom: "1px solid #1a1a1a", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${openBuild.color}, transparent)` }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                        <StatusDot status={openBuild.status} />
                        <span style={{ ...MO, fontSize: 9, color: "#444" }}>DUE {openBuild.due?.toUpperCase()}</span>
                      </div>
                      <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{openBuild.title}</h2>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, marginLeft: 20 }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{openBuild.pct}<span style={{ fontSize: 14, color: openBuild.color }}>%</span></div>
                      </div>
                      <button onClick={() => setOpenBuild(null)} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid #222", color: "#777", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "24px 32px 32px" }}>
                  <ProgressBar pct={openBuild.pct} color={openBuild.color} />
                  {openBuild.description && <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, margin: "20px 0" }}>{openBuild.description}</p>}
                  {openBuild.tasks && (
                    <>
                      <div style={{ ...MO, fontSize: 10, color: "#444", letterSpacing: "0.12em", marginBottom: 12, marginTop: 4 }}>TASK CHECKLIST</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {openBuild.tasks.map((t, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.06 }}
                            style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < openBuild.tasks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                            <div style={{ width: 16, height: 16, borderRadius: 4, border: `1px solid ${t.done ? openBuild.color : "#222"}`, background: t.done ? `rgba(${openBuild.rgb},0.15)` : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {t.done && <span style={{ color: openBuild.color, fontSize: 10 }}>✓</span>}
                            </div>
                            <span style={{ fontSize: 13, color: t.done ? "#666" : "#bbb", textDecoration: t.done ? "line-through" : "none" }}>{t.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                  {openBuild.note && !openBuild.tasks && (
                    <div style={{ padding: "14px 16px", background: `rgba(${openBuild.rgb},0.04)`, borderRadius: 10, border: `1px solid rgba(${openBuild.rgb},0.12)`, marginTop: 16 }}>
                      <p style={{ fontSize: 13, color: "#888" }}>{openBuild.note}</p>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                    <button style={{ ...MO, flex: 1, padding: "11px 0", borderRadius: 8, background: `rgba(${openBuild.rgb},0.08)`, border: `1px solid rgba(${openBuild.rgb},0.2)`, color: openBuild.color, cursor: "pointer", fontSize: 10, letterSpacing: "0.08em" }}>VIEW IN KLAVIYO</button>
                    <button onClick={() => setOpenBuild(null)} style={{ ...MO, flex: 1, padding: "11px 0", borderRadius: 8, background: "transparent", border: "1px solid #222", color: "#666", cursor: "pointer", fontSize: 10, letterSpacing: "0.08em" }}>CLOSE</button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

