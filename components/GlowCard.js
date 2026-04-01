"use client";
import { useEffect, useRef } from "react";

export default function GlowCard({ children, style = {}, className = "", onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    document.addEventListener("pointermove", move);
    return () => document.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ref}
      data-bmo-glow
      className={className}
      onClick={onClick}
      style={{
        position: "relative",
        background: "#0D0D0D",
        border: "1px solid #1f1f1f",
        borderRadius: 10,
        overflow: "hidden",
        transition: "border-color 0.2s",
        ...style,
      }}
    >
      {/* Spotlight pseudo via JS-driven radial */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          pointerEvents: "none",
          background: "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(196,240,0,0.04) 0%, transparent 60%)",
          transition: "opacity 0.15s",
          zIndex: 0,
        }}
      />
      {/* Border glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          pointerEvents: "none",
          background: "radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(196,240,0,0.08) 0%, transparent 55%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
