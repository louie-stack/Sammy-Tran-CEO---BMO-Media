"use client";
import { motion } from "framer-motion";

// Adapted from gradient-dots — hexagonal dot grid with slow colour cycling
// Colours remapped to Adventure Time / BMO palette: gold, teal, purple, pink

export function GradientDots({
  dotSize = 8,
  spacing = 14,
  duration = 40,
  colorCycleDuration = 10,
  backgroundColor = "#0D0D0D",
  style = {},
  ...props
}) {
  const hexSpacing = spacing * 1.732;

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor,
        backgroundImage: `
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, rgba(245,196,60,0.9), transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(92,232,208,0.9), transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(192,132,252,0.9), transparent 60%),
          radial-gradient(ellipse at 50% 50%, rgba(244,114,182,0.9), transparent 60%)
        `,
        backgroundSize: `
          ${spacing}px ${hexSpacing}px,
          ${spacing}px ${hexSpacing}px,
          200% 200%,
          200% 200%,
          200% 200%,
          200% ${hexSpacing}px
        `,
        backgroundPosition: `
          0px 0px,
          ${spacing / 2}px ${hexSpacing / 2}px,
          0% 0%,
          0% 0%,
          0% 0px
        `,
        opacity: 0.18,
        ...style,
      }}
      animate={{
        backgroundPosition: [
          `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 800% 400%, 1000% -400%, -1200% -600%, 400% ${hexSpacing}px`,
          `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 0% 0%, 0% 0%, 0% 0%, 0% 0%`,
        ],
        filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"],
      }}
      transition={{
        backgroundPosition: { duration, ease: "linear", repeat: Infinity },
        filter: { duration: colorCycleDuration, ease: "linear", repeat: Infinity },
      }}
      {...props}
    />
  );
}
