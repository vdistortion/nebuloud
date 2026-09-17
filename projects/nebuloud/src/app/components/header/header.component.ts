import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Analytics } from '../../services/analytics.service';
import { ArtistService } from '../../services/artist.service';
import artists from '../../../db';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);

  readonly artistId = this.artistService.artistId;
  readonly artistName = computed(() => artists[this.artistId()]?.artist.name ?? '');
  readonly isImages = computed(() => Boolean(artists[this.artistId()]?.artist.images?.length));

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
