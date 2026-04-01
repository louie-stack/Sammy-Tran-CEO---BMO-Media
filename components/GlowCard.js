"use client";
import { useEffect } from "react";

// One global pointermove listener — sets raw cursor coords on :root
// background-attachment: fixed makes every card share the same spotlight origin
function initGlow() {
  if (typeof window === "undefined" || window.__bmoGlowReady) return;
  window.__bmoGlowReady = true;
  window.addEventListener("pointermove", (e) => {
    document.documentElement.style.setProperty("--bmo-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--bmo-y", `${e.clientY}px`);
  }, { passive: true });
}

export default function GlowCard({ children, style = {}, className = "", onClick }) {
  useEffect(() => { initGlow(); }, []);

  return (
    <div
      data-bmo-glow
      className={className}
      onClick={onClick}
      style={style}
    >
      <div className="glow-inner">
        {children}
      </div>
    </div>
  );
}
