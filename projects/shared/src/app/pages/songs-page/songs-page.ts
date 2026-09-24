import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { artistSlugForCurrentSite } from '../../config';
import type { ArtistProfile } from '../../models/content.models';
import type { CatalogSong } from '../../models/content.models';

@Component({
  selector: 'app-songs-page',
  imports: [RouterLink],
  templateUrl: './songs-page.html',
  styleUrl: './songs-page.scss',
})
export class SongsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);

  readonly artistId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('artist') ?? artistSlugForCurrentSite())),
    { initialValue: artistSlugForCurrentSite() },
  );
  readonly resolvedArtistProfile = toSignal(
    this.route.data.pipe(map((data) => data['artistProfile'] as ArtistProfile | undefined)),
    { initialValue: undefined },
  );
  readonly artistName = computed(() => this.resolvedArtistProfile()?.name ?? '');
  readonly resolvedSongs = toSignal(
    this.route.data.pipe(map((data) => data['songs'] as CatalogSong[])),
    { initialValue: [] },
  );
  readonly songs = computed<CatalogSong[]>(() =>
    this.resolvedSongs().sort((a, b) => a.title.localeCompare(b.title)),
  );
  readonly hasOtherSongs = computed(() => this.songs().some((song) => !song.albums.length));
  readonly showOtherOnly = signal(false);
  readonly searchQuery = signal('');
  readonly filteredSongs = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();
    return this.songs().filter((song) => {
      const matchesFilter = !this.showOtherOnly() || !song.albums.length;
      const matchesQuery =
        !query || [song.title, ...song.aliases].join(' ').toLocaleLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });
  });

  constructor() {
    this.showOtherOnly.set(this.route.snapshot.queryParamMap.get('other') === 'true');

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

    const path = query ? `/songs?q=${encodeURIComponent(query)}` : '/songs';
    const url = this.artistService.route(path, artistId);
    window.history.replaceState({}, '', url);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
