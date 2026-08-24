import { useCallback } from "react";
import { RECAPTCHA_V3_SITE_KEY } from "../config";

/**
 * Hook para executar o reCAPTCHA v3 de forma invisível.
 * Retorna uma função `execute(action)` que devolve o token gerado.
 * Se o script ainda não carregou ou a chave estiver ausente, retorna null.
 */
export function useRecaptchaV3() {
  const execute = useCallback(async (action: string): Promise<string | null> => {
    if (!RECAPTCHA_V3_SITE_KEY) return null;

    // Aguarda o grecaptcha estar disponível (máx. 5s)
    const grecaptcha = await waitForGrecaptcha();
    if (!grecaptcha) return null;

    try {
      const token = await grecaptcha.execute(RECAPTCHA_V3_SITE_KEY, { action });
      return token;
    } catch {
      return null;
    }
  }, []);

  return execute;
}

// Declara o tipo global do grecaptcha (injetado pelo script do Google)
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

function waitForGrecaptcha(timeoutMs = 5000): Promise<typeof window.grecaptcha | null> {
  return new Promise((resolve) => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => resolve(window.grecaptcha));
      return;
    }
    const start = Date.now();
    const interval = setInterval(() => {
      if (window.grecaptcha) {
        clearInterval(interval);
        window.grecaptcha.ready(() => resolve(window.grecaptcha));
      } else if (Date.now() - start > timeoutMs) {
        clearInterval(interval);
        resolve(null);
      }
    }, 100);
  });
}
