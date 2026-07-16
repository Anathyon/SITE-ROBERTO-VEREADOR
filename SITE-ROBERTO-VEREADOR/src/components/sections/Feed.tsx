import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Section } from "../ui/Section";
import { FEED_POSTS } from "../../data";

export function Feed() {
  return (
    <Section kicker="Comunicação · @vereadorroberto"
      title={<>Do plenário direto pro seu <em style={{ fontStyle: "italic" }}>feed</em>.</>}
      background="var(--teal-deep)" color="white">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
        {FEED_POSTS.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="feed-card"
            style={{
              flex: "1 1 260px",
              aspectRatio: "1/1",
              borderRadius: 20, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              position: "relative", cursor: "pointer",
              transition: "border-color 0.2s",
            }}>
            <div style={{ position: "absolute", inset: 0, background: "var(--gradient-hero)", opacity: 0.9 }} />
            <div style={{
              position: "absolute", inset: 0,
              padding: "1.5rem",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em",
                  color: "var(--coral)", border: "1px solid rgba(240,165,150,0.4)",
                  padding: "0.2rem 0.6rem", borderRadius: 9999,
                }}>{p.tag}</span>
                <Instagram size={18} color="rgba(255,255,255,0.35)" />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", lineHeight: 1.4, color: "white" }}>{p.t}</p>
                <div style={{ marginTop: "0.75rem", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}>
                  há {i + 1} dia{i > 0 ? "s" : ""}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "var(--gradient-accent)", color: "var(--teal-deep)",
          fontWeight: 700, padding: "0.85rem 1.75rem", borderRadius: 9999,
          textDecoration: "none", transition: "transform 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
          <Instagram size={16} /> Seguir no Instagram
        </a>
      </div>

      <style>{`
        .feed-card:hover { border-color: rgba(240,165,150,0.5) !important; }
      `}</style>
    </Section>
  );
}
