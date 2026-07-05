import { useEffect } from "react";
import { useLocation } from "wouter";

// Google Tag Manager container ID. Set VITE_GTM_ID in the hosting
// environment (Vercel → Project → Settings → Environment Variables).
// GTM is not loaded until a real container ID is configured.
const GTM_ID: string = import.meta.env.VITE_GTM_ID || "";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function isConfigured(): boolean {
  return /^GTM-[A-Z0-9]+$/.test(GTM_ID);
}

let initialized = false;

/** Injects the GTM script once. Safe to call multiple times. */
export function initAnalytics(): void {
  if (initialized || !isConfigured()) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/** Pushes a custom event to the GTM data layer. No-op when GTM is not configured. */
export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  if (!isConfigured()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/**
 * Fires a virtual page_view on every client-side route change so GTM/GA4
 * can track SPA navigation (the initial load is captured by GTM itself).
 */
export function usePageTracking(): void {
  const [location] = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackEvent("page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
}
