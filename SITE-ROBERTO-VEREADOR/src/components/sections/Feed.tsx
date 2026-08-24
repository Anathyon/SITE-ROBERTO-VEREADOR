import { useState, useEffect, useCallback } from "react";
import {
  Instagram,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Play,
  Image as ImageIcon,
} from "lucide-react";
import { Section } from "../ui/Section";
import { FEED_POSTS, SOCIAL_LINKS } from "../../data";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, SHOULD_FETCH_API } from "../../config";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface ApiPost {
  id: number;
  slug: string;
  titulo: string;
  legenda: string | null;
  categoria: string;
  imagem: string | null;
  video: string | null;       // URL de vídeo (mp4 / embed) — pode ser nulo
  url_instagram: string | null;
  created_at: string;
}

interface ApiListResponse {
  data: ApiPost[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
}

// ─── Dados de fallback (estáticos) ───────────────────────────────────────────

const FALLBACK_POSTS: ApiPost[] = FEED_POSTS.map((p, i) => ({
  id: i + 1,
  slug: `post-${i + 1}`,
  titulo: p.t,
  legenda: p.t,
  categoria: p.tag,
  imagem: p.img,
  video: null,
  url_instagram: p.url,
  created_at: "",
}));

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function fetchInstagram(page: number): Promise<ApiListResponse> {
  const res = await fetch(`${API_BASE_URL}/instagram?pagina=${page}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<ApiListResponse>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Detecta se a URL é um embed do YouTube/Vimeo ou um arquivo de vídeo direto */
function isEmbedUrl(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com");
}

function toEmbedUrl(url: string): string {
  // youtube.com/watch?v=ID  →  youtube.com/embed/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  // vimeo.com/ID  →  player.vimeo.com/video/ID
  const vmMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}?autoplay=1`;
  return url;
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function PostModal({ post, onClose }: { post: ApiPost; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const hasVideo = Boolean(post.video);
  const hasImage = Boolean(post.imagem);
  const isEmbed  = hasVideo && isEmbedUrl(post.video!);

  return (
    /* ── Backdrop ── */
    <div
      role="dialog"
      aria-modal="true"
      aria-label={post.titulo}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(5,20,11,0.88)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        overflowY: "auto",
      }}
    >
      {/* ── Painel ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--card)",
          borderRadius: 28,
          border: "1px solid var(--border)",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
          width: "100%",
          maxWidth: 660,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            width: 38, height: 38, borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(6px)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--foreground)", zIndex: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--secondary-bg)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {/* ── Mídia (vídeo ou imagem) ── */}
        {hasVideo ? (
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
            {isEmbed ? (
              <iframe
                src={toEmbedUrl(post.video!)}
                title={post.titulo}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            ) : (
              <video
                src={post.video!}
                controls
                autoPlay
                playsInline
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
              />
            )}
          </div>
        ) : hasImage ? (
          <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden", maxHeight: 480 }}>
            <img
              src={post.imagem!}
              alt={post.titulo}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Gradiente inferior */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
              background: "linear-gradient(to top, rgba(5,20,11,0.72) 0%, transparent 100%)",
            }} />
            {/* Badge categoria sobre a imagem */}
            <span style={{
              position: "absolute", top: "1.1rem", left: "1.1rem",
              fontSize: "0.62rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.14em",
              color: "var(--coral)",
              background: "rgba(5,20,11,0.72)", backdropFilter: "blur(6px)",
              border: "1px solid rgba(229,193,88,0.4)",
              padding: "0.28rem 0.7rem", borderRadius: 9999,
            }}>
              {post.categoria}
            </span>
          </div>
        ) : (
          /* Placeholder sem mídia */
          <div style={{
            width: "100%", aspectRatio: "16/9",
            background: "var(--secondary-bg)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ImageIcon size={48} color="var(--muted-fg)" strokeWidth={1} />
          </div>
        )}

        {/* ── Corpo do modal ── */}
        <div style={{ padding: "1.75rem 2rem 2rem" }}>

          {/* Perfil */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1rem" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "var(--gradient-teal)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Instagram size={17} color="white" />
            </div>
            <div>
              <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.2 }}>
                @robertinhoce
              </p>
              <p style={{ fontSize: "0.7rem", color: "var(--muted-fg)" }}>
                Vereador Robertinho Moreira · Martinópole - CE
              </p>
            </div>
            {/* Badge categoria (quando não há imagem para exibi-la) */}
            {!hasImage && !hasVideo && (
              <span style={{
                marginLeft: "auto",
                fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.12em", color: "var(--teal)",
                background: "rgba(39,174,96,0.1)", padding: "0.25rem 0.65rem", borderRadius: 9999,
              }}>
                {post.categoria}
              </span>
            )}
          </div>

          {/* Título */}
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(1.15rem, 2.5vw, 1.55rem)", lineHeight: 1.3,
            color: "var(--foreground)", marginBottom: "0.85rem",
          }}>
            {post.titulo}
          </h2>

