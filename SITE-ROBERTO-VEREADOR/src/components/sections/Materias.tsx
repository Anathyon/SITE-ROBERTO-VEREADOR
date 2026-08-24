import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, AlertCircle, X, FileText, Calendar,
  Tag, Users, Download, ChevronLeft, ChevronRight, ExternalLink
} from "lucide-react";
import { Section } from "../ui/Section";
import { MATERIAS } from "../../data";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, SHOULD_FETCH_API } from "../../config";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface ApiMateria {
  id: number;
  slug: string;
  tipo: { nome: string; slug: string };
  numero: number;
  numeracao: string;
  ano: number;
  data: string;
  titulo: string;
  ementa: string;
  autores: string[];
  documento: { url: string; nome: string; tamanho: number } | null;
  conteudo_html?: string;
}

interface ApiListResponse {
  data: ApiMateria[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  return `${d} ${months[parseInt(m) - 1]} ${y}`;
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};

// ─── Fetch ────────────────────────────────────────────────────────────────────

const fetchMaterias = async (page: number): Promise<ApiListResponse> => {
  const res = await fetch(`${API_BASE_URL}/materias?pagina=${page}`);
  if (!res.ok) throw new Error("Erro ao buscar matérias");
  return res.json();
};

const fetchMateriaDetail = async (slug: string): Promise<ApiMateria> => {
  const res = await fetch(`${API_BASE_URL}/materias/${slug}`);
  if (!res.ok) throw new Error("Erro ao buscar detalhes");
  const json = await res.json();
  return json.data;
};

// ─── Modal ────────────────────────────────────────────────────────────────────

function MateriaModal({
  slug,
  onClose,
}: {
  slug: string;
  onClose: () => void;
}) {
  const localItem = MATERIAS.find((m) => m.slug === slug);
  const fallbackDetail: ApiMateria | undefined = localItem
    ? {
        id: 0,
        slug: localItem.slug,
        tipo: { nome: localItem.tag, slug: localItem.tag.toLowerCase() },
        numero: 0,
        numeracao: localItem.n,
        ano: 2026,
        data: localItem.date,
        titulo: localItem.title,
        ementa: localItem.description ?? "",
        autores: ["Vereador Roberto Moreira"],
        documento: null,
      }
    : undefined;

  const { data: apiData, isLoading, error } = useQuery({
    queryKey: ["materia-detail", slug],
    queryFn: () => fetchMateriaDetail(slug),
    staleTime: 5 * 60 * 1000,
    enabled: SHOULD_FETCH_API,
  });

  const data = apiData ?? fallbackDetail;

  // Fechar com ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Travar scroll do body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(13,58,32,0.55)",
          backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--card)",
            borderRadius: 24,
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-card)",
            width: "100%",
            maxWidth: 720,
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
          }}
        >
          {/* Botão fechar */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            style={{
              position: "sticky", top: "1rem",
              float: "right", marginRight: "1.25rem",
              width: 36, height: 36, borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--card)",
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "var(--muted-fg)", zIndex: 10,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--secondary-bg)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--card)")}
          >
            <X size={16} />
          </button>

          <div style={{ padding: "2rem 2rem 2.5rem" }}>
            {/* Loading */}
            {isLoading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[40, 20, 80, 200].map((h, i) => (
                  <div key={i} style={{
                    height: h, borderRadius: 8,
                    background: "var(--border)",
                    animation: "pulse-shimmer 1.5s infinite",
                  }} />
                ))}
              </div>
            )}

            {/* Erro */}
            {error && !isLoading && (
              <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--muted-fg)" }}>
                <AlertCircle size={40} style={{ color: "#d9534f", marginBottom: "1rem" }} />
                <p>Não foi possível carregar os detalhes desta matéria.</p>
              </div>
            )}

            {/* Conteúdo */}
            {data && (
              <>
                {/* Tags de topo */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                    fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em",
                    color: "var(--teal)", background: "rgba(39,174,96,0.1)",
                    padding: "0.25rem 0.7rem", borderRadius: 9999, fontWeight: 600,
                  }}>
                    <Tag size={11} /> {data.tipo.nome}
                  </span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                    fontSize: "0.8rem", color: "var(--muted-fg)",
                  }}>
                    <Calendar size={13} /> {formatDate(data.data)}
                  </span>
                </div>

                {/* Número */}
                <div style={{
                  fontFamily: "monospace", fontSize: "0.85rem",
                  color: "var(--teal)", fontWeight: 700,
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  marginBottom: "0.75rem",
                }}>
                  <FileText size={15} /> {data.tipo.nome} {data.numeracao}
                </div>

                {/* Título */}
                <h2 style={{
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)", lineHeight: 1.25,
                  color: "var(--foreground)", marginBottom: "1.5rem",
                }}>
                  {data.titulo}
                </h2>

                <hr style={{ border: 0, borderTop: "1px solid var(--border)", marginBottom: "1.5rem" }} />

                {/* Ementa */}
                {data.ementa && (
                  <div style={{
                    background: "var(--secondary-bg)", borderRadius: 12,
                    padding: "1rem 1.25rem", marginBottom: "1.5rem",
                    borderLeft: "3px solid var(--teal)",
                  }}>
                    <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--teal)", fontWeight: 700, marginBottom: "0.4rem" }}>Ementa</div>
                    <p style={{ color: "var(--foreground)", fontSize: "0.95rem", lineHeight: 1.6 }}>{data.ementa}</p>
                  </div>
                )}

                {/* Conteúdo HTML */}
                {data.conteudo_html && (
                  <div
                    style={{ color: "var(--muted-fg)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem" }}
                    dangerouslySetInnerHTML={{ __html: data.conteudo_html }}
                  />
                )}

                {/* Metadados */}
                <div style={{
                  background: "var(--secondary-bg)", borderRadius: 16,
                  padding: "1.25rem 1.5rem",
                  display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "1.25rem", fontSize: "0.875rem", marginBottom: "1.5rem",
                }}>
                  <div>
                    <div style={{ color: "var(--muted-fg)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Tipo</div>
                    <div style={{ fontWeight: 600, color: "var(--foreground)" }}>{data.tipo.nome}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--muted-fg)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Numeração</div>
                    <div style={{ fontWeight: 600, color: "var(--foreground)" }}>{data.numeracao}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--muted-fg)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Casa Legislativa</div>
                    <div style={{ fontWeight: 600, color: "var(--foreground)" }}>Câmara Municipal de Martinópole</div>
                  </div>
                  {data.autores?.length > 0 && (
                    <div>
                      <div style={{ color: "var(--muted-fg)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Users size={11} /> Autor(es)
                      </div>
                      <div style={{ fontWeight: 600, color: "var(--foreground)" }}>{data.autores.join(", ")}</div>
                    </div>
                  )}
                </div>

                {/* Documento PDF */}
                {data.documento && (
                  <a
                    href={data.documento.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.6rem",
                      background: "var(--gradient-teal)", color: "white",
                      padding: "0.8rem 1.75rem", borderRadius: 9999,
                      fontWeight: 600, fontSize: "0.9rem",
                      textDecoration: "none", transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    <Download size={16} />
                    Baixar documento PDF
                    <span style={{ fontSize: "0.75rem", opacity: 0.75 }}>({formatBytes(data.documento.tamanho)})</span>
                    <ExternalLink size={13} style={{ opacity: 0.7 }} />
                  </a>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function Materias() {
  const [page, setPage] = useState(1);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["materias", page],
    queryFn: () => fetchMaterias(page),
    staleTime: 2 * 60 * 1000,
    placeholderData: (prev) => prev,
    enabled: SHOULD_FETCH_API,
  });

  const handleOpen = useCallback((slug: string) => setSelectedSlug(slug), []);
  const handleClose = useCallback(() => setSelectedSlug(null), []);

  // Fallback estático quando API offline ou desativada
  const isOffline = !!error && !isLoading;
  const apiItems = data?.data ?? null;
  const meta = data?.meta;

  const fallbackItems = MATERIAS.map((m) => ({
    id: 0,
    slug: m.slug,
    tipo: { nome: m.tag, slug: m.tag.toLowerCase() },
    numero: 0,
    numeracao: m.n,
    ano: 2026,
    data: m.date,
    titulo: m.title,
    ementa: (m as any).description ?? "",
    autores: ["Vereador Roberto Moreira"],
    documento: null,
  } as ApiMateria));

  const items: ApiMateria[] = apiItems ?? fallbackItems;

  return (
    <Section
      id="materias"
      kicker="Matérias apresentadas"
      title={<>Cada proposta com <em style={{ fontStyle: "italic" }}>nome</em>, número e destino.</>}
    >
      {/* Banner offline */}
      {isOffline && (
        <div style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          padding: "0.75rem 1rem",
          background: "rgba(229,193,88,0.1)", border: "1px solid var(--coral)",
          borderRadius: 12, color: "var(--wine)",
          marginBottom: "1.5rem", fontSize: "0.85rem",
        }}>
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>Modo de Demonstração — servidor da API offline. Exibindo dados locais.</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Skeletons */}
        {isLoading && !apiItems && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{
            height: 94, borderRadius: 20,
            border: "1px solid var(--border)", background: "var(--card)",
            animation: "pulse-shimmer 1.5s infinite",
          }} />
        ))}

        {/* Lista */}
        {items.map((it, i) => (
          <motion.button
            key={it.slug}
            onClick={() => handleOpen(it.slug)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            className="materia-card"
            style={{
              display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem",
              padding: "1.75rem 2rem", borderRadius: 20,
              border: "1px solid var(--border)", background: "var(--card)",
              textAlign: "left", cursor: "pointer",
              width: "100%", transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            {/* Data + número */}
            <div style={{ flex: "0 0 auto", minWidth: 120 }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--muted-fg)" }}>
                {formatDate(it.data)}
              </div>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "1.3rem", color: "var(--teal)", marginTop: "0.25rem",
              }}>
                {it.tipo.nome} {it.numeracao}
              </div>
            </div>

            {/* Título */}
            <div style={{ flex: "1 1 200px" }}>
              <span style={{
                display: "inline-block", fontSize: "0.65rem", textTransform: "uppercase",
                letterSpacing: "0.15em", color: "var(--teal)",
                background: "rgba(39,174,96,0.1)",
                padding: "0.2rem 0.65rem", borderRadius: 9999,
              }}>
                {it.tipo.nome}
              </span>
              <h3 style={{
                marginTop: "0.5rem", fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(0.95rem, 2vw, 1.25rem)", lineHeight: 1.3,
                color: "var(--foreground)",
              }}>
                {it.titulo}
              </h3>
              {it.ementa && (
                <p style={{
                  marginTop: "0.3rem", fontSize: "0.82rem",
                  color: "var(--muted-fg)", lineHeight: 1.5,
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {it.ementa}
                </p>
              )}
            </div>

            {/* Ícone */}
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.2s, border-color 0.2s",
            }}>
              <ArrowUpRight size={18} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Paginação */}
      {meta && meta.last_page > 1 && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "0.75rem", marginTop: "2rem",
        }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid var(--border)", background: "var(--card)",
              cursor: page === 1 ? "not-allowed" : "pointer",
              opacity: page === 1 ? 0.4 : 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--foreground)", transition: "background 0.2s",
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <span style={{ fontSize: "0.875rem", color: "var(--muted-fg)" }}>
            Página <strong style={{ color: "var(--foreground)" }}>{meta.current_page}</strong> de <strong style={{ color: "var(--foreground)" }}>{meta.last_page}</strong>
            <span style={{ marginLeft: "0.5rem", opacity: 0.6 }}>({meta.total} matérias)</span>
          </span>

          <button
            onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
            disabled={page === meta.last_page}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid var(--border)", background: "var(--card)",
              cursor: page === meta.last_page ? "not-allowed" : "pointer",
              opacity: page === meta.last_page ? 0.4 : 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--foreground)", transition: "background 0.2s",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedSlug && (
        <MateriaModal slug={selectedSlug} onClose={handleClose} />
      )}

      <style>{`
        .materia-card:hover {
          border-color: var(--teal) !important;
          box-shadow: 0 8px 30px -10px rgba(13,58,32,0.12);
        }
        @keyframes pulse-shimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.95; }
        }
      `}</style>
    </Section>
  );
}
