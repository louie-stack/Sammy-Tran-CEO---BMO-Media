"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const IN = { fontFamily: "'Inter', sans-serif" };
const MO = { fontFamily: "'Space Mono', monospace" };
const GREEN = "#C4F000";

const links = [
  { href: "/", label: "Command Centre" },
  { href: "/agents", label: "Agents" },
  { href: "/sales", label: "Sales & BD" },
  { href: "/research", label: "Research" },
  { href: "/build", label: "Build" },
  { href: "/health", label: "Health" },
];

export default function Nav() {
  const pathname = usePathname();
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 54,
      background: "rgba(13,13,13,0.9)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid #1a1a1a",
      display: "flex", alignItems: "center",
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", width: "100%", padding: "0 60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...IN, fontWeight: 900, fontSize: 13, color: "#0D0D0D", lineHeight: 1 }}>S</span>
          </div>
          <span style={{ ...IN, fontWeight: 700, fontSize: 14, color: "#fff", letterSpacing: "-0.01em" }}>BMO Media</span>
          <span style={{ ...MO, fontSize: 8, color: "#444", marginLeft: 2 }}>AI OS</span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} style={{
                ...IN, fontSize: 13, fontWeight: active ? 600 : 400,
                color: active ? "#fff" : "#555",
                textDecoration: "none", padding: "0 14px", height: 54, display: "flex", alignItems: "center",
                borderBottom: active ? `2px solid ${GREEN}` : "2px solid transparent",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#aaa"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#555"; }}
              >{l.label}</Link>
            );
          })}
        </div>

        {/* Right */}
        <div style={{ ...MO, fontSize: 10, color: GREEN, letterSpacing: "0.08em" }}>{time}</div>
      </div>
    </nav>
  );
}
