import { inject, Injectable, signal } from '@angular/core';
import { ArtistSiteService } from './artist-site.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly artistSite = inject(ArtistSiteService);
  readonly artistId = signal('');
  readonly albumId = signal('');
  readonly songId = signal('');

  setArtist(artistId = '', albumId = '', songId = '') {
    this.artistId.set(artistId);
    this.albumId.set(albumId);
    this.songId.set(songId);
  }

  route(suffix = '', artistId = this.artistId()): string {
    return artistId ? this.artistSite.pathForArtist(artistId, suffix) : '/';
  }
}
