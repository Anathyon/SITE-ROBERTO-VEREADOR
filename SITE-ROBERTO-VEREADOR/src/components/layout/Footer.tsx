import { Instagram, Facebook, Megaphone } from "lucide-react";
import { NAV } from "../../data";
import { TikTok } from "../ui/TikTok";

export function Footer() {
  return (
    <footer style={{
      width: "100%", background: "var(--teal-deep)", color: "white",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "5rem 1.5rem 2.5rem",
    }}>
      <div style={{ width: "100%", maxWidth: 1280 }}>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "3rem",
          paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          {/* Brand */}
          <div style={{ flex: "2 1 260px" }}>
            <a href="#top" style={{ display: "inline-block", textDecoration: "none" }}>
              <img src="/logo.png" alt="Vereador Roberto"
                style={{ height: 44, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </a>
            <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 380, fontSize: "0.9rem" }}>
              Um mandato de portas abertas. Feito para escutar, propor e prestar contas.
            </p>
          </div>

          {/* Nav */}
          <div style={{ flex: "1 1 140px" }}>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--coral)", marginBottom: "1rem" }}>
              Navegue
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="footer-link"
                    style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes */}
          <div style={{ flex: "1 1 140px" }}>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--coral)", marginBottom: "1rem" }}>
              Redes
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { icon: Instagram, href: "https://instagram.com", l: "Instagram" },
                { icon: Facebook, href: "https://facebook.com", l: "Facebook" },
                { icon: TikTok, href: "https://tiktok.com", l: "TikTok" },
                { icon: Megaphone, href: "#", l: "Newsletter" },
              ].map((s) => (
                <li key={s.l}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="footer-link"
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>
                    <s.icon width={15} height={15} /> {s.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          paddingTop: "2rem",
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem",
          fontSize: "0.75rem", color: "rgba(255,255,255,0.35)",
        }}>
          <span>© {new Date().getFullYear()} Gabinete do Vereador Roberto. Todos os direitos reservados.</span>
          <span>Conteúdo institucional · Este site não veicula propaganda eleitoral.</span>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--coral) !important; }
      `}</style>
    </footer>
  );
}
