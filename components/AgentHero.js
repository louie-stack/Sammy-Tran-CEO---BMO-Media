"use client";
import { useState } from "react";

/**
 * AgentHero — square PFP with corner brackets + large agent name.
 * For full hero sections (build, health pages).
 */
export default function AgentHero({ name, pfp, accent = "#C4F000", size = 110 }) {
  const [loaded, setLoaded] = useState(false);
  const arm = Math.round(size * 0.2);
  const sw = 2;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28 }}>

      {/* Square PFP */}
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <div style={{
          position: "absolute", inset: -14, borderRadius: 20,
          background: `radial-gradient(circle at 50% 50%, ${accent}1A, transparent 68%)`,
          filter: "blur(12px)", pointerEvents: "none", zIndex: 0,
        }} />
        <img src={pfp} alt={name} onLoad={() => setLoaded(true)}
          style={{
            position: "relative", zIndex: 1, width: "100%", height: "100%",
            objectFit: "cover", borderRadius: 10, display: "block",
            opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease",
            filter: "saturate(1.08) contrast(1.03)",
          }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, borderRadius: 10,
          background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.055) 3px,rgba(0,0,0,0.055) 4px)",
          pointerEvents: "none",
        }} />

        {/* TOP-LEFT */}
        <svg style={{ position: "absolute", top: -3, left: -3, zIndex: 3, pointerEvents: "none" }}
          width={arm + 4} height={arm + 4} viewBox={`0 0 ${arm + 4} ${arm + 4}`}>
          <polyline points={`${arm + 4},${sw / 2} ${sw / 2},${sw / 2} ${sw / 2},${arm + 4}`}
            fill="none" stroke={accent} strokeWidth={sw} strokeLinecap="square" />
        </svg>
        {/* TOP-RIGHT */}
        <svg style={{ position: "absolute", top: -3, right: -3, zIndex: 3, pointerEvents: "none" }}
          width={arm + 4} height={arm + 4} viewBox={`0 0 ${arm + 4} ${arm + 4}`}>
          <polyline points={`0,${sw / 2} ${arm + 4 - sw / 2},${sw / 2} ${arm + 4 - sw / 2},${arm + 4}`}
            fill="none" stroke={accent} strokeWidth={sw} strokeLinecap="square" />
        </svg>
        {/* BOTTOM-LEFT */}
        <svg style={{ position: "absolute", bottom: -3, left: -3, zIndex: 3, pointerEvents: "none" }}
          width={arm + 4} height={arm + 4} viewBox={`0 0 ${arm + 4} ${arm + 4}`}>
          <polyline points={`${sw / 2},0 ${sw / 2},${arm + 4 - sw / 2} ${arm + 4},${arm + 4 - sw / 2}`}
            fill="none" stroke={accent} strokeWidth={sw} strokeLinecap="square" opacity="0.5" />
        </svg>
        {/* BOTTOM-RIGHT */}
        <svg style={{ position: "absolute", bottom: -3, right: -3, zIndex: 3, pointerEvents: "none" }}
          width={arm + 4} height={arm + 4} viewBox={`0 0 ${arm + 4} ${arm + 4}`}>
          <polyline points={`0,${arm + 4 - sw / 2} ${arm + 4 - sw / 2},${arm + 4 - sw / 2} ${arm + 4 - sw / 2},0`}
            fill="none" stroke={accent} strokeWidth={sw} strokeLinecap="square" opacity="0.5" />
        </svg>
      </div>

      {/* Name */}
      <div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1,
          color: "#F5F5F5",
        }}>
          {name}
        </div>
        <div style={{
          marginTop: 10, height: 2, width: "100%", borderRadius: 1,
          background: `linear-gradient(90deg, ${accent}, ${accent}30, transparent)`,
        }} />
      </div>
    </div>
  );
}
