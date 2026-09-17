import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import artists from '../../../db';
import type { TypeItem, TypeItems, TypeSong } from '../../../db/types';

@Component({
  selector: 'app-other-songs-page',
  imports: [RouterLink],
  templateUrl: './other-songs-page.component.html',
  styleUrl: './other-songs-page.component.scss',
})
export class OtherSongsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);

  readonly artists: TypeItems = artists;
  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly artist = computed<TypeItem | undefined>(() => {
    const id = this.artistId();
    return id ? this.artists[id] : undefined;
  });
  readonly artistName = computed(() => this.artist()?.artist.name ?? '');
  readonly songs = computed<TypeSong[]>(
    () =>
      this.artist()
        ?.getSongsWithoutAlbum()
        .sort((a, b) => a.name[0].localeCompare(b.name[0])) ?? [],
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
