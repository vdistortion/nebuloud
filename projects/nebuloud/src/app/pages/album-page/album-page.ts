import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { StreamingList } from '../../components/ui/streaming-list/streaming-list';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { SeoService } from '../../services/seo.service';
import { AssetUrlService } from '../../services/asset-url.service';
import type { ArtistProfile } from '../../models/content.models';
import type { CatalogAlbum } from '../../models/content.models';

type AlbumTrack = {
  name: string;
  id: string;
  duration: number;
  isText: boolean;
  authors?: string;
};

@Component({
  selector: 'app-album-page',
  imports: [RouterLink, StreamingList],
  templateUrl: './album-page.html',
  styleUrl: './album-page.scss',
})
export class AlbumPage {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly assetUrl = inject(AssetUrlService);

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
  readonly resolvedArtistProfile = toSignal(
    this.route.data.pipe(map((data) => data['artistProfile'] as ArtistProfile | undefined)),
    { initialValue: undefined },
  );
  readonly artistName = computed(() => this.resolvedArtistProfile()?.name ?? '');
  readonly album = computed<CatalogAlbum | undefined>(() => this.resolvedAlbum());
  readonly songs = computed<AlbumTrack[]>(
    () =>
      this.album()?.songs.map((song) => ({
        id: song.id,
        name: song.title,
        duration: song.duration ?? 0,
        isText: Boolean(song.lyrics.trim()),
        authors: song.authors,
      })) ?? [],
  );

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      const albumId = this.albumId() ?? '';
      const album = this.album();

      this.artistService.setArtist(artistId, albumId);
      this.seo.set({
        title: album ? `${album.name} (${album.year}) | ${this.artistName()}` : 'Альбом не найден',
        description: album
          ? `${album.name} — альбом артиста ${this.artistName()}.`
          : 'Альбом не найден',
      });
    });
  }

  imageUrl(value: string): string {
    return this.assetUrl.resolve(value);
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
