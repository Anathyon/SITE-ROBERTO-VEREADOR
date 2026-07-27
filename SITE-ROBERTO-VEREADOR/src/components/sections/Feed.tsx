import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { Section } from "../ui/Section";
import { FEED_POSTS, SOCIAL_LINKS } from "../../data";

export function Feed() {
  return (
    <Section kicker="Comunicação · @robertinhoce"
      title={<>Do plenário direto pro seu <em style={{ fontStyle: "italic" }}>feed</em>.</>}
      background="var(--teal-deep)" color="white">
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {FEED_POSTS.map((p, i) => (
          <motion.a
            key={i}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="feed-card"
            style={{
              aspectRatio: "1/1",
              borderRadius: 24, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.15)",
              position: "relative",
              textDecoration: "none", color: "white",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
              transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
            }}>
            
            {/* Imagem de Fundo do Post */}
            {p.img && (
              <img
                src={p.img}
                alt={p.t}
                loading="lazy"
                className="feed-bg-img"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                  transition: "transform 0.6s ease",
                }}
              />
            )}

            {/* Gradient Overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,25,35,0.95) 0%, rgba(0,25,35,0.5) 55%, rgba(0,25,35,0.25) 100%)",
              zIndex: 1,
            }} />

            {/* Conteúdo do Card */}
            <div style={{
              position: "relative", zIndex: 2,
              padding: "1.5rem",
              height: "100%", width: "100%",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              boxSizing: "border-box",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700,
                  color: "var(--coral)", background: "rgba(0,25,35,0.6)",
                  border: "1px solid rgba(240,165,150,0.4)",
                  padding: "0.25rem 0.75rem", borderRadius: 9999,
                  backdropFilter: "blur(4px)",
                }}>{p.tag}</span>

                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}>
                  <Instagram size={17} color="white" />
                </div>
              </div>

              <div>
                <p style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: "1.1rem", lineHeight: 1.35, color: "white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                }}>
                  {p.t}
                </p>
                <div style={{
                  marginTop: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  fontSize: "0.75rem", fontWeight: 600, color: "var(--coral)",
                }}>
                  Ver no Instagram <ExternalLink size={13} />
                </div>
              </div>
            </div>

          </motion.a>
        ))}
      </div>

      <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "0.6rem",
          background: "var(--gradient-accent)", color: "var(--teal-deep)",
          fontWeight: 700, padding: "0.9rem 2rem", borderRadius: 9999,
          textDecoration: "none", fontSize: "0.95rem",
          boxShadow: "0 8px 20px -4px rgba(0,0,0,0.3)",
          transition: "transform 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
          <Instagram size={18} /> Seguir @robertinhoce no Instagram
        </a>
      </div>

      <style>{`
        .feed-card:hover {
          transform: translateY(-4px);
          border-color: var(--coral) !important;
          box-shadow: 0 16px 35px -10px rgba(0,0,0,0.5) !important;
        }
        .feed-card:hover .feed-bg-img {
          transform: scale(1.08);
        }
      `}</style>
    </Section>
  );
}

