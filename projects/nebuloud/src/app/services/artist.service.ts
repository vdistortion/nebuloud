import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  public artist$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public album$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public song$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setArtist(artistId: string = '', albumId: string = '', songId: string = '') {
    this.artist$.next(artistId);
    this.album$.next(albumId);
    this.song$.next(songId);
  }
}
