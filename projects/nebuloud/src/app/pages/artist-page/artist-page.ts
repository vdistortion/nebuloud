import { Component, computed, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AlbumCard } from '../../components/ui/album-card/album-card';
import { StreamingList } from '../../components/ui/streaming-list/streaming-list';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { AssetUrlService } from '../../services/asset-url.service';
import type { ArtistProfile } from '../../models/content.models';

@Component({
  selector: 'app-artist-page',
  imports: [RouterLink, AlbumCard, StreamingList],
  templateUrl: './artist-page.html',
  styleUrl: './artist-page.scss',
})
export class ArtistPage {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly assetUrl = inject(AssetUrlService);

  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly resolvedArtistProfile = toSignal(
    this.route.data.pipe(map((data) => data['artistProfile'] as ArtistProfile | undefined)),
    { initialValue: undefined },
  );

  readonly artistProfile = computed<ArtistProfile | undefined>(() => this.resolvedArtistProfile());
  readonly artistName = computed(() => this.artistProfile()?.name ?? '');
  readonly albums = computed(() => this.artistProfile()?.albums ?? []);
  readonly streaming = computed(() => this.artistProfile()?.streaming);

  constructor() {
    effect(() => {
      const id = this.artistId();
      const name = this.artistName();

      this.artistService.setArtist(id ?? '');
      this.titleService.setTitle(name ? `${name} | Дискография` : 'Артист не найден');
    });
  }

  imageUrl(value: string): string {
    return this.assetUrl.resolve(value);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
