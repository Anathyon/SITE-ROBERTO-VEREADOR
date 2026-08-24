import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: "0 1rem" }}>
      <div style={{ maxWidth: 400, textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 700 }}>404</h1>
        <h2 style={{ marginTop: "1rem", fontSize: "1.25rem" }}>Página não encontrada</h2>
        <div style={{ marginTop: "1.5rem" }}>
          <a href="/" style={{ display: "inline-block", background: "var(--gradient-accent)", color: "var(--teal-deep)", padding: "0.5rem 1.5rem", borderRadius: "9999px", fontWeight: 600 }}>
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
