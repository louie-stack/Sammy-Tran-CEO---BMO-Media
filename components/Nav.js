"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Command Centre", href: "/", icon: "⚡" },
  { label: "Agents", href: "/agents", icon: "🤖" },
  { label: "Sales & BD", href: "/sales", icon: "🎸" },
  { label: "Research & Strategy", href: "/research", icon: "👑" },
  { label: "Build", href: "/build", icon: "🐕" },
  { label: "Health & Wellness", href: "/health", icon: "⚔️" },
];

const agentStatuses = [
  { name: "BMO", color: "#3b82f6", status: "active" },
  { name: "Marceline", color: "#a855f7", status: "active" },
  { name: "PB", color: "#ec4899", status: "standby" },
  { name: "Jake", color: "#eab308", status: "active" },
  { name: "Finn", color: "#06b6d4", status: "standby" },
];

export default function Nav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      style={{
        width: collapsed ? "64px" : "240px",
        minHeight: "100vh",
        background: "rgba(10,13,20,0.95)",
        borderRight: "1px solid rgba(59,130,246,0.12)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
        transition: "width 0.3s cubic-bezier(0.16,1,0.3,1)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "700", color: "#fff", flexShrink: 0,
            boxShadow: "0 0 12px rgba(59,130,246,0.4)"
          }}>B</div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#e2e8f0", letterSpacing: "0.05em" }}>BMO MEDIA</div>
              <div style={{ fontSize: "10px", color: "#3b82f6", letterSpacing: "0.1em", fontFamily: "monospace" }}>AI OS v1.0</div>
            </div>
          )}
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ flex: 1, padding: "12px 8px" }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="nav-link" style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 10px", borderRadius: "8px", marginBottom: "2px",
              color: active ? "#3b82f6" : "#94a3b8",
              background: active ? "rgba(59,130,246,0.1)" : "transparent",
              border: active ? "1px solid rgba(59,130,246,0.2)" : "1px solid transparent",
              textDecoration: "none", fontSize: "13px", fontWeight: active ? "600" : "400",
              transition: "all 0.2s",
            }}>
              <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>}
              {!collapsed && active && (
                <div style={{ marginLeft: "auto", width: "4px", height: "4px", borderRadius: "50%", background: "#3b82f6" }} />
              )}
            </Link>
          );
        })}
      </div>

      {/* Agent Status */}
      {!collapsed && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(59,130,246,0.08)" }}>
          <div style={{ fontSize: "10px", color: "#475569", letterSpacing: "0.1em", marginBottom: "8px", fontFamily: "monospace" }}>AGENTS ONLINE</div>
          {agentStatuses.map((a) => (
            <div key={a.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
              <div className="status-dot" style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: a.status === "active" ? "#10b981" : "#f59e0b",
                boxShadow: `0 0 6px ${a.status === "active" ? "#10b981" : "#f59e0b"}`,
              }} />
              <span style={{ fontSize: "11px", color: "#64748b" }}>{a.name}</span>
              <span style={{ marginLeft: "auto", fontSize: "9px", color: a.status === "active" ? "#10b981" : "#f59e0b", fontFamily: "monospace" }}>
                {a.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Collapse toggle */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          padding: "12px 16px", borderTop: "1px solid rgba(59,130,246,0.08)",
          cursor: "pointer", fontSize: "11px", color: "#475569",
          display: "flex", alignItems: "center", gap: "6px",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
        onMouseLeave={(e) => e.currentTarget.style.color = "#475569"}
      >
        <span>{collapsed ? "→" : "←"}</span>
        {!collapsed && <span>Collapse</span>}
      </div>
    </nav>
  );
}
