import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import artists from '../../../db';
import type { TypeItem, TypeItems, TypeSong } from '../../../db/types';

@Component({
  selector: 'app-video-page',
  imports: [RouterLink, YouTubePlayer],
  templateUrl: './video-page.component.html',
  styleUrl: './video-page.component.scss',
})
export class VideoPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);

  readonly artists: TypeItems = artists;
  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly artist = computed<TypeItem | undefined>(() => {
    const id = this.artistId();
    return id ? this.artists[id] : undefined;
  });
  readonly artistName = computed(() => this.artist()?.artist.name ?? '');
  readonly songs = computed<TypeSong[]>(
    () =>
      this.artist()
        ?.getAllVideos()
        .sort((a, b) => {
          const artist = this.artist();
          return artist ? artist.yearOfSong(a) - artist.yearOfSong(b) : 0;
        }) ?? [],
  );

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      this.artistService.setArtist(artistId);
      this.titleService.setTitle(this.artistName() ? `${this.artistName()} | Клипы` : 'Клипы');
    });
  }

  yearOfSong(song: TypeSong): number {
    return this.artist()?.yearOfSong(song) ?? 0;
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
