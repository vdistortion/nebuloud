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
import type { ArtistProfile } from '../../models/content.models';

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

  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });

  readonly artistProfile = computed<ArtistProfile | undefined>(() =>
    this.content.getArtistProfile(this.artistId()),
  );
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

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
