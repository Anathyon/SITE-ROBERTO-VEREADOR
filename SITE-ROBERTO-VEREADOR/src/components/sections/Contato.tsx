import { ArrowRight, MapPin, Mail, Calendar, Instagram, Facebook } from "lucide-react";
import { Section } from "../ui/Section";
import { TikTok } from "../ui/TikTok";
import { CONTATO_INFO, SOCIAL_LINKS } from "../../data";

const INFO_ICONS = [MapPin, Mail, Instagram, Calendar];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "1rem 1.25rem",
  borderRadius: 14, background: "var(--card)",
  border: "1px solid var(--border)", outline: "none",
  fontSize: "0.95rem", color: "var(--foreground)",
  fontFamily: "var(--font-sans)",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

export function Contato() {
  return (
    <Section id="contato" kicker="Fale com o gabinete"
      title={<>O gabinete é do povo. <em style={{ fontStyle: "italic" }}>Escreva</em> ou mande sua mensagem.</>}
      background="var(--secondary-bg)">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
        {/* Formulário */}
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada! Retornaremos em breve."); }}
          style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <input required placeholder="Seu nome" style={{ ...inputStyle, flex: "1 1 140px" }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--teal)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
            <input required type="email" placeholder="Seu e-mail" style={{ ...inputStyle, flex: "1 1 140px" }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--teal)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          </div>
          <input placeholder="Bairro / Comunidade em Martinópole" style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--teal)")}
            onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          <textarea required rows={5} placeholder="Sua mensagem, sugestão ou demanda para o gabinete..."
            style={{ ...inputStyle, resize: "none" }}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--teal)")}
            onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
          <button type="submit" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "var(--gradient-accent)", color: "var(--teal-deep)",
            fontWeight: 700, padding: "0.9rem 2rem", borderRadius: 9999,
            border: "none", cursor: "pointer", fontSize: "0.95rem",
            transition: "transform 0.2s", alignSelf: "flex-start",
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
            Enviar mensagem <ArrowRight size={16} />
          </button>
        </form>

        {/* Info */}
        <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {CONTATO_INFO.map((c, i) => {
            const Icon = INFO_ICONS[i] || MapPin;
            return (
              <div key={c.t} style={{
                display: "flex", alignItems: "flex-start", gap: "1rem",
                padding: "1.25rem 1.5rem", borderRadius: 16,
                background: "var(--card)", border: "1px solid var(--border)",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: "var(--teal)", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>{c.t}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--muted-fg)", marginTop: "0.2rem" }}>{c.d}</div>
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            {[
              { icon: Instagram, href: SOCIAL_LINKS.instagram, l: "Instagram" },
              { icon: Facebook, href: SOCIAL_LINKS.facebook, l: "Facebook" },
              { icon: TikTok, href: SOCIAL_LINKS.tiktok, l: "TikTok" },
            ].map((s) => (
              <a key={s.l} href={s.href} target="_blank" rel="noreferrer" aria-label={s.l}
                className="social-btn"
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "var(--teal)", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none", transition: "background 0.2s, transform 0.2s",
                }}>
                <s.icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .social-btn:hover { background: var(--gradient-accent) !important; color: var(--teal-deep) !important; transform: translateY(-2px); }
      `}</style>
    </Section>
  );
}

