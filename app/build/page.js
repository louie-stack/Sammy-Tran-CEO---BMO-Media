"use client";

const integrations = [
  { name: "Klaviyo", icon: "📧", status: "connected", detail: "7 active flows", color: "#10b981" },
  { name: "n8n", icon: "⚙️", status: "active", detail: "12 workflows running", color: "#10b981" },
  { name: "Shopify", icon: "🛒", status: "connected", detail: "3 stores synced", color: "#10b981" },
  { name: "Postscript", icon: "📱", status: "connected", detail: "SMS flows active", color: "#10b981" },
  { name: "Attentive", icon: "💬", status: "connected", detail: "2 clients", color: "#10b981" },
  { name: "Gorgias", icon: "🎧", status: "warning", detail: "Auth token expiring", color: "#f59e0b" },
  { name: "Recharge", icon: "🔄", status: "connected", detail: "Subscriptions sync OK", color: "#10b981" },
  { name: "Yotpo", icon: "⭐", status: "inactive", detail: "Not configured", color: "#475569" },
];

const workflows = [
  { name: "Lead to CRM Sync", trigger: "Typeform webhook", lastRun: "2 min ago", status: "active" },
  { name: "Klaviyo Tag → Hubspot Deal", trigger: "Klaviyo event", lastRun: "14 min ago", status: "active" },
  { name: "Weekly Client Report", trigger: "Every Monday 8am", lastRun: "3 days ago", status: "active" },
  { name: "BMO Email Draft → Approval Queue", trigger: "BMO agent output", lastRun: "1 hour ago", status: "active" },
  { name: "MoonBrew Churn Alert", trigger: "Klaviyo segment change", lastRun: "Yesterday", status: "paused" },
  { name: "New Client Onboarding Sequence", trigger: "CRM deal closed", lastRun: "Apr 28", status: "active" },
];

const deployments = [
  { desc: "MoonBrew abandoned cart flow v3", env: "Production", date: "Today 09:31", status: "success" },
  { desc: "Weekly metrics dashboard refresh", env: "Vercel", date: "Today 11:15", status: "success" },
  { desc: "Centr Fitness welcome series update", env: "Klaviyo", date: "Yesterday", status: "success" },
  { desc: "CRM webhook patch — Gorgias token", env: "n8n", date: "Mar 31", status: "failed" },
];

const apiHealth = [
  { name: "Klaviyo API", latency: "142ms", status: "healthy" },
  { name: "Shopify Admin API", latency: "218ms", status: "healthy" },
  { name: "Postscript API", latency: "89ms", status: "healthy" },
  { name: "Gorgias API", latency: "—", status: "error" },
  { name: "HubSpot API", latency: "305ms", status: "degraded" },
];

export default function BuildPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "32px" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "20px" }}>🐕</span>
            <div style={{ fontSize: "11px", color: "#eab308", letterSpacing: "0.2em", fontFamily: "monospace" }}>JAKE — BUILDER</div>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#f1f5f9" }}>Build & Integrations</h1>
        </div>

        {/* Integration Grid */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>INTEGRATION STATUS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
            {integrations.map((int) => (
              <div key={int.name} className="card-hover" style={{
                background: "rgba(15,21,32,0.85)", border: `1px solid ${int.color}20`,
                borderRadius: "10px", padding: "14px 16px", backdropFilter: "blur(8px)",
                borderTop: `2px solid ${int.color}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "18px" }}>{int.icon}</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#e2e8f0" }}>{int.name}</span>
                </div>
                <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "4px" }}>{int.detail}</div>
                <span style={{
                  fontSize: "9px", fontFamily: "monospace", fontWeight: "700",
                  color: int.color, background: `${int.color}15`, padding: "2px 6px", borderRadius: "4px",
                }}>{int.status.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* n8n Workflows */}
          <div>
            <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>N8N WORKFLOWS</div>
            {workflows.map((w, i) => (
              <div key={i} className="card-hover" style={{
                background: "rgba(15,21,32,0.85)", border: "1px solid rgba(59,130,246,0.08)",
                borderRadius: "8px", padding: "12px 14px", backdropFilter: "blur(8px)",
                marginBottom: "6px", display: "flex", alignItems: "center", gap: "12px",
                borderLeft: `3px solid ${w.status === "active" ? "#10b981" : "#f59e0b"}`,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", color: "#e2e8f0", marginBottom: "2px" }}>{w.name}</div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>{w.trigger}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "10px", color: "#475569", fontFamily: "monospace", marginBottom: "2px" }}>{w.lastRun}</div>
                  <span style={{
                    fontSize: "9px", fontFamily: "monospace",
                    color: w.status === "active" ? "#10b981" : "#f59e0b",
                  }}>{w.status.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Deployments + API Health */}
          <div>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>RECENT DEPLOYMENTS</div>
              {deployments.map((d, i) => (
                <div key={i} style={{
                  background: "rgba(15,21,32,0.85)", border: "1px solid rgba(59,130,246,0.08)",
                  borderRadius: "8px", padding: "10px 14px", marginBottom: "6px",
                  display: "flex", alignItems: "center", gap: "12px",
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
                    background: d.status === "success" ? "#10b981" : "#ef4444",
                    boxShadow: `0 0 6px ${d.status === "success" ? "#10b981" : "#ef4444"}`,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "12px", color: "#e2e8f0", marginBottom: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.desc}</div>
                    <div style={{ fontSize: "10px", color: "#64748b" }}>{d.env} · {d.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "12px" }}>API HEALTH</div>
              {apiHealth.map((api, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "8px 14px", background: "rgba(15,21,32,0.7)",
                  borderRadius: "6px", marginBottom: "4px",
                  border: "1px solid rgba(59,130,246,0.06)",
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
                    background: api.status === "healthy" ? "#10b981" : api.status === "degraded" ? "#f59e0b" : "#ef4444",
                  }} />
                  <span style={{ fontSize: "12px", color: "#94a3b8", flex: 1 }}>{api.name}</span>
                  <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#475569" }}>{api.latency}</span>
                  <span style={{
                    fontSize: "9px", fontFamily: "monospace",
                    color: api.status === "healthy" ? "#10b981" : api.status === "degraded" ? "#f59e0b" : "#ef4444",
                  }}>{api.status.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
