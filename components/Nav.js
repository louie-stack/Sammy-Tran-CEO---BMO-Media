"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GREEN = "#C4F000";

const links = [
  { href: "/", label: "Command Centre" },
  { href: "/agents", label: "Agents" },
  { href: "/sales", label: "Sales & BD" },
  { href: "/research", label: "Research" },
  { href: "/build", label: "Build" },
  { href: "/health", label: "Health" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      height: 58,
      background: scrolled ? "rgba(10,10,10,0.97)" : "#0a0a0a",
      backdropFilter: "blur(20px)",
      borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
      display: "flex", alignItems: "center",
      transition: "border-color 0.3s, background 0.3s",
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto", width: "100%",
        padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo — matches BMO MEDIA wordmark */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800, fontSize: 16,
            color: "#fff", letterSpacing: "0.01em",
          }}>BMO MEDIA</span>
        </Link>

        {/* Centre nav links — pill buttons like their site */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} style={{
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, fontWeight: 500,
                color: active ? "#fff" : "rgba(255,255,255,0.65)",
                background: active ? "#1c1c1c" : "#161616",
                border: "1px solid",
                borderColor: active ? "#2a2a2a" : "#1e1e1e",
                borderRadius: 8,
                padding: "7px 16px",
                display: "flex", alignItems: "center", gap: 5,
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "#1c1c1c";
                    e.currentTarget.style.borderColor = "#2a2a2a";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    e.currentTarget.style.background = "#161616";
                    e.currentTarget.style.borderColor = "#1e1e1e";
                  }
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right CTA — green outlined button */}
        <Link href="/agents?chat=1" style={{
          textDecoration: "none",
          fontFamily: "'Inter', sans-serif",
          fontSize: 13, fontWeight: 600,
          color: GREEN,
          background: "transparent",
          border: `1px solid ${GREEN}`,
          borderRadius: 8,
          padding: "7px 20px",
          transition: "all 0.15s",
          whiteSpace: "nowrap",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${GREEN}12`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Talk to BMO
        </Link>

      </div>
    </nav>
  );
}
