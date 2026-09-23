import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { artistSlugForCurrentHost } from '../../config';
import type { ArtistProfile } from '../../models/content.models';
import type { CatalogSong } from '../../models/content.models';

@Component({
  selector: 'app-video-page',
  imports: [RouterLink, YouTubePlayer],
  templateUrl: './video-page.html',
  styleUrl: './video-page.scss',
})
export class VideoPage {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);

  readonly artistId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('artist') ?? artistSlugForCurrentHost())),
    { initialValue: artistSlugForCurrentHost() },
  );
  readonly resolvedArtistProfile = toSignal(
    this.route.data.pipe(map((data) => data['artistProfile'] as ArtistProfile | undefined)),
    { initialValue: undefined },
  );
  readonly artistName = computed(() => this.resolvedArtistProfile()?.name ?? '');
  readonly resolvedSongs = toSignal(
    this.route.data.pipe(map((data) => data['videos'] as CatalogSong[])),
    { initialValue: [] },
  );
  readonly songs = computed<CatalogSong[]>(() =>
    this.resolvedSongs().sort((a, b) => this.yearOfSong(a) - this.yearOfSong(b)),
  );

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      this.artistService.setArtist(artistId);
      this.titleService.setTitle(this.artistName() ? `${this.artistName()} | Клипы` : 'Клипы');
    });
  }

  yearOfSong(song: CatalogSong): number {
    const albums = this.resolvedArtistProfile()?.albums ?? [];
    return Math.min(
      ...song.albums.map((albumId) => albums.find((album) => album.id === albumId)?.year ?? 0),
    );
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
