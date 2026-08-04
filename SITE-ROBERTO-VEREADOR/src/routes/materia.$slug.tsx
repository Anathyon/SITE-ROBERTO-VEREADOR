import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ArrowLeft, Calendar, FileText, Tag, ShieldCheck, AlertCircle } from "lucide-react";
import { API_BASE_URL } from "../config";
import { MATERIAS } from "../data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/materia/$slug")({
  component: MateriaDetails,
});

interface MateriaData {
  id?: string | number;
  number: string;
  title: string;
  slug: string;
  date: string;
  tag: string;
  description: string;
  status?: string;
  author?: string;
}

function normalizeMateria(raw: any): MateriaData {
  return {
    id: raw.id,
    number: raw.numero || raw.number || raw.n || "Ofício",
    title: raw.titulo || raw.title || "",
    slug: raw.slug || "",
    date: raw.data || raw.date || "",
    tag: raw.categoria || raw.category || raw.tag || "Legislativo",
    description: raw.texto || raw.conteudo || raw.description || raw.content || "",
    status: raw.status || raw.situacao || "Aprovado",
    author: raw.autor || raw.author || "Vereador Roberto Moreira",
  };
}

const fetchMateriaDetail = async (slug: string): Promise<any> => {
  const res = await fetch(`${API_BASE_URL}/materias/${slug}`);
  if (!res.ok) {
    throw new Error(`Erro ao carregar detalhes da matéria (Status: ${res.status})`);
  }
  return res.json();
};

