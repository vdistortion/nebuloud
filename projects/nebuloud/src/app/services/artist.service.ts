import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  readonly artistId = signal('');
  readonly albumId = signal('');
  readonly songId = signal('');

  setArtist(artistId = '', albumId = '', songId = '') {
    this.artistId.set(artistId);
    this.albumId.set(albumId);
    this.songId.set(songId);
  }
}
