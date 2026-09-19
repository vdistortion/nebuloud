import { Injectable } from '@angular/core';
import artists from '../../db';
import { artistSummaries } from '../../db/artist-summaries';
import type { TypeItem, TypeItems } from '../../db/types';
import type { ArtistSummary } from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class LocalContentSource {
  readonly artists: TypeItems = artists;
  readonly artistSummaries: ArtistSummary[] = artistSummaries;

  getArtist(id: string | null | undefined): TypeItem | undefined {
    return id ? this.artists[id] : undefined;
  }
}
