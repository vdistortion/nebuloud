import { RenderMode, ServerRoute } from '@angular/ssr';
import artists from '../db';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'artist/:artist',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return Object.keys(artists).map((id) => ({ artist: id }));
    },
  },
  {
    path: 'artist/:artist/video',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return Object.keys(artists).map((id) => ({ artist: id }));
    },
  },
  {
    path: 'artist/:artist/images',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return Object.keys(artists).map((id) => ({ artist: id }));
    },
  },
  {
    path: 'artist/:artist/images/:gallery',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const result: { artist: string; gallery: string }[] = [];
      Object.entries(artists).forEach(([artist, item]) => {
        item.artist.images?.forEach((_, gallery) => {
          result.push({ artist, gallery: String(gallery) });
        });
      });
      return result;
    },
  },
  {
    path: 'artist/:artist/songs',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return Object.keys(artists).map((id) => ({ artist: id }));
    },
  },
  {
    path: 'artist/:artist/songs/other',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return Object.keys(artists).map((id) => ({ artist: id }));
    },
  },
  {
    path: 'artist/:artist/song/:song',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const result: { artist: string; song: string }[] = [];
      Object.entries(artists).forEach(([artist, item]) => {
        Object.keys(item.songs).forEach((song) => {
          result.push({ artist, song });
        });
      });
      return result;
    },
  },
  {
    path: 'artist/:artist/album/:album',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const result: { artist: string; album: string }[] = [];
      Object.entries(artists).forEach(([artist, item]) => {
        Object.keys(item.albums).forEach((album) => {
          result.push({ artist, album });
        });
      });
      return result;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
