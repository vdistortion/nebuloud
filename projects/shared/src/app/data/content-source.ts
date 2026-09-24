import type {
  ArtistProfile,
  ArtistSummary,
  CatalogAlbum,
  CatalogGallery,
  CatalogSong,
} from '../models/content.models';

/** Public content contract used by the application data layer. */
export interface ContentSource {
  getArtistSummaries(): Promise<ArtistSummary[]>;
  getArtistProfile(slug: string): Promise<ArtistProfile | undefined>;
  getAlbumBySlug(artistSlug: string, albumSlug: string): Promise<CatalogAlbum | undefined>;
  getSongBySlug(artistSlug: string, songSlug: string): Promise<CatalogSong | undefined>;
  getSongsWithLyrics(artistSlug: string): Promise<CatalogSong[]>;
  getSongsWithoutAlbum(artistSlug: string): Promise<CatalogSong[]>;
  getVideos(artistSlug: string): Promise<CatalogSong[]>;
  getGalleries(artistSlug: string): Promise<CatalogGallery[]>;
  getGalleryById(artistSlug: string, galleryId: string): Promise<CatalogGallery | undefined>;
}
