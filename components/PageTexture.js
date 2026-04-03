"use client";
import { usePathname } from "next/navigation";

// Adventure Time ambient background texture
// Organic grain (hand-drawn AT feel) + soft magical colour orbs
// Masked out at top (hero zone) + hidden on /agents

export default function PageTexture() {
  const pathname = usePathname();
  if (pathname === "/agents") return null;

  // SVG noise grain as data URI — gives the hand-painted AT background feel
  const grainSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

  // Mask: transparent over hero (top ~420px), fades in below
  const mask = "linear-gradient(to bottom, transparent 0px, transparent 380px, black 520px)";

  return (
    <>
      {/* Grain layer — organic hand-drawn texture */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: grainSvg,
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px",
        opacity: 0.055,
        pointerEvents: "none",
        zIndex: 1,
        WebkitMaskImage: mask,
        maskImage: mask,
      }} />

      {/* Soft magical colour orbs — ambient Ooo atmosphere */}
      <div style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        WebkitMaskImage: mask,
        maskImage: mask,
        background: [
          "radial-gradient(ellipse 55% 40% at 15% 60%, rgba(192,132,252,0.045) 0%, transparent 70%)",   // purple — left
          "radial-gradient(ellipse 50% 45% at 85% 40%, rgba(92,232,208,0.04) 0%, transparent 70%)",    // teal — right
          "radial-gradient(ellipse 40% 35% at 50% 85%, rgba(245,196,60,0.035) 0%, transparent 70%)",   // gold — bottom centre
          "radial-gradient(ellipse 35% 30% at 90% 80%, rgba(244,114,182,0.03) 0%, transparent 70%)",   // pink — bottom right
        ].join(", "),
      }} />
    </>
  );
}
