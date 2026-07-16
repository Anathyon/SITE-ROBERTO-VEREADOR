import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Section } from "../ui/Section";
import agenda1 from "../../assets/agenda-1.jpg";
import agenda2 from "../../assets/agenda-2.jpg";
import agenda3 from "../../assets/agenda-3.jpg";

const EVENTS = [
  { d: "18", m: "MAR", t: "Audiência pública — Mobilidade urbana", loc: "Câmara Municipal · 19h", img: agenda1 },
  { d: "22", m: "MAR", t: "Visita técnica à Escola Estadual Marechal Deodoro", loc: "Bairro Jardim das Palmeiras · 09h", img: agenda2 },
  { d: "28", m: "MAR", t: "Vistoria de obra — Rua das Acácias", loc: "Zona Leste · 14h", img: agenda3 },
];

export function Agenda() {
  return (
    <Section id="agenda" kicker="Agenda & atividades"
      title={<>Onde o mandato <em style={{ fontStyle: "italic" }}>acontece</em> essa semana.</>}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {EVENTS.map((e, i) => (
          <motion.article key={e.t}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
            className="agenda-card"
            style={{
              flex: "1 1 260px",
              borderRadius: 20, overflow: "hidden",
              background: "var(--card)", border: "1px solid var(--border)",
              transition: "box-shadow 0.3s",
            }}>
            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
              <img src={e.img} alt="" loading="lazy" className="agenda-img"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.7s" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,30,40,0.8), transparent)" }} />
              <div style={{
                position: "absolute", top: 20, left: 20,
                background: "var(--gradient-accent)", borderRadius: 12,
                padding: "0.5rem 0.85rem", color: "var(--teal-deep)", textAlign: "center", lineHeight: 1,
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 900 }}>{e.d}</div>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em" }}>{e.m}</div>
              </div>
            </div>
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.3 }}>{e.t}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.75rem", fontSize: "0.875rem", color: "var(--muted-fg)" }}>
                <MapPin size={14} color="var(--teal)" style={{ flexShrink: 0 }} />
                {e.loc}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <style>{`
        .agenda-card:hover { box-shadow: 0 16px 40px -12px rgba(0,77,92,0.18); }
        .agenda-card:hover .agenda-img { transform: scale(1.05); }
      `}</style>
    </Section>
  );
}
