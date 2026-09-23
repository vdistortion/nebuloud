import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { artistHost, artistSlugForCurrentHost } from '../config';

@Injectable({ providedIn: 'root' })
export class ArtistSiteService {
  private readonly document = inject(DOCUMENT);

  readonly currentArtistSlug = artistSlugForCurrentHost();

  urlForArtist(slug: string): string {
    const host = artistHost(slug);
    const currentHost = this.document.location?.hostname;

    if (!host || host === currentHost) return `/artist/${slug}`;

    const protocol = this.document.location?.protocol ?? 'https:';
    return `${protocol}//${host}/artist/${slug}`;
  }
}
