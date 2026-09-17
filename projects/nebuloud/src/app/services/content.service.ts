import { Injectable } from '@angular/core';
import artists from '../../db';
import { artistSummaries } from '../../db/artist-summaries';
import type { TypeArtistSummary, TypeItem, TypeItems } from '../../db/types';
import type {
  ArtistProfile,
  CatalogAlbum,
  CatalogGallery,
  CatalogSong,
} from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  /** Local source for now; Directus adapter will replace this boundary later. */
  readonly artists: TypeItems = artists;
  readonly artistSummaries: TypeArtistSummary[] = artistSummaries;

  getArtist(id: string | null | undefined): TypeItem | undefined {
    return id ? this.artists[id] : undefined;
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
