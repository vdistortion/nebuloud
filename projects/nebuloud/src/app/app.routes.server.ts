import { RenderMode, ServerRoute } from '@angular/ssr';

type DirectusItem = { id: number | string; slug?: string };
type DirectusResponse<T> = { data: T[] };

const directusUrl = (process.env['DIRECTUS_URL'] ?? 'http://localhost:8056').replace(/\/$/, '');

async function items<T extends DirectusItem>(
  collection: string,
  query: Record<string, string> = {},
): Promise<T[]> {
  const params = new URLSearchParams({ ...query, limit: '-1' });
  const response = await fetch(`${directusUrl}/items/${collection}?${params}`);
  if (!response.ok) {
    throw new Error(`Directus prerender request failed: ${response.status} ${collection}`);
  }
  return ((await response.json()) as DirectusResponse<T>).data;
}

const artistSlugs = async () => {
  const artists = await items<{ id: number | string; slug: string }>('artists', {
    fields: 'id,slug',
  });
  return artists;
};

export const serverRoutes: ServerRoute[] = [
  {
    path: 'artist/:artist',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => (await artistSlugs()).map(({ slug }) => ({ artist: slug })),
  },
  {
    path: 'artist/:artist/video',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => (await artistSlugs()).map(({ slug }) => ({ artist: slug })),
  },
  {
    path: 'artist/:artist/images',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => (await artistSlugs()).map(({ slug }) => ({ artist: slug })),
  },
  {
    path: 'artist/:artist/images/:gallery',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const result: { artist: string; gallery: string }[] = [];
      for (const artist of await artistSlugs()) {
        const galleries = await items('galleries', {
          'filter[artist][_eq]': String(artist.id),
          fields: 'id',
        });
        result.push(
          ...galleries.map((gallery) => ({ artist: artist.slug, gallery: String(gallery.id) })),
        );
      }
      return result;
    },
  },
  {
    path: 'artist/:artist/songs',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => (await artistSlugs()).map(({ slug }) => ({ artist: slug })),
  },
  {
    path: 'artist/:artist/song/:song',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const result: { artist: string; song: string }[] = [];
      for (const artist of await artistSlugs()) {
        const songs = await items('songs', {
          'filter[artist][_eq]': String(artist.id),
          fields: 'slug',
        });
        result.push(...songs.map((song) => ({ artist: artist.slug, song: String(song.slug) })));
      }
      return result;
    },
  },
  {
    path: 'artist/:artist/album/:album',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const result: { artist: string; album: string }[] = [];
      for (const artist of await artistSlugs()) {
        const albums = await items('albums', {
          'filter[artist][_eq]': String(artist.id),
          fields: 'slug',
        });
        result.push(...albums.map((album) => ({ artist: artist.slug, album: String(album.slug) })));
      }
      return result;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
