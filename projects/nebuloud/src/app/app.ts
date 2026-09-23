import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Header } from './components/header/header';
import { ArtistSiteService } from './services/artist-site.service';
import { artistHost } from './config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly artistSite = inject(ArtistSiteService);

  readonly navigationLoading = signal(false);

  constructor() {
    const artistSlug = this.artistSite.currentArtistSlug;
    if (artistSlug && typeof window !== 'undefined' && this.router.url === '/') {
      void this.router.navigateByUrl(`/artist/${artistSlug}`, { replaceUrl: true });
    }

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.redirectConfiguredArtistRoute(event.url);
      }
      if (event instanceof NavigationStart) this.navigationLoading.set(true);
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.navigationLoading.set(false);
      }
    });
  }

  private redirectConfiguredArtistRoute(url: string) {
    if (typeof window === 'undefined' || this.artistSite.currentArtistSlug) return;

    const artistSlug = url.match(/^\/artist\/([^/?#]+)/)?.[1];
    if (!artistSlug) return;

    const host = artistHost(decodeURIComponent(artistSlug));
    if (!host || host === window.location.hostname) return;

    window.location.replace(this.artistSite.urlForPath(host, url));
  }
}
