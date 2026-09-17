import { Injectable } from '@angular/core';
import artists from '../../db';
import { artistSummaries } from '../../db/artist-summaries';
import type { TypeArtistSummary, TypeItem, TypeItems } from '../../db/types';

@Injectable({
  providedIn: 'root',
})
export class LocalContentSource {
  readonly artists: TypeItems = artists;
  readonly artistSummaries: TypeArtistSummary[] = artistSummaries;

  getArtist(id: string | null | undefined): TypeItem | undefined {
    return id ? this.artists[id] : undefined;
  }
}
