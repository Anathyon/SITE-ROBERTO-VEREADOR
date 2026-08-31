import { motion } from "framer-motion";
import { ShieldCheck, Users, Landmark, Scale } from "lucide-react";
import { Section } from "../ui/Section";
import { SOBRE_BADGES } from "../../data";
const plenarioImg = "/plenario.JPEG";

const ICONS = [ShieldCheck, Users, Landmark, Scale];

export function Sobre() {
  return (
    <Section id="sobre" kicker="Sobre o mandato"
      title={<>Um parlamentar <em style={{ fontStyle: "italic", color: "var(--teal-mid)" }}>próximo</em> das ruas e firme no plenário.</>}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "stretch" }}>
        {/* Texto */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem", fontSize: "1.05rem", color: "var(--muted-fg)", lineHeight: 1.75 }}>
          <p>
            José Roberto Moreira Fontenele, conhecido popularmente como <strong style={{ color: "var(--foreground)", fontWeight: 600 }}>Robertinho Moreira</strong>, é martinopolense, vereador e <strong style={{ color: "var(--foreground)", fontWeight: 600 }}>Presidente da Câmara Municipal de Martinópole</strong> no biênio 2025–2026.
          </p>
          <p>
            Sua trajetória pública é pautada nos valores da honestidade, do trabalho e do compromisso com o desenvolvimento do município. A frente da Presidência do Poder Legislativo, conduz uma gestão voltada à modernização administrativa, transparência pública e aproximação com a sociedade.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
            {SOBRE_BADGES.map((b, i) => {
              const Icon = ICONS[i];
              return (
                <div key={b.label} style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  padding: "0.75rem 1rem", borderRadius: 12,
                  background: "var(--secondary-bg)", flex: "1 1 180px",
                }}>
                  <Icon size={17} color="var(--teal)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>{b.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{
            position: "relative", borderRadius: 24, overflow: "hidden",
            boxShadow: "var(--shadow-card)", minHeight: 340, height: "100%", width: "100%",
            display: "flex", flexDirection: "column",
          }}>
          <img src={plenarioImg} alt="Plenário da Câmara Municipal" loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", flex: 1 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--teal-deep), rgba(13,58,32,0.2), transparent)" }} />
          <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, color: "white" }}>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--coral)", marginBottom: "0.35rem" }}>Plenário</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", lineHeight: 1.25 }}>"Governar é escutar antes de decidir."</div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
