import { Component, computed, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { Analytics } from '../../services/analytics.service';
import { ArtistService } from '../../services/artist.service';
import type { ArtistProfile } from '../../models/content.models';

function deepestRoute(route: ActivatedRoute): ActivatedRoute {
  let current = route;
  while (current.firstChild) current = current.firstChild;
  return current;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly artistId = this.artistService.artistId;
  readonly artistProfile = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(
        () => deepestRoute(this.route).snapshot.data['artistProfile'] as ArtistProfile | undefined,
      ),
    ),
    {
      initialValue: deepestRoute(this.route).snapshot.data['artistProfile'] as
        ArtistProfile | undefined,
    },
  );
  readonly artistName = computed(() => this.artistProfile()?.name ?? '');
  readonly isImages = computed(() => Boolean(this.artistProfile()?.hasImages));

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
