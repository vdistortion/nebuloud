import artists from '../projects/nebuloud/src/db/index.ts';

type Item = Record<string, unknown>;

const baseUrl = (process.env.DIRECTUS_URL ?? 'http://localhost:8056').replace(/\/$/, '');
const email = process.env.DIRECTUS_ADMIN_EMAIL ?? 'admin@nebuloud.dev';
const password = process.env.DIRECTUS_ADMIN_PASSWORD ?? 'change-this-admin-password';

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`${options.method ?? 'GET'} ${path}: ${JSON.stringify(payload)}`);
  }
  return payload.data as T;
}

async function login(): Promise<string> {
  const data = await api<{ access_token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return data.access_token;
}

async function findOne(token: string, collection: string, filters: Record<string, string>) {
  const params = new URLSearchParams({ limit: '1' });
  for (const [field, value] of Object.entries(filters)) {
    params.set(`filter[${field}][_eq]`, value);
  }
  const items = await api<Item[]>(`/items/${collection}?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return items[0];
}

async function createIfMissing(
  token: string,
  collection: string,
  filters: Record<string, string>,
  item: Item,
): Promise<Item> {
  const existing = await findOne(token, collection, filters);
  if (existing) return existing;

  return api<Item>(`/items/${collection}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(item),
  });
}

function getSongId(reference: unknown): string | undefined {
  if (typeof reference === 'string') return reference;
  if (Array.isArray(reference)) return reference[0] as string;
  return undefined;
}

function slugifyLabel(value: string): string {
  const transliteration: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };
  const text = value
    .toLocaleLowerCase()
    .split('')
    .map((char) => transliteration[char] ?? char)
    .join('');
  return text
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

async function main() {
  const token = await login();
  const artistEntries = Object.entries(artists as Record<string, any>);

  for (const [artistSlug, item] of artistEntries) {
    const artist = await createIfMissing(
      token,
      'artists',
      { slug: artistSlug },
      {
        slug: artistSlug,
        name: item.artist.name,
        country: item.artist.country,
      },
    );
    const artistId = String(artist.id);
    const songIds = new Map<string, string>();

    for (const [index, song] of Object.values(item.songs).entries()) {
      const migrated = await createIfMissing(
        token,
        'songs',
        { slug: song.id, artist: artistId },
        {
          artist: artist.id,
          slug: song.id,
          title: song.name[0],
          aliases: song.name.slice(1),
          lyrics: song.text,
          authors: song.authors ?? null,
          video_url: song.clipYouTubeId
            ? `https://www.youtube.com/watch?v=${song.clipYouTubeId}`
            : null,
          sort: index,
        },
      );
      songIds.set(song.id, String(migrated.id));
    }

    for (const [index, albumId] of item.artist.albums.entries()) {
      const album = item.albums[albumId];
      const migrated = await createIfMissing(
        token,
        'albums',
        { slug: album.id, artist: artistId },
        {
          artist: artist.id,
          slug: album.id,
          title: album.name,
          year: album.year,
          description: album.info?.trim() || null,
          sort: index,
        },
      );

      for (const [trackIndex, reference] of album.songs.entries()) {
        const sourceSongId = getSongId(reference);
        let songId = sourceSongId ? songIds.get(sourceSongId) : undefined;
        if (!songId && reference && typeof reference === 'object' && !Array.isArray(reference)) {
          const title = String((reference as { name: string }).name);
          const placeholder = await createIfMissing(
            token,
            'songs',
            { artist: artistId, title },
            {
              artist: artist.id,
              slug: `${slugifyLabel(title)}-${album.id}`,
              title,
              aliases: [],
              lyrics: '',
              sort: trackIndex,
            },
          );
          songId = String(placeholder.id);
        }
        if (!songId) continue;

        await createIfMissing(
          token,
          'album_songs',
          { album: String(migrated.id), song: songId },
          { album: migrated.id, song: songId, sort: trackIndex },
        );
      }
    }

    for (const [sort, [service, url]] of Object.entries(item.artist.streaming ?? {}).entries()) {
      await createIfMissing(
        token,
        'streaming_links',
        { artist: artistId, service },
        { artist: artist.id, service, url, sort },
      );
    }

    console.log(`migrated ${artistSlug}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
