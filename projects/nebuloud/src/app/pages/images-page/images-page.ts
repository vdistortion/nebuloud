import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { GalleryCard } from '../../components/ui/gallery-card/gallery-card';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { ContentService } from '../../services/content.service';
import { AssetUrlService } from '../../services/asset-url.service';
import type { CatalogGallery } from '../../models/content.models';

@Component({
  selector: 'app-images-page',
  imports: [RouterLink, GalleryCard],
  templateUrl: './images-page.html',
  styleUrl: './images-page.scss',
})
export class ImagesPage {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly content = inject(ContentService);
  private readonly assetUrl = inject(AssetUrlService);

  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly artistName = computed(() => this.content.getArtistProfile(this.artistId())?.name ?? '');
  readonly resolvedImages = toSignal(
    this.route.data.pipe(map((data) => data['galleries'] as CatalogGallery[])),
    { initialValue: [] },
  );
  readonly images = computed(() => this.resolvedImages());

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      this.artistService.setArtist(artistId);
      this.titleService.setTitle(this.artistName() ? `${this.artistName()} | Фото` : 'Фото');
    });
  }

  imageUrl(galleryId: string): string {
    const gallery = this.images().find((item) => item.id === galleryId);
    if (!gallery) return '';
    const picture = gallery.pictures[0];
    return picture.startsWith('/assets/')
      ? this.assetUrl.resolve(picture)
      : `/artist/${this.artistId()}/images/${gallery.path.join('/')}/${picture}`;
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
