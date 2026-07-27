import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV } from "../../data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={scrolled ? "scrolled" : ""}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          backdropFilter: "blur(12px)",
          background: scrolled ? "rgba(0,40,50,0.95)" : "rgba(0,40,50,0.8)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.05)",
          transition: "background 0.3s ease, border-bottom 0.3s ease",
        }}
      >
        <div className="hdr-container">
          <Logo />

          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hdr-desktop">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hdr-link"
                style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                {n.label}
              </a>
            ))}
          </nav>

          <a href="#contato" className="hdr-desktop hdr-cta" style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            fontSize: "0.875rem", fontWeight: 600,
            background: "var(--gradient-accent)", color: "var(--teal-deep)",
            padding: "0.55rem 1.25rem", borderRadius: 9999, textDecoration: "none",
          }}>
            Fale com o gabinete <ArrowRight size={15} />
          </a>

          <button className="hdr-mobile" onClick={() => setOpen(true)} aria-label="Abrir menu"
            style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 98, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside key="sidebar"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 99,
              width: "75vw", maxWidth: 300,
              background: "var(--teal-deep)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              display: "flex", flexDirection: "column",
              padding: "1.5rem",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <img src="/logo.png" alt="Vereador Roberto"
                style={{ height: 36, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              <button onClick={() => setOpen(false)} aria-label="Fechar"
                style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
                <X size={24} />
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="hdr-link"
                  style={{
                    fontSize: "1.1rem", color: "rgba(255,255,255,0.85)",
                    textDecoration: "none", fontFamily: "var(--font-display)", fontWeight: 600,
                  }}>
                  {n.label}
                </a>
              ))}
            </nav>
            <a href="#contato" onClick={() => setOpen(false)} style={{
              marginTop: "auto",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              background: "var(--gradient-accent)", color: "var(--teal-deep)",
              padding: "0.85rem 1.5rem", borderRadius: 9999,
              fontWeight: 700, textDecoration: "none", fontSize: "0.95rem",
            }}>
              Fale com o gabinete <ArrowRight size={16} />
            </a>
          </motion.aside>
        )}
      </AnimatePresence>

      <style>{`
        .hdr-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 96px;
          transition: height 0.3s ease, padding 0.3s ease;
        }
        .scrolled .hdr-container {
          height: 64px;
        }
        .logo-img {
          height: 72px;
          width: auto;
          display: block;
          object-fit: contain;
          filter: brightness(0) invert(1);
          transition: height 0.3s ease;
        }
        .scrolled .logo-img {
          height: 44px;
        }
        .hdr-desktop { display: flex !important; }
        .hdr-mobile { display: none !important; }
        .hdr-link { transition: color 0.2s; }
        .hdr-link:hover { color: var(--coral) !important; }
        .hdr-cta { transition: opacity 0.2s; }
        .hdr-cta:hover { opacity: 0.85; }
        @media (max-width: 768px) {
          .hdr-container {
            height: 72px;
            padding: 0 1.5rem;
          }
          .scrolled .hdr-container {
            height: 56px;
          }
          .logo-img {
            height: 50px;
          }
          .scrolled .logo-img {
            height: 38px;
          }
          .hdr-desktop { display: none !important; }
          .hdr-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function Logo() {
  return (
    <a href="#top" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
      <img
        src="/logo.png"
        className="logo-img"
        alt="Vereador Roberto"
      />
    </a>
  );
}
