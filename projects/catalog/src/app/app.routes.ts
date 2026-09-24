import { Routes } from '@angular/router';
import { artistSummariesResolver, createArtistRoutes } from '@shared';

export const routes: Routes = [
  {
    path: '',
    resolve: { artistSummaries: artistSummariesResolver },
    loadComponent: () => import('@shared/app/pages/home-page/home-page').then((m) => m.HomePage),
  },
  ...createArtistRoutes('artist/:artist'),
  { path: '**', redirectTo: '' },
];
