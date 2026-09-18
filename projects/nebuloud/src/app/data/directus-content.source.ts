import { inject, Injectable } from '@angular/core';
import { DIRECTUS_URL } from '../config';
import type {
  ArtistProfile,
  CatalogAlbum,
  CatalogGallery,
  CatalogSong,
} from '../models/content.models';
import type { TypeArtistSummary, TypeStreaming } from '../../db/types';

interface DirectusItem {
  id: number | string;
  [key: string]: unknown;
}

interface DirectusResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class DirectusContentSource {
  private readonly baseUrl = inject(DIRECTUS_URL);
  private readonly profileCache = new Map<string, Promise<ArtistProfile | undefined>>();
  private readonly songsCache = new Map<string, Promise<CatalogSong[]>>();
  private readonly galleriesCache = new Map<string, Promise<CatalogGallery[]>>();

  async getArtistSummaries(): Promise<TypeArtistSummary[]> {
    const artists = await this.items<DirectusItem>('artists', {
      fields: 'id,slug,name,country,image',
      limit: '-1',
    });

    return artists.map((artist) => ({
      id: String(artist['slug']),
      name: String(artist['name'] ?? ''),
      image: artist['image'] ? `/assets/${artist['image']}` : '/album-card.jpg',
      country: Array.isArray(artist['country']) ? artist['country'].map(String) : [],
    }));
  }

  getArtistProfile(slug: string): Promise<ArtistProfile | undefined> {
    const cached = this.profileCache.get(slug);
    if (cached) return cached;

    const request = this.loadArtistProfile(slug);
    this.profileCache.set(slug, request);
    return request;
  }

  private async loadArtistProfile(slug: string): Promise<ArtistProfile | undefined> {
    const artists = await this.items<DirectusItem>('artists', {
      'filter[slug][_eq]': slug,
      fields: 'id,slug,name,image,country,description',
      limit: '1',
    });
    const artist = artists[0];
    if (!artist) return undefined;

    const artistId = String(artist.id);
    const [albums, songs, galleries, artistLinks] = await Promise.all([
      this.items<DirectusItem>('albums', {
        'filter[artist][_eq]': artistId,
        fields: 'id,slug,title,year,cover,description,sort',
        sort: 'sort',
        limit: '-1',
      }),
      this.items<DirectusItem>('songs', {
        'filter[artist][_eq]': artistId,
        fields: 'id,slug,title,aliases,lyrics,authors,video_url,sort',
        sort: 'sort',
        limit: '-1',
      }),
      this.items<DirectusItem>('galleries', {
        'filter[artist][_eq]': artistId,
        fields: 'id,slug,title,source_path,sort',
        sort: 'sort',
        limit: '-1',
      }),
      this.items<DirectusItem>('streaming_links', {
        'filter[artist][_eq]': artistId,
        fields: 'service,url,sort',
        sort: 'sort',
        limit: '-1',
      }),
    ]);

    const songModels = songs.map((song) => this.mapSong(song));
    const albumModels = await Promise.all(albums.map((album) => this.mapAlbum(album, songModels)));

    return {
      id: String(artist.id),
      name: String(artist['name'] ?? ''),
      image: artist['image'] ? `/assets/${artist['image']}` : '/album-card.jpg',
      country: Array.isArray(artist['country']) ? artist['country'].map(String) : [],
      albums: albumModels,
      hasImages: galleries.length > 0,
      streaming: this.mapStreaming(artistLinks),
    };
  }

  async getAlbumBySlug(artistSlug: string, albumSlug: string): Promise<CatalogAlbum | undefined> {
    const profile = await this.getArtistProfile(artistSlug);
    return profile?.albums.find((album) => album.id === albumSlug);
  }

  async getSongBySlug(artistSlug: string, songSlug: string): Promise<CatalogSong | undefined> {
    const songs = await this.getSongs(artistSlug);
    return songs.find((song) => song.id === songSlug);
  }

  getSongs(artistSlug: string): Promise<CatalogSong[]> {
    const cached = this.songsCache.get(artistSlug);
    if (cached) return cached;

    const request = this.loadSongs(artistSlug);
    this.songsCache.set(artistSlug, request);
    return request;
  }

  private async loadSongs(artistSlug: string): Promise<CatalogSong[]> {
    const artists = await this.items<DirectusItem>('artists', {
      'filter[slug][_eq]': artistSlug,
      fields: 'id',
      limit: '1',
    });
    const artist = artists[0];
    if (!artist) return [];

    const songs = await this.items<DirectusItem>('songs', {
      'filter[artist][_eq]': String(artist.id),
      fields: 'id,slug,title,aliases,lyrics,authors,video_url,sort',
      sort: 'sort',
      limit: '-1',
    });

    if (!songs.length) return [];

    const relations = await this.items<DirectusItem>('album_songs', {
      'filter[song][_in]': songs.map((song) => String(song.id)).join(','),
      fields: 'song,album',
      limit: '-1',
    });
    const albumIds = [...new Set(relations.map((relation) => String(relation['album'])))].join(',');
    const albums = albumIds
      ? await this.items<DirectusItem>('albums', {
          'filter[id][_in]': albumIds,
          fields: 'id,slug',
          limit: '-1',
        })
      : [];
    const albumSlugs = new Map(
      albums.map((album) => [String(album.id), String(album['slug'] ?? album.id)]),
    );
    const songAlbums = new Map<string, string[]>();
    for (const relation of relations) {
      const songId = String(relation['song']);
      const albumSlug = albumSlugs.get(String(relation['album']));
      if (albumSlug) songAlbums.set(songId, [...(songAlbums.get(songId) ?? []), albumSlug]);
    }

    return songs.map((song) => {
      const model = this.mapSong(song);
      model.albums = songAlbums.get(String(song.id)) ?? [];
      return model;
    });
  }

