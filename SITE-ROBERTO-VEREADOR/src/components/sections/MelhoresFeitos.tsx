import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { Section } from "../ui/Section";
import { MELHORES_FEITOS } from "../../data";

export function MelhoresFeitos() {
  return (
    <Section id="feitos" kicker="Melhores Feitos do Mandato"
      title={<>Resultados concretos e <em style={{ fontStyle: "italic", color: "var(--teal)" }}>trabalho prestado</em> a Martinópole.</>}>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.75rem" }}>
        {MELHORES_FEITOS.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="feito-card"
            style={{
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              padding: "2rem", borderRadius: 24,
              background: "var(--card)", border: "1px solid var(--border)",
              boxShadow: "var(--shadow-card)",
              position: "relative", overflow: "hidden",
              transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
            }}>
            
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
                  color: "var(--teal)", background: "rgba(0,104,120,0.08)",
                  padding: "0.35rem 0.8rem", borderRadius: 9999,
                }}>
                  {f.category}
                </span>

                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "var(--gradient-accent)", color: "var(--teal-deep)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Star size={16} fill="var(--teal-deep)" />
                </div>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: "1.35rem", lineHeight: 1.3, color: "var(--foreground)",
                marginBottom: "0.75rem",
              }}>
                {f.title}
              </h3>

              <p style={{ fontSize: "0.95rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>

            <div style={{
              marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.85rem", fontWeight: 700, color: "var(--teal)",
            }}>
              <Sparkles size={16} />
              <span>{f.tag}</span>
            </div>

          </motion.article>
        ))}
      </div>

      <style>{`
        .feito-card:hover {
          transform: translateY(-4px);
          border-color: var(--teal) !important;
          box-shadow: 0 16px 35px -10px rgba(0,104,120,0.15);
        }
      `}</style>

    </Section>
  );
}
