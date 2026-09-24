import { InjectionToken } from '@angular/core';

declare global {
  var __NEBULOUD_CONFIG__:
    | {
        directusUrl?: string;
        suggestionWebhookUrl?: string;
        artistSlug?: string;
      }
    | undefined;
}

export function artistSlugForCurrentSite(): string | undefined {
  const configured = globalThis.__NEBULOUD_CONFIG__?.artistSlug;
  if (configured) return configured;
  if (typeof process !== 'undefined') return process.env['ARTIST_SLUG'] || undefined;
  return undefined;
}

export const ARTIST_SITE_SLUG = new InjectionToken<string | undefined>('ARTIST_SITE_SLUG', {
  providedIn: 'root',
  factory: artistSlugForCurrentSite,
});

function getDirectusUrl(): string {
  return (
    globalThis.__NEBULOUD_CONFIG__?.directusUrl ??
    (typeof process !== 'undefined' ? process.env['DIRECTUS_URL'] : undefined) ??
    'http://localhost:8056'
  );
}

/** Runtime-configured Directus URL. Replace public/config.js in production. */
export const DIRECTUS_URL = new InjectionToken<string>('DIRECTUS_URL', {
  providedIn: 'root',
  factory: getDirectusUrl,
});

export const SUGGESTION_WEBHOOK_URL = new InjectionToken<string>('SUGGESTION_WEBHOOK_URL', {
  providedIn: 'root',
  factory: () => {
    const configured =
      globalThis.__NEBULOUD_CONFIG__?.suggestionWebhookUrl ??
      (typeof process !== 'undefined' ? process.env['SUGGESTION_WEBHOOK_URL'] : undefined);
    return configured ?? '';
  },
});
