import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { ARTIST_SITE_SLUG } from './config';
import { ContentService } from './services/content.service';

const routeArtist = (route: ActivatedRouteSnapshot) =>
  route.paramMap.get('artist') ?? inject(ARTIST_SITE_SLUG) ?? '';

export const artistSummariesResolver = () => inject(ContentService).getArtistSummaries();

const artistProfileResolver = (route: ActivatedRouteSnapshot) => {
  const slug = routeArtist(route);
  return slug ? inject(ContentService).getArtistProfileAsync(slug) : undefined;
};

const albumResolver = (route: ActivatedRouteSnapshot) =>
  inject(ContentService).getAlbumAsync(routeArtist(route), route.paramMap.get('album') ?? '');

const songResolver = (route: ActivatedRouteSnapshot) =>
  inject(ContentService).getSongAsync(routeArtist(route), route.paramMap.get('song') ?? '');

const songsResolver = (route: ActivatedRouteSnapshot) =>
  inject(ContentService).getSongsAsync(routeArtist(route));

const videosResolver = (route: ActivatedRouteSnapshot) =>
  inject(ContentService).getVideosAsync(routeArtist(route));

const galleriesResolver = (route: ActivatedRouteSnapshot) =>
  inject(ContentService).getGalleriesAsync(routeArtist(route));

const galleryResolver = (route: ActivatedRouteSnapshot) =>
  inject(ContentService).getGalleryAsync(routeArtist(route), route.paramMap.get('gallery') ?? '');

export function createArtistRoutes(prefix: 'artist/:artist' | ''): Routes {
  const path = (suffix = '') => [prefix, suffix].filter(Boolean).join('/');

  return [
    {
      path: path(),
      resolve: { artistProfile: artistProfileResolver },
      loadComponent: () => import('./pages/artist-page/artist-page').then((m) => m.ArtistPage),
    },
    {
      path: path('video'),
      resolve: { artistProfile: artistProfileResolver, videos: videosResolver },
      loadComponent: () => import('./pages/video-page/video-page').then((m) => m.VideoPage),
    },
    {
      path: path('images'),
      resolve: { artistProfile: artistProfileResolver, galleries: galleriesResolver },
      loadComponent: () => import('./pages/images-page/images-page').then((m) => m.ImagesPage),
    },
    {
      path: path('images/:gallery'),
      resolve: { artistProfile: artistProfileResolver, gallery: galleryResolver },
      loadComponent: () => import('./pages/gallery-page/gallery-page').then((m) => m.GalleryPage),
    },
    {
      path: path('songs'),
      resolve: { artistProfile: artistProfileResolver, songs: songsResolver },
      loadComponent: () => import('./pages/songs-page/songs-page').then((m) => m.SongsPage),
    },
    {
      path: path('song/:song'),
      resolve: { artistProfile: artistProfileResolver, song: songResolver },
      loadComponent: () => import('./pages/song-page/song-page').then((m) => m.SongPage),
    },
    {
      path: path('album/:album'),
      resolve: { artistProfile: artistProfileResolver, album: albumResolver },
      loadComponent: () => import('./pages/album-page/album-page').then((m) => m.AlbumPage),
    },
  ];
}
