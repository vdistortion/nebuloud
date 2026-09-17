import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { GalleryCardComponent } from '../../components/ui/gallery-card/gallery-card.component';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import artists from '../../../db';
import type { TypeArtist, TypeItems, TypeStructurePictures } from '../../../db/types';

@Component({
  selector: 'app-images-page',
  imports: [RouterLink, GalleryCardComponent],
  templateUrl: './images-page.component.html',
  styleUrl: './images-page.component.scss',
})
export class ImagesPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);

  readonly artists: TypeItems = artists;
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
