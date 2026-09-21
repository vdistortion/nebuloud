import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import artists from '../projects/nebuloud/src/db/index.ts';

const baseUrl = (process.env.DIRECTUS_URL ?? 'http://localhost:8056').replace(/\/$/, '');
const email = process.env.DIRECTUS_ADMIN_EMAIL ?? 'admin@nebuloud.dev';
const password = process.env.DIRECTUS_ADMIN_PASSWORD ?? 'change-this-admin-password';
const publicRoot = resolve('projects/nebuloud/public');

type Item = Record<string, any>;

async function request(path: string, options: RequestInit = {}) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(`${baseUrl}${path}`, options);
    const payload = await response.json();
    if (response.ok) return payload.data;
    if (![429, 502, 503, 504].includes(response.status) || attempt === 4) {
      throw new Error(`${options.method ?? 'GET'} ${path}: ${JSON.stringify(payload)}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
  }
}

async function login() {
  const data = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return data.access_token as string;
}

async function findOne(token: string, collection: string, filters: Record<string, string>) {
  const params = new URLSearchParams({ limit: '1' });
  for (const [field, value] of Object.entries(filters)) {
    params.set(`filter[${field}][_eq]`, value);
  }
  return (
    await request(`/items/${collection}?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  )[0] as Item | undefined;
}

async function upload(token: string, filePath: string, title: string) {
  const params = new URLSearchParams({
    'filter[title][_eq]': title,
    fields: 'id,title,storage',
    limit: '1',
  });
  const existing = (
    await request(`/files?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  )[0];
  if (existing?.storage === 'garage') return existing;
  const garageTitle = `${title} [garage]`;
  const migrated = (
    await request(
      `/files?${new URLSearchParams({ 'filter[title][_eq]': garageTitle, limit: '1' })}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
  )[0];
  if (migrated?.storage === 'garage') return migrated;

  const form = new FormData();
  form.append('storage', 'garage');
  form.append('title', garageTitle);
  form.append('file', new Blob([await readFile(filePath)]), basename(filePath));
  return request('/files', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
}

async function main() {
  const token = await login();

  for (const [artistSlug, item] of Object.entries(artists as Record<string, any>)) {
    const directusArtist = await findOne(token, 'artists', { slug: artistSlug });
    if (!directusArtist) continue;

    for (const [galleryIndex, gallery] of (item.artist.images ?? []).entries()) {
      const sourcePath = gallery.path.join('/');
      const galleryRecord = await findOne(token, 'galleries', {
        artist: String(directusArtist.id),
        slug: String(galleryIndex),
      });
      const directusGallery =
        galleryRecord ??
        (await request('/items/galleries', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            artist: directusArtist.id,
            slug: String(galleryIndex),
            title: gallery.path.at(-1) ?? `Галерея ${galleryIndex}`,
            source_path: sourcePath,
            sort: galleryIndex,
          }),
        }));

      for (const [sort, picture] of gallery.pictures.entries()) {
        const filePath = resolve(publicRoot, 'artist', artistSlug, 'images', sourcePath, picture);
        const file = await upload(
          token,
          filePath,
          `gallery/${artistSlug}/${sourcePath}/${picture}`,
        );
        const existingImage = await findOne(token, 'gallery_images', {
          gallery: String(directusGallery.id),
          sort: String(sort),
        });
        if (existingImage) {
          await request(`/items/gallery_images/${existingImage.id}`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: file.id, sort }),
          });
        } else {
          await request('/items/gallery_images', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gallery: directusGallery.id, image: file.id, sort }),
          });
        }
      }
      console.log(`migrated gallery: ${artistSlug}/${sourcePath}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
