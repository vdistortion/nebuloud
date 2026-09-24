import { RenderMode, ServerRoute } from '@angular/ssr';
import {
  getCatalogAlbumParams,
  getCatalogArtistSlugs,
  getCatalogGalleryParams,
  getCatalogSongParams,
} from '@shared/app/ssg-data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'artist/:artist',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCatalogArtistSlugs,
  },
  {
    path: 'artist/:artist/video',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCatalogArtistSlugs,
  },
  {
    path: 'artist/:artist/images',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCatalogArtistSlugs,
  },
  {
    path: 'artist/:artist/images/:gallery',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCatalogGalleryParams,
  },
  {
    path: 'artist/:artist/songs',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCatalogArtistSlugs,
  },
  {
    path: 'artist/:artist/song/:song',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCatalogSongParams,
  },
  {
    path: 'artist/:artist/album/:album',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCatalogAlbumParams,
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
