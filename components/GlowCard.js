"use client";
import { useEffect } from "react";

// BMO green: hue 73. Each card reads --base (default 73) and derives its accent colour.
const CSS = `
  [data-glow] {
    /* --base is set inline per card (73 = green, 263 = purple, 38 = yellow, etc.) */
    --hue: var(--base, 73);
    background-color: #0D0D0D;
    border: 1px solid hsl(var(--hue) 100% 55% / 0.18);
    border-radius: 10px;
    position: relative;
    box-shadow:
      0 0 18px hsl(var(--hue) 100% 55% / 0.10),
      0 0 48px hsl(var(--hue) 100% 55% / 0.05),
      0 8px 28px rgba(0,0,0,0.45);
    transition:
      transform 0.3s cubic-bezier(0.16,1,0.3,1),
      box-shadow 0.3s ease,
      border-color 0.3s ease;
  }

  [data-glow]:hover {
    transform: translateY(-3px);
    box-shadow:
      0 0 32px hsl(var(--hue) 100% 55% / 0.32),
      0 0 80px hsl(var(--hue) 100% 55% / 0.16),
      0 18px 50px rgba(0,0,0,0.55);
    border-color: hsl(var(--hue) 100% 55% / 0.48);
  }

  /* Inner radial glow that blooms on hover */
  [data-glow] .glow-overlay {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(ellipse 90% 55% at 50% 0%,
      hsl(var(--hue) 100% 55% / 0.09) 0%,
      transparent 70%
    );
    opacity: 0.5;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 0;
  }

  [data-glow]:hover .glow-overlay {
    opacity: 1;
  }

  [data-glow] > .glow-inner {
    position: relative;
    z-index: 1;
    height: 100%;
  }

  @keyframes gPulse { 0%,100% { opacity: 0.4 } 50% { opacity: 1 } }
`;

let injected = false;

function initGlow() {
  if (typeof window === "undefined" || window.__bmoGlow3) return;
  window.__bmoGlow3 = true;
  if (!injected) {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }
}

export default function GlowCard({ children, style = {}, className = "", onClick, ...rest }) {
  useEffect(() => { initGlow(); }, []);

  return (
    <div
      data-glow
      className={className}
      onClick={onClick}
      style={style}
      {...rest}
    >
      <div className="glow-overlay" aria-hidden="true" />
      <div className="glow-inner">{children}</div>
    </div>
  );
}
