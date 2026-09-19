import { inject, Injectable } from '@angular/core';
import type { ArtistSummary } from '../models/content.models';
import { DirectusContentSource } from '../data/directus-content.source';
import type { ContentSource } from '../data/content-source';
import { CONTENT_MODE } from '../config';
import type { LocalContentSource } from '../data/local-content.source';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly directus: ContentSource = inject(DirectusContentSource);
  private readonly mode = inject(CONTENT_MODE);
  private localSource?: Promise<LocalContentSource>;

  async getArtistSummaries(): Promise<ArtistSummary[]> {
    return this.withFallback(
      () => this.directus.getArtistSummaries(),
      async () => (await this.local()).artistSummaries,
      'artist summaries',
    );
  }

  async getArtistProfileAsync(id: string) {
    return this.withFallback(
      () => this.directus.getArtistProfile(id),
      async () => (await this.local()).getArtistProfile(id),
      `artist profile: ${id}`,
    );
  }

  async getAlbumAsync(artist: string, album: string) {
    return this.withFallback(
      () => this.directus.getAlbumBySlug(artist, album),
      async () => (await this.local()).getAlbumBySlug(artist, album),
      `album: ${artist}/${album}`,
    );
  }

  async getSongAsync(artist: string, song: string) {
    return this.withFallback(
      () => this.directus.getSongBySlug(artist, song),
      async () => (await this.local()).getSongBySlug(artist, song),
      `song: ${artist}/${song}`,
    );
  }

  async getSongsAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getSongsWithLyrics(artist),
      async () => (await this.local()).getSongsWithLyrics(artist),
      `songs: ${artist}`,
    );
  }

  async getVideosAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getVideos(artist),
      async () => (await this.local()).getVideos(artist),
      `videos: ${artist}`,
    );
  }

  async getGalleriesAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getGalleries(artist),
      async () => (await this.local()).getGalleries(artist),
      `galleries: ${artist}`,
    );
  }

  async getGalleryAsync(artist: string, gallery: string) {
    return this.withFallback(
      () => this.directus.getGalleryById(artist, gallery),
      async () => (await this.local()).getGalleryById(artist, gallery),
      `gallery: ${artist}/${gallery}`,
    );
  }

  private async local(): Promise<LocalContentSource> {
    this.localSource ??= import('../data/local-content.source').then(
      ({ LocalContentSource }) => new LocalContentSource(),
    );
    return this.localSource;
  }

  private async withFallback<T>(
    remote: () => Promise<T>,
    local: () => Promise<T>,
    label: string,
  ): Promise<T> {
    if (this.mode === 'local') return local();

    try {
      return await remote();
    } catch (error) {
      if (this.mode === 'directus') throw error;
      console.warn(`[ContentService] Directus unavailable for ${label}; using local source`, error);
      return local();
    }
  }
}
