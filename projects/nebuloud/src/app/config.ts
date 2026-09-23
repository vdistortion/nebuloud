import { InjectionToken } from '@angular/core';

declare global {
  var __NEBULOUD_CONFIG__:
    | {
        directusUrl?: string;
        suggestionWebhookUrl?: string;
        artistHosts?: Record<string, string>;
      }
    | undefined;
}

const DEFAULT_ARTIST_HOSTS: Record<string, string> = {
  'master.nebuloud.zvalentin.com': 'master',
  'shmeli.nebuloud.zvalentin.com': 'shmeli',
};

export function artistHost(slug: string): string | undefined {
  const hosts = { ...DEFAULT_ARTIST_HOSTS, ...globalThis.__NEBULOUD_CONFIG__?.artistHosts };
  return Object.entries(hosts).find(([, artistSlug]) => artistSlug === slug)?.[0];
}

export function artistSlugForCurrentHost(): string | undefined {
  const hostname = globalThis.location?.hostname;
  if (!hostname) return undefined;
  return globalThis.__NEBULOUD_CONFIG__?.artistHosts?.[hostname] ?? DEFAULT_ARTIST_HOSTS[hostname];
}

function getDirectusUrl(): string {
  const productionUrl =
    globalThis.location?.hostname === 'nebuloud.zvalentin.com'
      ? 'https://api.nebuloud.zvalentin.com'
      : undefined;

  return (
    globalThis.__NEBULOUD_CONFIG__?.directusUrl ??
    (typeof process !== 'undefined' ? process.env['DIRECTUS_URL'] : undefined) ??
    productionUrl ??
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
    if (configured) return configured;

    return globalThis.location?.hostname === 'nebuloud.zvalentin.com'
      ? 'https://api.nebuloud.zvalentin.com/flows/trigger/f1866803-f7b3-4dd1-9d59-bec46289c5e5'
      : '';
  },
});
