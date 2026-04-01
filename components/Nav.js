"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

const navPages = ["Command Centre", "Agents", "Sales & BD", "Research", "Build", "Health"];
const navRoutes = {
  "Command Centre": "/",
  "Agents": "/agents",
  "Sales & BD": "/sales",
  "Research": "/research",
  "Build": "/build",
  "Health": "/health",
};

export default function Nav() {
  const [tStr, setTStr] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    function tick() {
      const now = new Date();
      const h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      setTStr(`${String(h12).padStart(2, "0")}:${m} ${ampm}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? "0 16px" : "0 44px",
        background: "rgba(8,11,18,0.75)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px dashed rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 54, maxWidth: 1440, margin: "0 auto", width: "100%" }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 800, color: "#fff",
              border: "1.5px solid rgba(59,130,246,0.4)",
              boxShadow: "0 0 10px rgba(59,130,246,0.3)",
            }}>S</div>
            <div>
              <div style={{ ...jk, fontSize: 12, fontWeight: 700 }}>SAMMY TRAN</div>
              <div style={{ ...mo, fontSize: 9, color: "#334" }}>BMO MEDIA — AI OS</div>
            </div>
          </div>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 1 }}>
              {navPages.map((p) => {
                const route = navRoutes[p];
                const isActive = pathname === route;
                return (
                  <Link key={p} href={route} style={{ textDecoration: "none" }}>
                    <div className={!isActive ? "nav-link" : ""} style={{
                      padding: "5px 12px", borderRadius: 2, cursor: "pointer",
                      background: isActive ? "rgba(59,130,246,0.06)" : "transparent",
                      border: isActive ? "1px solid rgba(59,130,246,0.12)" : "1px solid transparent",
                    }}>
                      <span style={{ ...mo, fontSize: 11, color: isActive ? "#3b82f6" : "#445" }}>{p}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {!isMobile && (
              <span style={{ ...mo, fontSize: 11, color: "#556" }}>{tStr} LON</span>
            )}
            {isMobile ? (
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{
                  width: 36, height: 36, borderRadius: 4,
                  background: menuOpen ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid rgba(59,130,246,${menuOpen ? 0.2 : 0.08})`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: 5, cursor: "pointer", transition: "all 0.2s", padding: 0,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    display: "block", width: 16, height: 1.5, borderRadius: 1,
                    background: menuOpen ? "#3b82f6" : "#556",
                    transition: "all 0.25s",
                    transform: menuOpen ? (i === 0 ? "translateY(3.25px) rotate(45deg)" : i === 2 ? "translateY(-3.25px) rotate(-45deg)" : "none") : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }} />
                ))}
              </button>
            ) : (
              <div style={{
                width: 28, height: 28, borderRadius: 3,
                background: "rgba(59,130,246,0.06)",
                border: "1px solid rgba(59,130,246,0.14)",
                display: "flex", alignItems: "center", justifyContent: "center",
                ...jk, fontSize: 10, fontWeight: 800, color: "#3b82f6",
              }}>OS</div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 54, left: 0, right: 0, zIndex: 99,
          background: "rgba(8,11,18,0.97)", backdropFilter: "blur(24px)",
          borderBottom: "1px dashed rgba(255,255,255,0.06)",
          maxHeight: menuOpen ? 400 : 0, overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ padding: "8px 16px 20px" }}>
            <div style={{ ...mo, fontSize: 10, color: "#334", padding: "12px 0 8px", borderBottom: "1px dashed rgba(255,255,255,0.04)", marginBottom: 8 }}>
              {tStr} LON
            </div>
            {navPages.map((p) => {
              const route = navRoutes[p];
              const isActive = pathname === route;
              return (
                <Link key={p} href={route} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "13px 12px", borderRadius: 6, marginBottom: 4,
                    background: isActive ? "rgba(59,130,246,0.06)" : "transparent",
                    border: `1px solid rgba(59,130,246,${isActive ? 0.12 : 0.03})`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: isActive ? "#3b82f6" : "#334" }} />
                      <span style={{ ...mo, fontSize: 12, color: isActive ? "#3b82f6" : "#667" }}>{p}</span>
                    </div>
                    {isActive && <span style={{ ...mo, fontSize: 9, color: "#3b82f6" }}>ACTIVE</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
