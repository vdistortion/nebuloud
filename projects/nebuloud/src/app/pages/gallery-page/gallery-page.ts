import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { ContentService } from '../../services/content.service';
import { DIRECTUS_URL } from '../../config';
import type { CatalogGallery } from '../../models/content.models';

@Component({
  selector: 'app-gallery-page',
  imports: [RouterLink],
  templateUrl: './gallery-page.html',
  styleUrl: './gallery-page.scss',
})
export class GalleryPage {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly content = inject(ContentService);
  private readonly directusUrl = inject(DIRECTUS_URL);

  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly galleryId = toSignal(this.route.paramMap.pipe(map((params) => params.get('gallery'))), {
    initialValue: null,
  });
  readonly artistName = computed(() => this.content.getArtistProfile(this.artistId())?.name ?? '');
  readonly resolvedGallery = toSignal(
    this.route.data.pipe(map((data) => data['gallery'] as CatalogGallery | undefined)),
    { initialValue: undefined },
  );
  readonly gallery = computed(() => this.resolvedGallery());
  readonly galleryName = computed(() => this.gallery()?.title ?? 'Галерея');
  readonly galleryPath = computed(() => this.gallery()?.path.join('/') ?? '');
  readonly pictures = computed(() => this.gallery()?.pictures ?? []);

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      this.artistService.setArtist(artistId);
      this.titleService.setTitle(
        this.artistName() ? `${this.artistName()} | Фото | ${this.galleryName()}` : 'Галерея',
      );
    });
  }

  imageUrl(picture: string): string {
    return picture.startsWith('/assets/')
      ? `${this.directusUrl}${picture}`
      : `./artist/${this.artistId()}/images/${this.galleryPath()}/${picture}`;
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
