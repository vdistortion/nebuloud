import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { ContentService } from '../../services/content.service';
import type { CatalogSong } from '../../models/content.models';

@Component({
  selector: 'app-other-songs-page',
  imports: [RouterLink],
  templateUrl: './other-songs-page.html',
  styleUrl: './other-songs-page.scss',
})
export class OtherSongsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly content = inject(ContentService);

  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly artistName = computed(() => this.content.getArtistProfile(this.artistId())?.name ?? '');
  readonly resolvedSongs = toSignal(
    this.route.data.pipe(map((data) => data['songs'] as CatalogSong[])),
    { initialValue: [] },
  );
  readonly songs = computed<CatalogSong[]>(() =>
    (this.resolvedSongs().length
      ? this.resolvedSongs()
      : this.content.getSongsWithoutAlbum(this.artistId())
    ).sort((a, b) => a.title.localeCompare(b.title)),
  );

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      this.artistService.setArtist(artistId);
      this.titleService.setTitle(
        this.artistName() ? `${this.artistName()} | Песни вне альбомов` : 'Песни вне альбомов',
      );
    });
  }

  formatSongNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
