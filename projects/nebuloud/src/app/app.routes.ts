import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'artist/:artist',
    loadComponent: () =>
      import('./pages/artist-page/artist-page.component').then((m) => m.ArtistPageComponent),
  },
  {
    path: 'artist/:artist/video',
    loadComponent: () =>
      import('./pages/video-page/video-page.component').then((m) => m.VideoPageComponent),
  },
  {
    path: 'artist/:artist/images',
    loadComponent: () =>
      import('./pages/images-page/images-page.component').then((m) => m.ImagesPageComponent),
  },
  {
    path: 'artist/:artist/images/:gallery',
    loadComponent: () =>
      import('./pages/gallery-page/gallery-page.component').then((m) => m.GalleryPageComponent),
  },
  {
    path: 'artist/:artist/songs',
    loadComponent: () =>
      import('./pages/songs-page/songs-page.component').then((m) => m.SongsPageComponent),
  },
  {
    path: 'artist/:artist/songs/other',
    loadComponent: () =>
      import('./pages/other-songs-page/other-songs-page.component').then(
        (m) => m.OtherSongsPageComponent,
      ),
  },
  {
    path: 'artist/:artist/song/:song',
    loadComponent: () =>
      import('./pages/song-page/song-page.component').then((m) => m.SongPageComponent),
  },
  {
    path: 'artist/:artist/album/:album',
    loadComponent: () =>
      import('./pages/album-page/album-page.component').then((m) => m.AlbumPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