          {/* Legenda */}
          {post.legenda && post.legenda !== post.titulo && (
            <p style={{
              fontSize: "0.94rem", color: "var(--muted-fg)",
              lineHeight: 1.75, marginBottom: "1.25rem",
              whiteSpace: "pre-line",
            }}>
              {post.legenda}
            </p>
          )}

          {/* Divisor */}
          <hr style={{ border: 0, borderTop: "1px solid var(--border)", margin: "1.25rem 0" }} />

          {/* Rodapé do modal */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "0.75rem",
            alignItems: "center", justifyContent: "space-between",
          }}>
            {/* Categoria */}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              fontSize: "0.68rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.12em",
              color: "var(--teal)", background: "rgba(39,174,96,0.1)",
              padding: "0.28rem 0.75rem", borderRadius: 9999,
            }}>
              {post.categoria}
            </span>

            {/* CTA Instagram */}
            {post.url_instagram && (
              <a
                href={post.url_instagram}
                target="_blank"
                rel="noreferrer noopener"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "var(--gradient-accent)", color: "var(--teal-deep)",
                  fontWeight: 700, fontSize: "0.875rem",
                  padding: "0.65rem 1.5rem", borderRadius: 9999,
                  textDecoration: "none",
                  boxShadow: "0 4px 14px -4px rgba(201,162,39,0.4)",
                  transition: "filter 0.15s, transform 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Instagram size={15} />
                Ver no Instagram
                <ExternalLink size={12} style={{ opacity: 0.7 }} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Card do feed ─────────────────────────────────────────────────────────────

function FeedCard({ post, onOpen }: { post: ApiPost; onOpen: (p: ApiPost) => void }) {
  const hasVideo = Boolean(post.video);

  return (
    <button
      onClick={() => onOpen(post)}
      aria-label={`Ver detalhes: ${post.titulo}`}
      className="feed-card"
      style={{
        aspectRatio: "1/1",
        borderRadius: 20, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        position: "relative",
        background: "rgba(255,255,255,0.04)",
        cursor: "pointer", padding: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.35)",
        transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
        textAlign: "left",
      }}
    >
      {/* Imagem/vídeo de fundo */}
      {post.imagem && (
        <img
          src={post.imagem}
          alt=""
          loading="lazy"
          aria-hidden="true"
          className="feed-bg-img"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            transition: "transform 0.5s ease",
          }}
        />
      )}

      {/* Gradiente */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(5,20,11,0.96) 0%, rgba(5,20,11,0.4) 55%, rgba(5,20,11,0.15) 100%)",
        zIndex: 1,
      }} />

      {/* Conteúdo */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "1.1rem", height: "100%", width: "100%",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}>
        {/* Topo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: "0.58rem", textTransform: "uppercase",
            letterSpacing: "0.15em", fontWeight: 700,
            color: "var(--coral)", background: "rgba(5,20,11,0.65)",
            border: "1px solid rgba(229,193,88,0.35)",
            padding: "0.2rem 0.6rem", borderRadius: 9999,
            backdropFilter: "blur(4px)",
          }}>
            {post.categoria}
          </span>

          {/* Ícone: vídeo ou Instagram */}
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.18)",
          }}>
            {hasVideo
              ? <Play size={13} color="white" fill="white" />
              : <Instagram size={13} color="white" />
            }
          </div>
        </div>

        {/* Base */}
        <div>
          <p style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)", lineHeight: 1.35,
            color: "white",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {post.titulo}
          </p>
          <div style={{
            marginTop: "0.5rem",
            display: "inline-flex", alignItems: "center", gap: "0.3rem",
            fontSize: "0.68rem", fontWeight: 600, color: "var(--coral)",
          }}>
            {hasVideo ? "Assistir vídeo" : "Ver detalhes"} <ExternalLink size={10} />
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function Feed() {
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<ApiPost | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["instagram", page],
    queryFn: () => fetchInstagram(page),
    staleTime: 2 * 60 * 1000,
    placeholderData: prev => prev,
    enabled: SHOULD_FETCH_API,
    retry: false,
  });

  const handleOpen  = useCallback((post: ApiPost) => setSelectedPost(post), []);
  const handleClose = useCallback(() => setSelectedPost(null), []);

  const isOffline = Boolean(error && !isLoading);
  const apiPosts  = data?.data ?? null;
  const meta      = data?.meta;

  // Usa dados da API se vieram com conteúdo; caso contrário fallback estático
  const posts = apiPosts && apiPosts.length > 0 ? apiPosts : FALLBACK_POSTS;

  return (
    <Section
      kicker="Comunicação · @robertinhoce"
      title={
        <>Do plenário direto pro seu{" "}
          <em style={{ fontStyle: "italic" }}>feed</em>.
        </>
      }
      background="var(--teal-deep)"
      color="white"
    >
      {/* Banner offline */}
      {isOffline && (
        <div style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          padding: "0.75rem 1rem", marginBottom: "1.5rem",
          background: "rgba(229,193,88,0.1)",
          border: "1px solid rgba(229,193,88,0.3)",
          borderRadius: 12, color: "var(--coral)", fontSize: "0.85rem",
        }}>
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          Exibindo publicações salvas — servidor temporariamente indisponível.
        </div>
      )}

      {/* Grid */}
      <div className="feed-grid" style={{ display: "grid", gap: "1.25rem" }}>
        {/* Skeletons */}
        {isLoading && !apiPosts && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            aspectRatio: "1/1", borderRadius: 20,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            animation: "feed-shimmer 1.6s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }} />
        ))}

        {/* Cards */}
        {!isLoading && posts.map(post => (
          <FeedCard key={post.id} post={post} onOpen={handleOpen} />
        ))}
      </div>

      {/* Paginação */}
      {meta && meta.last_page > 1 && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "0.75rem", marginTop: "2rem",
        }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Página anterior"
            style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              cursor: page === 1 ? "not-allowed" : "pointer",
              opacity: page === 1 ? 0.4 : 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", transition: "background 0.15s",
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
            Página{" "}
            <strong style={{ color: "white" }}>{meta.current_page}</strong>
            {" "}de{" "}
            <strong style={{ color: "white" }}>{meta.last_page}</strong>
          </span>
          <button
            onClick={() => setPage(p => Math.min(meta.last_page, p + 1))}
            disabled={page === meta.last_page}
            aria-label="Próxima página"
            style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              cursor: page === meta.last_page ? "not-allowed" : "pointer",
              opacity: page === meta.last_page ? 0.4 : 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", transition: "background 0.15s",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* CTA Instagram */}
      <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            background: "var(--gradient-accent)", color: "var(--teal-deep)",
            fontWeight: 700, padding: "0.9rem 2rem", borderRadius: 9999,
            textDecoration: "none", fontSize: "0.95rem",
            boxShadow: "0 8px 24px -4px rgba(0,0,0,0.4)",
            transition: "filter 0.15s, transform 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <Instagram size={18} /> Seguir @robertinhoce no Instagram
        </a>
      </div>

      {/* Modal */}
      {selectedPost && <PostModal post={selectedPost} onClose={handleClose} />}

      {/* Estilos escopados */}
      <style>{`
        .feed-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 540px) {
          .feed-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .feed-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .feed-card:hover {
          transform: translateY(-6px) scale(1.01) !important;
          border-color: rgba(229,193,88,0.5) !important;
          box-shadow: 0 24px 48px -12px rgba(0,0,0,0.55) !important;
        }
        .feed-card:hover .feed-bg-img {
          transform: scale(1.06);
        }
        @keyframes feed-shimmer {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.7; }
        }
      `}</style>
    </Section>
  );
}