export function MateriaDetails() {
  const { slug } = useParams({ from: "/materia/$slug" });

  const { data, error, isLoading } = useQuery({
    queryKey: ["materia", slug],
    queryFn: () => fetchMateriaDetail(slug),
  });

  const localMateria = MATERIAS.find((m) => m.slug === slug);
  const fallbackData = localMateria ? normalizeMateria(localMateria) : null;
  const materia = data ? normalizeMateria(data) : (error ? fallbackData : null);

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)" }}>
      <Header />

      <main style={{ flex: 1, padding: "8rem 1rem 4rem 1rem", maxWidth: "900px", width: "100%", margin: "0 auto" }}>
        {/* Navigation link back */}
        <Link 
          to="/" 
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            color: "var(--teal)", 
            textDecoration: "none", 
            fontWeight: 600,
            marginBottom: "2rem",
            fontSize: "0.95rem",
            transition: "color 0.2s"
          }}
          className="hover-coral"
        >
          <ArrowLeft size={16} /> Voltar para o início
        </Link>

        {/* Offline fallback message */}
        {error && fallbackData && (
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.75rem", 
            padding: "1rem 1.25rem", 
            background: "rgba(229,193,88,0.1)", 
            border: "1px solid var(--coral)", 
            borderRadius: "12px", 
            color: "var(--wine)", 
            marginBottom: "2rem",
            fontSize: "0.9rem"
          }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>
              <strong>Modo de Demonstração:</strong> Conexão com o servidor da API falhou. Exibindo dados locais pré-carregados.
            </span>
          </div>
        )}

        {/* Loading state */}
        {isLoading && !fallbackData && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ height: "40px", width: "60%", background: "var(--border)", borderRadius: "8px", animation: "pulse 1.5s infinite" }} />
            <div style={{ height: "150px", width: "100%", background: "var(--border)", borderRadius: "12px", animation: "pulse 1.5s infinite" }} />
            <div style={{ height: "300px", width: "100%", background: "var(--border)", borderRadius: "12px", animation: "pulse 1.5s infinite" }} />
          </div>
        )}

        {/* Error state (when no data or fallback exists) */}
        {error && !fallbackData && !isLoading && (
          <div style={{ 
            textAlign: "center", 
            padding: "4rem 2rem", 
            background: "var(--card)", 
            border: "1px solid var(--border)", 
            borderRadius: "24px",
            boxShadow: "var(--shadow-card)"
          }}>
            <AlertCircle size={48} style={{ color: "#d9534f", marginBottom: "1rem" }} />
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.75rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
              Matéria Não Encontrada
            </h2>
            <p style={{ color: "var(--muted-fg)", marginBottom: "2rem" }}>
              Não foi possível carregar os detalhes desta matéria e não existem dados de demonstração salvos para este endereço.
            </p>
            <Link 
              to="/" 
              style={{ 
                display: "inline-block", 
                background: "var(--gradient-teal)", 
                color: "white", 
                padding: "0.75rem 2rem", 
                borderRadius: "9999px", 
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              Voltar ao Início
            </Link>
          </div>
        )}

        {/* Content detail */}
        {materia && (
          <motion.article 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }}
            style={{ 
              background: "var(--card)", 
              border: "1px solid var(--border)", 
              borderRadius: "24px", 
              boxShadow: "var(--shadow-card)",
              padding: "2.5rem 2rem",
              overflow: "hidden"
            }}
          >
            {/* Meta Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <span style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.35rem", 
                fontSize: "0.7rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.1em", 
                color: "var(--teal)", 
                background: "rgba(39,174,96,0.1)", 
                padding: "0.3rem 0.8rem", 
                borderRadius: "9999px",
                fontWeight: 600
              }}>
                <Tag size={12} />
                {materia.tag}
              </span>

              <span style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.35rem", 
                fontSize: "0.85rem", 
                color: "var(--muted-fg)" 
              }}>
                <Calendar size={14} />
                {materia.date}
              </span>

              {materia.status && (
                <span style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "0.35rem", 
                  fontSize: "0.7rem", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.15em", 
                  color: "white", 
                  background: "var(--teal-deep)", 
                  padding: "0.3rem 0.8rem", 
                  borderRadius: "9999px",
                  fontWeight: 600,
                  marginLeft: "auto"
                }}>
                  <ShieldCheck size={12} />
                  {materia.status}
                </span>
              )}
            </div>

            {/* Document Reference Code */}
            <div style={{ 
              fontFamily: "monospace", 
              fontSize: "0.875rem", 
              color: "var(--teal)", 
              fontWeight: 700, 
              display: "flex", 
              alignItems: "center", 
              gap: "0.4rem", 
              marginBottom: "1rem" 
            }}>
              <FileText size={16} />
              {materia.number}
            </div>

            {/* Main Title */}
            <h1 style={{ 
              fontFamily: "var(--font-display)", 
              fontWeight: 800, 
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)", 
              lineHeight: 1.25, 
              color: "var(--foreground)", 
              marginBottom: "2rem" 
            }}>
              {materia.title}
            </h1>

            {/* Divider */}
            <hr style={{ border: 0, borderTop: "1px solid var(--border)", marginBottom: "2rem" }} />

            {/* Content text */}
            <div style={{ 
              color: "var(--muted-fg)", 
              fontSize: "1.1rem", 
              lineHeight: 1.7, 
              whiteSpace: "pre-line",
              marginBottom: "3rem"
            }}>
              {materia.description}
            </div>

            {/* Secondary details box */}
            <div style={{ 
              background: "var(--secondary-bg)", 
              borderRadius: "16px", 
              padding: "1.5rem", 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "1.5rem",
              fontSize: "0.9rem"
            }}>
              <div>
                <div style={{ color: "var(--muted-fg)", marginBottom: "0.25rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Autor da Matéria</div>
                <div style={{ fontWeight: 600, color: "var(--foreground)" }}>{materia.author}</div>
              </div>
              <div>
                <div style={{ color: "var(--muted-fg)", marginBottom: "0.25rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Casa Legislativa</div>
                <div style={{ fontWeight: 600, color: "var(--foreground)" }}>Câmara Municipal de Martinópole</div>
              </div>
              <div>
                <div style={{ color: "var(--muted-fg)", marginBottom: "0.25rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Tipo de Documento</div>
                <div style={{ fontWeight: 600, color: "var(--foreground)" }}>{materia.number.split(" ")[0] || "Ofício Legislativo"}</div>
              </div>
            </div>
          </motion.article>
        )}
      </main>

      <Footer />

      <style>{`
        .hover-coral:hover { color: var(--coral) !important; }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
