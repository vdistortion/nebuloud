import { Injectable } from '@angular/core';
import artists from '../../db';
import { artistSummaries } from '../../db/artist-summaries';
import type { TypeArtistSummary, TypeItem, TypeItems } from '../../db/types';
import type { ArtistProfile } from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  /** Local source for now; Directus adapter will replace this boundary later. */
  readonly artists: TypeItems = artists;
  readonly artistSummaries: TypeArtistSummary[] = artistSummaries;

  getArtist(id: string | null | undefined): TypeItem | undefined {
    return id ? this.artists[id] : undefined;
  }

  getArtistProfile(id: string | null | undefined): ArtistProfile | undefined {
    const item = this.getArtist(id);
    if (!item) return undefined;

    return {
      id: item.artist.id,
      name: item.artist.name,
      image: item.artist.image,
      country: item.artist.country,
      streaming: item.artist.streaming,
      hasImages: Boolean(item.artist.images?.length),
      albums: item.artist.albums
        .map((albumId) => item.albums[albumId])
        .filter(Boolean)
        .map((album) => ({
          id: album.id,
          name: album.name,
          year: album.year,
          cover: album.folder,
          streaming: album.streaming,
        })),
    };
  }
}
