import { computed, Component, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { artistSummaries } from '../../../db/artist-summaries';
import type { TypeArtistSummary } from '../../../db/types';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);

  readonly artists: TypeArtistSummary[] = artistSummaries;
  readonly searchQuery = signal('');
  readonly filteredArtists = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();

    if (!query) return this.artists;

    return this.artists.filter((artist) => {
      const haystack = [artist.name, ...artist.country].join(' ').toLocaleLowerCase();
      return haystack.includes(query);
    });
  });

  constructor() {
    this.titleService.setTitle('Nebuloud — каталог артистов');
    this.artistService.setArtist();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
