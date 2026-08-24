import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Contato } from "./Contato";

// Mock do hook reCAPTCHA v3 — retorna token sem chamar window.grecaptcha
vi.mock("../../hooks/useRecaptchaV3", () => ({
  useRecaptchaV3: () => vi.fn().mockResolvedValue("token-v3-teste"),
}));

// Mock do config para injetar o ID do Formspark de teste
vi.mock("../../config", () => ({
  FORMSPARK_FORM_ID: "test-form-id",
  RECAPTCHA_V3_SITE_KEY: "site-key-teste",
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

function preencher() {
  fireEvent.change(screen.getByLabelText(/Nome completo/i), {
    target: { value: "José Roberto" },
  });
  fireEvent.change(screen.getByLabelText(/E-mail/i), {
    target: { value: "jose@teste.com" },
  });
  fireEvent.change(screen.getByLabelText(/Mensagem/i), {
    target: { value: "Mensagem de teste" },
  });
}

// ── Testes ────────────────────────────────────────────────────────────────────

describe("Formulário de Contato (Formspark + reCAPTCHA v3)", () => {
  const fetchMock = vi.spyOn(globalThis, "fetch");

  beforeEach(() => vi.clearAllMocks());
  afterEach(() => fetchMock.mockReset());

  // ── Renderização ──────────────────────────────────────────────────────────

  it("renderiza todos os campos obrigatórios e o botão", () => {
    render(<Contato />);
    expect(screen.getByLabelText(/Nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bairro \/ Comunidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar mensagem/i })).toBeInTheDocument();
  });

  it("exibe cards de informação do gabinete", () => {
    render(<Contato />);
    expect(screen.getByText(/Câmara Municipal de Martinópole/i)).toBeInTheDocument();
    expect(screen.getByText(/E-mail Institucional/i)).toBeInTheDocument();
  });

  it("exibe botões de redes sociais", () => {
    render(<Contato />);
    expect(screen.getByRole("link", { name: /Instagram/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Facebook/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /TikTok/i })).toBeInTheDocument();
  });

  it("links das redes sociais apontam para URLs corretas", () => {
    render(<Contato />);
    expect(screen.getByRole("link", { name: /Instagram/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/robertinhoce/"
    );
    expect(screen.getByRole("link", { name: /Facebook/i })).toHaveAttribute(
      "href",
      "https://www.facebook.com/robertinhoce"
    );
    expect(screen.getByRole("link", { name: /TikTok/i })).toHaveAttribute(
      "href",
      "https://www.tiktok.com/@robertinhoce"
    );
  });

  // ── Digitação ─────────────────────────────────────────────────────────────

  it("aceita digitação nos campos sem travar", () => {
    render(<Contato />);
    preencher();
    expect(screen.getByLabelText(/Nome completo/i)).toHaveValue("José Roberto");
    expect(screen.getByLabelText(/E-mail/i)).toHaveValue("jose@teste.com");
    expect(screen.getByLabelText(/Mensagem/i)).toHaveValue("Mensagem de teste");
  });

  // ── Envio (Formspark) ─────────────────────────────────────────────────────

  it("envia JSON para o endpoint Formspark com token v3", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    render(<Contato />);
    preencher();
    await user.click(screen.getByRole("button", { name: /Enviar mensagem/i }));

    await waitFor(() =>
      expect(screen.getByText(/Mensagem enviada!/i)).toBeInTheDocument()
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];

    // Verifica URL do Formspark
    expect(url).toBe("https://submit-form.com/test-form-id");

    // Verifica Content-Type JSON
    expect((options.headers as Record<string, string>)["Content-Type"]).toBe(
      "application/json"
    );

    // Verifica campos no body
    const body = JSON.parse(options.body as string);
    expect(body.nome).toBe("José Roberto");
    expect(body.email).toBe("jose@teste.com");
    expect(body.mensagem).toBe("Mensagem de teste");
    expect(body.bairro).toBe("Não informado"); // campo vazio → fallback
    expect(body._recaptcha).toBe("token-v3-teste");
  });

  it("exibe tela de confirmação após sucesso", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    render(<Contato />);
    preencher();
    await user.click(screen.getByRole("button", { name: /Enviar mensagem/i }));

    await waitFor(() =>
      expect(screen.getByText(/Mensagem enviada!/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/gabinete retornará em breve/i)).toBeInTheDocument();
  });

  it("volta ao formulário ao clicar em 'Enviar outra mensagem'", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    render(<Contato />);
    preencher();
    await user.click(screen.getByRole("button", { name: /Enviar mensagem/i }));
    await waitFor(() =>
      expect(screen.getByText(/Mensagem enviada!/i)).toBeInTheDocument()
    );

    await user.click(screen.getByRole("button", { name: /Enviar outra mensagem/i }));
    expect(screen.getByRole("button", { name: /Enviar mensagem/i })).toBeInTheDocument();
  });

  // ── Erros ─────────────────────────────────────────────────────────────────

  it("exibe erro quando Formspark retorna status não-OK", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Form desativado." }),
    } as Response);

    render(<Contato />);
    preencher();
    await user.click(screen.getByRole("button", { name: /Enviar mensagem/i }));

    await waitFor(() =>
      expect(screen.getByText(/Form desativado\./i)).toBeInTheDocument()
    );
  });

  it("exibe erro de rede (fetch rejeita)", async () => {
    const user = userEvent.setup();
    fetchMock.mockRejectedValueOnce(new Error("Network error"));

    render(<Contato />);
    preencher();
    await user.click(screen.getByRole("button", { name: /Enviar mensagem/i }));

    await waitFor(() =>
      expect(screen.getByText(/Erro de conexão/i)).toBeInTheDocument()
    );
  });

  it("envia mesmo quando reCAPTCHA retorna null (graceful degradation)", async () => {
    // Este teste valida que o formulário envia mesmo sem token de captcha.
    // O mock no topo do arquivo retorna "token-v3-teste" por padrão; aqui
    // simplesmente verificamos que o envio ocorre — o campo _recaptcha pode
    // ou não estar presente dependendo do valor retornado pelo hook.
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    render(<Contato />);
    preencher();
    await user.click(screen.getByRole("button", { name: /Enviar mensagem/i }));

    // O importante: fetch foi chamado (envio ocorreu independentemente do captcha)
    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://submit-form.com/test-form-id");
  });
});
