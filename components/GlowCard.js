"use client";
import { useEffect, useRef } from "react";

const glowStyles = `
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
  }
  [data-bmo-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75)
      at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(217 80% 58% / 0.85),
      transparent 100%
    );
    filter: brightness(1.5);
  }
  [data-bmo-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5)
      at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(217 60% 82% / 0.35),
      transparent 100%
    );
  }
  [data-bmo-glow] [data-bmo-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: 1;
    border-radius: calc(var(--radius) * 1px);
    border-width: calc(var(--border-size) * 20);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }
  [data-bmo-glow] > [data-bmo-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`;

export default function GlowCard({ children, className = "", style = {} }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const syncPointer = (e) => {
      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", e.clientX.toFixed(2));
        cardRef.current.style.setProperty("--y", e.clientY.toFixed(2));
      }
    };
    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: glowStyles }} />
      <div
        ref={cardRef}
        data-bmo-glow
        className={className}
        style={{
          "--radius": "14",
          "--border": "1",
          "--border-size": "calc(var(--border, 1) * 1px)",
          "--spotlight-size": "320px",
          "--backdrop": "rgba(255,255,255,0.025)",
          backgroundImage: `radial-gradient(
            320px 320px at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            hsl(217 80% 55% / 0.055),
            transparent
          )`,
          backgroundColor: "rgba(8,12,22,0.92)",
          backgroundSize: "calc(100% + 2px) calc(100% + 2px)",
          backgroundPosition: "50% 50%",
          backgroundAttachment: "fixed",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "14px",
          position: "relative",
          touchAction: "none",
          ...style,
        }}
      >
        <div data-bmo-glow />
        {children}
      </div>
    </>
  );
}
