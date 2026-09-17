import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import artists from '../../../db';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private cdr = inject(ChangeDetectorRef);
  private analytics = inject(Analytics);
  artistId: string = '';
  artistName: string = '';
  isImages: boolean = false;

  constructor(private artistService: ArtistService) {
    this.artistService.artist$.subscribe((id) => {
      this.artistId = id;
      const artistById = artists[id];

      if (artistById) {
        const { artist } = artistById;
        this.artistName = artist.name;
        if (artist.images?.length) this.isImages = true;
      } else {
        this.artistName = '';
      }

      this.cdr.markForCheck();
    });
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
