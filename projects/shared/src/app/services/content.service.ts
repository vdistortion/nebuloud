import { inject, Injectable } from '@angular/core';
import type { ArtistSummary } from '../models/content.models';
import { DirectusContentSource } from '../data/directus-content.source';
import type { ContentSource } from '../data/content-source';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly source: ContentSource = inject(DirectusContentSource);

  async getArtistSummaries(): Promise<ArtistSummary[]> {
    return this.source.getArtistSummaries();
  }

  async getArtistProfileAsync(id: string) {
    return this.source.getArtistProfile(id);
  }

  async getAlbumAsync(artist: string, album: string) {
    return this.source.getAlbumBySlug(artist, album);
  }

  async getSongAsync(artist: string, song: string) {
    return this.source.getSongBySlug(artist, song);
  }

  async getSongsAsync(artist: string) {
    return this.source.getSongsWithLyrics(artist);
  }

  async getVideosAsync(artist: string) {
    return this.source.getVideos(artist);
  }

  async getGalleriesAsync(artist: string) {
    return this.source.getGalleries(artist);
  }

  async getGalleryAsync(artist: string, gallery: string) {
    return this.source.getGalleryById(artist, gallery);
  }
}
