import { inject, Injectable } from '@angular/core';
import { DIRECTUS_URL } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AssetUrlService {
  private readonly directusUrl = inject(DIRECTUS_URL);

  resolve(value: string | undefined, fallback = '/album-card.jpg'): string {
    const path = value || fallback;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    if (path.startsWith('/assets/')) return `${this.directusUrl}${path}`;
    return `.${path}`;
  }
}
