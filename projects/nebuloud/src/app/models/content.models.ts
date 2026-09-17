import type { TypeStreaming } from '../../db/types';

export interface CatalogSong {
  id: string;
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
  name: string;
  year: number;
  cover?: string;
  info?: string;
  songs: CatalogSong[];
  streaming?: TypeStreaming;
}

export interface ArtistProfile {
  id: string;
  name: string;
  image: string;
  country: string[];
  streaming?: TypeStreaming;
  albums: CatalogAlbum[];
  hasImages: boolean;
}
