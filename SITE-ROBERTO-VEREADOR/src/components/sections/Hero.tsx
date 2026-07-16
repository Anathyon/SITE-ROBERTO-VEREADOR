import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { STATS } from "../../data";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} style={{
      position: "relative", minHeight: "100vh",
      background: "var(--gradient-hero)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "6rem 1.5rem 4rem", overflow: "hidden",
    }}>
      {/* Grid decorativo */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: "linear-gradient(var(--coral) 1px, transparent 1px), linear-gradient(90deg, var(--coral) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <motion.div style={{ y, opacity, width: "100%", maxWidth: 1280, position: "relative" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center",
          gap: "3rem", justifyContent: "center",
        }}>
          {/* Texto */}
          <div style={{ flex: "1 1 340px", color: "white", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                borderRadius: 9999, border: "1px solid rgba(240,165,150,0.4)",
                background: "rgba(240,165,150,0.1)",
                padding: "0.35rem 1rem",
                fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--coral)",
              }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)", animation: "pulse 2s infinite" }} />
              Mandato Ativo
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                marginTop: "1.5rem",
                fontFamily: "var(--font-display)", fontWeight: 900,
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                lineHeight: 0.95, color: "white",
              }}>
              Trabalho <span className="text-shimmer" style={{ fontStyle: "italic" }}>honesto</span><br />
              pela nossa cidade.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
              style={{ marginTop: "1.5rem", fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 520 }}>
              Um mandato aberto, participativo e acessível. Aqui você acompanha em tempo real cada projeto, cada voto e cada agenda do gabinete.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <a href="#tramitacao" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--gradient-accent)", color: "var(--teal-deep)",
                fontWeight: 600, padding: "0.85rem 1.75rem", borderRadius: 9999,
                textDecoration: "none", transition: "transform 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                Acompanhar projetos <ArrowRight size={16} />
              </a>
              <a href="#agenda" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                border: "1px solid rgba(255,255,255,0.3)", color: "white",
                padding: "0.85rem 1.75rem", borderRadius: 9999,
                textDecoration: "none", transition: "background 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <Play size={15} /> Ver agenda
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
              style={{
                marginTop: "3.5rem",
                display: "flex", gap: "2.5rem", flexWrap: "wrap",
                borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem",
              }}>
              {STATS.map((s) => (
                <div key={s.l}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "var(--coral)" }}>{s.n}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Imagem */}
          <div style={{ flex: "1 1 280px", maxWidth: 480, position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
              className="animate-float"
              style={{ position: "relative" }}>
              <div style={{
                position: "absolute", inset: -24,
                background: "var(--gradient-accent)", borderRadius: 32,
                filter: "blur(40px)", opacity: 0.25, pointerEvents: "none",
              }} />
              <div style={{
                position: "relative", borderRadius: 32, overflow: "hidden",
                border: "1px solid rgba(240,165,150,0.3)",
                boxShadow: "var(--shadow-glow)",
              }}>
                <img src="/FOTO RO BERTINHO.png" alt="Vereador Roberto" style={{ width: "100%", height: "auto", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,30,40,0.65), transparent)" }} />
                <div style={{
                  position: "absolute", bottom: 24, left: 24, right: 24,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "white" }}>Roberto Silva</div>
                    <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--coral)" }}>
                      Vereador · Câmara Municipal
                    </div>
                  </div>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "var(--gradient-accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <CheckCircle2 size={18} color="var(--teal-deep)" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}
