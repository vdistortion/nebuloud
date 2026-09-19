import { computed, Component, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { AssetUrlService } from '../../services/asset-url.service';
import type { ArtistSummary } from '../../models/content.models';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly titleService = inject(Title);
  private readonly route = inject(ActivatedRoute);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly assetUrl = inject(AssetUrlService);

  readonly artists = toSignal(
    this.route.data.pipe(map((data) => data['artistSummaries'] as ArtistSummary[])),
    { initialValue: [] },
  );
  readonly searchQuery = signal('');
  readonly filteredArtists = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();

    if (!query) return this.artists();

    return this.artists().filter((artist) => {
      const haystack = [artist.name, ...artist.country].join(' ').toLocaleLowerCase();
      return haystack.includes(query);
    });
  });

  constructor() {
    this.titleService.setTitle('Nebuloud — каталог артистов');
    this.artistService.setArtist();
  }

  imageUrl(value: string): string {
    return this.assetUrl.resolve(value);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
