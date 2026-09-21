import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import artists from '../projects/nebuloud/src/db/index.ts';

const baseUrl = (process.env.DIRECTUS_URL ?? 'http://localhost:8056').replace(/\/$/, '');
const email = process.env.DIRECTUS_ADMIN_EMAIL ?? 'admin@nebuloud.dev';
const password = process.env.DIRECTUS_ADMIN_PASSWORD ?? 'change-this-admin-password';
const publicRoot = resolve('projects/nebuloud/public');

let accessToken = '';

async function loginRaw() {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(`POST /auth/login: ${JSON.stringify(payload)}`);
  accessToken = payload.data.access_token as string;
  return accessToken;
}

async function request(path: string, options: RequestInit = {}) {
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const headers = new Headers(options.headers);
      if (accessToken && !path.startsWith('/auth/'))
        headers.set('Authorization', `Bearer ${accessToken}`);
      const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
      const payload = await response.json();
      if (response.ok) return payload.data;
      const expired =
        response.status === 401 && payload?.errors?.[0]?.extensions?.code === 'TOKEN_EXPIRED';
      if (expired && !path.startsWith('/auth/')) {
        await loginRaw();
        continue;
      }
      if (![429, 502, 503, 504].includes(response.status) || attempt === 5) {
        throw new Error(`${options.method ?? 'GET'} ${path}: ${JSON.stringify(payload)}`);
      }
    } catch (error) {
      if (attempt === 5 || (error instanceof Error && error.message.startsWith('POST /auth/'))) {
        throw error;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
  }
}

async function login() {
  return loginRaw();
}

async function findFile(token: string, title: string) {
  const params = new URLSearchParams({
    'filter[title][_eq]': title,
    fields: 'id,title,storage',
    limit: '1',
  });
  const files = await request(`/files?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return files[0];
}

async function upload(token: string, filePath: string, title: string) {
  const existing = await findFile(token, title);
  if (existing?.storage === 'garage') return existing;
  const garageTitle = `${title} [garage]`;
  const migrated = await findFile(token, garageTitle);
  if (migrated?.storage === 'garage') return migrated;

  const form = new FormData();
  const buffer = await readFile(filePath);
  form.append('storage', 'garage');
  form.append('title', garageTitle);
  form.append('file', new Blob([buffer]), basename(filePath));

  return request('/files', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
}

async function patch(token: string, collection: string, id: string, body: Record<string, unknown>) {
  return request(`/items/${collection}/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function main() {
  const token = await login();

  for (const [artistSlug, item] of Object.entries(artists as Record<string, any>)) {
    const artistsResponse = await request(
      `/items/artists?filter[slug][_eq]=${encodeURIComponent(artistSlug)}&limit=1`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const directusArtist = artistsResponse[0];
    if (!directusArtist) continue;

    const artistPath = resolve(publicRoot, `.${item.artist.image}`);
    const artistFile = await upload(token, artistPath, `artist/${artistSlug}`);
    await patch(token, 'artists', String(directusArtist.id), { image: artistFile.id });

    for (const albumId of item.artist.albums) {
      const album = item.albums[albumId];
      if (!album?.folder) continue;
      const albumPath = resolve(publicRoot, `.${album.folder}`);
      const fileTitle = `album/${artistSlug}/${album.id}`;
      const albumFile = await upload(token, albumPath, fileTitle);
      const albums = await request(
        `/items/albums?filter[artist][_eq]=${directusArtist.id}&filter[slug][_eq]=${encodeURIComponent(album.id)}&limit=1`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (albums[0]) await patch(token, 'albums', String(albums[0].id), { cover: albumFile.id });
    }

    console.log(`migrated covers: ${artistSlug}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
