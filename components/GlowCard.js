"use client";
import { useEffect, useRef } from "react";

// BMO green
const R = 196, G = 240, B = 0;

const CSS = `
  [data-bmo-glow] {
    --radius: 10;
    --border-size: 1px;
    --spotlight-size: 300px;
    position: relative;
    background: #0D0D0D;
    border-radius: calc(var(--radius) * 1px);
    border: var(--border-size) solid rgba(255,255,255,0.07);
    transition: border-color 0.25s;
    touch-action: none;
    overflow: hidden;
  }

  /* Border edge glow — mask clips gradient to border strip only */
  [data-bmo-glow]::before,
  [data-bmo-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
    -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    -webkit-mask-clip: padding-box, border-box;
    -webkit-mask-composite: destination-in;
  }

  [data-bmo-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75)
      at calc(var(--bmo-x, -999px)) calc(var(--bmo-y, -999px)),
      rgba(${R}, ${G}, ${B}, 0.9),
      transparent 100%
    );
    filter: brightness(1.6);
  }

  [data-bmo-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5)
      at calc(var(--bmo-x, -999px)) calc(var(--bmo-y, -999px)),
      rgba(${R}, ${G}, ${B}, 0.45),
      transparent 100%
    );
  }

  [data-bmo-glow] > .glow-inner {
    position: relative;
    z-index: 1;
    height: 100%;
  }
`;

let styleInjected = false;

export default function GlowCard({ children, style = {}, className = "", onClick }) {
  const cardRef = useRef(null);

  useEffect(() => {
    // Inject CSS once
    if (!styleInjected) {
      const el = document.createElement("style");
      el.textContent = CSS;
      document.head.appendChild(el);
      styleInjected = true;
    }

    // Global pointer listener — sets raw viewport coords on :root
    // background-attachment: fixed means all cards share the same spotlight
    if (!window.__bmoGlowReady) {
      window.__bmoGlowReady = true;
      window.addEventListener("pointermove", (e) => {
        document.documentElement.style.setProperty("--bmo-x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--bmo-y", `${e.clientY}px`);
      }, { passive: true });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      data-bmo-glow
      className={className}
      onClick={onClick}
      style={style}
    >
      <div className="glow-inner">{children}</div>
    </div>
  );
}
