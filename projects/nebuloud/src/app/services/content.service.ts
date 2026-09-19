import { inject, Injectable } from '@angular/core';
import type {
  ArtistSummary,
  ArtistProfile,
  CatalogGallery,
  CatalogSong,
} from '../models/content.models';
import { DirectusContentSource } from '../data/directus-content.source';
import { LocalContentSource } from '../data/local-content.source';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  /** The source can later be replaced with a Directus-backed implementation. */
  private readonly source = inject(LocalContentSource);
  private readonly directus = inject(DirectusContentSource);

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
      () => this.getArtistProfile(id),
      `artist profile: ${id}`,
    );
  }

  async getAlbumAsync(artist: string, album: string) {
    return this.withFallback(
      () => this.directus.getAlbumBySlug(artist, album),
      () => this.getAlbum(artist, album),
      `album: ${artist}/${album}`,
    );
  }

  async getSongAsync(artist: string, song: string) {
    return this.withFallback(
      () => this.directus.getSongBySlug(artist, song),
      () => this.getSong(artist, song),
      `song: ${artist}/${song}`,
    );
  }

  async getSongsAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getSongsWithLyrics(artist),
      () => this.getSongsWithLyrics(artist),
      `songs: ${artist}`,
    );
  }

  async getOtherSongsAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getSongsWithoutAlbum(artist),
      () => this.getSongsWithoutAlbum(artist),
      `songs without album: ${artist}`,
    );
  }

  async getVideosAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getVideos(artist),
      () => this.getVideos(artist),
      `videos: ${artist}`,
    );
  }

  async getGalleriesAsync(artist: string) {
    return this.withFallback(
      () => this.directus.getGalleries(artist),
      () => this.getGalleries(artist),
      `galleries: ${artist}`,
    );
  }

  async getGalleryAsync(artist: string, gallery: string) {
    return this.withFallback(
      () => this.directus.getGalleryById(artist, gallery),
      () => this.getGallery(artist, gallery),
      `gallery: ${artist}/${gallery}`,
    );
  }

  private async withFallback<T>(
    remote: () => Promise<T>,
    local: () => T,
    label: string,
  ): Promise<T> {
    try {
      return await remote();
    } catch (error) {
      console.warn(`[ContentService] Directus unavailable for ${label}; using local source`, error);
      return local();
    }
  }

  getArtistProfile(id: string | null | undefined): ArtistProfile | undefined {
    return this.source.getArtistProfile(id);
  }

  getAlbum(artistId: string | null | undefined, albumId: string | null | undefined) {
    return this.source.getAlbum(artistId, albumId);
  }

  getSong(artistId: string | null | undefined, songId: string | null | undefined) {
    return this.source.getSong(artistId, songId);
  }

  getSongs(artistId: string | null | undefined): CatalogSong[] {
    return this.source.getSongs(artistId);
  }

  getSongsWithLyrics(artistId: string | null | undefined): CatalogSong[] {
    return this.getSongs(artistId).filter((song) => song.lyrics.trim());
  }

  getSongsWithoutAlbum(artistId: string | null | undefined): CatalogSong[] {
    return this.getSongs(artistId).filter((song) => !song.albums.length);
  }

  getVideos(artistId: string | null | undefined): CatalogSong[] {
    return this.getSongs(artistId).filter((song) => Boolean(song.videoId));
  }

  getGalleries(artistId: string | null | undefined): CatalogGallery[] {
    return this.source.getGalleries(artistId);
  }

  getGallery(artistId: string | null | undefined, galleryId: string | null | undefined) {
    return this.source.getGallery(artistId, galleryId);
  }
}
