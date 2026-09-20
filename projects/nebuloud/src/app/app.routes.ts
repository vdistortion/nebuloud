import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ContentService } from './services/content.service';

const artistSummariesResolver = () => inject(ContentService).getArtistSummaries();

const artistProfileResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getArtistProfileAsync(route.paramMap.get('artist') ?? '');

const albumResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getAlbumAsync(
    route.paramMap.get('artist') ?? '',
    route.paramMap.get('album') ?? '',
  );

const songResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getSongAsync(
    route.paramMap.get('artist') ?? '',
    route.paramMap.get('song') ?? '',
  );

const songsResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getSongsAsync(route.paramMap.get('artist') ?? '');

const videosResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getVideosAsync(route.paramMap.get('artist') ?? '');

const galleriesResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getGalleriesAsync(route.paramMap.get('artist') ?? '');

const galleryResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getGalleryAsync(
    route.paramMap.get('artist') ?? '',
    route.paramMap.get('gallery') ?? '',
  );

export const routes: Routes = [
  {
    path: '',
    resolve: { artistSummaries: artistSummariesResolver },
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'artist/:artist',
    resolve: { artistProfile: artistProfileResolver },
    loadComponent: () => import('./pages/artist-page/artist-page').then((m) => m.ArtistPage),
  },
  {
    path: 'artist/:artist/video',
    resolve: { artistProfile: artistProfileResolver, videos: videosResolver },
    loadComponent: () => import('./pages/video-page/video-page').then((m) => m.VideoPage),
  },
  {
    path: 'artist/:artist/images',
    resolve: { artistProfile: artistProfileResolver, galleries: galleriesResolver },
    loadComponent: () => import('./pages/images-page/images-page').then((m) => m.ImagesPage),
  },
  {
    path: 'artist/:artist/images/:gallery',
    resolve: { artistProfile: artistProfileResolver, gallery: galleryResolver },
    loadComponent: () => import('./pages/gallery-page/gallery-page').then((m) => m.GalleryPage),
  },
  {
    path: 'artist/:artist/songs',
    resolve: { artistProfile: artistProfileResolver, songs: songsResolver },
    loadComponent: () => import('./pages/songs-page/songs-page').then((m) => m.SongsPage),
  },
  {
    path: 'artist/:artist/song/:song',
    resolve: { artistProfile: artistProfileResolver, song: songResolver },
    loadComponent: () => import('./pages/song-page/song-page').then((m) => m.SongPage),
  },
  {
    path: 'artist/:artist/album/:album',
    resolve: { artistProfile: artistProfileResolver, album: albumResolver },
    loadComponent: () => import('./pages/album-page/album-page').then((m) => m.AlbumPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
