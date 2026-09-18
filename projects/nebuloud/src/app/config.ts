import { InjectionToken } from '@angular/core';

/** Replace this value with the production Directus URL before deployment. */
export const DIRECTUS_URL = new InjectionToken<string>('DIRECTUS_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8056',
});
