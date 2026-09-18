import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { ContentService } from '../../services/content.service';
import { TrimPipe } from '../../trim.pipe';
import type { CatalogAlbum, CatalogSong } from '../../models/content.models';

@Component({
  selector: 'app-song-page',
  imports: [RouterLink, TrimPipe, YouTubePlayer],
  templateUrl: './song-page.html',
  styleUrl: './song-page.scss',
})
export class SongPage {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly content = inject(ContentService);

  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly songId = toSignal(this.route.paramMap.pipe(map((params) => params.get('song'))), {
    initialValue: null,
  });
  readonly resolvedSong = toSignal(
    this.route.data.pipe(map((data) => data['song'] as CatalogSong | undefined)),
    { initialValue: undefined },
  );
  readonly artistName = computed(() => this.content.getArtistProfile(this.artistId())?.name ?? '');
  readonly song = computed<CatalogSong | undefined>(() => this.resolvedSong());
  readonly albums = computed<CatalogAlbum[]>(() => {
    const song = this.song();
    return song
      ? song.albums
          .map((id) => this.content.getAlbum(this.artistId(), id))
          .filter((album): album is CatalogAlbum => Boolean(album))
      : [];
  });

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      const songId = this.songId() ?? '';
      const song = this.song();

      this.artistService.setArtist(artistId, '', songId);
      this.titleService.setTitle(
        song ? `${song.title} | ${this.artistName()}` : 'Песня не найдена',
      );
    });
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
