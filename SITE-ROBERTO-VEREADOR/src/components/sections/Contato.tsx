import { useRef, useState } from "react";
import { ArrowRight, MapPin, Mail, Calendar, Instagram, Facebook } from "lucide-react";
import { Section } from "../ui/Section";
import { TikTok } from "../ui/TikTok";
import { CONTATO_INFO, SOCIAL_LINKS } from "../../data";

const INFO_ICONS = [MapPin, Mail, Instagram, Calendar];

// ─── Segurança ────────────────────────────────────────────────────────────────

/** Remove tags HTML e caracteres perigosos */
const sanitize = (value: string) =>
  value.replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").trim();

/** Valida e-mail com regex simples */
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

/** Rate limit simples via localStorage (máx 3 envios por 10 min) */
const checkRateLimit = (): boolean => {
  const key = "contato_submissions";
  const now = Date.now();
  const window = 10 * 60 * 1000; // 10 minutos
  const max = 3;

  try {
    const raw = localStorage.getItem(key);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const recent = timestamps.filter((t) => now - t < window);
    if (recent.length >= max) return false;
    localStorage.setItem(key, JSON.stringify([...recent, now]));
    return true;
  } catch {
    return true; // se localStorage falhar, permite envio
  }
};

// ─── Estilos ──────────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "1rem 1.25rem",
  borderRadius: 14, background: "var(--card)",
  border: "1px solid var(--border)", outline: "none",
  fontSize: "0.95rem", color: "var(--foreground)",
  fontFamily: "var(--font-sans)",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const errorStyle: React.CSSProperties = {
  fontSize: "0.78rem", color: "#d9534f",
  marginTop: "0.25rem", paddingLeft: "0.25rem",
};

// ─── Componente ───────────────────────────────────────────────────────────────

export function Contato() {
  const [fields, setFields] = useState({ nome: "", email: "", bairro: "", mensagem: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "success" | "rate-limit">("idle");
  // Campo honeypot — deve ficar vazio; bots costumam preenchê-lo
  const honeypotRef = useRef<HTMLInputElement>(null);

  const set = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: sanitize(value) }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fields.nome || fields.nome.length < 2) errs.nome = "Informe seu nome completo.";
    if (!fields.email || !isValidEmail(fields.email)) errs.email = "Informe um e-mail válido.";
    if (!fields.mensagem || fields.mensagem.length < 10) errs.mensagem = "A mensagem deve ter pelo menos 10 caracteres.";
    if (fields.mensagem.length > 2000) errs.mensagem = "Mensagem muito longa (máx. 2000 caracteres).";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: se preenchido, é bot — silenciosamente ignora
    if (honeypotRef.current?.value) return;

    if (!validate()) return;

    if (!checkRateLimit()) {
      setStatus("rate-limit");
      return;
    }

    setStatus("success");
    setFields({ nome: "", email: "", bairro: "", mensagem: "" });
  };

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderColor = "var(--teal)");
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderColor = errors[e.currentTarget.name] ? "#d9534f" : "var(--border)");

  return (
    <Section
      id="contato"
      kicker="Fale com o gabinete"
      title={<>O gabinete é do povo. <em style={{ fontStyle: "italic" }}>Escreva</em> ou mande sua mensagem.</>}
      background="var(--secondary-bg)"
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Honeypot — invisível para humanos */}
          <input
            ref={honeypotRef}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
          />

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ flex: "1 1 140px" }}>
              <input
                name="nome"
                required
                placeholder="Seu nome"
                value={fields.nome}
                onChange={(e) => set("nome", e.target.value)}
                onFocus={focusBorder}
                onBlur={blurBorder}
                maxLength={100}
                style={{
                  ...inputStyle,
                  borderColor: errors.nome ? "#d9534f" : "var(--border)",
                }}
              />
              {errors.nome && <p style={errorStyle}>{errors.nome}</p>}
            </div>
            <div style={{ flex: "1 1 140px" }}>
              <input
                name="email"
                required
                type="email"
                placeholder="Seu e-mail"
                value={fields.email}
                onChange={(e) => set("email", e.target.value)}
                onFocus={focusBorder}
                onBlur={blurBorder}
                maxLength={150}
                style={{
                  ...inputStyle,
                  borderColor: errors.email ? "#d9534f" : "var(--border)",
                }}
              />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>
          </div>

          <input
            name="bairro"
            placeholder="Bairro / Comunidade em Martinópole"
            value={fields.bairro}
            onChange={(e) => set("bairro", e.target.value)}
            onFocus={focusBorder}
            onBlur={blurBorder}
            maxLength={100}
            style={inputStyle}
          />

          <div>
            <textarea
              name="mensagem"
              required
              rows={5}
              placeholder="Sua mensagem, sugestão ou demanda para o gabinete..."
              value={fields.mensagem}
              onChange={(e) => set("mensagem", e.target.value)}
              onFocus={focusBorder}
              onBlur={blurBorder}
              maxLength={2000}
              style={{
                ...inputStyle, resize: "none",
                borderColor: errors.mensagem ? "#d9534f" : "var(--border)",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
              {errors.mensagem
                ? <p style={errorStyle}>{errors.mensagem}</p>
                : <span />}
              <span style={{ fontSize: "0.72rem", color: "var(--muted-fg)" }}>
                {fields.mensagem.length}/2000
              </span>
            </div>
          </div>

          {/* Feedback de sucesso */}
          {status === "success" && (
            <div style={{
              padding: "0.75rem 1rem", borderRadius: 12,
              background: "rgba(39,174,96,0.1)", border: "1px solid var(--teal)",
              color: "var(--teal-deep)", fontSize: "0.875rem", fontWeight: 600,
            }}>
              ✓ Mensagem enviada! Retornaremos em breve.
            </div>
          )}

          {/* Rate limit */}
          {status === "rate-limit" && (
            <div style={{
              padding: "0.75rem 1rem", borderRadius: 12,
              background: "rgba(229,193,88,0.1)", border: "1px solid var(--coral)",
              color: "var(--wine)", fontSize: "0.875rem",
            }}>
              Muitas tentativas. Aguarde alguns minutos antes de enviar novamente.
            </div>
          )}

          <button
            type="submit"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--gradient-accent)", color: "var(--teal-deep)",
              fontWeight: 700, padding: "0.9rem 2rem", borderRadius: 9999,
              border: "none", cursor: "pointer", fontSize: "0.95rem",
              transition: "transform 0.2s", alignSelf: "flex-start",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
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
              <a
                key={s.l}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.l}
                className="social-btn"
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "var(--teal)", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none", transition: "background 0.2s, transform 0.2s",
                }}
              >
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
