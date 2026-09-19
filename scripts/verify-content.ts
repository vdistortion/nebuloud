import artists from '../projects/nebuloud/src/db/index.ts';

const baseUrl = (process.env.DIRECTUS_URL ?? 'http://localhost:8056').replace(/\/$/, '');

type Item = { id: number | string; slug?: string; [key: string]: unknown };

async function items(collection: string, query: Record<string, string> = {}): Promise<Item[]> {
  const params = new URLSearchParams({ ...query, limit: '-1' });
  const response = await fetch(`${baseUrl}/items/${collection}?${params}`);
  if (!response.ok) throw new Error(`${collection}: Directus returned ${response.status}`);
  return ((await response.json()) as { data: Item[] }).data;
}

function report(label: string, local: number, remote: number) {
  const status = local === remote ? 'OK' : 'DIFF';
  console.log(`${status.padEnd(4)} ${label.padEnd(22)} local=${local} directus=${remote}`);
}

async function main() {
  const remoteArtists = await items('artists', { fields: 'id,slug' });
  const remoteBySlug = new Map(remoteArtists.map((artist) => [String(artist.slug), artist]));
  const localEntries = Object.entries(artists as Record<string, any>);

  report('artists', localEntries.length, remoteArtists.length);

  const missingArtists = localEntries
    .filter(([slug]) => !remoteBySlug.has(slug))
    .map(([slug]) => slug);
  if (missingArtists.length) console.log(`  missing artists: ${missingArtists.join(', ')}`);

  let localAlbums = 0;
  let remoteAlbums = 0;
  let localSongs = 0;
  let remoteSongs = 0;
  let localGalleries = 0;
  let remoteGalleries = 0;

  for (const [slug, item] of localEntries) {
    const remoteArtist = remoteBySlug.get(slug);
    if (!remoteArtist) continue;

    const [albums, songs, galleries] = await Promise.all([
      items('albums', { 'filter[artist][_eq]': String(remoteArtist.id), fields: 'slug' }),
      items('songs', { 'filter[artist][_eq]': String(remoteArtist.id), fields: 'slug' }),
      items('galleries', { 'filter[artist][_eq]': String(remoteArtist.id), fields: 'slug,title' }),
    ]);

    const localAlbumIds = Object.keys(item.albums);
    const localSongIds = Object.keys(item.songs);
    const remoteAlbumIds = new Set(albums.map((album) => String(album.slug)));
    const remoteSongIds = new Set(songs.map((song) => String(song.slug)));

    localAlbums += localAlbumIds.length;
    remoteAlbums += albums.length;
    localSongs += localSongIds.length;
    remoteSongs += songs.length;
    localGalleries += item.artist.images?.length ?? 0;
    remoteGalleries += galleries.length;

    const missingAlbums = localAlbumIds.filter((id) => !remoteAlbumIds.has(id));
    const missingSongs = localSongIds.filter((id) => !remoteSongIds.has(id));
    if (missingAlbums.length) console.log(`  ${slug} missing albums: ${missingAlbums.join(', ')}`);
    if (missingSongs.length) console.log(`  ${slug} missing songs: ${missingSongs.join(', ')}`);
  }

  report('albums', localAlbums, remoteAlbums);
  report('songs', localSongs, remoteSongs);
  report('galleries', localGalleries, remoteGalleries);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
