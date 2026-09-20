import { InjectionToken } from '@angular/core';

declare global {
  var __NEBULOUD_CONFIG__:
    | {
        directusUrl?: string;
        contentMode?: 'directus' | 'fallback' | 'local';
        suggestionWebhookUrl?: string;
      }
    | undefined;
}

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

export const CONTENT_MODE = new InjectionToken<'directus' | 'fallback' | 'local'>('CONTENT_MODE', {
  providedIn: 'root',
  factory: () => {
    const mode =
      globalThis.__NEBULOUD_CONFIG__?.contentMode ??
      (typeof process !== 'undefined' ? process.env['CONTENT_MODE'] : undefined);
    return mode === 'directus' || mode === 'local' ? mode : 'fallback';
  },
});

export const SUGGESTION_WEBHOOK_URL = new InjectionToken<string>('SUGGESTION_WEBHOOK_URL', {
  providedIn: 'root',
  factory: () => {
    const configured =
      globalThis.__NEBULOUD_CONFIG__?.suggestionWebhookUrl ??
      (typeof process !== 'undefined' ? process.env['SUGGESTION_WEBHOOK_URL'] : undefined);
    if (configured) return configured;

    return globalThis.location?.hostname === 'nebuloud.zvalentin.com'
      ? 'https://api.nebuloud.zvalentin.com/flows/trigger/f1866803-f7b3-4dd1-9d59-bec46289c5e5'
      : '';
  },
});
