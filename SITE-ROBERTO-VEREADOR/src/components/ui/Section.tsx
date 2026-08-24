import { memo } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id?: string;
  kicker: string;
  title: React.ReactNode;
  children: React.ReactNode;
  background?: string;
  color?: string;
}

// React.memo garante que o Section só re-renderiza quando suas próprias
// props mudam — nunca por causa de estado interno de componentes filhos
// (ex: digitação no formulário de contato).
export const Section = memo(function Section({
  id,
  kicker,
  title,
  children,
  background,
  color,
}: SectionProps) {
  return (
    <section
      id={id}
      style={{
        width: "100%",
        background: background ?? "var(--background)",
        color: color ?? "var(--foreground)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1280 }}>
        {/* motion.div apenas no cabeçalho (kicker + título), não envolve children */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "var(--muted-fg)",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                width: 32,
                height: 1,
                background: "var(--coral)",
                display: "block",
              }}
            />
            {kicker}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.05,
              maxWidth: 700,
              color: color ?? "var(--foreground)",
            }}
          >
            {title}
          </h2>
        </motion.div>
        <div style={{ marginTop: "3.5rem" }}>{children}</div>
      </div>
    </section>
  );
});
