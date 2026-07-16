import { motion } from "framer-motion";
import { FileText, Scale, Landmark, Users, ArrowUpRight } from "lucide-react";
import { Section } from "../ui/Section";
import { TRANSPARENCIA_CARDS } from "../../data";

const ICONS = [FileText, Scale, Landmark, Users];

export function Transparencia() {
  return (
    <Section id="transparencia" kicker="Transparência"
      title={<>Nada a esconder — <em style={{ fontStyle: "italic" }}>tudo</em> a mostrar.</>}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
        {TRANSPARENCIA_CARDS.map((c, i) => {
          const Icon = ICONS[i];
          return (
            <motion.a key={c.t} href="#"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="transp-card"
              style={{
                flex: "1 1 200px",
                position: "relative", padding: "2rem",
                borderRadius: 20, overflow: "hidden",
                background: "var(--teal)", color: "white",
                textDecoration: "none",
                transition: "background 0.3s",
              }}>
              <div style={{
                position: "absolute", right: -24, top: -24,
                width: 120, height: 120, borderRadius: "50%",
                background: "var(--gradient-accent)", opacity: 0.1,
                transition: "opacity 0.3s, transform 0.5s",
              }} className="transp-blob" />
              <Icon size={30} color="var(--coral)" style={{ position: "relative" }} />
              <div style={{ marginTop: "2rem", fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 700, color: "var(--coral)", position: "relative" }}>{c.n}</div>
              <div style={{ marginTop: "0.4rem", fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, position: "relative" }}>{c.t}</div>
              <div style={{ marginTop: "0.4rem", fontSize: "0.825rem", color: "rgba(255,255,255,0.55)", position: "relative" }}>{c.d}</div>
              <ArrowUpRight size={18} style={{ position: "absolute", bottom: 20, right: 20, opacity: 0.4 }} />
            </motion.a>
          );
        })}
      </div>
      <style>{`
        .transp-card:hover { background: var(--teal-deep) !important; }
        .transp-card:hover .transp-blob { opacity: 0.3 !important; transform: scale(1.25); }
      `}</style>
    </Section>
  );
}
