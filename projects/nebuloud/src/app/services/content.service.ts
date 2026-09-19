import { inject, Injectable } from '@angular/core';
import type {
  ArtistSummary,
  ArtistProfile,
  CatalogGallery,
  CatalogSong,
} from '../models/content.models';
import { DirectusContentSource } from '../data/directus-content.source';
import { LocalContentSource } from '../data/local-content.source';
import type { ContentSource } from '../data/content-source';
import { CONTENT_MODE } from '../config';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  /** The source can later be replaced with a Directus-backed implementation. */
  private readonly source = inject(LocalContentSource);
  private readonly directus: ContentSource = inject(DirectusContentSource);
  private readonly mode = inject(CONTENT_MODE);

  readonly artistSummaries: ArtistSummary[] = this.source.artistSummaries;

  async getArtistSummaries() {
    return this.withFallback(
      () => this.directus.getArtistSummaries(),
      () => this.artistSummaries,
      'artist summaries',
    );
  }

  async getArtistProfileAsync(id: string) {
    return this.withFallback(
      () => this.directus.getArtistProfile(id),
      () => this.source.getArtistProfileSync(id),
      `artist profile: ${id}`,
    );
  }

  async getAlbumAsync(artist: string, album: string) {
    return this.withFallback(
      () => this.directus.getAlbumBySlug(artist, album),
      () => this.source.getAlbumSync(artist, album),
      `album: ${artist}/${album}`,
    );
  }

  async getSongAsync(artist: string, song: string) {
    return this.withFallback(
      () => this.directus.getSongBySlug(artist, song),
      () => this.source.getSongSync(artist, song),
      `song: ${artist}/${song}`,
    );
  }

  async getSongsAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getSongsWithLyrics(artist),
      () => this.source.getSongsWithLyricsSync(artist),
      `songs: ${artist}`,
    );
  }

  async getOtherSongsAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getSongsWithoutAlbum(artist),
      () => this.source.getSongsWithoutAlbumSync(artist),
      `songs without album: ${artist}`,
    );
  }

  async getVideosAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getVideos(artist),
      () => this.source.getVideosSync(artist),
      `videos: ${artist}`,
    );
  }

  async getGalleriesAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getGalleries(artist),
      () => this.source.getGalleriesSync(artist),
      `galleries: ${artist}`,
    );
  }

  async getGalleryAsync(artist: string, gallery: string) {
    return this.withFallback(
      () => this.directus.getGalleryById(artist, gallery),
      () => this.source.getGallerySync(artist, gallery),
      `gallery: ${artist}/${gallery}`,
    );
  }

  private async withFallback<T>(
    remote: () => Promise<T>,
    local: () => T,
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

  getArtistProfile(id: string | null | undefined): ArtistProfile | undefined {
    return this.source.getArtistProfileSync(id);
  }

  getAlbum(artistId: string | null | undefined, albumId: string | null | undefined) {
    return this.source.getAlbumSync(artistId, albumId);
  }

  getSong(artistId: string | null | undefined, songId: string | null | undefined) {
    return this.source.getSongSync(artistId, songId);
  }

  getSongs(artistId: string | null | undefined): CatalogSong[] {
    return this.source.getSongsSync(artistId);
  }

  getSongsWithLyrics(artistId: string | null | undefined): CatalogSong[] {
    return this.source.getSongsWithLyricsSync(artistId);
  }

  getSongsWithoutAlbum(artistId: string | null | undefined): CatalogSong[] {
    return this.source.getSongsWithoutAlbumSync(artistId);
  }

  getVideos(artistId: string | null | undefined): CatalogSong[] {
    return this.source.getVideosSync(artistId);
  }

  getGalleries(artistId: string | null | undefined): CatalogGallery[] {
    return this.source.getGalleriesSync(artistId);
  }

  getGallery(artistId: string | null | undefined, galleryId: string | null | undefined) {
    return this.source.getGallerySync(artistId, galleryId);
  }
}
