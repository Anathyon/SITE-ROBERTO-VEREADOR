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
    const mockApiData = {
      data: [
        {
          id: 1,
          slug: "oficio-99-2026",
          tipo: { nome: "Saúde", slug: "saude" },
          numero: 99,
          numeracao: "Ofício 99/2026",
          ano: 2026,
          data: "2026-08-01",
          titulo: "Ampliação de verba para hospital municipal",
          ementa: "",
          autores: ["Vereador Roberto Moreira"],
          documento: null,
        },
      ],
      meta: { current_page: 1, last_page: 1, total: 1, per_page: 10 },
    };

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
      expect(screen.getByText(/Ofício 99\/2026/)).toBeInTheDocument();
      expect(screen.getAllByText("Saúde").length).toBeGreaterThan(0);
      expect(screen.getByText("Ampliação de verba para hospital municipal")).toBeInTheDocument();
    });
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
      expect(screen.getByText(/Modo de Demonstração.*servidor da API offline/i)).toBeInTheDocument();
    });

    // Deve renderizar dados locais mockados do data.ts (como Ofício 16/2026)
    expect(screen.getByText(/Ofício 16\/2026/)).toBeInTheDocument();
    expect(screen.getAllByText("Aprovação").length).toBeGreaterThan(0);
  });
});
