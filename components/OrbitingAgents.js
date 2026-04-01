"use client";
import { useEffect, useState, memo, useCallback } from "react";

const GREEN = "#C4F000";

// BMO is centre — 4 agents orbit around it
const AGENTS = [
  // Inner orbit
  { id: "marceline", orbitRadius: 110, size: 48, speed:  0.4,  phase: 0,                    emoji: "🎸", label: "Marceline",          sublabel: "Sales & BD",  color: "#a855f7", glowColor: "#a855f7" },
  { id: "finn",      orbitRadius: 110, size: 46, speed:  0.4,  phase: Math.PI,              emoji: "⚔️", label: "Finn",               sublabel: "Health",      color: "#06b6d4", glowColor: "#06b6d4" },
  // Outer orbit
  { id: "pb",        orbitRadius: 195, size: 48, speed: -0.25, phase: Math.PI / 6,          emoji: "👑", label: "Princess Bubblegum", sublabel: "Research",    color: "#ec4899", glowColor: "#ec4899" },
  { id: "jake",      orbitRadius: 195, size: 48, speed: -0.25, phase: Math.PI / 6 + Math.PI,emoji: "🐕", label: "Jake",               sublabel: "Builder",     color: "#eab308", glowColor: "#eab308" },
];

const OrbitPath = memo(({ radius, color, delay = 0 }) => (
  <div style={{
    position: "absolute", top: "50%", left: "50%",
    width: radius * 2, height: radius * 2,
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    border: `1px solid rgba(196,240,0,0.07)`,
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
      {/* Dot */}
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%",
        background: hovered ? "#161616" : "#111",
        border: `1.5px solid ${hovered ? agent.color : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: agent.size * 0.44,
        transform: hovered ? "scale(1.18)" : "scale(1)",
        transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
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

      {/* Centre — BMO, Chief of Staff */}
      <div style={{
        width: 80, height: 80, borderRadius: "50%", zIndex: 5,
        background: "#111",
        border: `1.5px solid rgba(196,240,0,0.2)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 2,
        cursor: "pointer",
      }}>
        <span style={{ fontSize: 34, lineHeight: 1 }}>🤖</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 6, color: "rgba(196,240,0,0.55)", letterSpacing: "0.12em" }}>BMO</span>
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
