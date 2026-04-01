"use client";
import { useRef } from "react";
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

const integrations = [
  { name: "Klaviyo", icon: "📧", status: "connected", detail: "7 active flows", color: "#10b981", rgb: "16,185,129" },
  { name: "n8n", icon: "⚙️", status: "active", detail: "12 workflows", color: "#10b981", rgb: "16,185,129" },
  { name: "Shopify", icon: "🛒", status: "connected", detail: "3 stores", color: "#10b981", rgb: "16,185,129" },
  { name: "Postscript", icon: "📱", status: "connected", detail: "SMS flows live", color: "#10b981", rgb: "16,185,129" },
  { name: "Attentive", icon: "💬", status: "connected", detail: "2 clients", color: "#10b981", rgb: "16,185,129" },
  { name: "Gorgias", icon: "🎧", status: "warning", detail: "Auth expiring soon", color: "#f59e0b", rgb: "245,158,11" },
  { name: "Recharge", icon: "🔄", status: "connected", detail: "Subscriptions OK", color: "#10b981", rgb: "16,185,129" },
  { name: "Yotpo", icon: "⭐", status: "inactive", detail: "Not configured", color: "#475569", rgb: "71,85,105" },
];

const workflows = [
  { name: "Lead → CRM Sync", trigger: "Typeform webhook", last: "2 min ago", status: "active" },
  { name: "Klaviyo Tag → HubSpot Deal", trigger: "Klaviyo event", last: "14 min ago", status: "active" },
  { name: "Weekly Client Report", trigger: "Mon 8am cron", last: "3 days ago", status: "active" },
  { name: "BMO Draft → Approval Queue", trigger: "BMO agent output", last: "1 hour ago", status: "active" },
  { name: "MoonBrew Churn Alert", trigger: "Segment change", last: "Yesterday", status: "paused" },
  { name: "New Client Onboarding", trigger: "CRM deal closed", last: "Apr 28", status: "active" },
];

const deployments = [
  { desc: "MoonBrew abandoned cart flow v3", env: "Klaviyo", date: "Today 09:31", ok: true },
  { desc: "Weekly metrics dashboard", env: "Vercel", date: "Today 11:15", ok: true },
  { desc: "Centr Fitness welcome series", env: "Klaviyo", date: "Yesterday", ok: true },
  { desc: "CRM webhook patch — Gorgias", env: "n8n", date: "Mar 31", ok: false },
];

const apiHealth = [
  { name: "Klaviyo API", ms: "142ms", status: "healthy" },
  { name: "Shopify Admin API", ms: "218ms", status: "healthy" },
  { name: "Postscript API", ms: "89ms", status: "healthy" },
  { name: "Gorgias API", ms: "—", status: "error" },
  { name: "HubSpot API", ms: "305ms", status: "degraded" },
];

