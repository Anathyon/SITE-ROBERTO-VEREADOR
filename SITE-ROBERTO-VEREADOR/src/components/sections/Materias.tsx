import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "../ui/Section";
import { MATERIAS } from "../../data";

export function Materias() {
  return (
    <Section id="materias" kicker="Matérias apresentadas"
      title={<>Cada proposta com <em style={{ fontStyle: "italic" }}>nome</em>, número e destino.</>}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {MATERIAS.map((it, i) => (
          <motion.a key={it.n} href="#"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
            className="materia-card"
            style={{
              display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem",
              padding: "1.75rem 2rem", borderRadius: 20,
              border: "1px solid var(--border)", background: "var(--card)",
              textDecoration: "none", color: "inherit",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}>
            {/* Data + número */}
            <div style={{ flex: "0 0 auto", minWidth: 120 }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--muted-fg)" }}>{it.date}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "var(--teal)", marginTop: "0.25rem" }}>{it.n}</div>
            </div>
            {/* Título */}
            <div style={{ flex: "1 1 200px" }}>
              <span style={{
                display: "inline-block", fontSize: "0.65rem", textTransform: "uppercase",
                letterSpacing: "0.15em", color: "var(--teal)",
                background: "rgba(39,174,96,0.1)",
                padding: "0.2rem 0.65rem", borderRadius: 9999,
              }}>{it.tag}</span>
              <h3 style={{
                marginTop: "0.6rem", fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(1rem, 2vw, 1.35rem)", lineHeight: 1.3,
                color: "var(--foreground)",
              }}>{it.title}</h3>
            </div>
            {/* Ícone */}
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.2s, border-color 0.2s",
            }}>
              <ArrowUpRight size={18} />
            </div>
          </motion.a>
        ))}
      </div>
      <style>{`
        .materia-card:hover { border-color: var(--teal) !important; box-shadow: 0 8px 30px -10px rgba(13,58,32,0.12); }
      `}</style>
    </Section>
  );
}
