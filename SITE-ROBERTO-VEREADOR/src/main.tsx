import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Sem retries automáticos — erros de rede não ficam em loop
      retry: false,
      // Dados considerados frescos por 5 minutos
      staleTime: 5 * 60 * 1000,
    },
  },
});

const router = createRouter({
  routeTree,
  context: { queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// StrictMode removido: no React 19 com TanStack Router causa double-mount
// que amplifica hydration errors e duplica efeitos colaterais
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