export default function BuildPage() {
  return (
    <div style={{ ...IN, background: "#0D0D0D", minHeight: "100vh", color: "#fff" }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.016, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} /><Nav />

      {/* Hero */}
      <div style={{ paddingTop: 54, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "70px 60px 0" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🐕</span>
              <span style={{ ...mo, fontSize: 11, color: "rgba(234,179,8,0.7)", letterSpacing: "0.18em" }}>JAKE — BUILDER</span>
            </div>
            <h1 style={{ ...IN, fontSize: "clamp(2.2rem, 4vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 6 }}>Build & Integrations</h1>
            <p style={{ ...mo, fontSize: 11, color: "#777" }}>Klaviyo flows · n8n automation · integrations · API health</p>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "56px 60px 100px", position: "relative", zIndex: 1 }}>

        {/* Integration Grid */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ ...mo, fontSize: 11, color: "#eab308" }}>✦</span>
            <span style={{ ...mo, fontSize: 10, color: "#777", letterSpacing: "0.15em" }}>INTEGRATION STATUS</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 48 }}>
            {integrations.map((int) => (
              <GlowCard key={int.name} style={{ padding: "16px 18px", borderTop: `1px solid rgba(${int.rgb},0.2)` }}>
                {/* Subtle top back-light */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60, background: `linear-gradient(180deg, rgba(${int.rgb},0.04) 0%, transparent 100%)`, borderRadius: "14px 14px 0 0", pointerEvents: "none" }} />
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 18 }}>{int.icon}</span>
                    <span style={{ ...IN, fontSize: 13, fontWeight: 600, color: "#ccc" }}>{int.name}</span>
                  </div>
                  <div style={{ ...mo, fontSize: 11, color: "#777", marginBottom: 6 }}>{int.detail}</div>
                  <span style={{ ...mo, fontSize: 10, fontWeight: 700, color: int.color, background: `rgba(${int.rgb},0.08)`, padding: "2px 7px", borderRadius: 3 }}>{int.status.toUpperCase()}</span>
                </div>
              </GlowCard>
            ))}
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Workflows */}
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ ...mo, fontSize: 11, color: "#eab308" }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#777", letterSpacing: "0.15em" }}>N8N WORKFLOWS</span>
              </div>
            </Reveal>
            <GlowCard style={{ padding: "22px 24px" }}>
              {workflows.map((w, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: i < workflows.length - 1 ? 14 : 0, marginBottom: i < workflows.length - 1 ? 14 : 0, borderBottom: i < workflows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", borderLeft: `2px solid ${w.status === "active" ? "#10b981" : "#f59e0b"}`, paddingLeft: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ ...IN, fontSize: 12, fontWeight: 600, color: "#ccc", marginBottom: 2 }}>{w.name}</div>
                    <div style={{ ...mo, fontSize: 11, color: "#777" }}>{w.trigger}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ ...mo, fontSize: 11, color: "#777", marginBottom: 2 }}>{w.last}</div>
                    <span style={{ ...mo, fontSize: 10, color: w.status === "active" ? "#10b981" : "#f59e0b" }}>{w.status.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </GlowCard>
          </div>

          {/* Deployments + API Health */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...mo, fontSize: 11, color: "#eab308" }}>✦</span>
                  <span style={{ ...mo, fontSize: 10, color: "#777", letterSpacing: "0.15em" }}>RECENT DEPLOYMENTS</span>
                </div>
              </Reveal>
              <GlowCard style={{ padding: "20px 22px" }}>
                {deployments.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: i < deployments.length - 1 ? 12 : 0, marginBottom: i < deployments.length - 1 ? 12 : 0, borderBottom: i < deployments.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: d.ok ? "#10b981" : "#ef4444", boxShadow: `0 0 6px ${d.ok ? "rgba(16,185,129,0.5)" : "rgba(239,68,68,0.5)"}` }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 1 }}>{d.desc}</div>
                      <div style={{ ...mo, fontSize: 11, color: "#777" }}>{d.env} · {d.date}</div>
                    </div>
                  </div>
                ))}
              </GlowCard>
            </div>

            <div>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...mo, fontSize: 11, color: "#eab308" }}>✦</span>
                  <span style={{ ...mo, fontSize: 10, color: "#777", letterSpacing: "0.15em" }}>API HEALTH</span>
                </div>
              </Reveal>
              <GlowCard style={{ padding: "20px 22px" }}>
                {apiHealth.map((api, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: i < apiHealth.length - 1 ? 10 : 0, marginBottom: i < apiHealth.length - 1 ? 10 : 0, borderBottom: i < apiHealth.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, background: api.status === "healthy" ? "#10b981" : api.status === "degraded" ? "#f59e0b" : "#ef4444" }} />
                    <span style={{ fontSize: 12, color: "#888", flex: 1 }}>{api.name}</span>
                    <span style={{ ...mo, fontSize: 10, color: "#777" }}>{api.ms}</span>
                    <span style={{ ...mo, fontSize: 10, color: api.status === "healthy" ? "#10b981" : api.status === "degraded" ? "#f59e0b" : "#ef4444" }}>{api.status.toUpperCase()}</span>
                  </div>
                ))}
              </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







