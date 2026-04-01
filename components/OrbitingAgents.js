"use client";
import { useEffect, useState, memo, useCallback } from "react";

const GREEN = "#C4F000";

const AGENTS = [
  // Inner orbit — always-on agents
  { id: "bmo",       orbitRadius: 110, size: 52, speed:  0.4,  phase: 0,                     emoji: "🤖", label: "BMO",               sublabel: "Chief of Staff",  color: GREEN,      glowColor: GREEN },
  { id: "marceline", orbitRadius: 110, size: 48, speed:  0.4,  phase: (2 * Math.PI) / 2,     emoji: "🎸", label: "Marceline",         sublabel: "Sales & BD",      color: "#a855f7",  glowColor: "#a855f7" },
  // Outer orbit
  { id: "pb",        orbitRadius: 195, size: 48, speed: -0.25, phase: 0,                     emoji: "👑", label: "Princess Bubblegum",sublabel: "Research",        color: "#ec4899",  glowColor: "#ec4899" },
  { id: "jake",      orbitRadius: 195, size: 48, speed: -0.25, phase: (2 * Math.PI) / 3,     emoji: "🐕", label: "Jake",              sublabel: "Builder",         color: "#eab308",  glowColor: "#eab308" },
  { id: "finn",      orbitRadius: 195, size: 46, speed: -0.25, phase: (4 * Math.PI) / 3,     emoji: "⚔️", label: "Finn",              sublabel: "Health",          color: "#06b6d4",  glowColor: "#06b6d4" },
];

const OrbitPath = memo(({ radius, color, delay = 0 }) => (
  <div style={{
    position: "absolute", top: "50%", left: "50%",
    width: radius * 2, height: radius * 2,
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    border: `1px solid rgba(196,240,0,0.08)`,
    boxShadow: `0 0 24px rgba(196,240,0,0.04), inset 0 0 24px rgba(196,240,0,0.02)`,
    pointerEvents: "none",
  }} />
));
OrbitPath.displayName = "OrbitPath";

const AgentDot = memo(({ agent, angle, paused, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const x = Math.cos(angle) * agent.orbitRadius;
  const y = Math.sin(angle) * agent.orbitRadius;

  return (
    <div
      style={{
        position: "absolute", top: "50%", left: "50%",
        width: agent.size, height: agent.size,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: hovered ? 20 : 10,
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick && onClick(agent)}
    >
      {/* Outer glow ring */}
      {hovered && (
        <div style={{
          position: "absolute", inset: -8, borderRadius: "50%",
          background: `radial-gradient(circle, ${agent.glowColor}22 0%, transparent 70%)`,
          animation: "pulse 1.5s ease-in-out infinite",
        }} />
      )}

      {/* Dot */}
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%",
        background: hovered ? `rgba(13,13,13,0.95)` : "#111",
        border: `1.5px solid ${hovered ? agent.color : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered
          ? `0 0 20px ${agent.glowColor}55, 0 0 40px ${agent.glowColor}22`
          : "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: agent.size * 0.44,
        transform: hovered ? "scale(1.22)" : "scale(1)",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {agent.emoji}
      </div>

      {/* Label on hover */}
      {hovered && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 10px)", left: "50%",
          transform: "translateX(-50%)",
          background: "#0D0D0D", border: `1px solid ${agent.color}40`,
          borderRadius: 6, padding: "5px 10px",
          whiteSpace: "nowrap", pointerEvents: "none",
          fontFamily: "'Inter', sans-serif",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{agent.label}</div>
          <div style={{ fontSize: 9, color: "#555", fontFamily: "'Space Mono', monospace", marginTop: 1, letterSpacing: "0.06em" }}>{agent.sublabel}</div>
        </div>
      )}
    </div>
  );
});
AgentDot.displayName = "AgentDot";

export default function OrbitingAgents({ onAgentClick }) {
  const [t, setT] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    let raf, last = performance.now();
    const tick = (now) => {
      setT(p => p + (now - last) / 1000);
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <div
      style={{ position: "relative", width: "100%", aspectRatio: "1/1", maxWidth: 480, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`@keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}`}</style>

      {/* Orbit paths */}
      <OrbitPath radius={110} />
      <OrbitPath radius={195} />

      {/* Centre — Sammy's AI OS core */}
      <div style={{
        width: 72, height: 72, borderRadius: "50%", zIndex: 5,
        background: "#0D0D0D",
        border: `1.5px solid rgba(196,240,0,0.25)`,
        boxShadow: `0 0 32px rgba(196,240,0,0.15), 0 0 64px rgba(196,240,0,0.06)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 1,
      }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: 14, color: "#0D0D0D", lineHeight: 1 }}>S</span>
        </div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 6, color: "rgba(196,240,0,0.5)", letterSpacing: "0.1em" }}>AI OS</span>
      </div>

      {/* Agents */}
      {AGENTS.map((ag) => {
        const angle = t * ag.speed + ag.phase;
        return (
          <AgentDot
            key={ag.id}
            agent={ag}
            angle={angle}
            paused={paused}
            onClick={onAgentClick}
          />
        );
      })}
    </div>
  );
}
