import { Component, computed, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AlbumCardComponent } from '../../components/ui/album-card/album-card.component';
import { StreamingListComponent } from '../../components/ui/streaming-list/streaming-list.component';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { ContentService } from '../../services/content.service';
import type { TypeAlbum, TypeArtist, TypeItem, TypeItems, TypeStreaming } from '../../../db/types';

@Component({
  selector: 'app-artist-page',
  imports: [RouterLink, AlbumCardComponent, StreamingListComponent],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss',
})
export class ArtistPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly content = inject(ContentService);

  readonly artists: TypeItems = this.content.artists;
  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });

  readonly artist = computed<TypeItem | undefined>(() => {
    const id = this.artistId();
    return id ? this.artists[id] : undefined;
  });

  readonly artistData = computed<TypeArtist | undefined>(() => this.artist()?.artist);
  readonly artistName = computed(() => this.artistData()?.name ?? '');
  readonly albums = computed<TypeAlbum[]>(() => {
    const item = this.artist();
    return item ? item.artist.albums.map((id) => item.albums[id]).filter(Boolean) : [];
  });
  readonly streaming = computed<TypeStreaming | undefined>(() => this.artistData()?.streaming);

  constructor() {
    effect(() => {
      const id = this.artistId();
      const name = this.artistName();

      this.artistService.setArtist(id ?? '');
      this.titleService.setTitle(name ? `${name} | Дискография` : 'Артист не найден');
    });
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
