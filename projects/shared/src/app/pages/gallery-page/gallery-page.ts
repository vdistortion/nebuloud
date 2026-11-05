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
  private readonly imageBoxes = signal(
    new Map<string, { left: number; top: number; width: number; height: number }>(),
  );
  private readonly imageDimensions = signal(new Map<string, { width: number; height: number }>());
  readonly layoutReady = signal(false);
  readonly layoutHeight = signal(0);
  private lightbox?: { destroy: () => void };
  private destroyed = false;
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
      this.destroyRef.onDestroy(() => {
        this.destroyed = true;
        observer.disconnect();
        this.lightbox?.destroy();
      });
      this.updateLayout();
      void this.initializeLightbox(element);
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
    if (
      !width ||
      images.length !== this.pictures().length ||
      images.some((image) => !image.complete)
    )
      return;

    const loadedImages = images.filter(
      (image) => image.naturalWidth > 0 && image.naturalHeight > 0,
    );
    if (loadedImages.length === 0) {
      this.imageBoxes.set(new Map());
      this.imageDimensions.set(new Map());
      this.layoutHeight.set(0);
      this.layoutReady.set(true);
      return;
    }

    const layout = justifiedLayout(
      loadedImages.map((image) => image.naturalWidth / image.naturalHeight),
      { containerWidth: width, containerPadding: 0, boxSpacing: 16, targetRowHeight: 280 },
    );
    const boxes = new Map<string, { left: number; top: number; width: number; height: number }>();
    const dimensions = new Map<string, { width: number; height: number }>();
    loadedImages.forEach((image, index) => {
      const box = layout.boxes[index];
      const picture = this.pictures()[images.indexOf(image)];
      boxes.set(picture, {
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
      });
      dimensions.set(picture, { width: image.naturalWidth, height: image.naturalHeight });
    });
    this.imageBoxes.set(boxes);
    this.imageDimensions.set(dimensions);
    this.layoutHeight.set(layout.containerHeight);
    this.layoutReady.set(true);
  }

  boxStyle(picture: string) {
    const box = this.imageBoxes().get(picture);
    if (!box) return this.layoutReady() ? { display: 'none' } : {};
    return {
      left: `${box.left}px`,
      top: `${box.top}px`,
      width: `${box.width}px`,
      height: `${box.height}px`,
    };
  }

  imageSize(picture: string) {
    return this.imageDimensions().get(picture);
  }

  private async initializeLightbox(gallery: HTMLElement): Promise<void> {
    const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox');
    if (this.destroyed) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
    this.lightbox = lightbox;
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
