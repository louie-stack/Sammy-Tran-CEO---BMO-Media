"use client";

// Adventure Time subtle background pattern
// Fixed SVG overlay — tiny stars, gems, swirls at near-invisible opacity
// No backgrounds, no canvas, no motion — pure decorative texture

export default function OooPattern() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.045,
      }}
    >
      <defs>
        {/* Repeating tile: 160x160px with stars, a gem, and a swirl */}
        <pattern id="ooo" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">

          {/* ── Four-pointed star — top left ── */}
          <path d="M20,8 L21.8,14.2 L28,16 L21.8,17.8 L20,24 L18.2,17.8 L12,16 L18.2,14.2 Z"
            fill="white" />

          {/* ── Small four-pointed star ── */}
          <path d="M90,30 L91,33.5 L94.5,34.5 L91,35.5 L90,39 L89,35.5 L85.5,34.5 L89,33.5 Z"
            fill="white" />

          {/* ── Gem / diamond ── */}
          <path d="M140,18 L147,22 L144,30 L140,33 L136,30 L133,22 Z"
            fill="none" stroke="white" strokeWidth="1.2" />

          {/* ── Tiny dot cluster ── */}
          <circle cx="60" cy="12" r="1.2" fill="white" />
          <circle cx="64" cy="16" r="0.8" fill="white" />
          <circle cx="57" cy="18" r="0.9" fill="white" />

          {/* ── Swirl ── */}
          <path d="M30,70 C30,58 42,52 50,58 C58,64 56,76 48,78 C40,80 34,74 36,68 C38,62 46,60 50,64"
            fill="none" stroke="white" strokeWidth="1.3" strokeLinecap="round" />

          {/* ── Four-pointed star — mid right ── */}
          <path d="M130,75 L131.6,80.4 L137,82 L131.6,83.6 L130,89 L128.4,83.6 L123,82 L128.4,80.4 Z"
            fill="white" />

          {/* ── Tiny star ── */}
          <path d="M70,100 L70.7,102.3 L73,103 L70.7,103.7 L70,106 L69.3,103.7 L67,103 L69.3,102.3 Z"
            fill="white" />

          {/* ── Candy dot ── */}
          <circle cx="110" cy="110" r="2" fill="none" stroke="white" strokeWidth="1.1" />
          <circle cx="110" cy="110" r="0.8" fill="white" />

          {/* ── Swirl bottom left ── */}
          <path d="M10,130 C10,120 20,116 26,121 C32,126 30,136 24,137 C18,138 14,133 16,128"
            fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />

          {/* ── Four-pointed star — bottom right ── */}
          <path d="M148,140 L149.2,143.8 L153,145 L149.2,146.2 L148,150 L146.8,146.2 L143,145 L146.8,143.8 Z"
            fill="white" />

          {/* ── Gem outline small ── */}
          <path d="M75,148 L79,151 L77,157 L75,159 L73,157 L71,151 Z"
            fill="none" stroke="white" strokeWidth="1" />

        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#ooo)" />
    </svg>
  );
}