  async getSongsWithLyrics(artistSlug: string): Promise<CatalogSong[]> {
    return (await this.getSongs(artistSlug)).filter((song) => song.lyrics.trim());
  }

  async getSongsWithoutAlbum(artistSlug: string): Promise<CatalogSong[]> {
    return (await this.getSongs(artistSlug)).filter((song) => !song.albums.length);
  }

  async getVideos(artistSlug: string): Promise<CatalogSong[]> {
    return (await this.getSongs(artistSlug)).filter((song) => Boolean(song.videoId));
  }

  async getGalleryById(artistSlug: string, galleryId: string): Promise<CatalogGallery | undefined> {
    const galleries = await this.getGalleries(artistSlug);
    return galleries.find((gallery) => gallery.id === galleryId);
  }

  getGalleries(slug: string): Promise<CatalogGallery[]> {
    const cached = this.galleriesCache.get(slug);
    if (cached) return cached;

    const request = this.loadGalleries(slug);
    this.galleriesCache.set(slug, request);
    return request;
  }

  private async loadGalleries(slug: string): Promise<CatalogGallery[]> {
    const artists = await this.items<DirectusItem>('artists', {
      'filter[slug][_eq]': slug,
      fields: 'id',
      limit: '1',
    });
    const artist = artists[0];
    if (!artist) return [];

    const galleries = await this.items<DirectusItem>('galleries', {
      'filter[artist][_eq]': String(artist.id),
      fields: 'id,slug,title,source_path,sort',
      sort: 'sort',
      limit: '-1',
    });

    return Promise.all(
      galleries.map(async (gallery) => {
        const images = await this.items<DirectusItem>('gallery_images', {
          'filter[gallery][_eq]': String(gallery.id),
          fields: 'image,sort',
          sort: 'sort',
          limit: '-1',
        });
        return {
          id: String(gallery.id),
          title: String(gallery['title'] ?? ''),
          path: String(gallery['source_path'] ?? '')
            .split('/')
            .filter(Boolean),
          pictures: images.map((image) => `/assets/${String(image['image'])}`),
        };
      }),
    );
  }

  private async mapAlbum(item: DirectusItem, songs: CatalogSong[]): Promise<CatalogAlbum> {
    const [albumSongs, links] = await Promise.all([
      this.items<DirectusItem>('album_songs', {
        'filter[album][_eq]': String(item.id),
        fields: 'song,sort',
        sort: 'sort',
        limit: '-1',
      }),
      this.items<DirectusItem>('streaming_links', {
        'filter[album][_eq]': String(item.id),
        fields: 'service,url,sort',
        sort: 'sort',
        limit: '-1',
      }),
    ]);
    const songIds = new Set(albumSongs.map((relation) => String(relation['song'])));

    return {
      id: String(item['slug'] ?? item.id),
      sourceId: String(item.id),
      name: String(item['title'] ?? ''),
      year: Number(item['year'] ?? 0),
      cover: item['cover'] ? `/assets/${item['cover']}` : undefined,
      info: item['description'] ? String(item['description']) : undefined,
      songs: songs.filter((song) => song.sourceId && songIds.has(song.sourceId)),
      streaming: this.mapStreaming(links),
    };
  }

  private mapSong(item: DirectusItem): CatalogSong {
    return {
      id: String(item['slug'] ?? item.id),
      sourceId: String(item.id),
      title: String(item['title'] ?? ''),
      aliases: Array.isArray(item['aliases']) ? item['aliases'].map(String) : [],
      lyrics: String(item['lyrics'] ?? ''),
      albums: [],
      authors: item['authors'] ? String(item['authors']) : undefined,
      videoId: this.youtubeId(item['video_url']),
    };
  }

  private mapStreaming(value: unknown): TypeStreaming | undefined {
    if (!Array.isArray(value)) return undefined;
    const links = value as DirectusItem[];
    const result: Record<string, string> = {};
    for (const link of links) {
      if (link['service'] && link['url']) result[String(link['service'])] = String(link['url']);
    }
    return Object.keys(result).length ? (result as TypeStreaming) : undefined;
  }

  private youtubeId(value: unknown): string | undefined {
    if (!value) return undefined;
    const url = String(value);
    const match = url.match(/[?&]v=([^&]+)/) ?? url.match(/youtu\.be\/([^?]+)/);
    return match?.[1] ?? url;
  }

  private async items<T extends DirectusItem>(
    collection: string,
    query: Record<string, string>,
  ): Promise<T[]> {
    const params = new URLSearchParams(query);
    const response = await fetch(`${this.baseUrl}/items/${collection}?${params}`);
    if (!response.ok) throw new Error(`Directus request failed: ${response.status}`);
    return ((await response.json()) as DirectusResponse<T[]>).data;
  }
}
