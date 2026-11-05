/// <reference path="../../../types/better-justified-layout.d.ts" />
import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import justifiedLayout from 'better-justified-layout';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { AssetUrlService } from '../../services/asset-url.service';
import { artistSlugForCurrentSite } from '../../config';
import type { ArtistProfile } from '../../models/content.models';
import type { CatalogGallery } from '../../models/content.models';

@Component({
  selector: 'app-gallery-page',
  imports: [RouterLink],
  templateUrl: './gallery-page.html',
  styleUrl: './gallery-page.scss',
})
export class GalleryPage {
  private readonly imagesElement = viewChild<ElementRef<HTMLElement>>('images');
  private readonly imageBoxes = signal(new Map<string, { left: number; top: number; width: number; height: number }>());
  readonly layoutHeight = signal(0);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly titleService = inject(Title);
  readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly assetUrl = inject(AssetUrlService);

  readonly artistId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('artist') ?? artistSlugForCurrentSite())),
    { initialValue: artistSlugForCurrentSite() },
  );
  readonly galleryId = toSignal(this.route.paramMap.pipe(map((params) => params.get('gallery'))), {
    initialValue: null,
  });
  readonly resolvedArtistProfile = toSignal(
    this.route.data.pipe(map((data) => data['artistProfile'] as ArtistProfile | undefined)),
    { initialValue: undefined },
  );
  readonly artistName = computed(() => this.resolvedArtistProfile()?.name ?? '');
  readonly resolvedGallery = toSignal(
    this.route.data.pipe(map((data) => data['gallery'] as CatalogGallery | undefined)),
    { initialValue: undefined },
  );
  readonly gallery = computed(() => this.resolvedGallery());
  readonly galleryName = computed(() => this.gallery()?.title ?? 'Галерея');
  readonly galleryPath = computed(() => this.gallery()?.path.join('/') ?? '');
  readonly pictures = computed(() => this.gallery()?.pictures ?? []);

  constructor() {
    afterNextRender(() => {
      const element = this.imagesElement()?.nativeElement;
      if (!element) return;
      const observer = new ResizeObserver(() => this.updateLayout());
      observer.observe(element);
      this.destroyRef.onDestroy(() => observer.disconnect());
      this.updateLayout();
    });
    effect(() => {
      const artistId = this.artistId() ?? '';
      this.artistService.setArtist(artistId);
      this.titleService.setTitle(
        this.artistName() ? `${this.artistName()} | Фото | ${this.galleryName()}` : 'Галерея',
      );
    });
  }

  updateLayout(): void {
    const element = this.imagesElement()?.nativeElement;
    if (!element) return;
    const images = Array.from(element.querySelectorAll<HTMLImageElement>('img'));
    const width = element.clientWidth;
    if (!width || images.length !== this.pictures().length || images.some((image) => !image.naturalWidth)) return;

    const layout = justifiedLayout(
      images.map((image) => image.naturalWidth / image.naturalHeight),
      { containerWidth: width, containerPadding: 0, boxSpacing: 16, targetRowHeight: 280 },
    );
    const boxes = new Map<string, { left: number; top: number; width: number; height: number }>();
    images.forEach((image, index) => {
      const box = layout.boxes[index];
      boxes.set(this.pictures()[index], {
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
      });
    });
    this.imageBoxes.set(boxes);
    this.layoutHeight.set(layout.containerHeight);
  }

  boxStyle(picture: string) {
    const box = this.imageBoxes().get(picture);
    return box
      ? { left: `${box.left}px`, top: `${box.top}px`, width: `${box.width}px`, height: `${box.height}px` }
      : {};
  }

  imageUrl(picture: string): string {
    return picture.startsWith('/assets/')
      ? this.assetUrl.resolve(picture)
      : this.artistService.route(`/images/${this.galleryPath()}/${picture}`);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
