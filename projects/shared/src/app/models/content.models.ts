export type StreamingService =
  | 'spotify'
  | 'bandcamp'
  | 'soundcloud'
  | 'amazonMusic'
  | 'youtubeMusic'
  | 'appleMusic'
  | 'yandexMusic';

export type StreamingLinks = Partial<Record<StreamingService, string>>;

export interface ArtistSummary {
  id: string;
  name: string;
  image: string;
  country: string[];
  siteDomain?: string;
}

export interface CatalogSong {
  id: string;
  sourceId?: string;
  title: string;
  aliases: string[];
  lyrics: string;
  albums: string[];
  authors?: string;
  videoId?: string;
  duration?: number;
}

export interface CatalogAlbum {
  id: string;
  sourceId?: string;
  name: string;
  year: number;
  cover?: string;
  info?: string;
  songs: CatalogSong[];
  streaming?: StreamingLinks;
}

export interface CatalogGallery {
  id: string;
  title: string;
  path: string[];
  pictures: string[];
}

export interface ArtistProfile {
  id: string;
  name: string;
  image: string;
  country: string[];
  siteDomain?: string;
  streaming?: StreamingLinks;
  albums: CatalogAlbum[];
  hasImages: boolean;
}
