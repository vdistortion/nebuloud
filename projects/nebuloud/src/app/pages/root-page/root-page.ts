import { Component, inject } from '@angular/core';
import { ArtistSiteService } from '../../services/artist-site.service';
import { ArtistPage } from '../artist-page/artist-page';
import { HomePage } from '../home-page/home-page';

@Component({
  selector: 'app-root-page',
  imports: [ArtistPage, HomePage],
  templateUrl: './root-page.html',
})
export class RootPage {
  readonly artistSite = inject(ArtistSiteService);
}
