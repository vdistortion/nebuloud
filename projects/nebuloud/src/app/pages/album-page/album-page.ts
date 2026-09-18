import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { StreamingList } from '../../components/ui/streaming-list/streaming-list';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { ContentService } from '../../services/content.service';
import { DIRECTUS_URL } from '../../config';
import { TrimPipe } from '../../trim.pipe';
import type { CatalogAlbum } from '../../models/content.models';

type AlbumTrack = {
  name: string;
  id: string;
  duration: number;
  isText: boolean;
};

@Component({
  selector: 'app-album-page',
  imports: [RouterLink, TrimPipe, StreamingList],
  templateUrl: './album-page.html',
  styleUrl: './album-page.scss',
})
export class AlbumPage {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly content = inject(ContentService);
  private readonly directusUrl = inject(DIRECTUS_URL);

  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly albumId = toSignal(this.route.paramMap.pipe(map((params) => params.get('album'))), {
    initialValue: null,
  });
  readonly resolvedAlbum = toSignal(
    this.route.data.pipe(map((data) => data['album'] as CatalogAlbum | undefined)),
    { initialValue: undefined },
  );
  readonly artistName = computed(() => this.content.getArtistProfile(this.artistId())?.name ?? '');
  readonly album = computed<CatalogAlbum | undefined>(() => this.resolvedAlbum());
  readonly songs = computed<AlbumTrack[]>(
    () =>
      this.album()?.songs.map((song) => ({
        id: song.id,
        name: song.title,
        duration: song.duration ?? 0,
        isText: Boolean(song.lyrics.trim()),
      })) ?? [],
  );

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      const albumId = this.albumId() ?? '';
      const album = this.album();

      this.artistService.setArtist(artistId, albumId);
      this.titleService.setTitle(
        album ? `${album.name} (${album.year}) | ${this.artistName()}` : 'Альбом не найден',
      );
    });
  }

  imageUrl(value: string): string {
    return value.startsWith('/assets/') ? `${this.directusUrl}${value}` : `.${value}`;
  }

  getTime(duration: number): string {
    return `${Math.trunc(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;
  }

  formatTrackNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
