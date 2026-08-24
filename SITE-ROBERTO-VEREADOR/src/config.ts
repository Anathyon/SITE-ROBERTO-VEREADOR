// URL base da API.
// Em desenvolvimento, as chamadas passam pelo proxy Vite (/api-proxy) para
// evitar bloqueio de CORS — o proxy repassa para o backend real com o
// Origin correto. Em produção, a URL vai direto para o painel.
const isDev = import.meta.env.DEV;

export const API_BASE_URL = isDev
  ? '/api-proxy'
  : (import.meta.env.VITE_API_URL || 'https://painel.robertinhoce.com.br/api/v1');

/**
 * Decide se as requisições à API devem ser disparadas.
 *
 * 1. VITE_ENABLE_API=true  → sempre ativa
 * 2. VITE_ENABLE_API=false → sempre desativa
 * 3. Em dev: sempre ativa (proxy cuida do CORS)
 * 4. Em prod: ativa se a URL não aponta para IP privado
 */
export const SHOULD_FETCH_API = (() => {
  if (import.meta.env.VITE_ENABLE_API === 'true') return true;
  if (import.meta.env.VITE_ENABLE_API === 'false') return false;

  // Em desenvolvimento o proxy resolve o CORS — sempre habilita
  if (isDev) return true;

  try {
    const host = new URL(import.meta.env.VITE_API_URL || '').hostname;
    const isPrivate =
      host === '127.0.0.1' ||
      host === 'localhost' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host);
    if (isPrivate) return false;
  } catch {
    // URL inválida → não dispara
    return false;
  }

  return true;
})();

export const RECAPTCHA_V3_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY as string;

// ID do formulário Formspark (substitui Web3Forms)
export const FORMSPARK_FORM_ID =
  import.meta.env.VITE_FORMSPARK_FORM_ID || 'JNc1EqLDX';
