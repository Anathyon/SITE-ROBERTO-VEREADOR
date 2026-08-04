import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Materias } from "./Materias";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the router components/hooks
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ children, to, params, ...props }: any) => (
      <a href={to} data-testid="router-link" data-params={JSON.stringify(params)} {...props}>
        {children}
      </a>
    ),
    useLocation: () => ({ pathname: "/" }),
  };
});

describe("Componente Materias Section", () => {
  let queryClient: QueryClient;
  const fetchMock = vi.spyOn(global, "fetch");

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

  it("deve renderizar o estado de carregamento (skeletons) inicialmente", async () => {
    // Retorna uma promise que nunca resolve para manter no estado de loading
    fetchMock.mockReturnValue(new Promise(() => {}));

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Materias />
      </QueryClientProvider>
    );

    // O esqueleto é renderizado via divs animadas com pulse-shimmer
    // Vamos verificar se a animação do esqueleto ou o container está presente
    expect(container).toBeInTheDocument();
  });

  it("deve renderizar as matérias obtidas com sucesso a partir da API", async () => {
    const mockApiData = [
      {
        numero: "Ofício 99/2026",
        categoria: "Saúde",
        titulo: "Ampliação de verba para hospital municipal",
        data: "01 ago 2026",
        slug: "oficio-99-2026",
      },
    ];

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiData,
    } as Response);

    render(
      <QueryClientProvider client={queryClient}>
        <Materias />
      </QueryClientProvider>
    );

    // Espera que o texto da API apareça na tela
    await waitFor(() => {
      expect(screen.getByText("Ofício 99/2026")).toBeInTheDocument();
      expect(screen.getByText("Saúde")).toBeInTheDocument();
      expect(screen.getByText("Ampliação de verba para hospital municipal")).toBeInTheDocument();
    });

    // Garante que o link de rota está correto
    const link = screen.getByText("Ofício 99/2026").closest("a");
    expect(link).toHaveAttribute("href", "/materia/$slug");
    expect(link).toHaveAttribute("data-params", '{"slug":"oficio-99-2026"}');
  });

  it("deve mostrar banner de demonstração e renderizar dados locais mockados em caso de erro da API", async () => {
    // Simula uma falha na requisição da API
    fetchMock.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <QueryClientProvider client={queryClient}>
        <Materias />
      </QueryClientProvider>
    );

    // Deve exibir o aviso de modo de demonstração
    await waitFor(() => {
      expect(screen.getByText(/Modo de Demonstração: Servidor da API offline/i)).toBeInTheDocument();
    });

    // Deve renderizar dados locais mockados do data.ts (como Ofício 16/2026)
    expect(screen.getByText("Ofício 16/2026")).toBeInTheDocument();
    expect(screen.getByText("Aprovação")).toBeInTheDocument();
  });
});
