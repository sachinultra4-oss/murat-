import { SITE_CONFIG } from '@/src/config/site';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let initialized = false;

export function initMetaPixel(): void {
  const pixelId = SITE_CONFIG.META_PIXEL_ID.trim();
  if (!pixelId || initialized || typeof window === 'undefined') return;
  initialized = true;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const f: any = window;
  if (f.fbq) return;
  const n: any = function (...args: unknown[]) {
    if (n.callMethod) {
      n.callMethod(...args);
    } else {
      n.queue.push(args);
    }
  };
  f.fbq = n;
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  window.fbq?.('init', pixelId);
  window.fbq?.('track', 'PageView');
}

export function trackMetaLead(payload?: { city?: string; budgetRange?: string }): void {
  if (!SITE_CONFIG.META_PIXEL_ID.trim() || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'Lead', payload ?? {});
}
