import { motion } from "framer-motion";
import { CheckCircle2, Clock, ChevronRight, ArrowUpRight } from "lucide-react";
import { Section } from "../ui/Section";
import { TRAMITACAO_STEPS, BILLS } from "../../data";

export function Tramitacao() {
  return (
    <Section id="tramitacao" kicker="Tramitação"
      title={<>Acompanhe cada projeto <em style={{ fontStyle: "italic" }}>passo a passo</em>.</>}
      background="var(--secondary-bg)">

      {/* Steps */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "3.5rem" }}>
        {TRAMITACAO_STEPS.map((s, i) => (
          <motion.div key={s.l}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            style={{
              flex: "1 1 140px",
              padding: "1.25rem",
              borderRadius: 14,
              border: `2px solid ${s.state === "active" ? "var(--teal)" : s.state === "done" ? "rgba(0,104,120,0.3)" : "var(--border)"}`,
              background: s.state === "active" ? "var(--teal)" : "var(--card)",
              color: s.state === "active" ? "white" : "var(--foreground)",
              opacity: s.state === "pending" ? 0.55 : 1,
            }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.7rem", opacity: 0.6 }}>0{i + 1}</span>
              {s.state === "done" && <CheckCircle2 size={15} />}
              {s.state === "active" && <Clock size={15} style={{ animation: "pulse 2s infinite" }} />}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>{s.l}</div>
            <div style={{ fontSize: "0.75rem", opacity: 0.65, marginTop: "0.25rem" }}>{s.d}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabela */}
      <div style={{ borderRadius: 20, background: "var(--card)", border: "1px solid var(--border)", overflow: "hidden" }}>
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem" }}>Em tramitação agora</h3>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.875rem", color: "var(--teal)", textDecoration: "none" }}>
            Ver todos <ChevronRight size={15} />
          </a>
        </div>
        {BILLS.map((b) => (
          <div key={b.n} className="bill-row" style={{
            display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border)",
            transition: "background 0.2s",
          }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.875rem", fontWeight: 600, color: "var(--teal)", flex: "0 0 auto", minWidth: 110 }}>{b.n}</span>
            <span style={{ flex: "1 1 160px", fontWeight: 500, fontSize: "0.95rem" }}>{b.t}</span>
            <div style={{ flex: "2 1 180px" }}>
              <div style={{ height: 6, borderRadius: 9999, background: "var(--secondary-bg)", overflow: "hidden" }}>
                <div style={{ height: "100%", background: "var(--gradient-accent)", width: `${(b.stage / 5) * 100}%` }} />
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--muted-fg)", marginTop: "0.35rem" }}>
                Etapa {b.stage} de 5 · atualizado {b.updated}
              </div>
            </div>
            <ArrowUpRight size={17} color="var(--muted-fg)" style={{ flexShrink: 0 }} />
          </div>
        ))}
      </div>

      <style>{`
        .bill-row:hover { background: var(--secondary-bg) !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </Section>
  );
}
