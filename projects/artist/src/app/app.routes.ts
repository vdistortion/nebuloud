import { Routes } from '@angular/router';
import { createArtistRoutes } from '@shared';

export const routes: Routes = [...createArtistRoutes(''), { path: '**', redirectTo: '' }];
