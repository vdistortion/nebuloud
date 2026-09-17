import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import artists from '../../../db';
import type { TypeItem, TypeItems, TypeSong } from '../../../db/types';

@Component({
  selector: 'app-songs-page',
  imports: [RouterLink],
  templateUrl: './songs-page.component.html',
  styleUrl: './songs-page.component.scss',
})
export class SongsPageComponent {
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
        ?.getSongsWithTexts()
        .sort((a, b) => a.name[0].localeCompare(b.name[0])) ?? [],
  );
  readonly hasOtherSongs = computed(() => Boolean(this.artist()?.getSongsWithoutAlbum().length));
  readonly searchQuery = signal('');
  readonly filteredSongs = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();
    return query
      ? this.songs().filter((song) => song.name.join(' ').toLocaleLowerCase().includes(query))
      : this.songs();
  });

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      this.artistService.setArtist(artistId);
      this.titleService.setTitle(this.artistName() ? `${this.artistName()} | Все песни` : 'Песни');
    });
  }

  formatSongNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    this.searchQuery.set(query);
    const artistId = this.artistId();
    if (!artistId) return;

    const url = query
      ? `/artist/${artistId}/songs?q=${encodeURIComponent(query)}`
      : `/artist/${artistId}/songs`;
    window.history.replaceState({}, '', url);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
