import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MateriaDetails } from "./materia.$slug";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

// Força a API habilitada nos testes independente do .env
vi.mock("../config", () => ({
  API_BASE_URL: "http://test-api/api/v1",
  SHOULD_FETCH_API: true,
}));

// Mock the router components/hooks
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ children, to, ...props }: any) => (
      <a href={to} data-testid="router-link" {...props}>
        {children}
      </a>
    ),
    useParams: vi.fn(),
    useLocation: () => ({ pathname: "/materia/oficio-16-2026" }),
  };
});

// Mock Header and Footer to avoid rendering their internal sub-components in route tests
vi.mock("../components/layout/Header", () => ({
  Header: () => <header data-testid="mock-header">Header Mock</header>,
}));
vi.mock("../components/layout/Footer", () => ({
  Footer: () => <footer data-testid="mock-footer">Footer Mock</footer>,
}));

describe("Rota de Detalhes da Matéria", () => {
  let queryClient: QueryClient;
  const fetchMock = vi.spyOn(globalThis, "fetch");

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    fetchMock.mockReset();
  });

  it("deve renderizar os detalhes da matéria retornados com sucesso pela API", async () => {
    vi.mocked(useParams).mockReturnValue({ slug: "projeto-lei-01" });

    const mockApiMateria = {
      numero: "Projeto de Lei 01/2026",
      categoria: "Educação",
      titulo: "Criação de escola de tempo integral",
      data: "15 jul 2026",
      texto: "Texto detalhado sobre a criação da escola pública municipal...",
      situacao: "Em Tramitação",
      autor: "Vereador Roberto Moreira",
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiMateria,
    } as Response);

    render(
      <QueryClientProvider client={queryClient}>
        <MateriaDetails />
      </QueryClientProvider>
    );

    // Deve renderizar cabeçalho e rodapé
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();

    // Espera os dados da API carregarem
    await waitFor(() => {
      expect(screen.getByText("Projeto de Lei 01/2026")).toBeInTheDocument();
      expect(screen.getByText("Educação")).toBeInTheDocument();
      expect(screen.getByText("Criação de escola de tempo integral")).toBeInTheDocument();
      expect(screen.getByText("Texto detalhado sobre a criação da escola pública municipal...")).toBeInTheDocument();
      expect(screen.getByText("Em Tramitação")).toBeInTheDocument();
    });
  });

  it("deve carregar dados locais se a chamada da API falhar mas o slug existir localmente", async () => {
    // Definimos o slug correspondente aos mock dados de data.ts
    vi.mocked(useParams).mockReturnValue({ slug: "oficio-16-2026" });

    // Simula erro de API
    fetchMock.mockRejectedValueOnce(new Error("API Error"));

    render(
      <QueryClientProvider client={queryClient}>
        <MateriaDetails />
      </QueryClientProvider>
    );

    // Deve exibir o aviso de modo de demonstração/offline
    await waitFor(() => {
      expect(screen.getByText(/Modo de Demonstração:/i)).toBeInTheDocument();
    });

    // Deve exibir as informações da matéria do local mock
    expect(screen.getByText("Ofício 16/2026")).toBeInTheDocument();
    expect(screen.getByText("Aprovação")).toBeInTheDocument();
    expect(screen.getByText("Envio e acompanhamento de matérias aprovadas na Câmara")).toBeInTheDocument();
    expect(screen.getByText(/Este ofício trata do envio sistemático/i)).toBeInTheDocument();
  });

  it("deve exibir página de erro se a API falhar e o slug não constar nos dados locais", async () => {
    vi.mocked(useParams).mockReturnValue({ slug: "slug-desconhecido" });
    fetchMock.mockRejectedValueOnce(new Error("API Offline"));

    render(
      <QueryClientProvider client={queryClient}>
        <MateriaDetails />
      </QueryClientProvider>
    );

    // Espera que renderize a tela de erro
    await waitFor(() => {
      expect(screen.getByText("Matéria Não Encontrada")).toBeInTheDocument();
      expect(screen.getByText(/Não foi possível carregar os detalhes desta matéria/i)).toBeInTheDocument();
    });
  });
});
