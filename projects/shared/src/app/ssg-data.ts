interface DirectusRecord {
  id: number | string;
  slug?: string;
  site_domain?: string | null;
}

interface DirectusResponse<T> {
  data: T[];
}

const directusUrl = (process.env['DIRECTUS_URL'] ?? 'http://localhost:8056').replace(/\/$/, '');
const requestCache = new Map<string, Promise<DirectusRecord[]>>();
let artistRequest: Promise<DirectusRecord[]> | undefined;

async function items<T extends DirectusRecord>(
  collection: string,
  query: Record<string, string> = {},
): Promise<T[]> {
  const params = new URLSearchParams({ ...query, limit: '-1' });
  const url = `${directusUrl}/items/${collection}?${params}`;
  let request = requestCache.get(url);
  if (!request) {
    request = fetch(url).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Directus prerender request failed: ${response.status} ${collection}`);
      }
      return ((await response.json()) as DirectusResponse<T>).data;
    }) as Promise<DirectusRecord[]>;
    requestCache.set(url, request);
  }
  return (await request) as T[];
}

function artists(): Promise<DirectusRecord[]> {
  artistRequest ??= items('artists', { fields: 'id,slug,site_domain' });
  return artistRequest;
}

async function catalogArtists(): Promise<DirectusRecord[]> {
  return (await artists()).filter((artist) => !String(artist.site_domain ?? '').trim());
}

async function currentArtist(): Promise<DirectusRecord> {
  const slug = process.env['ARTIST_SLUG'];
  if (!slug) throw new Error('ARTIST_SLUG is required to prerender the artist site.');

  const artist = (await artists()).find((item) => item.slug === slug);
  if (!artist) throw new Error(`Artist "${slug}" was not found in Directus.`);
  if (!String(artist.site_domain ?? '').trim()) {
    throw new Error(`Artist "${slug}" has no site_domain in Directus.`);
  }
  return artist;
}

async function contentSlugs<T extends DirectusRecord>(
  artistRecords: DirectusRecord[],
  collection: string,
  fields: string,
): Promise<{ artist: string; slug: string }[]> {
  const results: { artist: string; slug: string }[] = [];
  for (const artist of artistRecords) {
    const records = await items<T>(collection, {
      'filter[artist][_eq]': String(artist.id),
      fields,
    });
    results.push(
      ...records.map((record) => ({
        artist: String(artist.slug),
        slug: String(record.slug ?? record.id),
      })),
    );
  }
  return results;
}

export async function getCatalogArtistSlugs(): Promise<{ artist: string }[]> {
  return (await catalogArtists()).map(({ slug }) => ({ artist: String(slug) }));
}

export async function getCatalogAlbumParams(): Promise<{ artist: string; album: string }[]> {
  return (await contentSlugs(await catalogArtists(), 'albums', 'id,slug')).map(
    ({ artist, slug }) => ({
      artist,
      album: slug,
    }),
  );
}

export async function getCatalogSongParams(): Promise<{ artist: string; song: string }[]> {
  return (await contentSlugs(await catalogArtists(), 'songs', 'id,slug')).map(
    ({ artist, slug }) => ({
      artist,
      song: slug,
    }),
  );
}

export async function getCatalogGalleryParams(): Promise<{ artist: string; gallery: string }[]> {
  const results: { artist: string; gallery: string }[] = [];
  for (const artist of await catalogArtists()) {
    const galleries = await items('galleries', {
      'filter[artist][_eq]': String(artist.id),
      fields: 'id',
    });
    results.push(
      ...galleries.map((gallery) => ({ artist: String(artist.slug), gallery: String(gallery.id) })),
    );
  }
  return results;
}

async function currentArtistContentSlugs<T extends DirectusRecord>(
  collection: string,
  fields: string,
): Promise<string[]> {
  const artist = await currentArtist();
  const records = await items<T>(collection, {
    'filter[artist][_eq]': String(artist.id),
    fields,
  });
  return records.map((record) => String(record.slug ?? record.id));
}

export async function getCurrentArtistAlbumParams(): Promise<{ album: string }[]> {
  return (await currentArtistContentSlugs('albums', 'id,slug')).map((album) => ({ album }));
}

export async function getCurrentArtistSongParams(): Promise<{ song: string }[]> {
  return (await currentArtistContentSlugs('songs', 'id,slug')).map((song) => ({ song }));
}

export async function getCurrentArtistGalleryParams(): Promise<{ gallery: string }[]> {
  const artist = await currentArtist();
  const galleries = await items('galleries', {
    'filter[artist][_eq]': String(artist.id),
    fields: 'id',
  });
  return galleries.map((gallery) => ({ gallery: String(gallery.id) }));
}
