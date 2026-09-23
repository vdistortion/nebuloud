import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ContentService } from './services/content.service';
import { artistSlugForCurrentHost } from './config';

const routeArtist = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  route.paramMap.get('artist') ?? artistSlugForCurrentHost() ?? '';

const artistSummariesResolver = () => inject(ContentService).getArtistSummaries();

const artistProfileResolver = (route: import('@angular/router').ActivatedRouteSnapshot) => {
  const slug = routeArtist(route);
  return slug ? inject(ContentService).getArtistProfileAsync(slug) : undefined;
};

const albumResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getAlbumAsync(routeArtist(route), route.paramMap.get('album') ?? '');

const songResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getSongAsync(routeArtist(route), route.paramMap.get('song') ?? '');

const songsResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getSongsAsync(routeArtist(route));

const videosResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getVideosAsync(routeArtist(route));

const galleriesResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getGalleriesAsync(routeArtist(route));

const galleryResolver = (route: import('@angular/router').ActivatedRouteSnapshot) =>
  inject(ContentService).getGalleryAsync(routeArtist(route), route.paramMap.get('gallery') ?? '');

export const routes: Routes = [
  {
    path: '',
    resolve: { artistSummaries: artistSummariesResolver, artistProfile: artistProfileResolver },
    loadComponent: () => import('./pages/root-page/root-page').then((m) => m.RootPage),
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
    path: 'album/:album',
    resolve: { artistProfile: artistProfileResolver, album: albumResolver },
    loadComponent: () => import('./pages/album-page/album-page').then((m) => m.AlbumPage),
  },
  {
    path: 'songs',
    resolve: { artistProfile: artistProfileResolver, songs: songsResolver },
    loadComponent: () => import('./pages/songs-page/songs-page').then((m) => m.SongsPage),
  },
  {
    path: 'song/:song',
    resolve: { artistProfile: artistProfileResolver, song: songResolver },
    loadComponent: () => import('./pages/song-page/song-page').then((m) => m.SongPage),
  },
  {
    path: 'video',
    resolve: { artistProfile: artistProfileResolver, videos: videosResolver },
    loadComponent: () => import('./pages/video-page/video-page').then((m) => m.VideoPage),
  },
  {
    path: 'images',
    resolve: { artistProfile: artistProfileResolver, galleries: galleriesResolver },
    loadComponent: () => import('./pages/images-page/images-page').then((m) => m.ImagesPage),
  },
  {
    path: 'images/:gallery',
    resolve: { artistProfile: artistProfileResolver, gallery: galleryResolver },
    loadComponent: () => import('./pages/gallery-page/gallery-page').then((m) => m.GalleryPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
