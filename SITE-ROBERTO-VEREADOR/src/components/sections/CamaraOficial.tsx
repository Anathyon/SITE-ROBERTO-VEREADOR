import { motion } from "framer-motion";
import { ExternalLink, FileText, CheckCircle2, Landmark, ArrowRight } from "lucide-react";
import { Section } from "../ui/Section";
import { SOCIAL_LINKS } from "../../data";

export function CamaraOficial() {
  return (
    <Section id="camara-oficial" kicker="Atuação e Portal Oficial"
      title={<>Transparência em tempo real no <em style={{ fontStyle: "italic", color: "var(--teal)" }}>Portal da Câmara</em>.</>}
      background="var(--secondary-bg)">
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", alignItems: "center" }}>
        
        {/* Bloco Principal de Chamada */}
        <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.4rem 0.85rem", borderRadius: 9999,
            background: "rgba(39,174,96,0.1)", color: "var(--teal)",
            fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
            alignSelf: "flex-start",
          }}>
            <Landmark size={14} /> Fonte Oficial · Câmara Municipal de Martinópole
          </div>

          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.25,
            color: "var(--foreground)",
          }}>
            Conheça o trabalho legislativo completo do Presidente Robertinho Moreira.
          </h3>

          <p style={{ fontSize: "1.05rem", color: "var(--muted-fg)", lineHeight: 1.7 }}>
            Compromisso com a verdade e a transparência pública. No portal oficial da Câmara Municipal de Martinópole, você pode consultar todos os ofícios, indicações, requerimentos, presença em plenário e a atuação completa do Presidente Robertinho durante a 55ª Legislatura.
          </p>

          <p style={{ fontSize: "0.95rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>
            Acesse diretamente a página parlamentar oficial para acompanhar como os recursos e proposições estão sendo trabalhados em favor do nosso município.
          </p>

          <div style={{ marginTop: "0.5rem" }}>
            <a
              href={SOCIAL_LINKS.camara}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                background: "var(--gradient-accent)", color: "var(--teal-deep)",
                fontWeight: 700, padding: "0.95rem 2rem", borderRadius: 9999,
                textDecoration: "none", fontSize: "1rem",
                boxShadow: "0 8px 25px -6px rgba(39,174,96,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = "0 12px 30px -6px rgba(39,174,96,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 25px -6px rgba(39,174,96,0.3)";
              }}>
              Acessar Perfil Oficial na Câmara <ExternalLink size={18} />
            </a>
          </div>
        </div>

        {/* Cards de Destaque Oficial */}
        <div style={{ flex: "1 1 300px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{
              padding: "1.75rem", borderRadius: 20,
              background: "var(--card)", border: "1px solid var(--border)",
              boxShadow: "var(--shadow-card)",
            }}>
            <div style={{
              width: 46, height: 46, borderRadius: 14,
              background: "rgba(39,174,96,0.1)", color: "var(--teal)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "1rem",
            }}>
              <FileText size={22} />
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "2.2rem", color: "var(--teal)" }}>
              93 Matérias
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--foreground)", marginTop: "0.25rem" }}>
              26,20% da Produção Total
            </div>
            <div style={{ fontSize: "0.825rem", color: "var(--muted-fg)", marginTop: "0.35rem", lineHeight: 1.5 }}>
              Responsável por mais de 1/4 de toda a produção legislativa da Câmara de Martinópole.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              padding: "1.75rem", borderRadius: 20,
              background: "var(--card)", border: "1px solid var(--border)",
              boxShadow: "var(--shadow-card)",
            }}>
            <div style={{
              width: 46, height: 46, borderRadius: 14,
              background: "rgba(39,174,96,0.1)", color: "var(--teal)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "1rem",
            }}>
              <CheckCircle2 size={22} />
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "2.2rem", color: "var(--teal)" }}>
              94,87%
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--foreground)", marginTop: "0.25rem" }}>
              Assiduidade Parlamentar
            </div>
            <div style={{ fontSize: "0.825rem", color: "var(--muted-fg)", marginTop: "0.35rem", lineHeight: 1.5 }}>
              Presença confirmada em 74 das 78 sessões deliberativas da legislatura.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              gridColumn: "1 / -1",
              padding: "1.5rem 1.75rem", borderRadius: 20,
              background: "var(--teal-deep)", color: "white",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap",
            }}>
            <div>
              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--coral)" }}>
                Gestão 2025–2026
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", marginTop: "0.2rem" }}>
                Presidente da Mesa Diretora
              </div>
              <div style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.2rem" }}>
                Condução ética, transparente e acessível do Parlamento Municipal.
              </div>
            </div>
            <a href={SOCIAL_LINKS.camara} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              color: "var(--coral)", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none",
            }}>
              Ver na íntegra <ArrowRight size={16} />
            </a>
          </motion.div>

        </div>

      </div>
    </Section>
  );
}
