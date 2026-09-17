import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { GalleryCard } from '../../components/ui/gallery-card/gallery-card';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { ContentService } from '../../services/content.service';
import type { TypeArtist, TypeItems, TypeStructurePictures } from '../../../db/types';

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

  readonly artists: TypeItems = this.content.artists;
  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly artist = computed<TypeArtist | undefined>(() => {
    const id = this.artistId();
    return id ? this.artists[id]?.artist : undefined;
  });
  readonly artistName = computed(() => this.artist()?.name ?? '');
  readonly images = computed<TypeStructurePictures[]>(() => this.artist()?.images ?? []);

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      this.artistService.setArtist(artistId);
      this.titleService.setTitle(this.artistName() ? `${this.artistName()} | Фото` : 'Фото');
    });
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
