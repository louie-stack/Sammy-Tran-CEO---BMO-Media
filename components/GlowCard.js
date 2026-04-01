"use client";
import { useEffect, useRef } from "react";

// BMO green: #C4F000 ≈ hsl(73 100% 47%)
// --spread 0 locks the hue so it doesn't shift across the screen
const CSS = `
  :root {
    --bmo-x: -999;
    --bmo-y: -999;
    --bmo-xp: 0.5;
    --bmo-yp: 0.5;
  }

  [data-glow] {
    --base:             73;
    --spread:           0;
    --radius:           10;
    --border:           1;
    --border-size:      calc(var(--border, 1) * 1px);
    --spotlight-size:   calc(var(--size, 200) * 1px);
    --hue:              calc(var(--base) + (var(--bmo-xp, 0) * var(--spread, 0)));
    --backdrop:         hsl(0 0% 5% / 1);
    --backup-border:    hsl(0 0% 12% / 1);
    --outer:            1;

    background-image: radial-gradient(
      var(--spotlight-size) var(--spotlight-size)
      at calc(var(--bmo-x, -999) * 1px) calc(var(--bmo-y, -999) * 1px),
      hsl(var(--hue) 100% 55% / 0.08),
      transparent
    );
    background-color:       var(--backdrop);
    background-size:        calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-position:    50% 50%;
    background-attachment:  fixed;
    border:         var(--border-size) solid var(--backup-border);
    border-radius:  calc(var(--radius) * 1px);
    position:       relative;
    touch-action:   none;
  }

  /* Border edge glow — clips to the 1px border strip only */
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size:     calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat:   no-repeat;
    background-position: 50% 50%;
    mask:                linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip:           padding-box, border-box;
    mask-composite:      intersect;
    -webkit-mask:        linear-gradient(transparent, transparent), linear-gradient(white, white);
    -webkit-mask-clip:   padding-box, border-box;
    -webkit-mask-composite: destination-in;
  }

  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75)
      at calc(var(--bmo-x, -999) * 1px) calc(var(--bmo-y, -999) * 1px),
      hsl(var(--hue) 100% 55% / 1),
      transparent 100%
    );
    filter: brightness(2);
  }

  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5)
      at calc(var(--bmo-x, -999) * 1px) calc(var(--bmo-y, -999) * 1px),
      hsl(0 100% 100% / 0.18),
      transparent 100%
    );
  }

  /* Inner bloom div — blurred glow that bleeds slightly outside the card */
  [data-glow] [data-glow-inner] {
    position:       absolute;
    inset:          0;
    will-change:    filter;
    opacity:        var(--outer, 1);
    border-radius:  calc(var(--radius) * 1px);
    border-width:   calc(var(--border-size) * 20);
    filter:         blur(calc(var(--border-size) * 10));
    background:     none;
    pointer-events: none;
    border:         none;
  }

  [data-glow] > [data-glow-inner]::before {
    inset:        -10px;
    border-width: 10px;
  }

  [data-glow] > .glow-inner {
    position: relative;
    z-index:  1;
    height:   100%;
  }
`;

let injected = false;

function initGlow() {
  if (typeof window === "undefined" || window.__bmoGlow2) return;
  window.__bmoGlow2 = true;

  // Inject CSS once
  if (!injected) {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    injected = true;
  }

  // Global pointer listener — raw viewport coords on :root
  window.addEventListener("pointermove", (e) => {
    const r = document.documentElement.style;
    r.setProperty("--bmo-x", e.clientX.toFixed(2));
    r.setProperty("--bmo-y", e.clientY.toFixed(2));
    r.setProperty("--bmo-xp", (e.clientX / window.innerWidth).toFixed(4));
    r.setProperty("--bmo-yp", (e.clientY / window.innerHeight).toFixed(4));
  }, { passive: true });
}

export default function GlowCard({ children, style = {}, className = "", onClick }) {
  useEffect(() => { initGlow(); }, []);

  return (
    <div
      data-glow
      className={className}
      onClick={onClick}
      style={style}
    >
      <div data-glow-inner aria-hidden="true" />
      <div className="glow-inner">{children}</div>
    </div>
  );
}
