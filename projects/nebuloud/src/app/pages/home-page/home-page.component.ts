import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
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
  private analytics = inject(Analytics);
  public artists: TypeArtistSummary[] = artistSummaries;

  constructor(
    private titleService: Title,
    private artistService: ArtistService,
  ) {
    this.titleService.setTitle('Каталог исполнителей');
    this.artistService.setArtist();
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
