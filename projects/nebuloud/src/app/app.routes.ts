import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ContentService } from './services/content.service';
import { DirectusContentSource } from './data/directus-content.source';

const artistSummariesResolver = () => {
  const directus = inject(DirectusContentSource);
  const local = inject(ContentService);
  return directus.getArtistSummaries().catch(() => local.artistSummaries);
};

export const routes: Routes = [
  {
    path: '',
    resolve: { artistSummaries: artistSummariesResolver },
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'artist/:artist',
    loadComponent: () => import('./pages/artist-page/artist-page').then((m) => m.ArtistPage),
  },
  {
    path: 'artist/:artist/video',
    loadComponent: () => import('./pages/video-page/video-page').then((m) => m.VideoPage),
  },
  {
    path: 'artist/:artist/images',
    loadComponent: () => import('./pages/images-page/images-page').then((m) => m.ImagesPage),
  },
  {
    path: 'artist/:artist/images/:gallery',
    loadComponent: () => import('./pages/gallery-page/gallery-page').then((m) => m.GalleryPage),
  },
  {
    path: 'artist/:artist/songs',
    loadComponent: () => import('./pages/songs-page/songs-page').then((m) => m.SongsPage),
  },
  {
    path: 'artist/:artist/songs/other',
    loadComponent: () =>
      import('./pages/other-songs-page/other-songs-page').then((m) => m.OtherSongsPage),
  },
  {
    path: 'artist/:artist/song/:song',
    loadComponent: () => import('./pages/song-page/song-page').then((m) => m.SongPage),
  },
  {
    path: 'artist/:artist/album/:album',
    loadComponent: () => import('./pages/album-page/album-page').then((m) => m.AlbumPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
