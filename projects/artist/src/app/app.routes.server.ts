import { RenderMode, ServerRoute } from '@angular/ssr';
import {
  getCurrentArtistAlbumParams,
  getCurrentArtistGalleryParams,
  getCurrentArtistSongParams,
} from '@shared/app/ssg-data';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: 'album/:album',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCurrentArtistAlbumParams,
  },
  { path: 'songs', renderMode: RenderMode.Prerender },
  {
    path: 'song/:song',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCurrentArtistSongParams,
  },
  { path: 'video', renderMode: RenderMode.Prerender },
  { path: 'images', renderMode: RenderMode.Prerender },
  {
    path: 'images/:gallery',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCurrentArtistGalleryParams,
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
