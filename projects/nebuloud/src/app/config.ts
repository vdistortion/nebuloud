import { InjectionToken } from '@angular/core';

declare global {
  var __NEBULOUD_CONFIG__:
    | {
        directusUrl?: string;
        contentMode?: 'directus' | 'fallback' | 'local';
      }
    | undefined;
}

function getDirectusUrl(): string {
  return globalThis.__NEBULOUD_CONFIG__?.directusUrl ?? 'http://localhost:8056';
}

/** Runtime-configured Directus URL. Replace public/config.js in production. */
export const DIRECTUS_URL = new InjectionToken<string>('DIRECTUS_URL', {
  providedIn: 'root',
  factory: getDirectusUrl,
});

export const CONTENT_MODE = new InjectionToken<'directus' | 'fallback' | 'local'>('CONTENT_MODE', {
  providedIn: 'root',
  factory: () => globalThis.__NEBULOUD_CONFIG__?.contentMode ?? 'fallback',
});
