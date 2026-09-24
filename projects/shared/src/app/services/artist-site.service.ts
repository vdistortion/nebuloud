import { inject, Injectable } from '@angular/core';
import { ARTIST_SITE_SLUG } from '../config';

@Injectable({ providedIn: 'root' })
export class ArtistSiteService {
  readonly currentArtistSlug = inject(ARTIST_SITE_SLUG);

  pathForArtist(slug: string, suffix = ''): string {
    if (this.currentArtistSlug === slug) return suffix || '/';
    return `/artist/${slug}${suffix}`;
  }

  urlForArtist(slug: string, siteDomain?: string): string {
    if (!siteDomain) return `/artist/${slug}`;
    return `https://${siteDomain}/`;
  }
}
