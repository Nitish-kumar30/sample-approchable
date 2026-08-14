declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackCTA(label: string, loc: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', { event_category: 'CTA', event_label: label, location: loc });
    window.gtag('event', 'begin_checkout', { event_category: 'Funnel', button_location: loc });
  }
}
