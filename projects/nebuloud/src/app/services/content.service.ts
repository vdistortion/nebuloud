import { inject, Injectable } from '@angular/core';
import type { TypeItem } from '../../db/types';
import type {
  ArtistSummary,
  ArtistProfile,
  CatalogAlbum,
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

  getArtist(id: string | null | undefined): TypeItem | undefined {
    return this.source.getArtist(id);
  }

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
    const item = this.getArtist(id);
    if (!item) return undefined;

    return {
      id: item.artist.id,
      name: item.artist.name,
      image: item.artist.image,
      country: item.artist.country,
      streaming: item.artist.streaming,
      hasImages: Boolean(item.artist.images?.length),
      albums: item.artist.albums
        .map((albumId) => this.mapAlbum(item, albumId))
        .filter((album): album is CatalogAlbum => Boolean(album)),
    };
  }

  getAlbum(artistId: string | null | undefined, albumId: string | null | undefined) {
    const item = this.getArtist(artistId);
    return item && albumId ? this.mapAlbum(item, albumId) : undefined;
  }

  getSong(artistId: string | null | undefined, songId: string | null | undefined) {
    const item = this.getArtist(artistId);
    return item && songId ? this.mapSong(item, songId) : undefined;
  }

  getSongs(artistId: string | null | undefined): CatalogSong[] {
    const item = this.getArtist(artistId);
    if (!item) return [];

    return Object.keys(item.songs)
      .map((songId) => this.mapSong(item, songId))
      .filter((song): song is CatalogSong => Boolean(song));
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
    const images = this.getArtist(artistId)?.artist.images ?? [];
    return images.map((gallery, index) => this.mapGallery(gallery, index));
  }

  getGallery(artistId: string | null | undefined, galleryId: string | null | undefined) {
    const galleryIndex = galleryId === null || galleryId === undefined ? -1 : Number(galleryId);
    return this.getGalleries(artistId).find((gallery) => gallery.id === String(galleryIndex));
  }

  private mapGallery(
    gallery: NonNullable<TypeItem['artist']['images']>[number],
    index: number,
  ): CatalogGallery {
    return {
      id: String(index),
      title: gallery.path[gallery.path.length - 1] ?? 'Галерея',
      path: gallery.path,
      pictures: gallery.pictures,
    };
  }

  private mapAlbum(item: TypeItem, albumId: string): CatalogAlbum | undefined {
    const album = item.albums[albumId];
    if (!album) return undefined;

    return {
      id: album.id,
      name: album.name,
      year: album.year,
      cover: album.folder,
      info: album.info,
      streaming: album.streaming,
      songs: album.songs
        .map((reference) =>
          typeof reference === 'string'
            ? reference
            : Array.isArray(reference)
              ? reference[0]
              : null,
        )
        .filter((songId): songId is string => Boolean(songId))
        .map((songId) => this.mapSong(item, songId))
        .filter((song): song is CatalogSong => Boolean(song)),
    };
  }

  private mapSong(item: TypeItem, songId: string): CatalogSong | undefined {
    const song = item.songs[songId];
    if (!song) return undefined;

    return {
      id: song.id,
      title: song.name[0],
      aliases: song.name.slice(1),
      lyrics: song.text,
      albums: song.albums,
      authors: song.authors,
      videoId: song.clipYouTubeId,
      duration: song.duration,
    };
  }
}
