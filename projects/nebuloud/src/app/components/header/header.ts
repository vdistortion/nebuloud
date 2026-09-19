import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Analytics } from '../../services/analytics.service';
import { ArtistService } from '../../services/artist.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly content = inject(ContentService);

  readonly artistId = this.artistService.artistId;
  readonly artistName = computed(() => this.content.getArtistProfile(this.artistId())?.name ?? '');
  readonly isImages = computed(() =>
    Boolean(this.content.getArtistProfile(this.artistId())?.hasImages),
  );

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
