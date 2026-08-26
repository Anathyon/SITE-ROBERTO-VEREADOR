import { useRef, useState } from "react";
import {
  MapPin,
  Mail,
  Clock,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Instagram,
  Facebook,
  ShieldCheck,
} from "lucide-react";
import { CONTATO_INFO, SOCIAL_LINKS } from "../../data";
import { useRecaptchaV3 } from "../../hooks/useRecaptchaV3";
import { FORMSPARK_FORM_ID } from "../../config";

// Botão WhatsApp
const WHATSAPP_NUMBER = "5588992391071";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.533 5.879L.057 24l6.304-1.654A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.875 9.875 0 0 1-5.031-1.377l-.361-.214-3.741.981.999-3.648-.235-.374A9.86 9.86 0 0 1 2.106 12C2.106 6.56 6.56 2.106 12 2.106S21.894 6.56 21.894 12 17.44 21.894 12 21.894z"/>
    </svg>
  );
}

// Ícones sem correspondência no lucide-react
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

const INFO_ICONS = [MapPin, Mail, null, Clock] as const;

type Status = "idle" | "sending" | "success" | "error";

const FORMSPARK_URL = `https://submit-form.com/${FORMSPARK_FORM_ID}`;

export function Contato() {
  const formRef = useRef<HTMLFormElement>(null);
  const executeRecaptcha = useRecaptchaV3();
  const [status, setStatus] = useState<Status>("idle");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setStatus("sending");

    const form = e.currentTarget;
    const nome     = (form.elements.namedItem("nome")     as HTMLInputElement).value.trim();
    const email    = (form.elements.namedItem("email")    as HTMLInputElement).value.trim();
    const bairro   = (form.elements.namedItem("bairro")   as HTMLInputElement).value.trim() || "Não informado";
    const mensagem = (form.elements.namedItem("mensagem") as HTMLTextAreaElement).value.trim();

    // reCAPTCHA v3 — invisível, não bloqueia a UI
    const captchaToken = await executeRecaptcha("contato");

    const payload: Record<string, string> = {
      nome,
      email,
      bairro,
      mensagem,
    };
    // Formspark aceita o token do reCAPTCHA v3 em _recaptcha
    if (captchaToken) payload["_recaptcha"] = captchaToken;

    try {
      const res = await fetch(FORMSPARK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setStatus("error");
        setErro((json as { error?: string }).error ?? "Erro ao enviar. Tente novamente.");
      }
    } catch {
      setStatus("error");
      setErro("Erro de conexão. Verifique sua internet e tente novamente.");
    }
  }

  return (
    <section
      id="contato"
      style={{
        width: "100%",
        background: "var(--secondary-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1280 }}>

        {/* ── Cabeçalho ── */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            fontSize: "0.7rem", textTransform: "uppercase",
            letterSpacing: "0.3em", color: "var(--muted-fg)", marginBottom: "1rem",
          }}>
            <span style={{ width: 32, height: 1, background: "var(--coral)", display: "block" }} />
            Contato
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, maxWidth: 700,
          }}>
            Fale com o{" "}
            <em style={{ fontStyle: "italic", color: "var(--teal)" }}>Gabinete</em>
          </h2>
        </div>

        {/* ── Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
        }}>

          {/* ── Coluna esquerda ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontSize: "1rem", color: "var(--muted-fg)", lineHeight: 1.7, marginBottom: "0.5rem" }}>
              Envie sua mensagem, sugestão ou demanda diretamente ao gabinete
              do Vereador Robertinho. Respondemos com atenção a cada cidadão.
            </p>

            {/* Cards de informação */}
            {CONTATO_INFO.map((info, i) => {
              const Icon = INFO_ICONS[i];
              return (
                <div key={info.t} style={{
                  display: "flex", alignItems: "flex-start", gap: "1rem",
                  padding: "1.25rem 1.5rem", borderRadius: 18,
                  background: "var(--card)", border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: "rgba(39,174,96,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {Icon
                      ? <Icon size={18} color="var(--teal)" />
                      : <Instagram size={18} color="var(--teal)" />}
                  </div>
                  <div>
                    <p style={{
                      fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: "0.08em", color: "var(--muted-fg)", marginBottom: "0.2rem",
                    }}>
                      {info.t}
                    </p>
                    <p style={{ fontSize: "0.95rem", color: "var(--foreground)", fontWeight: 500 }}>
                      {info.d}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* ── Botões de redes sociais ── */}
            <div style={{
              padding: "1.25rem 1.5rem", borderRadius: 18,
              background: "var(--card)", border: "1px solid var(--border)",
              boxShadow: "var(--shadow-card)",
              display: "flex", flexDirection: "column", gap: "0.85rem",
            }}>
              <p style={{
                fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.12em", color: "var(--muted-fg)",
              }}>
                Siga nas redes sociais
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>

              {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá%2C%20gostaria%20de%20entrar%20em%20contato%20com%20o%20gabinete%20do%20Vereador%20Robertinho.`}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="WhatsApp do Gabinete"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.55rem 1.1rem", borderRadius: 9999,
                    background: "#25D366",
                    color: "#fff", fontWeight: 600, fontSize: "0.82rem",
                    textDecoration: "none", transition: "filter 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <WhatsAppIcon size={14} /> WhatsApp
                </a>

                {/* Instagram */}
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram @robertinhoce"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.55rem 1.1rem", borderRadius: 9999,
                    background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                    color: "#fff", fontWeight: 600, fontSize: "0.82rem",
                    textDecoration: "none", transition: "filter 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <Instagram size={14} /> Instagram
                </a>

                {/* Facebook */}
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook @robertinhoce"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.55rem 1.1rem", borderRadius: 9999,
                    background: "#1877f2",
                    color: "#fff", fontWeight: 600, fontSize: "0.82rem",
                    textDecoration: "none", transition: "filter 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <Facebook size={14} /> Facebook
                </a>

                {/* TikTok */}
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="TikTok @robertinhoce"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.55rem 1.1rem", borderRadius: 9999,
                    background: "#010101",
                    color: "#fff", fontWeight: 600, fontSize: "0.82rem",
                    textDecoration: "none", transition: "filter 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.4)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <TikTokIcon size={14} /> TikTok
                </a>
              </div>

              {/* Nota de segurança discreta */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                fontSize: "0.72rem", color: "var(--muted-fg)",
                borderTop: "1px solid var(--border)", paddingTop: "0.75rem",
              }}>
                <ShieldCheck size={12} color="var(--teal)" />
                Protegido por reCAPTCHA v3 &amp; Formspark
              </div>
            </div>
          </div>

          {/* ── Formulário ── */}
          <div style={{
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: 24, padding: "2.25rem", boxShadow: "var(--shadow-card)",
          }}>
            {status === "success" ? (
              /* ── Tela de confirmação ── */
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "3rem 1rem", gap: "1rem", textAlign: "center",
              }}>
                <CheckCircle2 size={52} color="var(--teal)" strokeWidth={1.5} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700 }}>
                  Mensagem enviada!
                </h3>
                <p style={{ color: "var(--muted-fg)", fontSize: "0.95rem" }}>
                  Obrigado pelo contato. O gabinete retornará em breve.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    background: "transparent", border: "none",
                    color: "var(--teal)", fontSize: "0.9rem", fontWeight: 600,
                    cursor: "pointer", textDecoration: "underline",
                    fontFamily: "var(--font-sans)", marginTop: "0.5rem",
                  }}
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                {/* Nome + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label
                      htmlFor="contato-nome"
                      style={{ display: "block", fontSize: "0.825rem", fontWeight: 600, marginBottom: "0.45rem" }}
                    >
                      Nome completo *
                    </label>
                    <input
                      id="contato-nome" name="nome" type="text" required
                      placeholder="Ex.: José Roberto"
                      className="contato-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contato-email"
                      style={{ display: "block", fontSize: "0.825rem", fontWeight: 600, marginBottom: "0.45rem" }}
                    >
                      E-mail *
                    </label>
                    <input
                      id="contato-email" name="email" type="email" required
                      placeholder="seu@email.com"
                      className="contato-input"
                    />
                  </div>
                </div>

                {/* Bairro */}
                <div>
                  <label
                    htmlFor="contato-bairro"
                    style={{ display: "block", fontSize: "0.825rem", fontWeight: 600, marginBottom: "0.45rem" }}
                  >
                    Bairro / Comunidade
                  </label>
                  <input
                    id="contato-bairro" name="bairro" type="text"
                    placeholder="Bairro ou comunidade em Martinópole (opcional)"
                    className="contato-input"
                  />
                </div>

                {/* Mensagem */}
                <div>
                  <label
                    htmlFor="contato-mensagem"
                    style={{ display: "block", fontSize: "0.825rem", fontWeight: 600, marginBottom: "0.45rem" }}
                  >
                    Mensagem *
                  </label>
                  <textarea
                    id="contato-mensagem" name="mensagem" required
                    rows={6} maxLength={2000}
                    placeholder="Sua mensagem, sugestão ou demanda para o gabinete..."
                    className="contato-input"
                  />
                </div>

                {/* Erro */}
                {erro && (
                  <p
                    role="alert"
                    style={{
                      fontSize: "0.875rem", color: "#dc2626",
                      padding: "0.6rem 0.9rem", borderRadius: 10,
                      background: "rgba(220,38,38,0.06)",
                      border: "1px solid rgba(220,38,38,0.2)",
                    }}
                  >
                    {erro}
                  </p>
                )}

                {/* Nota reCAPTCHA — exibida dentro do form conforme ToS do Google */}
                <p style={{
                  fontSize: "0.72rem",
                  color: "var(--muted-fg)",
                  lineHeight: 1.5,
                }}>
                  Este site é protegido pelo reCAPTCHA. Aplicam-se a{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ color: "var(--teal)", textDecoration: "underline" }}
                  >
                    Política de Privacidade
                  </a>{" "}
                  e os{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ color: "var(--teal)", textDecoration: "underline" }}
                  >
                    Termos de Serviço
                  </a>{" "}
                  do Google.
                </p>

                {/* Botão enviar */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="contato-btn"
                >
                  {status === "sending" ? (
                    <><Loader2 size={18} className="contato-spin" /> Enviando...</>
                  ) : (
                    <>Enviar mensagem <ArrowRight size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
