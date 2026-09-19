import { Injectable } from '@angular/core';
import artists from '../../db';
import { artistSummaries } from '../../db/artist-summaries';
import type { TypeItem, TypeItems } from '../../db/types';
import type {
  ArtistProfile,
  ArtistSummary,
  CatalogAlbum,
  CatalogGallery,
  CatalogSong,
  StreamingLinks,
} from '../models/content.models';
import type { ContentSource } from './content-source';

@Injectable({
  providedIn: 'root',
})
export class LocalContentSource implements ContentSource {
  readonly artists: TypeItems = artists;
  readonly artistSummaries: ArtistSummary[] = artistSummaries;

  getArtist(id: string | null | undefined): TypeItem | undefined {
    return id ? this.artists[id] : undefined;
  }

  getArtistProfileSync(id: string | null | undefined): ArtistProfile | undefined {
    const item = this.getArtist(id);
    if (!item) return undefined;

    return {
      id: item.artist.id,
      name: item.artist.name,
      image: item.artist.image,
      country: item.artist.country,
      streaming: item.artist.streaming as StreamingLinks | undefined,
      hasImages: Boolean(item.artist.images?.length),
      albums: item.artist.albums
        .map((albumId) => this.mapAlbum(item, albumId))
        .filter((album): album is CatalogAlbum => Boolean(album)),
    };
  }

  getAlbumSync(artistId: string | null | undefined, albumId: string | null | undefined) {
    const item = this.getArtist(artistId);
    return item && albumId ? this.mapAlbum(item, albumId) : undefined;
  }

  getSongSync(artistId: string | null | undefined, songId: string | null | undefined) {
    const item = this.getArtist(artistId);
    return item && songId ? this.mapSong(item, songId) : undefined;
  }

  getSongsSync(artistId: string | null | undefined): CatalogSong[] {
    const item = this.getArtist(artistId);
    if (!item) return [];
    return Object.keys(item.songs)
      .map((songId) => this.mapSong(item, songId))
      .filter((song): song is CatalogSong => Boolean(song));
  }

  getSongsWithLyricsSync(artistId: string | null | undefined) {
    return this.getSongsSync(artistId).filter((song) => song.lyrics.trim());
  }

  getSongsWithoutAlbumSync(artistId: string | null | undefined) {
    return this.getSongsSync(artistId).filter((song) => !song.albums.length);
  }

  getVideosSync(artistId: string | null | undefined) {
    return this.getSongsSync(artistId).filter((song) => Boolean(song.videoId));
  }

  async getArtistSummaries() {
    return this.artistSummaries;
  }
  async getArtistProfile(slug: string) {
    return this.getArtistProfileSync(slug);
  }
  async getAlbumBySlug(artist: string, album: string) {
    return this.getAlbumSync(artist, album);
  }
  async getSongBySlug(artist: string, song: string) {
    return this.getSongSync(artist, song);
  }
  async getSongsWithLyrics(artist: string) {
    return this.getSongsWithLyricsSync(artist);
  }
  async getSongsWithoutAlbum(artist: string) {
    return this.getSongsWithoutAlbumSync(artist);
  }
  async getVideos(artist: string) {
    return this.getVideosSync(artist);
  }
  async getGalleries(artist: string) {
    return this.getGalleriesSync(artist);
  }
  async getGalleryById(artist: string, gallery: string) {
    return this.getGallerySync(artist, gallery);
  }

  getGalleriesSync(artistId: string | null | undefined): CatalogGallery[] {
    return (this.getArtist(artistId)?.artist.images ?? []).map((gallery, index) => ({
      id: String(index),
      title: gallery.path.at(-1) ?? 'Галерея',
      path: gallery.path,
      pictures: gallery.pictures,
    }));
  }

  getGallerySync(artistId: string | null | undefined, galleryId: string | null | undefined) {
    return this.getGalleriesSync(artistId).find((gallery) => gallery.id === galleryId);
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
      streaming: album.streaming as StreamingLinks | undefined,
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
