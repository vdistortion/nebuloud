import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { ContentService } from '../../services/content.service';
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
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly content = inject(ContentService);

  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly artistName = computed(() => this.content.getArtistProfile(this.artistId())?.name ?? '');
  readonly resolvedSongs = toSignal(
    this.route.data.pipe(map((data) => data['videos'] as CatalogSong[])),
    { initialValue: [] },
  );
  readonly songs = computed<CatalogSong[]>(() =>
    (this.resolvedSongs().length
      ? this.resolvedSongs()
      : this.content.getVideos(this.artistId())
    ).sort((a, b) => this.yearOfSong(a) - this.yearOfSong(b)),
  );

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      this.artistService.setArtist(artistId);
      this.titleService.setTitle(this.artistName() ? `${this.artistName()} | Клипы` : 'Клипы');
    });
  }

  yearOfSong(song: CatalogSong): number {
    return Math.min(
      ...song.albums.map((albumId) => this.content.getAlbum(this.artistId(), albumId)?.year ?? 0),
    );
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
