"use client";
import { useState } from "react";
import Nav from "../../components/Nav";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const COLOR = "234,179,8";
const HEX = "#eab308";

function glowCard(rgb, h) {
  return {
    background: "rgba(6,10,18,0.97)",
    border: `1px solid rgba(${rgb},${h ? 0.35 : 0.14})`,
    boxShadow: h ? `0 0 28px rgba(${rgb},0.2), 0 12px 32px rgba(0,0,0,0.45)` : `0 0 14px rgba(${rgb},0.07), 0 8px 24px rgba(0,0,0,0.4)`,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  };
}

const integrations = [
  { name: "Klaviyo", icon: "📧", status: "connected", detail: "7 active flows", color: "#10b981", rgb: "16,185,129" },
  { name: "n8n", icon: "⚙️", status: "active", detail: "12 workflows", color: "#10b981", rgb: "16,185,129" },
  { name: "Shopify", icon: "🛒", status: "connected", detail: "3 stores", color: "#10b981", rgb: "16,185,129" },
  { name: "Postscript", icon: "📱", status: "connected", detail: "SMS flows live", color: "#10b981", rgb: "16,185,129" },
  { name: "Attentive", icon: "💬", status: "connected", detail: "2 clients", color: "#10b981", rgb: "16,185,129" },
  { name: "Gorgias", icon: "🎧", status: "warning", detail: "Auth expiring", color: "#f59e0b", rgb: "245,158,11" },
  { name: "Recharge", icon: "🔄", status: "connected", detail: "Subscriptions OK", color: "#10b981", rgb: "16,185,129" },
  { name: "Yotpo", icon: "⭐", status: "inactive", detail: "Not configured", color: "#475569", rgb: "71,85,105" },
];

const workflows = [
  { name: "Lead → CRM Sync", trigger: "Typeform webhook", last: "2 min ago", status: "active" },
  { name: "Klaviyo Tag → HubSpot Deal", trigger: "Klaviyo event", last: "14 min ago", status: "active" },
  { name: "Weekly Client Report", trigger: "Mon 8am", last: "3 days ago", status: "active" },
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
  { name: "Klaviyo API", ms: "142ms", ok: "healthy" },
  { name: "Shopify Admin API", ms: "218ms", ok: "healthy" },
  { name: "Postscript API", ms: "89ms", ok: "healthy" },
  { name: "Gorgias API", ms: "—", ok: "error" },
  { name: "HubSpot API", ms: "305ms", ok: "degraded" },
];

export default function BuildPage() {
  const [hovInt, setHovInt] = useState(null);

  return (
    <div style={{ background: "#080B12", minHeight: "100vh", color: "#E8E8F0", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.015, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />
      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "50%", height: "70%", borderRadius: "50%", background: `radial-gradient(circle, rgba(${COLOR},0.04) 0%, transparent 55%)`, filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <Nav />

      <div style={{ paddingTop: 54, maxWidth: 1440, margin: "0 auto", padding: "108px 60px 0", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>🐕</span>
          <span style={{ ...mo, fontSize: 9, color: HEX, letterSpacing: "0.15em" }}>JAKE — BUILDER</span>
        </div>
        <h1 style={{ ...jk, fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>Build & Integrations</h1>
        <p style={{ ...mo, fontSize: 11, color: "#445", marginBottom: 32 }}>Klaviyo flows, n8n automation, integrations and API health</p>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 60px 80px", position: "relative", zIndex: 1 }}>

        {/* Integration Grid */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
            <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>INTEGRATION STATUS</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {integrations.map((int, i) => (
              <div key={int.name}
                onMouseEnter={() => setHovInt(i)}
                onMouseLeave={() => setHovInt(null)}
                style={{
                  ...glowCard(int.rgb, hovInt === i),
                  borderRadius: 10, padding: "14px 16px", borderTop: `2px solid rgba(${int.rgb},0.5)`,
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{int.icon}</span>
                  <span style={{ ...jk, fontSize: 13, fontWeight: 600, color: "#C8CDD8" }}>{int.name}</span>
                </div>
                <div style={{ ...mo, fontSize: 9, color: "#445", marginBottom: 5 }}>{int.detail}</div>
                <span style={{ ...mo, fontSize: 8, fontWeight: 700, color: int.color, background: `rgba(${int.rgb},0.1)`, padding: "2px 6px", borderRadius: 3 }}>{int.status.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Workflows */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
              <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>N8N WORKFLOWS</span>
            </div>
            {workflows.map((w, i) => (
              <div key={i} style={{
                ...glowCard(w.status === "active" ? "16,185,129" : "245,158,11", false),
                borderRadius: 8, padding: "12px 16px", marginBottom: 6,
                display: "flex", alignItems: "center", gap: 12,
                borderLeft: `3px solid ${w.status === "active" ? "#10b981" : "#f59e0b"}`,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ ...jk, fontSize: 12, fontWeight: 600, color: "#C8CDD8", marginBottom: 2 }}>{w.name}</div>
                  <div style={{ ...mo, fontSize: 9, color: "#445" }}>{w.trigger}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ ...mo, fontSize: 9, color: "#334", marginBottom: 2 }}>{w.last}</div>
                  <span style={{ ...mo, fontSize: 8, color: w.status === "active" ? "#10b981" : "#f59e0b" }}>{w.status.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Deployments + API Health */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>RECENT DEPLOYMENTS</span>
              </div>
              {deployments.map((d, i) => (
                <div key={i} style={{
                  ...glowCard(d.ok ? "16,185,129" : "239,68,68", false),
                  borderRadius: 8, padding: "10px 14px", marginBottom: 6,
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: d.ok ? "#10b981" : "#ef4444", boxShadow: `0 0 6px ${d.ok ? "rgba(16,185,129,0.5)" : "rgba(239,68,68,0.5)"}` }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: "#C8CDD8", marginBottom: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.desc}</div>
                    <div style={{ ...mo, fontSize: 9, color: "#445" }}>{d.env} · {d.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ ...mo, fontSize: 9, color: HEX }}>✦</span>
                <span style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.12em" }}>API HEALTH</span>
              </div>
              {apiHealth.map((api, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 14px", background: "rgba(6,10,18,0.7)",
                  borderRadius: 6, marginBottom: 4, border: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, background: api.ok === "healthy" ? "#10b981" : api.ok === "degraded" ? "#f59e0b" : "#ef4444" }} />
                  <span style={{ fontSize: 12, color: "#778", flex: 1 }}>{api.name}</span>
                  <span style={{ ...mo, fontSize: 10, color: "#445" }}>{api.ms}</span>
                  <span style={{ ...mo, fontSize: 8, color: api.ok === "healthy" ? "#10b981" : api.ok === "degraded" ? "#f59e0b" : "#ef4444" }}>{api.ok.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
