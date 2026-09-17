import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { TrimPipe } from '../../trim.pipe';
import artists from '../../../db';
import type { TypeAlbum, TypeItem, TypeItems, TypeSong } from '../../../db/types';

@Component({
  selector: 'app-song-page',
  imports: [RouterLink, TrimPipe, YouTubePlayer],
  templateUrl: './song-page.component.html',
  styleUrl: './song-page.component.scss',
})
export class SongPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);

  readonly artists: TypeItems = artists;
  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly songId = toSignal(this.route.paramMap.pipe(map((params) => params.get('song'))), {
    initialValue: null,
  });
  readonly artist = computed<TypeItem | undefined>(() => {
    const id = this.artistId();
    return id ? this.artists[id] : undefined;
  });
  readonly artistName = computed(() => this.artist()?.artist.name ?? '');
  readonly song = computed<TypeSong | undefined>(() => {
    const item = this.artist();
    const id = this.songId();
    return item && id ? item.songs[id] : undefined;
  });
  readonly albums = computed<TypeAlbum[]>(() => {
    const item = this.artist();
    const song = this.song();
    return item && song ? song.albums.map((id) => item.albums[id]).filter(Boolean) : [];
  });

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      const songId = this.songId() ?? '';
      const song = this.song();

      this.artistService.setArtist(artistId, '', songId);
      this.titleService.setTitle(
        song ? `${song.name[0]} | ${this.artistName()}` : 'Песня не найдена',
      );
    });
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
