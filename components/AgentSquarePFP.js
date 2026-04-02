"use client";
import { useState } from "react";

/**
 * AgentSquarePFP — just the square image + corner brackets.
 * Used in sidebar agent headers where name text is handled separately.
 */
export default function AgentSquarePFP({ src, size = 52, accent = "#C4F000", radius = 7 }) {
  const [loaded, setLoaded] = useState(false);
  const arm = Math.round(size * 0.32); // bracket arm length scales with size
  const sw = 1.8;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: -8, borderRadius: radius + 8,
        background: `radial-gradient(circle at 50% 50%, ${accent}22, transparent 68%)`,
        filter: "blur(8px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* Image */}
      <img
        src={src}
        alt=""
        onLoad={() => setLoaded(true)}
        style={{
          position: "relative", zIndex: 1,
          width: "100%", height: "100%",
          objectFit: "cover",
          borderRadius: radius,
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
          filter: "saturate(1.08) contrast(1.03)",
        }}
      />

      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, borderRadius: radius,
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 3px)",
        pointerEvents: "none",
      }} />

      {/* TOP-LEFT bracket */}
      <svg style={{ position: "absolute", top: -2, left: -2, zIndex: 3, pointerEvents: "none" }}
        width={arm + 3} height={arm + 3} viewBox={`0 0 ${arm + 3} ${arm + 3}`}>
        <polyline points={`${arm + 3},${sw / 2} ${sw / 2},${sw / 2} ${sw / 2},${arm + 3}`}
          fill="none" stroke={accent} strokeWidth={sw} strokeLinecap="square" />
      </svg>

      {/* TOP-RIGHT bracket */}
      <svg style={{ position: "absolute", top: -2, right: -2, zIndex: 3, pointerEvents: "none" }}
        width={arm + 3} height={arm + 3} viewBox={`0 0 ${arm + 3} ${arm + 3}`}>
        <polyline points={`0,${sw / 2} ${arm + 3 - sw / 2},${sw / 2} ${arm + 3 - sw / 2},${arm + 3}`}
          fill="none" stroke={accent} strokeWidth={sw} strokeLinecap="square" />
      </svg>

      {/* BOTTOM-LEFT bracket */}
      <svg style={{ position: "absolute", bottom: -2, left: -2, zIndex: 3, pointerEvents: "none" }}
        width={arm + 3} height={arm + 3} viewBox={`0 0 ${arm + 3} ${arm + 3}`}>
        <polyline points={`${sw / 2},0 ${sw / 2},${arm + 3 - sw / 2} ${arm + 3},${arm + 3 - sw / 2}`}
          fill="none" stroke={accent} strokeWidth={sw} strokeLinecap="square" opacity="0.5" />
      </svg>

      {/* BOTTOM-RIGHT bracket */}
      <svg style={{ position: "absolute", bottom: -2, right: -2, zIndex: 3, pointerEvents: "none" }}
        width={arm + 3} height={arm + 3} viewBox={`0 0 ${arm + 3} ${arm + 3}`}>
        <polyline points={`0,${arm + 3 - sw / 2} ${arm + 3 - sw / 2},${arm + 3 - sw / 2} ${arm + 3 - sw / 2},0`}
          fill="none" stroke={accent} strokeWidth={sw} strokeLinecap="square" opacity="0.5" />
      </svg>
    </div>
  );
}
